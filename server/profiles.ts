import fs from 'node:fs/promises';
import path from 'node:path';
import type { EventProfile, PublicEventProfile } from '../src/types';
import { dataDir } from './paths';

const DATA_DIR = dataDir();
const STORE_PATH = path.join(DATA_DIR, 'profiles.json');

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

export async function listProfiles(): Promise<EventProfile[]> {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, 'utf8');
  return JSON.parse(raw) as EventProfile[];
}

export async function saveProfiles(rows: EventProfile[]) {
  await ensureStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(rows, null, 2), 'utf8');
}

export async function addProfile(row: EventProfile) {
  return withLock(async () => {
    const rows = await listProfiles();
    rows.push(row);
    await saveProfiles(rows);
    return row;
  });
}

export async function updateProfile(id: string, patch: Partial<EventProfile>) {
  return withLock(async () => {
    const rows = await listProfiles();
    const idx = rows.findIndex((row) => row.id === id);
    if (idx < 0) return null;
    rows[idx] = { ...rows[idx], ...patch, id: rows[idx].id, eventId: rows[idx].eventId };
    await saveProfiles(rows);
    return rows[idx];
  });
}

export function toPublicProfile(row: EventProfile): PublicEventProfile {
  return {
    id: row.id,
    fullName: row.fullName,
    designation: row.designation,
    organization: row.organization,
    role: row.role,
    bio: row.bio,
    photoUrl: row.photoUrl,
    linkedinUrl: row.linkedinUrl,
    featuredSpeaker: row.featuredSpeaker,
    featuredPanelist: row.featuredPanelist
  };
}

export async function listApprovedPublicProfiles(eventId: string) {
  const rows = await listProfiles();
  return rows
    .filter((row) => row.eventId === eventId && row.status === 'approved')
    .map(toPublicProfile);
}

export async function nextProfileId() {
  const rows = await listProfiles();
  let max = 0;
  for (const row of rows) {
    const n = Number(String(row.id).replace(/\D/g, '').slice(-4));
    if (Number.isFinite(n) && n > max) max = n;
  }
  return `YKP-PROFILE-${String(max + 1).padStart(4, '0')}`;
}
