import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { getEventById, updateEvent } from './events';
import { createRegistration, listRegistrations, saveRegistrations } from './store';
import {
  addProfile,
  listApprovedPublicProfiles,
  listProfiles,
  nextProfileId,
  updateProfile
} from './profiles';
import { sendRegistrationEmail } from './email';
import { appendFounderCeoToSheet, isFounderOrCeo } from './sheets';
import { addInquiry, addStudent, listInquiries, listStudents } from './inquiries';
import { isServerless, uploadsDir } from './paths';
import type { EventProfileRole, InquiryRole, ProfileApprovalStatus, YkpEvent } from '../src/types';

dotenv.config({ path: '.env.local' });
dotenv.config();

const PORT = Number(process.env.API_PORT || 8788);
const UPLOADS_DIR = uploadsDir();
const PHOTOS_DIR = path.join(UPLOADS_DIR, 'photos');
const POSTERS_OUT_DIR = path.join(UPLOADS_DIR, 'posters');
const PROFILES_DIR = path.join(UPLOADS_DIR, 'profiles');
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'application/octet-stream'
]);
const MAX_BYTES = 8 * 1024 * 1024;
const INQUIRY_ROLES: InquiryRole[] = ['Mentor', 'Educator', 'Partner / Sponsor', 'Other'];
const EDUCATION_LEVELS = ['School', 'College', 'University', 'Graduate', 'Other'];
const PROFILE_ROLES: EventProfileRole[] = [
  'Guest of Honor',
  'Speaker',
  'Panelist',
  'Educational Leader',
  'Corporate Representative',
  'Participant'
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype || ALLOWED_TYPES.has(file.mimetype) || file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Please upload a JPG, PNG, or WebP portrait.'));
  }
});

function publicBase(req: express.Request) {
  return process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
}

function sanitizeText(value: unknown, max = 120) {
  return String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, max);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isAdmin(req: express.Request) {
  const key = req.header('x-admin-key') || '';
  return Boolean(process.env.ADMIN_KEY && key === process.env.ADMIN_KEY);
}

function requireAdmin(req: express.Request, res: express.Response) {
  if (!isAdmin(req)) {
    res.status(401).json({ error: 'Unauthorized.' });
    return false;
  }
  return true;
}

function asStringList(value: unknown, maxItems = 12, maxLen = 80) {
  const raw = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : [];
  return [...new Set(raw.map((item) => sanitizeText(item, maxLen)).filter(Boolean))].slice(0, maxItems);
}

function imageExt(mimetype: string) {
  if (mimetype === 'image/png') return 'png';
  if (mimetype === 'image/webp') return 'webp';
  return 'jpg';
}

async function ensureDirs() {
  await fs.mkdir(PHOTOS_DIR, { recursive: true });
  await fs.mkdir(POSTERS_OUT_DIR, { recursive: true });
  await fs.mkdir(PROFILES_DIR, { recursive: true });
  const { ensurePosterTemplate } = await import('./poster');
  await ensurePosterTemplate();
}

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use((req, _res, next) => {
  if (process.env.VERCEL && req.url && !req.url.startsWith('/api')) {
    req.url = `/api${req.url.startsWith('/') ? req.url : `/${req.url}`}`;
  }
  if (req.path.startsWith('/api')) {
    console.log(`${req.method} ${req.path}`);
  }
  next();
});
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/posters', express.static(path.join(process.cwd(), 'public', 'posters')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/events', async (_req, res) => {
  const { loadEvents } = await import('./events');
  res.json({ events: await loadEvents() });
});

app.get('/api/events/:id/profiles', async (req, res) => {
  const event = await getEventById(sanitizeText(req.params.id, 80));
  if (!event) {
    res.status(404).json({ error: 'Event not found.' });
    return;
  }
  res.json({ profiles: await listApprovedPublicProfiles(event.id) });
});

