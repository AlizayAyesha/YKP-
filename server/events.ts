import fs from 'node:fs/promises';
import path from 'node:path';
import type { YkpEvent } from '../src/types';

const EVENTS_PATH = path.join(process.cwd(), 'src', 'data', 'events.json');

export async function loadEvents(): Promise<YkpEvent[]> {
  const raw = await fs.readFile(EVENTS_PATH, 'utf8');
  return JSON.parse(raw) as YkpEvent[];
}

export async function getEventById(id: string): Promise<YkpEvent | undefined> {
  const events = await loadEvents();
  return events.find((event) => event.id === id);
}

export async function saveEvents(events: YkpEvent[]) {
  await fs.writeFile(EVENTS_PATH, JSON.stringify(events, null, 2), 'utf8');
}

export async function updateEvent(id: string, patch: Partial<YkpEvent>) {
  const events = await loadEvents();
  const idx = events.findIndex((event) => event.id === id);
  if (idx < 0) return null;
  events[idx] = { ...events[idx], ...patch, id: events[idx].id };
  await saveEvents(events);
  return events[idx];
}
