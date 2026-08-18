import fs from 'node:fs/promises';
import path from 'node:path';
import type { AttendeeRegistration } from '../src/types';
import { dataDir, isServerless } from './paths';

const DATA_DIR = dataDir();
const STORE_PATH = path.join(DATA_DIR, 'registrations.json');

let writeQueue: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>) {
  const run = writeQueue.then(fn, fn);
  writeQueue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, '[]', 'utf8');
  }
}

export async function listRegistrations(): Promise<AttendeeRegistration[]> {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, 'utf8');
  return JSON.parse(raw) as AttendeeRegistration[];
}

export async function saveRegistrations(rows: AttendeeRegistration[]) {
  await ensureStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(rows, null, 2), 'utf8');
}

export async function addRegistration(row: AttendeeRegistration) {
  return withLock(async () => {
    const rows = await listRegistrations();
    rows.push(row);
    await saveRegistrations(rows);
    return row;
  });
}

export async function createRegistration(
  prefix: string,
  build: (registrationId: string) => AttendeeRegistration
) {
  return withLock(async () => {
    const rows = await listRegistrations();
    let max = 0;
    for (const row of rows) {
      if (!row.registrationId.startsWith(prefix)) continue;
      const n = Number(row.registrationId.slice(prefix.length));
      if (Number.isFinite(n) && n > max) max = n;
    }
    const registrationId = isServerless
      ? `${prefix}${Date.now().toString(36).toUpperCase()}`
      : `${prefix}${String(max + 1).padStart(4, '0')}`;
    if (rows.some((row) => row.registrationId === registrationId)) {
      throw new Error('Could not allocate a unique registration ID. Please try again.');
    }
    const row = build(registrationId);
    rows.push(row);
    await saveRegistrations(rows);
    return row;
  });
}

export async function nextRegistrationId(prefix = `YKP-${new Date().getFullYear()}-`) {
  return withLock(async () => {
    const rows = await listRegistrations();
    let max = 0;
    for (const row of rows) {
      if (!row.registrationId.startsWith(prefix)) continue;
      const n = Number(row.registrationId.slice(prefix.length));
      if (Number.isFinite(n) && n > max) max = n;
    }
    return `${prefix}${String(max + 1).padStart(4, '0')}`;
  });
}