app.post('/api/registrations', (req, res) => {
  upload.single('photo')(req, res, async (err) => {
    try {
      if (err) {
        res.status(400).json({ error: err.message || 'Invalid photograph.' });
        return;
      }

      const fullName = sanitizeText(req.body.fullName, 80);
      const email = sanitizeText(req.body.email, 120).toLowerCase();
      const phone = sanitizeText(req.body.phone, 30);
      const city = sanitizeText(req.body.city, 60);
      const designation = sanitizeText(req.body.designation, 140);
      const organization = sanitizeText(req.body.organization, 140);
      const guests = '';
      const notes = sanitizeText(req.body.notes, 400);
      const eventId = sanitizeText(req.body.eventId, 80);
      const publicConsent = String(req.body.publicConsent || '') === 'true';

      if (fullName.length < 2 || !isEmail(email) || phone.length < 7 || city.length < 2 || designation.length < 2) {
        res.status(400).json({ error: 'Please complete name, title, email, phone, and city.' });
        return;
      }

      const event = await getEventById(eventId);
      if (!event) {
        res.status(404).json({ error: 'Event not found.' });
        return;
      }
      if (event.registrationEnabled === false) {
        res.status(400).json({ error: 'Registration is not open for this event.' });
        return;
      }
      if (!req.file) {
        res.status(400).json({ error: 'Please upload a personal photograph.' });
        return;
      }

      await ensureDirs();
      const prefix = event.registrationPrefix || `YKP-${new Date().getFullYear()}-`;
      const ext = imageExt(req.file.mimetype);
      const photoBuffer = req.file.buffer;

      const registration = await createRegistration(prefix, (registrationId) => {
        const safeId = registrationId.replace(/[^a-zA-Z0-9-]/g, '');
        return {
          id: safeId,
          registrationId,
          eventId: event.id,
          fullName,
          designation,
          organization,
          email,
          phone,
          city,
          guests,
          notes,
          publicConsent,
          photoPath: `/uploads/photos/${safeId}.${ext}`,
          posterPath: `/uploads/posters/${safeId}.png`,
          posterUrl: `/uploads/posters/${safeId}.png`,
          posterStatus: 'pending',
          emailSent: false,
          createdAt: new Date().toISOString()
        };
      });

      const photoPath = path.join(PHOTOS_DIR, `${registration.id}.${ext}`);
      const posterPath = path.join(POSTERS_OUT_DIR, `${registration.id}.png`);
      await fs.writeFile(photoPath, photoBuffer);

      try {
        const { composeAttendeePoster } = await import('./poster');
        await composeAttendeePoster({
          photoPath,
          fullName,
          designation: [designation, organization].filter(Boolean).join(' — '),
          event,
          outputPath: posterPath
        });
      } catch (error) {
        console.error('Poster generation failed:', error);
        const message = error instanceof Error ? error.message : 'Poster generation failed.';
        await fs.unlink(photoPath).catch(() => undefined);
        const rows = await listRegistrations();
        await saveRegistrations(rows.filter((row) => row.registrationId !== registration.registrationId));
        res.status(400).json({ error: message });
        return;
      }

      const rows = await listRegistrations();
      const idx = rows.findIndex((row) => row.registrationId === registration.registrationId);
      if (idx >= 0) rows[idx].posterStatus = 'ready';

      const origin = process.env.APP_URL || (isServerless ? publicBase(req) : 'http://localhost:3000');
      const posterFileUrl = `/uploads/posters/${registration.id}.png`;
      const posterBuffer = await fs.readFile(posterPath);
      const posterUrl = isServerless
        ? `data:image/png;base64,${posterBuffer.toString('base64')}`
        : posterFileUrl;
      const emailResult = await sendRegistrationEmail({
        registration: { ...registration, posterStatus: 'ready' },
        event,
        posterUrl: isServerless ? posterFileUrl : `${origin}${posterFileUrl}`,
        logoUrl: `${origin}/ykp-logo.png`,
        siteUrl: origin
      });

      if (idx >= 0) {
        rows[idx].emailSent = Boolean(emailResult.sent);
        await saveRegistrations(rows);
      }

      if (isFounderOrCeo(designation)) {
        try {
          await appendFounderCeoToSheet({
            fullName,
            designation,
            organization,
            email,
            phone,
            city,
            eventName: [event.title, event.subtitle].filter(Boolean).join(' — ') || event.dates,
            registrationId: registration.registrationId
          });
        } catch (sheetError) {
          console.error('Founder/CEO Google Sheet append failed:', sheetError);
        }
      }

      res.json({
        ok: true,
        registrationId: registration.registrationId,
        eventName: [event.title, event.subtitle].filter(Boolean).join(' — ') || event.dates,
        posterUrl,
        emailSent: Boolean(emailResult.sent),
        emailNote: emailResult.sent ? undefined : emailResult.reason,
        absolutePosterUrl: isServerless ? posterUrl : `${publicBase(req)}${posterFileUrl}`
      });
    } catch (error) {
      console.error('Registration failed:', error);
      const message = error instanceof Error ? error.message : 'Registration failed.';
      res.status(500).json({ error: message });
    }
  });
});

