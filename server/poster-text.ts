import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { Font } from 'opentype.js';

const require = createRequire(import.meta.url);
const opentype = require('opentype.js') as typeof import('opentype.js');

interface OverlayLayout {
  width: number;
  height: number;
  name: {
    y: number;
    fontSize: number;
    minFontSize: number;
    color: string;
    coverX: number;
    coverY: number;
    coverWidth: number;
    coverHeight: number;
    coverColor: string;
  };
  designation: {
    y: number;
    fontSize: number;
    minFontSize: number;
    color: string;
    coverX: number;
    coverY: number;
    coverWidth: number;
    coverHeight: number;
    coverColor: string;
  };
}

const FONT_CANDIDATES = [
  path.join(process.cwd(), 'public', 'fonts', 'Inter-Bold.ttf'),
  path.join(process.cwd(), 'public', 'fonts', 'Inter-SemiBold.ttf'),
  path.join(process.cwd(), 'public', 'fonts', 'Tinos-Italic.ttf')
];

let cachedFont: Font | null = null;

function loadPosterFont() {
  if (cachedFont) return cachedFont;
  for (const fontPath of FONT_CANDIDATES) {
    try {
      const buf = readFileSync(fontPath);
      cachedFont = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
      if (cachedFont) return cachedFont;
    } catch {
      /* try next */
    }
  }
  throw new Error('Poster Latin font is missing from public/fonts.');
}

export function posterLatinText(value: string) {
  return value
    .normalize('NFC')
    .replace(/[\u0000-\u001F\u007F\uFFFD\u25A1]/g, '')
    .replace(/[—–−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

function glyphAdvance(font: Font, ch: string, fontSize: number) {
  const glyph = font.charToGlyph(ch);
  if (!glyph || glyph.index === 0) return 0;
  return ((glyph.advanceWidth || 0) / font.unitsPerEm) * fontSize;
}

function textWidth(font: Font, text: string, fontSize: number) {
  let width = 0;
  for (const ch of text) width += glyphAdvance(font, ch, fontSize);
  return width;
}

function fittedSize(font: Font, text: string, maxSize: number, minSize: number, maxWidth: number) {
  let size = maxSize;
  while (size > minSize && textWidth(font, text, size) > maxWidth) {
    size -= 0.5;
  }
  return size;
}

function pathForText(
  font: Font,
  text: string,
  centerX: number,
  baselineY: number,
  fontSize: number,
  fill: string
) {
  const width = textWidth(font, text, fontSize);
  let x = centerX - width / 2;
  const parts: string[] = [];
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    if (glyph && glyph.index !== 0) {
      parts.push(glyph.getPath(x, baselineY, fontSize).toPathData(2));
    }
    x += glyphAdvance(font, ch, fontSize);
  }
  if (!parts.length) return '';
  return `<path d="${parts.join(' ')}" fill="${fill}"/>`;
}

export function nameDesignationOverlay(fullName: string, designation: string, layout?: Partial<OverlayLayout>) {
  const font = loadPosterFont();
  const width = layout?.width ?? 1024;
  const height = layout?.height ?? 1024;
  const nameLayout = {
    y: 784,
    fontSize: 24,
    minFontSize: 14,
    color: '#FFFFFF',
    coverX: 318,
    coverY: 756,
    coverWidth: 388,
    coverHeight: 36,
    coverColor: '#073265',
    ...layout?.name
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
    coverColor: '#F7F9FC',
    ...layout?.designation
  };

  const name = posterLatinText(fullName);
  const role = posterLatinText(designation);
  if (!name) {
    throw new Error('Attendee name is missing, so the poster name bar cannot be drawn.');
  }

  const nameSize = fittedSize(font, name, nameLayout.fontSize, nameLayout.minFontSize, nameLayout.coverWidth * 0.9);
  const roleSize = role
    ? fittedSize(font, role, roleLayout.fontSize, roleLayout.minFontSize, roleLayout.coverWidth * 0.9)
    : roleLayout.fontSize;
  const cx = width / 2;
  const roleRadius = Math.round(roleLayout.coverHeight / 2);

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${nameLayout.coverX}" y="${nameLayout.coverY}" width="${nameLayout.coverWidth}" height="${nameLayout.coverHeight}" fill="${nameLayout.coverColor}"/>
  ${pathForText(font, name, cx, nameLayout.y, nameSize, nameLayout.color)}
  <rect x="${roleLayout.coverX}" y="${roleLayout.coverY}" width="${roleLayout.coverWidth}" height="${roleLayout.coverHeight}" rx="${roleRadius}" ry="${roleRadius}" fill="${roleLayout.coverColor}" stroke="#D7DEE8" stroke-width="1"/>
  ${role ? pathForText(font, role, cx, roleLayout.y, roleSize, roleLayout.color) : ''}
</svg>`);
}
