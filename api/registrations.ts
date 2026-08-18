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

    const { composeAttendeePoster } = await import('../server/poster');
    await composeAttendeePoster({
      photoPath,
      fullName,
      designation: [designation, organization].filter(Boolean).join(' — '),
      outputPath: posterPath
    });

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
