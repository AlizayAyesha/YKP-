import nodemailer from 'nodemailer';
import type { AttendeeRegistration, YkpEvent } from '../src/types';

function eventTime(event: YkpEvent) {
  if (event.time) return event.time;
  return [event.startTime, event.endTime].filter(Boolean).join(' – ');
}

function eventName(event: YkpEvent) {
  return [event.title, event.subtitle].filter(Boolean).join(' — ') || event.dates;
}

function place(event: YkpEvent) {
  return [event.venue, event.city].filter(Boolean).join(', ');
}

export async function sendRegistrationEmail(input: {
  registration: AttendeeRegistration;
  event: YkpEvent;
  posterUrl: string;
  logoUrl: string;
  siteUrl: string;
}) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return { sent: false, reason: 'Email is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.' };
  }

  const { registration, event, posterUrl, logoUrl, siteUrl } = input;
  const name = eventName(event);
  const time = eventTime(event);
  const venue = place(event);
  const from = process.env.SMTP_FROM || `Youth Ka Pakistan <${user}>`;
  const contact = event.contactPhone || '0315-8248704';

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass }
  });

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Registration Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#f3f6f3;font-family:Georgia,Times,serif;color:#0B1F14;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6f3;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #d7e0d8;">
          <tr>
            <td style="background:#05472A;padding:22px 24px;text-align:center;">
              <img src="${logoUrl}" alt="Youth Ka Pakistan" width="120" style="max-width:140px;height:auto;background:#ffffff;padding:6px;border-radius:6px;" />
              <p style="margin:14px 0 0;color:#C9A227;letter-spacing:3px;font-size:11px;font-weight:700;font-family:Arial,Helvetica,sans-serif;">REGISTRATION CONFIRMED</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;line-height:1.3;">URAAN-E-AI 2026</h1>
              <p style="margin:6px 0 0;color:#d7e8dc;font-size:13px;font-family:Arial,Helvetica,sans-serif;">Pakistan's Digital Flight</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px 8px;font-size:15px;line-height:1.7;color:#0B1F14;">
              <p style="margin:0 0 14px;">Dear ${registration.fullName},</p>
              <p style="margin:0 0 14px;">Thank you for registering for <strong>URAAN-E-AI 2026 — Pakistan's Digital Flight</strong>, the National IT &amp; Artificial Intelligence Seminar 2026.</p>
              <p style="margin:0 0 14px;">We are pleased to confirm your registration for this national gathering bringing together students, educators, technology professionals, entrepreneurs, corporate representatives and emerging innovators to explore Pakistan's AI future.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f4ec;border:1px solid #e4ddd0;">
                <tr>
                  <td style="padding:18px 20px;font-family:Arial,Helvetica,sans-serif;">
                    <p style="margin:0 0 10px;color:#05472A;font-size:12px;letter-spacing:2px;font-weight:700;">EVENT DETAILS</p>
                    <p style="margin:0 0 6px;font-size:14px;"><strong>Event:</strong> ${name}</p>
                    ${event.date || event.dates ? `<p style="margin:0 0 6px;font-size:14px;"><strong>Date:</strong> ${event.date || event.dates}</p>` : ''}
                    ${time ? `<p style="margin:0 0 6px;font-size:14px;"><strong>Time:</strong> ${time}</p>` : ''}
                    ${venue ? `<p style="margin:0 0 6px;font-size:14px;"><strong>Venue:</strong> ${venue}</p>` : ''}
                    <p style="margin:0 0 6px;font-size:14px;"><strong>Organizer:</strong> ${event.organizer || 'YKP Foundation'}</p>
                    <p style="margin:10px 0 0;font-size:14px;"><strong>Registration ID:</strong> ${registration.registrationId}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px;font-size:15px;line-height:1.7;">
              <p style="margin:0 0 16px;">We look forward to welcoming you at this important conversation about Artificial Intelligence, innovation, future skills and Pakistan's digital future.</p>
              <p style="margin:0 0 8px;">Your personalized attendee poster is available below:</p>
              <p style="margin:0 0 10px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
                <a href="${posterUrl}" style="display:inline-block;background:#C9A227;color:#0B1F14;text-decoration:none;font-weight:700;padding:12px 20px;margin:0 6px 8px;">View Your Attendee Poster</a>
                <a href="${posterUrl}" style="display:inline-block;background:#05472A;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 20px;margin:0 6px 8px;">Download Your Attendee Poster</a>
              </p>
              <p style="margin:18px 0 0;">Best regards,<br/><strong>Team Youth Ka Pakistan</strong><br/>Youth Ka Pakistan — Skills and Business Forum</p>
              <p style="margin:12px 0 0;font-size:14px;font-family:Arial,Helvetica,sans-serif;">Contact: ${contact}</p>
            </td>
          </tr>
          <tr>
            <td style="background:#032816;padding:16px 24px;text-align:center;color:#c9d7ce;font-size:12px;font-family:Arial,Helvetica,sans-serif;">
              <a href="${siteUrl}" style="color:#C9A227;text-decoration:none;">youthkapakistan.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from,
    to: registration.email,
    subject: 'Registration Confirmed — URAAN-E-AI 2026 | Pakistan\'s Digital Flight',
    html
  });

  return { sent: true };
}