app.post('/api/profiles', (req, res) => {
  upload.single('photo')(req, res, async (err) => {
    try {
      if (err) {
        res.status(400).json({ error: err.message || 'Invalid photograph.' });
        return;
      }

      const eventId = sanitizeText(req.body.eventId, 80);
      const fullName = sanitizeText(req.body.fullName, 80);
      const designation = sanitizeText(req.body.designation, 140);
      const organization = sanitizeText(req.body.organization, 140);
      const email = sanitizeText(req.body.email, 120).toLowerCase();
      const phone = sanitizeText(req.body.phone, 30);
      const bio = sanitizeText(req.body.bio, 600);
      const role = sanitizeText(req.body.role, 40) as EventProfileRole;

      if (fullName.length < 2 || designation.length < 2 || organization.length < 2 || !isEmail(email) || phone.length < 7) {
        res.status(400).json({ error: 'Please complete name, designation, organization, email, and mobile number.' });
        return;
      }
      if (!PROFILE_ROLES.includes(role)) {
        res.status(400).json({ error: 'Please select a valid event role.' });
        return;
      }
      if (!req.file) {
        res.status(400).json({ error: 'Please upload a high-resolution photograph.' });
        return;
      }

      const event = await getEventById(eventId);
      if (!event) {
        res.status(404).json({ error: 'Event not found.' });
        return;
      }

      await ensureDirs();
      const profileId = await nextProfileId();
      const ext = imageExt(req.file.mimetype);
      const photoPath = path.join(PROFILES_DIR, `${profileId}.${ext}`);
      await fs.writeFile(photoPath, req.file.buffer);

      const profile = await addProfile({
        id: profileId,
        eventId: event.id,
        fullName,
        designation,
        organization,
        role,
        bio,
        email,
        phone,
        photoUrl: `/uploads/profiles/${profileId}.${ext}`,
        status: 'pending',
        featuredSpeaker: false,
        featuredPanelist: false,
        createdAt: new Date().toISOString()
      });

      res.json({
        ok: true,
        id: profile.id,
        status: profile.status,
        message: 'Your profile was submitted for YKP review. It will appear on the event page only after approval.'
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Profile submission failed.';
      res.status(500).json({ error: message });
    }
  });
});

app.get('/api/admin/registrations', async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const rows = await listRegistrations();
  res.json({
    attendees: rows.map((row) => ({
      fullName: row.fullName,
      email: row.email,
      phone: row.phone,
      city: row.city,
      organization: row.organization || '',
      designation: row.designation || '',
      eventId: row.eventId,
      registrationId: row.registrationId,
      createdAt: row.createdAt,
      posterStatus: row.posterStatus,
      posterUrl: row.posterUrl,
      publicConsent: Boolean(row.publicConsent)
    }))
  });
});

app.get('/api/admin/profiles', async (req, res) => {
  if (!requireAdmin(req, res)) return;
  res.json({ profiles: await listProfiles() });
});

app.post('/api/students', async (req, res) => {
  try {
    const fullName = sanitizeText(req.body.fullName, 80);
    const email = sanitizeText(req.body.email, 120).toLowerCase();
    const phone = sanitizeText(req.body.phone, 30);
    const city = sanitizeText(req.body.city, 60);
    const age = sanitizeText(req.body.age, 8);
    const school = sanitizeText(req.body.school, 120);
    const educationLevel = sanitizeText(req.body.educationLevel, 40);
    const interests = asStringList(req.body.interests, 12, 80);
    const motivation = sanitizeText(req.body.motivation, 800);

    if (!fullName || !email || !phone || !city || !age || !school || !educationLevel || !motivation) {
      res.status(400).json({ error: 'Please complete all required student fields.' });
      return;
    }
    if (!isEmail(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    const ageNum = Number(age);
    if (!Number.isFinite(ageNum) || ageNum < 12 || ageNum > 40) {
      res.status(400).json({ error: 'Please enter a valid age between 12 and 40.' });
      return;
    }
    if (!EDUCATION_LEVELS.includes(educationLevel)) {
      res.status(400).json({ error: 'Please select a valid education level.' });
      return;
    }
    if (interests.length === 0) {
      res.status(400).json({ error: 'Please select at least one learning interest.' });
      return;
    }
    if (motivation.length < 20) {
      res.status(400).json({ error: 'Please tell us a bit more about why you want to join.' });
      return;
    }

    const row = await addStudent({
      fullName,
      email,
      phone,
      city,
      age,
      school,
      educationLevel,
      interests,
      motivation
    });
    res.json({ ok: true, id: row.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not save student interest.' });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const fullName = sanitizeText(req.body.fullName, 80);
    const email = sanitizeText(req.body.email, 120).toLowerCase();
    const phone = sanitizeText(req.body.phone, 30);
    const city = sanitizeText(req.body.city, 60);
    const organization = sanitizeText(req.body.organization, 120);
    const role = sanitizeText(req.body.role, 40) as InquiryRole;
    const otherRole = sanitizeText(req.body.otherRole, 80);
    const supportTypes = asStringList(req.body.supportTypes, 12, 80);
    const expertise = sanitizeText(req.body.expertise, 180);
    const supportDetails = sanitizeText(req.body.supportDetails, 1200);
    const availability = sanitizeText(req.body.availability, 120);
    const website = sanitizeText(req.body.website, 180);

    if (!fullName || !email || !phone || !city || !organization || !role || !expertise || !supportDetails) {
      res.status(400).json({ error: 'Please complete all required inquiry fields.' });
      return;
    }
    if (!isEmail(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    if (!INQUIRY_ROLES.includes(role)) {
      res.status(400).json({ error: 'Please choose mentor, educator, partner, or other.' });
      return;
    }
    if (role === 'Other' && !otherRole) {
      res.status(400).json({ error: 'Please describe your role.' });
      return;
    }
    if (supportTypes.length === 0) {
      res.status(400).json({ error: 'Please select at least one way you can support YKP.' });
      return;
    }
    if (supportDetails.length < 30) {
      res.status(400).json({ error: 'Please describe in more detail how you will support YKP.' });
      return;
    }

    const row = await addInquiry({
      fullName,
      email,
      phone,
      city,
      organization,
      role,
      otherRole: role === 'Other' ? otherRole : '',
      supportTypes,
      expertise,
      supportDetails,
      availability,
      website
    });
    res.json({ ok: true, id: row.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not save inquiry.' });
  }
});

app.get('/api/admin/students', async (req, res) => {
  if (!requireAdmin(req, res)) return;
  res.json({ students: await listStudents() });
});

app.get('/api/admin/inquiries', async (req, res) => {
  if (!requireAdmin(req, res)) return;
  res.json({ inquiries: await listInquiries() });
});

app.patch('/api/admin/profiles/:id', async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const id = sanitizeText(req.params.id, 40);
  const patch: {
    status?: ProfileApprovalStatus;
    featuredSpeaker?: boolean;
    featuredPanelist?: boolean;
    role?: EventProfileRole;
    bio?: string;
  } = {};

  if (req.body.status) {
    const status = sanitizeText(req.body.status, 20) as ProfileApprovalStatus;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      res.status(400).json({ error: 'Invalid status.' });
      return;
    }
    patch.status = status;
  }
  if (typeof req.body.featuredSpeaker === 'boolean') patch.featuredSpeaker = req.body.featuredSpeaker;
  if (typeof req.body.featuredPanelist === 'boolean') patch.featuredPanelist = req.body.featuredPanelist;
  if (req.body.role) {
    const role = sanitizeText(req.body.role, 40) as EventProfileRole;
    if (!PROFILE_ROLES.includes(role)) {
      res.status(400).json({ error: 'Invalid role.' });
      return;
    }
    patch.role = role;
  }
  if (typeof req.body.bio === 'string') patch.bio = sanitizeText(req.body.bio, 600);

  const updated = await updateProfile(id, patch);
  if (!updated) {
    res.status(404).json({ error: 'Profile not found.' });
    return;
  }
  res.json({ ok: true, profile: updated });
});

app.patch('/api/admin/events/:id', async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const allowed: (keyof YkpEvent)[] = [
    'title',
    'subtitle',
    'tagline',
    'summary',
    'description',
    'venue',
    'city',
    'dates',
    'date',
    'time',
    'themeUrdu',
    'themeEnglish',
    'organizer',
    'contactPhone',
    'image',
    'status',
    'registrationStatus',
    'registrationEnabled'
  ];
  const patch: Partial<YkpEvent> = {};
  for (const key of allowed) {
    if (req.body[key] === undefined) continue;
    if (key === 'registrationEnabled') {
      patch.registrationEnabled = Boolean(req.body[key]);
      continue;
    }
    if (key === 'status') {
      const status = sanitizeText(req.body.status, 20);
      if (!['Upcoming', 'Open', 'Completed'].includes(status)) {
        res.status(400).json({ error: 'Invalid event status.' });
        return;
      }
      patch.status = status as YkpEvent['status'];
      continue;
    }
    (patch as Record<string, string>)[key] = sanitizeText(req.body[key], key === 'description' || key === 'summary' ? 1200 : 180);
  }
  const updated = await updateEvent(sanitizeText(req.params.id, 80), patch);
  if (!updated) {
    res.status(404).json({ error: 'Event not found.' });
    return;
  }
  res.json({ ok: true, event: updated });
});

export default app;

if (!process.env.VERCEL) {
  ensureDirs()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`YKP API listening on ${PORT}`);
      });
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
