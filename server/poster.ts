import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import type { YkpEvent } from '../src/types';

/**
 * Deterministic attendee-poster compositor.
 * The official URAAN-E-AI PNG is the locked master. This module never
 * redraws logos, event title, date/time/venue, footer, or decorations.
 */

type FrameShape = 'rounded' | 'rect' | 'circle';

interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PhotoSlot extends Region {
  shape: FrameShape;
  radius?: number;
  frameInset?: number;
}

interface TextSlot {
  x: number;
  y: number;
  width: number;
  font?: string;
  fontSize: number;
  minFontSize?: number;
  alignment?: 'center' | 'left' | 'right';
  color: string;
  fontWeight: string;
  fontFamily: string;
  fontStyle?: string;
  letterSpacing?: number;
  coverX?: number;
  coverY?: number;
  coverWidth?: number;
  coverHeight?: number;
  coverColor?: string;
}

interface TemplateConfig {
  template?: string;
  image: string;
  canvas?: { width: number; height: number };
  width?: number;
  height?: number;
  photo?: PhotoSlot;
  photoFrame?: PhotoSlot;
  name: TextSlot;
  designation: TextSlot;
  preserveRegions?: Region[];
}

const POSTERS_DIR = path.join(process.cwd(), 'public', 'posters');
const TEMPLATE_PNG = path.join(POSTERS_DIR, 'ykp-attendee-template.png');
const CONFIG_PATH = path.join(POSTERS_DIR, 'template-config.json');

const SERIF_FONT_CANDIDATES = [
  path.join(process.cwd(), 'public', 'fonts', 'Tinos-Italic.ttf'),
  '/System/Library/Fonts/Supplemental/Times New Roman Italic.ttf',
  '/Library/Fonts/Times New Roman Italic.ttf',
  '/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf'
];

let cachedFontCss = '';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function canvasSize(config: TemplateConfig) {
  return {
    width: config.canvas?.width ?? config.width ?? 1024,
    height: config.canvas?.height ?? config.height ?? 1024
  };
}

function photoSlot(config: TemplateConfig): PhotoSlot {
  const slot = config.photo ?? config.photoFrame;
  if (!slot) {
    throw new Error('Poster template is missing photo coordinates.');
  }
  return slot;
}

export async function ensurePosterTemplate() {
  await fs.mkdir(POSTERS_DIR, { recursive: true });
  try {
    await fs.access(TEMPLATE_PNG);
  } catch {
    throw new Error(
      'Official attendee poster template is missing at public/posters/ykp-attendee-template.png.'
    );
  }
}

async function loadConfig(): Promise<TemplateConfig> {
  const raw = await fs.readFile(CONFIG_PATH, 'utf8');
  return JSON.parse(raw) as TemplateConfig;
}

async function serifFontCss() {
  if (cachedFontCss) return cachedFontCss;
  for (const fontPath of SERIF_FONT_CANDIDATES) {
    try {
      const buf = await fs.readFile(fontPath);
      cachedFontCss = `@font-face{font-family:'AttendeeSerif';src:url('data:font/ttf;base64,${buf.toString('base64')}') format('truetype');font-style:italic;font-weight:700;}`;
      return cachedFontCss;
    } catch {
      /* try next */
    }
  }
  cachedFontCss = '';
  return cachedFontCss;
}

function innerPhotoBox(frame: PhotoSlot) {
  const inset = frame.frameInset ?? 0;
  if (frame.shape === 'circle') {
    const size = Math.min(frame.width, frame.height) - inset * 2;
    return {
      x: Math.round(frame.x + (frame.width - size) / 2),
      y: Math.round(frame.y + (frame.height - size) / 2),
      width: size,
      height: size,
      shape: 'circle' as const
    };
  }
  return {
    x: frame.x + inset,
    y: frame.y + inset,
    width: frame.width - inset * 2,
    height: frame.height - inset * 2,
    shape: frame.shape
  };
}

