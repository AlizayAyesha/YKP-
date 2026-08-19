import type { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

type GlyphAtlas = {
  size: number;
  glyphs: Record<string, { adv: number; d: string }>;
};

let glyphAtlas: GlyphAtlas | null = null;

function send(res: ServerResponse, status: number, body: unknown) {
  if (res.headersSent) return;
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function publicErrorMessage(error: unknown, fallback: string) {
  const raw = error instanceof Error && error.message ? error.message : fallback;
  return raw
    .replace(/(?:api[_-]?key|token|secret|password|authorization)[=:\s][^\s,]+/gi, '[redacted]')
    .slice(0, 400);
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (req.method !== 'POST') {
      send(res, 405, { error: 'POST required to register.', engine: 'glyph-atlas' });
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
        .normalize('NFC')
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
    try {
      await composePoster(photoPath, fullName, role, posterPath);
    } catch (error) {
      console.error('Poster generation failed', error);
      send(res, 500, {
        error: `Poster generation failed: ${publicErrorMessage(error, 'the attendee name and designation could not be drawn.')}`
      });
      return;
    }

    const posterBuffer = await fs.readFile(posterPath);
    if (!posterBuffer.length) {
      send(res, 500, { error: 'Poster generation failed: the output image was empty.' });
      return;
    }

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
    console.error('Registration failed', error);
    send(res, 500, {
      error: publicErrorMessage(error, 'Registration failed.')
    });
  }
}

async function loadGlyphAtlas() {
  if (glyphAtlas) return glyphAtlas;
  const atlasPath = path.join(process.cwd(), 'src', 'data', 'poster-glyphs.json');
  const parsed = JSON.parse(await fs.readFile(atlasPath, 'utf8')) as GlyphAtlas;
  if (!parsed?.size || !parsed.glyphs) {
    throw new Error('Poster glyph atlas is missing or unreadable.');
  }
  glyphAtlas = parsed;
  return parsed;
}

function posterLatinText(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .normalize('NFC')
    .replace(/[\u0000-\u001F\u007F\uFFFD\u25A1]/g, '')
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[“”„‟]/g, '"')
    .replace(/[—–−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

function nameDesignationOverlay(fullName: string, designation: string, atlas: GlyphAtlas) {
  const width = 1024;
  const height = 1024;
  const nameLayout = {
    y: 784,
    fontSize: 24,
    minFontSize: 14,
    color: '#FFFFFF',
    coverX: 318,
    coverY: 756,
    coverWidth: 388,
    coverHeight: 36,
    coverColor: '#073265'
  };
  const roleLayout = {
    y: 834,
    fontSize: 14,
    minFontSize: 11,
    color: '#24693A',
    coverX: 318,
    coverY: 816,
    coverWidth: 388,
    coverHeight: 26,
    coverColor: '#F7F9FC'
  };

  const renderable = (value: string) => {
    let out = '';
    for (const ch of posterLatinText(value)) {
      if (atlas.glyphs[ch]) out += ch;
    }
    return out;
  };
  const advance = (ch: string, fontSize: number) => {
    const glyph = atlas.glyphs[ch];
    return glyph ? (glyph.adv / atlas.size) * fontSize : 0;
  };
  const measure = (text: string, fontSize: number) => {
    let total = 0;
    for (const ch of text) total += advance(ch, fontSize);
    return total;
  };
  const fitted = (text: string, maxSize: number, minSize: number, maxWidth: number) => {
    let size = maxSize;
    while (size > minSize && measure(text, size) > maxWidth) size -= 0.5;
    return size;
  };
  const paths = (text: string, centerX: number, baselineY: number, fontSize: number, fill: string) => {
    let x = centerX - measure(text, fontSize) / 2;
    const scale = fontSize / atlas.size;
    const parts: string[] = [];
    for (const ch of text) {
      const glyph = atlas.glyphs[ch];
      if (glyph?.d) {
        parts.push(
          `<g transform="translate(${x.toFixed(2)} ${baselineY}) scale(${scale})"><path d="${glyph.d}" fill="${fill}"/></g>`
        );
      }
      x += advance(ch, fontSize);
    }
    return parts.join('\n  ');
  };

  const name = renderable(fullName);
  const role = renderable(designation);
  if (!name) {
    throw new Error('Attendee name is missing, so the poster name bar cannot be drawn.');
  }

  const nameSize = fitted(name, nameLayout.fontSize, nameLayout.minFontSize, nameLayout.coverWidth * 0.9);
  const roleSize = role
    ? fitted(role, roleLayout.fontSize, roleLayout.minFontSize, roleLayout.coverWidth * 0.9)
    : roleLayout.fontSize;
  const cx = width / 2;
  const roleRadius = Math.round(roleLayout.coverHeight / 2);

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${nameLayout.coverX}" y="${nameLayout.coverY}" width="${nameLayout.coverWidth}" height="${nameLayout.coverHeight}" fill="${nameLayout.coverColor}"/>
  ${paths(name, cx, nameLayout.y, nameSize, nameLayout.color)}
  <rect x="${roleLayout.coverX}" y="${roleLayout.coverY}" width="${roleLayout.coverWidth}" height="${roleLayout.coverHeight}" rx="${roleRadius}" ry="${roleRadius}" fill="${roleLayout.coverColor}" stroke="#D7DEE8" stroke-width="1"/>
  ${role ? paths(role, cx, roleLayout.y, roleSize, roleLayout.color) : ''}
</svg>`);
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

  const atlas = await loadGlyphAtlas();
  const text = nameDesignationOverlay(fullName, role, atlas);
  if (!text.length) {
    throw new Error('the name and designation overlay was empty.');
  }

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
