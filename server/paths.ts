import os from 'node:os';
import path from 'node:path';

export const isServerless = Boolean(process.env.VERCEL);

export function writableRoot() {
  return isServerless ? path.join(os.tmpdir(), 'ykp') : process.cwd();
}

export function dataDir() {
  return path.join(writableRoot(), 'data');
}

export function uploadsDir() {
  return path.join(writableRoot(), 'uploads');
}
