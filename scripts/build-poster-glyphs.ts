import { readFileSync, writeFileSync } from 'node:fs';
import opentype from 'opentype.js';

const buf = readFileSync('public/fonts/Inter-Bold.ttf');
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 &'.,-/:+()[]#@!?;\"*_=";
const glyphs: Record<string, { adv: number; d: string }> = {};

for (const ch of chars) {
  const glyph = font.charToGlyph(ch);
  if (!glyph || glyph.index === 0) continue;
  const drawn = glyph.getPath(0, 0, 1000);
  glyphs[ch] = {
    adv: Math.round(((glyph.advanceWidth || 0) / font.unitsPerEm) * 1000),
    d: drawn.toPathData(2)
  };
}

const space = font.charToGlyph(' ');
glyphs[' '] = {
  adv: Math.round(((space.advanceWidth || font.unitsPerEm / 4) / font.unitsPerEm) * 1000),
  d: ''
};

writeFileSync('src/data/poster-glyphs.json', JSON.stringify({ size: 1000, glyphs }));
console.log('glyphs', Object.keys(glyphs).length);
