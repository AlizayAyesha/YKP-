/**
 * Appends Founder & CEO RSVPs to Google Sheets via an Apps Script web app.
 *
 * Setup:
 * 1. Create a Google Sheet with a tab named Founders.
 * 2. Row 1 headers: Timestamp, Name, Title, Organization, Email, WhatsApp, City, Event, Registration ID
 * 3. Extensions → Apps Script, paste:
 *
 *    function doPost(e) {
 *      const data = JSON.parse(e.postData.contents);
 *      const sheet = SpreadsheetApp.getActive().getSheetByName('Founders')
 *        || SpreadsheetApp.getActive().insertSheet('Founders');
 *      sheet.appendRow([
 *        data.timestamp, data.fullName, data.designation, data.organization,
 *        data.email, data.phone, data.city, data.eventName, data.registrationId
 *      ]);
 *      return ContentService.createTextOutput(JSON.stringify({ ok: true }))
 *        .setMimeType(ContentService.MimeType.JSON);
 *    }
 *
 * 4. Deploy → New deployment → Web app, access: Anyone. Paste the URL into GOOGLE_SHEETS_WEBHOOK_URL.
 */

export function isFounderOrCeo(designation: string) {
  return /\b(founder|ceo)\b/i.test(designation);
}

export async function appendFounderCeoToSheet(row: {
  fullName: string;
  designation: string;
  organization: string;
  email: string;
  phone: string;
  city: string;
  eventName: string;
  registrationId: string;
}) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!url) {
    return { sent: false, reason: 'GOOGLE_SHEETS_WEBHOOK_URL is not set.' };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      ...row
    })
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `Google Sheets webhook returned ${response.status}.`);
  }

  return { sent: true };
}