async function holeMask(config: TemplateConfig, width: number, height: number) {
  const frame = photoSlot(config);
  const inset = frame.frameInset ?? 0;
  const innerW = frame.width - inset * 2;
  const innerH = frame.height - inset * 2;
  const x = frame.x + inset;
  const y = frame.y + inset;

  let punch = '';
  if (frame.shape === 'circle') {
    const size = Math.min(innerW, innerH);
    const r = size / 2;
    const cx = frame.x + frame.width / 2;
    const cy = frame.y + frame.height / 2;
    punch = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff"/>`;
  } else if (frame.shape === 'rounded') {
    const radius = Math.max(0, (frame.radius ?? 24) - inset / 2);
    punch = `<rect x="${x}" y="${y}" width="${innerW}" height="${innerH}" rx="${radius}" ry="${radius}" fill="#fff"/>`;
  } else {
    punch = `<rect x="${x}" y="${y}" width="${innerW}" height="${innerH}" fill="#fff"/>`;
  }

  const maskSvg = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${punch}</svg>`);
  const inner = innerPhotoBox(frame);
  const preserve = [
    ...(config.preserveRegions ?? []).map((region) => {
      const right = Math.min(region.x + region.width, inner.x);
      if (right <= region.x) return null;
      return { ...region, width: right - region.x };
    }).filter((region): region is Region => Boolean(region)),
    {
      x: config.name.x - 12,
      y: (config.name.coverY ?? config.name.y) - 12,
      width: config.name.width + 24,
      height: (config.name.coverHeight ?? 40) + 28
    }
  ];

  const keepSvg = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    ${preserve.map((region) => `<rect x="${region.x}" y="${region.y}" width="${region.width}" height="${region.height}" fill="#fff"/>`).join('')}
  </svg>`);

  return sharp(maskSvg)
    .resize(width, height)
    .ensureAlpha()
    .composite([{ input: keepSvg, blend: 'dest-out' }])
    .png()
    .toBuffer();
}

async function preparePortrait(photoPath: string, box: ReturnType<typeof innerPhotoBox>) {
  const meta = await sharp(photoPath, { failOn: 'none' }).rotate().metadata();
  if (!meta.width || !meta.height) {
    throw new Error('Could not read the uploaded photograph. Please upload a clearer portrait.');
  }
  if (meta.width < 300 || meta.height < 300) {
    throw new Error('Please upload a clearer portrait at least 300×300 pixels.');
  }

  const cropped = await sharp(photoPath, { failOn: 'none' })
    .rotate()
    .resize(box.width, box.height, {
      fit: 'cover',
      position: 'north'
    })
    .png()
    .toBuffer();

  if (box.shape === 'circle') {
    const mask = Buffer.from(`<svg width="${box.width}" height="${box.height}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${box.width / 2}" cy="${box.height / 2}" r="${box.width / 2}" fill="#fff"/>
    </svg>`);
    return sharp(cropped)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();
  }

  return cropped;
}

function fittedSize(slot: TextSlot, text: string) {
  const max = slot.fontSize;
  const min = slot.minFontSize ?? Math.max(11, Math.round(max * 0.55));
  if (!text) return max;
  const usable = slot.width * 0.92;
  const estimated = (ch: number) => text.length * ch * 0.62 + (slot.letterSpacing ?? 0) * Math.max(0, text.length - 1);
  let size = max;
  while (size > min && estimated(size) > usable) size -= 1;
  return size;
}

