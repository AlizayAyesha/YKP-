import { POSTER_FONT_SIZE, POSTER_GLYPHS } from './poster-glyphs';

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

function renderableText(value: string) {
  let out = '';
  for (const ch of value) {
    if (POSTER_GLYPHS[ch]) out += ch;
  }
  return out;
}

function glyphAdvance(ch: string, fontSize: number) {
  const glyph = POSTER_GLYPHS[ch];
  if (!glyph) return 0;
  return (glyph.adv / POSTER_FONT_SIZE) * fontSize;
}

function textWidth(text: string, fontSize: number) {
  let width = 0;
  for (const ch of text) width += glyphAdvance(ch, fontSize);
  return width;
}

function fittedSize(text: string, maxSize: number, minSize: number, maxWidth: number) {
  let size = maxSize;
  while (size > minSize && textWidth(text, size) > maxWidth) {
    size -= 0.5;
  }
  return size;
}

function pathForText(text: string, centerX: number, baselineY: number, fontSize: number, fill: string) {
  const width = textWidth(text, fontSize);
  let x = centerX - width / 2;
  const scale = fontSize / POSTER_FONT_SIZE;
  const parts: string[] = [];
  for (const ch of text) {
    const glyph = POSTER_GLYPHS[ch];
    if (glyph?.d) {
      parts.push(
        `<g transform="translate(${x.toFixed(2)} ${baselineY}) scale(${scale})"><path d="${glyph.d}" fill="${fill}"/></g>`
      );
    }
    x += glyphAdvance(ch, fontSize);
  }
  return parts.join('\n  ');
}

export function nameDesignationOverlay(fullName: string, designation: string, layout?: Partial<OverlayLayout>) {
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

  const name = renderableText(posterLatinText(fullName));
  const role = renderableText(posterLatinText(designation));
  if (!name) {
    throw new Error('Attendee name is missing, so the poster name bar cannot be drawn.');
  }

  const nameSize = fittedSize(name, nameLayout.fontSize, nameLayout.minFontSize, nameLayout.coverWidth * 0.9);
  const roleSize = role
    ? fittedSize(role, roleLayout.fontSize, roleLayout.minFontSize, roleLayout.coverWidth * 0.9)
    : roleLayout.fontSize;
  const cx = width / 2;
  const roleRadius = Math.round(roleLayout.coverHeight / 2);

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${nameLayout.coverX}" y="${nameLayout.coverY}" width="${nameLayout.coverWidth}" height="${nameLayout.coverHeight}" fill="${nameLayout.coverColor}"/>
  ${pathForText(name, cx, nameLayout.y, nameSize, nameLayout.color)}
  <rect x="${roleLayout.coverX}" y="${roleLayout.coverY}" width="${roleLayout.coverWidth}" height="${roleLayout.coverHeight}" rx="${roleRadius}" ry="${roleRadius}" fill="${roleLayout.coverColor}" stroke="#D7DEE8" stroke-width="1"/>
  ${role ? pathForText(role, cx, roleLayout.y, roleSize, roleLayout.color) : ''}
</svg>`);
}
