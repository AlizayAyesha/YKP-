import sharp from 'sharp';

function isNavy(r: number, g: number, b: number) {
  return r < 40 && g < 75 && b > 60 && b < 140;
}

function isWhiteBar(r: number, g: number, b: number) {
  return r > 230 && g > 235 && b > 235 && Math.abs(r - g) < 12 && Math.abs(g - b) < 12;
}

const { data, info } = await sharp('uploads/posters/YKP-URAAN-2026-0002.png').raw().toBuffer({ resolveWithObject: true });
const { width, channels } = info;

let navy = { minX: width, maxX: 0, minY: 9999, maxY: 0 };
for (let y = 748; y <= 802; y++) {
  for (let x = 200; x < 824; x++) {
    const i = (y * width + x) * channels;
    if (isNavy(data[i], data[i + 1], data[i + 2])) {
      navy.minX = Math.min(navy.minX, x);
      navy.maxX = Math.max(navy.maxX, x);
      navy.minY = Math.min(navy.minY, y);
      navy.maxY = Math.max(navy.maxY, y);
    }
  }
}

let white = { minX: width, maxX: 0, minY: 9999, maxY: 0, count: 0 };
for (let y = 814; y <= 842; y++) {
  for (let x = 80; x < 944; x++) {
    const i = (y * width + x) * channels;
    if (isWhiteBar(data[i], data[i + 1], data[i + 2])) {
      white.count++;
      white.minX = Math.min(white.minX, x);
      white.maxX = Math.max(white.maxX, x);
      white.minY = Math.min(white.minY, y);
      white.maxY = Math.max(white.maxY, y);
    }
  }
}

console.log({
  navy,
  navyW: navy.maxX - navy.minX,
  white,
  whiteW: white.maxX - white.minX
});
