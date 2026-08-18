import type { IncomingMessage, ServerResponse } from 'node:http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'POST required to register.' }));
      return;
    }
    const { handleRegistration } = await import('../server/register');
    await handleRegistration(req, res);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : 'Registration failed.'
        })
      );
    }
  }
}
