import type { IncomingMessage, ServerResponse } from 'node:http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const { default: app } = await import('../server/index');
  return app(req, res);
}
