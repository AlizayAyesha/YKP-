import { sendMail } from './email';
import { appendFormToSheet } from './sheets';

export type FormKind = 'rsvp' | 'student' | 'inquiry' | 'contact' | 'enroll' | 'profile';

export function teamInbox() {
  return (
    process.env.CONTACT_INBOX?.trim() ||
    process.env.FORMSUBMIT_EMAIL?.trim() ||
    'info@youthkapakistan.com'
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fieldsToHtml(subject: string, fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .filter(([, value]) => String(value || '').trim())
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 10px;border-bottom:1px solid #e4ddd0;font-weight:700;vertical-align:top;white-space:nowrap;">${escapeHtml(key)}</td><td style="padding:8px 10px;border-bottom:1px solid #e4ddd0;">${escapeHtml(String(value))}</td></tr>`
    )
    .join('');
  return `<!DOCTYPE html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#0B1F14;background:#f3f6f3;padding:24px;">
  <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #d7e0d8;">
    <tr><td style="background:#05472A;color:#fff;padding:18px 20px;"><p style="margin:0;color:#C9A227;letter-spacing:2px;font-size:11px;font-weight:700;">YOUTH KA PAKISTAN</p><h1 style="margin:6px 0 0;font-size:20px;">${escapeHtml(subject)}</h1></td></tr>
    <tr><td style="padding:8px 10px;"><table width="100%" cellspacing="0">${rows}</table></td></tr>
  </table>
</body></html>`;
}

function fieldsToText(fields: Record<string, string>) {
  return Object.entries(fields)
    .filter(([, value]) => String(value || '').trim())
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
}

async function sendViaFormSubmit(input: {
  subject: string;
  fields: Record<string, string>;
  replyTo?: string;
}) {
  const inbox = teamInbox();
  const origin = process.env.APP_URL?.replace(/\/+$/, '') || 'https://youthkapakistan.com';
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: origin,
      Referer: `${origin}/`
    },
    body: JSON.stringify({
      _subject: input.subject,
      _template: 'table',
      _captcha: 'false',
      email: input.replyTo || inbox,
      ...input.fields
    })
  });
  const data = (await response.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
  const ok = data.success === true || data.success === 'true';
  if (ok) return { sent: true as const, channel: 'formsubmit' };
  if (/activat|confirm/i.test(String(data.message || ''))) {
    return { sent: true as const, channel: 'formsubmit-activation' };
  }
  return {
    sent: false as const,
    reason: data.message || `FormSubmit returned ${response.status}.`
  };
}

export async function deliverSubmission(input: {
  kind: FormKind;
  subject: string;
  fields: Record<string, string>;
  replyTo?: string;
}) {
  const html = fieldsToHtml(input.subject, input.fields);
  const text = fieldsToText(input.fields);

  const mail = await sendMail({
    to: teamInbox(),
    subject: input.subject,
    html,
    text,
    replyTo: input.replyTo
  });

  let fallback = mail;
  if (!mail.sent) {
    try {
      fallback = await sendViaFormSubmit(input);
    } catch (error) {
      fallback = {
        sent: false,
        reason: error instanceof Error ? error.message : mail.reason
      };
    }
  }

  try {
    await appendFormToSheet({
      kind: input.kind,
      subject: input.subject,
      fields: input.fields
    });
  } catch (error) {
    console.error('Google Sheets append failed:', error);
  }

  if (!fallback.sent) {
    console.error('Form delivery failed:', fallback.reason);
  }

  return fallback;
}