async function textOverlay(config: TemplateConfig, fullName: string, designation: string) {
  const { width, height } = canvasSize(config);
  const name = escapeXml(fullName.trim().toUpperCase());
  const role = escapeXml(designation.trim().toUpperCase());
  const nameSize = fittedSize(config.name, fullName.trim().toUpperCase());
  const roleSize = fittedSize(config.designation, designation.trim().toUpperCase());
  const fontCss = await serifFontCss();
  const nameCoverW = config.name.coverWidth ?? config.name.width;
  const nameCoverH = config.name.coverHeight ?? 34;
  const nameCoverX = config.name.coverX ?? config.name.x;
  const nameCoverY = config.name.coverY ?? config.name.y - nameCoverH + 8;
  const roleCoverX = config.designation.coverX ?? config.name.x;
  const roleCoverW = config.designation.coverWidth ?? config.name.width;
  const roleCoverY = config.designation.coverY ?? 814;
  const roleCoverH = config.designation.coverHeight ?? 26;
  const roleCoverColor = config.designation.coverColor ?? '#F7F9FC';
  const roleRadius = Math.round(roleCoverH / 2);
  const cx = width / 2;
  const letterSpacing = config.designation.letterSpacing ?? 0;

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <style>${fontCss}
    .name { font-family: ${config.name.fontFamily}; font-size: ${nameSize}px; font-weight: ${config.name.fontWeight}; font-style: ${config.name.fontStyle ?? 'italic'}; fill: ${config.name.color}; }
    .role { font-family: ${config.designation.fontFamily}; font-size: ${roleSize}px; font-weight: ${config.designation.fontWeight}; font-style: ${config.designation.fontStyle ?? 'italic'}; fill: ${config.designation.color}; letter-spacing: ${letterSpacing}px; }
  </style>
  <rect x="${nameCoverX}" y="${nameCoverY}" width="${nameCoverW}" height="${nameCoverH}" fill="${config.name.coverColor ?? '#073265'}"/>
  <text x="${cx}" y="${config.name.y}" text-anchor="middle" class="name">${name}</text>
  ${role ? `<rect x="${roleCoverX}" y="${roleCoverY}" width="${roleCoverW}" height="${roleCoverH}" rx="${roleRadius}" ry="${roleRadius}" fill="${roleCoverColor}" stroke="#D7DEE8" stroke-width="1"/>
  <text x="${cx}" y="${config.designation.y}" text-anchor="middle" class="role">${role}</text>` : ''}
</svg>`);
}

async function healDesignationBand(master: Buffer, config: TemplateConfig) {
  const { width, height } = canvasSize(config);
  const { data, info } = await sharp(master).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const y0 = 772;
  const y1 = 842;
  const srcY = 796;
  const channels = info.channels;
  const barX = config.designation.coverX ?? config.name.x;
  const barRight = barX + (config.designation.coverWidth ?? config.name.width);

  const isGlyph = (i: number) => {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum > 210 || r >= 175) return false;
    return g > 48 && g > r + 8 && g >= b - 22;
  };
  const isHotWhite = (i: number) => {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > 228 && Math.max(r, g, b) - Math.min(r, g, b) < 40;
  };

  for (let y = y0; y < Math.min(height, y1); y++) {
    for (let x = 40; x < 984; x++) {
      const dest = (y * width + x) * channels;
      const insideBar = x >= barX && x < barRight;
      let paint = !insideBar && (isGlyph(dest) || isHotWhite(dest));
      if (!paint && !insideBar) {
        outer: for (let dy = -2; dy <= 2 && !paint; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
            if (isGlyph((ny * width + nx) * channels)) {
              paint = true;
              break outer;
            }
          }
        }
      }
      if (insideBar) {
        paint = isGlyph(dest);
      }
      if (!paint) continue;
      const src = (srcY * width + x) * channels;
      data[dest] = data[src];
      data[dest + 1] = data[src + 1];
      data[dest + 2] = data[src + 2];
      if (channels === 4) data[dest + 3] = 255;
    }
  }
  return sharp(data, { raw: { width, height, channels } }).png().toBuffer();
}

async function badgeSticker(master: Buffer, width: number, height: number) {
  const { data, info } = await sharp(master).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const channels = info.channels;
  const out = Buffer.alloc(width * height * 4, 0);
  const x0 = 132;
  const x1 = 368;
  const y0 = 592;
  const y1 = 686;

  const isPosterBg = (r: number, g: number, b: number) => {
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > 232 && Math.max(r, g, b) - Math.min(r, g, b) < 28;
  };

  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (isPosterBg(r, g, b)) continue;
      const o = (y * width + x) * 4;
      out[o] = r;
      out[o + 1] = g;
      out[o + 2] = b;
      out[o + 3] = 255;
    }
  }

  return sharp(out, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

export async function composeAttendeePoster(input: {
  photoPath: string;
  fullName: string;
  designation: string;
  event?: YkpEvent;
  outputPath: string;
}) {
  await ensurePosterTemplate();
  const config = await loadConfig();
  const { width, height } = canvasSize(config);
  const templatePath = path.join(POSTERS_DIR, config.image);
  const box = innerPhotoBox(photoSlot(config));
  const portrait = await preparePortrait(input.photoPath, box);
  const mask = await holeMask(config, width, height);

  const master = await sharp(templatePath)
    .ensureAlpha()
    .png()
    .toBuffer();

  const masterMeta = await sharp(master).metadata();
  if (masterMeta.width !== width || masterMeta.height !== height) {
    throw new Error(
      `Master template is ${masterMeta.width}×${masterMeta.height}, but config expects ${width}×${height}. Do not stretch the official artwork.`
    );
  }

  const healedMaster = await healDesignationBand(master, config);

  const templateWithHole = await sharp(healedMaster)
    .composite([{ input: mask, blend: 'dest-out' }])
    .png()
    .toBuffer();

  const nameOverlay = await textOverlay(config, input.fullName, input.designation);
  const badge = await badgeSticker(healedMaster, width, height);

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 247, g: 249, b: 252, alpha: 1 }
    }
  })
    .composite([
      { input: portrait, left: box.x, top: box.y },
      { input: templateWithHole, left: 0, top: 0 },
      { input: badge, left: 0, top: 0 },
      { input: nameOverlay, left: 0, top: 0 }
    ])
    .png()
    .toFile(input.outputPath);

  return input.outputPath;
}
