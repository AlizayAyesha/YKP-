import { readFileSync } from 'node:fs';
import path from 'node:path';

type GlyphAtlas = {
  size: number;
  glyphs: Record<string, { adv: number; d: string }>;
};

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

function loadGlyphAtlas(): GlyphAtlas {
  const atlasPath = path.join(process.cwd(), 'src', 'data', 'poster-glyphs.json');
  const parsed = JSON.parse(readFileSync(atlasPath, 'utf8')) as GlyphAtlas;
  if (!parsed?.size || !parsed.glyphs) {
    throw new Error('Poster glyph atlas is missing or unreadable.');
  }
  return parsed;
}

export function posterLatinText(value: string) {
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

export function nameDesignationOverlay(fullName: string, designation: string, layout?: Partial<OverlayLayout>) {
  const atlas = loadGlyphAtlas();
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
