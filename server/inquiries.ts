import fs from 'node:fs/promises';
import path from 'node:path';
import type { ContactMessage, PartnerInquiry, StudentInterest } from '../src/types';
import { dataDir } from './paths';

const DATA_DIR = dataDir();
const STUDENTS_PATH = path.join(DATA_DIR, 'students.json');
const INQUIRIES_PATH = path.join(DATA_DIR, 'inquiries.json');
const CONTACTS_PATH = path.join(DATA_DIR, 'contacts.json');

let writeQueue: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>) {
  const run = writeQueue.then(fn, fn);
  writeQueue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

async function readList<T>(filePath: string): Promise<T[]> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T[];
  } catch {
    await fs.writeFile(filePath, '[]', 'utf8');
    return [];
  }
}

async function writeList<T>(filePath: string, rows: T[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(rows, null, 2), 'utf8');
}

function nextId(prefix: string, existing: string[]) {
  let max = 0;
  for (const id of existing) {
    if (!id.startsWith(prefix)) continue;
    const n = Number(id.slice(prefix.length));
    if (Number.isFinite(n) && n > max) max = n;
  }
  return `${prefix}${String(max + 1).padStart(4, '0')}`;
}

export async function listStudents() {
  return readList<StudentInterest>(STUDENTS_PATH);
}

export async function addStudent(input: Omit<StudentInterest, 'id' | 'createdAt'>) {
  return withLock(async () => {
    const rows = await listStudents();
    const row: StudentInterest = {
      ...input,
      id: nextId('YKP-STUDENT-', rows.map((item) => item.id)),
      createdAt: new Date().toISOString()
    };
    rows.push(row);
    await writeList(STUDENTS_PATH, rows);
    return row;
  });
}

export async function listInquiries() {
  return readList<PartnerInquiry>(INQUIRIES_PATH);
}

export async function addInquiry(input: Omit<PartnerInquiry, 'id' | 'createdAt'>) {
  return withLock(async () => {
    const rows = await listInquiries();
    const row: PartnerInquiry = {
      ...input,
      id: nextId('YKP-INQUIRY-', rows.map((item) => item.id)),
      createdAt: new Date().toISOString()
    };
    rows.push(row);
    await writeList(INQUIRIES_PATH, rows);
    return row;
  });
}

export async function listContacts() {
  return readList<ContactMessage>(CONTACTS_PATH);
}

export async function addContact(input: Omit<ContactMessage, 'id' | 'createdAt'>) {
  return withLock(async () => {
    const rows = await listContacts();
    const prefix = input.kind === 'enroll' ? 'YKP-ENROLL-' : 'YKP-CONTACT-';
    const row: ContactMessage = {
      ...input,
      id: nextId(prefix, rows.map((item) => item.id)),
      createdAt: new Date().toISOString()
    };
    rows.push(row);
    await writeList(CONTACTS_PATH, rows);
    return row;
  });
}
