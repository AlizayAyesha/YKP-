import type { IncomingMessage, ServerResponse } from 'node:http';

const INDEXNOW_KEY = '7c4e9b2a1f8d46c0a3e5b9172d6f80c1';
const URLS = [
  'https://youthkapakistan.com/',
  'https://youthkapakistan.com/events',
  'https://youthkapakistan.com/gallery',
  'https://youthkapakistan.com/blog',
  'https://youthkapakistan.com/blog/skills-that-open-doors',
  'https://youthkapakistan.com/blog/mentorship-for-pakistani-youth',
  'https://youthkapakistan.com/blog/uraan-e-ai-2026-digital-flight',
  'https://youthkapakistan.com/contact'
];

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  const payload = {
    host: 'youthkapakistan.com',
    key: INDEXNOW_KEY,
    keyLocation: `https://youthkapakistan.com/${INDEXNOW_KEY}.txt`,
    urlList: URLS
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true, status: response.status, submitted: URLS.length }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : 'IndexNow failed' }));
  }
}
