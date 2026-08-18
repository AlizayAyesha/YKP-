import type { IncomingMessage, ServerResponse } from 'node:http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const { default: app } = await import('../server/index');
    return app(req, res);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : 'API failed to start.'
        })
      );
    }
  }
}
