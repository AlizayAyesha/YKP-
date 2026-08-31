import fs from 'node:fs/promises';
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import multer from 'multer';
import { getEventById } from './events';
import { createRegistration, listRegistrations, saveRegistrations } from './store';
import { sendRegistrationEmail } from './email';
import { appendFounderCeoToSheet, isFounderOrCeo } from './sheets';
import { isServerless, uploadsDir } from './paths';

const MAX_BYTES = 8 * 1024 * 1024;
const UPLOADS_DIR = uploadsDir();
const PHOTOS_DIR = path.join(UPLOADS_DIR, 'photos');
const POSTERS_OUT_DIR = path.join(UPLOADS_DIR, 'posters');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES }
});

type UploadRequest = IncomingMessage & {
  body: Record<string, string>;
  file?: { buffer: Buffer; mimetype: string };
};

function send(res: ServerResponse, status: number, body: unknown) {
  if (res.headersSent) return;
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
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

function imageExt(mimetype: string) {
  if (mimetype === 'image/png') return 'png';
  if (mimetype === 'image/webp') return 'webp';
  return 'jpg';
}

function publicBase(req: IncomingMessage) {
  const host = req.headers.host || 'youthkapakistan.com';
  const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
  return process.env.APP_URL || `${proto}://${host}`;
}

export function handleRegistration(req: IncomingMessage, res: ServerResponse) {
  return new Promise<void>((resolve) => {
    upload.single('photo')(req as UploadRequest, res as never, async (err: unknown) => {
      try {
        if (err) {
          const message = err instanceof Error ? err.message : 'Invalid photograph.';
          send(res, 400, { error: message });
          return;
        }

        const typed = req as UploadRequest;
        const fullName = sanitizeText(typed.body?.fullName, 80);
        const email = sanitizeText(typed.body?.email, 120).toLowerCase();
        const phone = sanitizeText(typed.body?.phone, 30);
        const city = sanitizeText(typed.body?.city, 60);
        const designation = sanitizeText(typed.body?.designation, 140);
        const organization = sanitizeText(typed.body?.organization, 140);
        const notes = sanitizeText(typed.body?.notes, 400);
        const eventId = sanitizeText(typed.body?.eventId, 80);
        const publicConsent = String(typed.body?.publicConsent || '') === 'true';

        if (fullName.length < 2 || !isEmail(email) || phone.length < 7 || city.length < 2 || designation.length < 2) {
          send(res, 400, { error: 'Please complete name, title, email, phone, and city.' });
          return;
        }

        const event = await getEventById(eventId);
        if (!event) {
          send(res, 404, { error: 'Event not found.' });
          return;
        }
        if (event.registrationEnabled === false) {
          send(res, 400, { error: 'Registration is not open for this event.' });
          return;
        }
        if (!typed.file) {
          send(res, 400, { error: 'Please upload a personal photograph.' });
          return;
        }

        await fs.mkdir(PHOTOS_DIR, { recursive: true });
        await fs.mkdir(POSTERS_OUT_DIR, { recursive: true });
        const { composeAttendeePoster, ensurePosterTemplate } = await import('./poster');
        await ensurePosterTemplate();

        const prefix = event.registrationPrefix || `YKP-${new Date().getFullYear()}-`;
        const ext = imageExt(typed.file.mimetype);
        const photoBuffer = typed.file.buffer;

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
            guests: '',
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
          await composeAttendeePoster({
            photoPath,
            fullName,
            designation: [designation, organization].filter(Boolean).join(' — '),
            event,
            outputPath: posterPath
          });
        } catch (error) {
          console.error('Poster generation failed:', error);
          await fs.unlink(photoPath).catch(() => undefined);
          const rows = await listRegistrations();
          await saveRegistrations(rows.filter((row) => row.registrationId !== registration.registrationId));
          send(res, 400, { error: error instanceof Error ? error.message : 'Poster generation failed.' });
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

        const { deliverSubmission } = await import('./notify');
        await deliverSubmission({
          kind: 'rsvp',
          subject: `RSVP: ${fullName} — ${event.title || event.dates}`,
          replyTo: email,
          fields: {
            Name: fullName,
            Title: designation,
            Organization: organization,
            Email: email,
            WhatsApp: phone,
            City: city,
            Event: [event.title, event.subtitle].filter(Boolean).join(' — ') || event.dates,
            'Registration ID': registration.registrationId
          }
        }).catch((error) => console.error('RSVP team notice failed:', error));

        send(res, 200, {
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
        send(res, 500, { error: error instanceof Error ? error.message : 'Registration failed.' });
      } finally {
        resolve();
      }
    });
  });
}
