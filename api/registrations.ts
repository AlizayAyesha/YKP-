import type { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

function send(res: ServerResponse, status: number, body: unknown) {
  if (res.headersSent) return;
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (req.method !== 'POST') {
      send(res, 405, { error: 'POST required to register.' });
      return;
    }

    const multer = (await import('multer')).default;
    const upload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 8 * 1024 * 1024 }
    });

    await new Promise<void>((resolve, reject) => {
      upload.single('photo')(req as IncomingMessage & { body?: Record<string, string>; file?: { buffer: Buffer; mimetype: string } }, res as never, (err: unknown) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const typed = req as IncomingMessage & {
      body?: Record<string, string>;
      file?: { buffer: Buffer; mimetype: string };
    };

    const sanitize = (value: unknown, max = 120) =>
      String(value ?? '')
        .replace(/<[^>]*>/g, '')
        .trim()
        .slice(0, max);

    const fullName = sanitize(typed.body?.fullName, 80);
    const email = sanitize(typed.body?.email, 120).toLowerCase();
    const phone = sanitize(typed.body?.phone, 30);
    const city = sanitize(typed.body?.city, 60);
    const designation = sanitize(typed.body?.designation, 140);
    const organization = sanitize(typed.body?.organization, 140);
    const eventId = sanitize(typed.body?.eventId, 80);

    if (fullName.length < 2 || !email.includes('@') || phone.length < 7 || city.length < 2 || designation.length < 2) {
      send(res, 400, { error: 'Please complete name, title, email, phone, and city.' });
      return;
    }
    if (!typed.file) {
      send(res, 400, { error: 'Please upload a personal photograph.' });
      return;
    }

    const eventsPath = path.join(process.cwd(), 'src', 'data', 'events.json');
    const events = JSON.parse(await fs.readFile(eventsPath, 'utf8')) as Array<{
      id: string;
      title?: string;
      subtitle?: string;
      dates?: string;
      registrationEnabled?: boolean;
      registrationPrefix?: string;
    }>;
    const event = events.find((item) => item.id === eventId);
    if (!event) {
      send(res, 404, { error: 'Event not found.' });
      return;
    }

    const tmp = path.join(os.tmpdir(), `ykp-${Date.now()}`);
    await fs.mkdir(tmp, { recursive: true });
    const photoPath = path.join(tmp, 'photo.jpg');
    const posterPath = path.join(tmp, 'poster.png');
    await fs.writeFile(photoPath, typed.file.buffer);

    const role = [designation, organization].filter(Boolean).join(' — ');
    await composePoster(photoPath, fullName, role, posterPath);

    const posterBuffer = await fs.readFile(posterPath);
    const registrationId = `YKP-URAAN-2026-${Date.now().toString(36).toUpperCase()}`;
    send(res, 200, {
      ok: true,
      registrationId,
      eventName: [event.title, event.subtitle].filter(Boolean).join(' — ') || event.dates,
      posterUrl: `data:image/png;base64,${posterBuffer.toString('base64')}`,
      emailSent: false,
      emailNote: 'Email is not configured on the live server yet.',
      absolutePosterUrl: `data:image/png;base64,${posterBuffer.toString('base64')}`
    });
  } catch (error) {
    console.error(error);
    send(res, 500, { error: error instanceof Error ? error.message : 'Registration failed.' });
  }
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

async function composePoster(photoPath: string, fullName: string, role: string, outputPath: string) {
  const sharp = (await import('sharp')).default;
  const postersDir = path.join(process.cwd(), 'public', 'posters');
  const templatePath = path.join(postersDir, 'ykp-attendee-template.png');
  const width = 1024;
  const height = 1024;
  const box = { x: 341, y: 411, size: 326 };

  const portrait = await sharp(photoPath, { failOn: 'none' })
    .rotate()
    .resize(box.size, box.size, { fit: 'cover', position: 'north' })
    .png()
    .toBuffer();

  const circle = Buffer.from(
    `<svg width="${box.size}" height="${box.size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${box.size / 2}" cy="${box.size / 2}" r="${box.size / 2}" fill="#fff"/></svg>`
  );
  const circled = await sharp(portrait)
    .composite([{ input: circle, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const hole = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><circle cx="${box.x + box.size / 2}" cy="${box.y + box.size / 2}" r="${box.size / 2}" fill="#fff"/></svg>`
  );
  const template = await sharp(templatePath)
    .ensureAlpha()
    .composite([{ input: hole, blend: 'dest-out' }])
    .png()
    .toBuffer();

  const name = escapeXml(fullName.trim().toUpperCase());
  const designation = escapeXml(role.trim().toUpperCase());
  const text = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="318" y="756" width="388" height="36" fill="#073265"/>
  <text x="512" y="784" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="24" font-style="italic" font-weight="700" fill="#FFFFFF">${name}</text>
  ${designation ? `<rect x="318" y="816" width="388" height="26" rx="13" fill="#F7F9FC" stroke="#D7DEE8"/>
  <text x="512" y="834" text-anchor="middle" font-family="Times New Roman, Georgia, serif" font-size="14" font-style="italic" font-weight="700" fill="#24693A">${designation}</text>` : ''}
</svg>`);

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 247, g: 249, b: 252, alpha: 1 }
    }
  })
    .composite([
      { input: circled, left: box.x, top: box.y },
      { input: template, left: 0, top: 0 },
      { input: text, left: 0, top: 0 }
    ])
    .png()
    .toFile(outputPath);
}
