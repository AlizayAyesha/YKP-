import type { IncomingMessage, ServerResponse } from 'node:http';

export async function handleRegistration(req: IncomingMessage, res: ServerResponse) {
  const { handleRegistration: run } = await import('./register-impl');
  return run(req, res);
}
