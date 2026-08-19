import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentypePkg from 'opentype.js';
import type { Font } from 'opentype.js';

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

type OpenTypeLib = { parse: (input: ArrayBuffer) => Font };

function opentypeLib(): OpenTypeLib {
  const pkg = opentypePkg as unknown as OpenTypeLib & { default?: OpenTypeLib };
  const lib = pkg.parse ? pkg : pkg.default;
  if (!lib?.parse) {
    throw new Error('opentype.js failed to load in the registration function.');
  }
  return lib;
}

function fontCandidates() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const names = ['Inter-Bold.ttf', 'Inter-SemiBold.ttf', 'Tinos-Italic.ttf'];
  const roots = [
    path.join(process.cwd(), 'public', 'fonts'),
    path.join(process.cwd(), 'fonts'),
    path.join(here, '..', 'public', 'fonts'),
    path.join(here, 'public', 'fonts'),
    path.join(here, '..', '..', 'public', 'fonts')
  ];
  return roots.flatMap((root) => names.map((name) => path.join(root, name)));
}

let cachedFont: Font | null = null;

function loadPosterFont() {
  if (cachedFont) return cachedFont;
  const parse = opentypeLib().parse;
  const tried: string[] = [];
  for (const fontPath of fontCandidates()) {
    tried.push(fontPath);
    if (!existsSync(fontPath)) continue;
    const buf = readFileSync(fontPath);
    cachedFont = parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
    if (cachedFont) return cachedFont;
  }
  throw new Error(`Poster font missing. Looked in: ${tried.slice(0, 6).join(' | ')}`);
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
