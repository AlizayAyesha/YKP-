/**
 * One Google Sheet for every website form.
 *
 * Tabs (created automatically on first write):
 *   All Submissions  — every form, one row
 *   RSVPs            — event registrations
 *   Students         — student waitlist
 *   Inquiries        — mentor / educator / partner
 *   Contact          — contact form
 *   Enrollments      — program enroll
 *   Profiles         — invitation profiles
 *   Founders         — RSVPs where title includes Founder or CEO
 *
 * Setup:
 * 1. Create a blank Google Sheet (any name).
 * 2. Extensions → Apps Script, replace Code.gs with the script below.
 * 3. Deploy → New deployment → Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Paste the web app URL into GOOGLE_SHEETS_WEBHOOK_URL.
 *
 *    function doPost(e) {
 *      const data = JSON.parse(e.postData.contents);
 *      const ss = SpreadsheetApp.getActive();
 *      const TABS = {
 *        rsvp: 'RSVPs', student: 'Students', inquiry: 'Inquiries',
 *        contact: 'Contact', enroll: 'Enrollments', profile: 'Profiles',
 *        founder: 'Founders'
 *      };
 *      const HEADERS = {
 *        'All Submissions': ['Timestamp', 'Form', 'Name', 'Email', 'WhatsApp', 'City', 'Organization', 'Subject', 'Details', 'ID'],
 *        'RSVPs': ['Timestamp', 'Name', 'Title', 'Organization', 'Email', 'WhatsApp', 'City', 'Event', 'Registration ID'],
 *        'Students': ['Timestamp', 'Name', 'Email', 'WhatsApp', 'City', 'Age', 'School', 'Education level', 'Interests', 'Motivation', 'ID'],
 *        'Inquiries': ['Timestamp', 'Name', 'Email', 'WhatsApp', 'City', 'Organization', 'Role', 'Support types', 'Expertise', 'Details', 'Availability', 'Website', 'ID'],
 *        'Contact': ['Timestamp', 'Name', 'Email', 'WhatsApp', 'City', 'Message', 'ID'],
 *        'Enrollments': ['Timestamp', 'Name', 'Email', 'WhatsApp', 'City', 'Program', 'Message', 'ID'],
 *        'Profiles': ['Timestamp', 'Name', 'Designation', 'Organization', 'Role', 'Email', 'WhatsApp', 'Event', 'Biography'],
 *        'Founders': ['Timestamp', 'Name', 'Title', 'Organization', 'Email', 'WhatsApp', 'City', 'Event', 'Registration ID']
 *      };
 *
 *      function write(name, values) {
 *        if (!name || !values || !values.length) return;
 *        let sheet = ss.getSheetByName(name);
 *        if (!sheet) sheet = ss.insertSheet(name);
 *        const headers = HEADERS[name];
 *        if (headers && sheet.getLastRow() === 0) {
 *          sheet.appendRow(headers);
 *          sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
 *          sheet.setFrozenRows(1);
 *        }
 *        sheet.appendRow(values);
 *      }
 *
 *      if (!data.skipAll) {
 *        write('All Submissions', data.allValues);
 *      }
 *      const tab = data.tab || TABS[data.kind] || 'Other';
 *      write(tab, data.values);
 *      return ContentService.createTextOutput(JSON.stringify({ ok: true }))
 *        .setMimeType(ContentService.MimeType.JSON);
 *    }
 */

export type FormSheetKind = 'rsvp' | 'student' | 'inquiry' | 'contact' | 'enroll' | 'profile' | 'founder';

const TAB_BY_KIND: Record<FormSheetKind, string> = {
  rsvp: 'RSVPs',
  student: 'Students',
  inquiry: 'Inquiries',
  contact: 'Contact',
  enroll: 'Enrollments',
  profile: 'Profiles',
  founder: 'Founders'
};

const KIND_LABEL: Record<FormSheetKind, string> = {
  rsvp: 'RSVP',
  student: 'Student',
  inquiry: 'Inquiry',
  contact: 'Contact',
  enroll: 'Enrollment',
  profile: 'Profile',
  founder: 'Founder / CEO'
};

const COLUMNS_BY_KIND: Record<FormSheetKind, string[]> = {
  rsvp: ['Name', 'Title', 'Organization', 'Email', 'WhatsApp', 'City', 'Event', 'Registration ID'],
  student: ['Name', 'Email', 'WhatsApp', 'City', 'Age', 'School', 'Education level', 'Interests', 'Motivation', 'ID'],
  inquiry: [
    'Name',
    'Email',
    'WhatsApp',
    'City',
    'Organization',
    'Role',
    'Support types',
    'Expertise',
    'Details',
    'Availability',
    'Website',
    'ID'
  ],
  contact: ['Name', 'Email', 'WhatsApp', 'City', 'Message', 'ID'],
  enroll: ['Name', 'Email', 'WhatsApp', 'City', 'Program', 'Message', 'ID'],
  profile: ['Name', 'Designation', 'Organization', 'Role', 'Email', 'WhatsApp', 'Event', 'Biography'],
  founder: ['Name', 'Title', 'Organization', 'Email', 'WhatsApp', 'City', 'Event', 'Registration ID']
};

export function isFounderOrCeo(designation: string) {
  return /\b(founder|ceo)\b/i.test(designation);
}

function field(fields: Record<string, string>, key: string) {
  return String(fields[key] ?? '').trim();
}

function rowForKind(kind: FormSheetKind, timestamp: string, fields: Record<string, string>) {
  return [timestamp, ...COLUMNS_BY_KIND[kind].map((key) => field(fields, key))];
}

function allSubmissionsRow(kind: FormSheetKind, timestamp: string, subject: string, fields: Record<string, string>) {
  const details =
    field(fields, 'Details') ||
    field(fields, 'Message') ||
    field(fields, 'Motivation') ||
    field(fields, 'Biography') ||
    field(fields, 'Event') ||
    field(fields, 'Program');
  return [
    timestamp,
    KIND_LABEL[kind],
    field(fields, 'Name'),
    field(fields, 'Email'),
    field(fields, 'WhatsApp'),
    field(fields, 'City'),
    field(fields, 'Organization') || field(fields, 'School'),
    subject,
    details,
    field(fields, 'ID') || field(fields, 'Registration ID')
  ];
}

async function postToSheet(payload: Record<string, unknown>) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!url) {
    return { sent: false, reason: 'GOOGLE_SHEETS_WEBHOOK_URL is not set.' };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `Google Sheets webhook returned ${response.status}.`);
  }

  return { sent: true };
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
  const timestamp = new Date().toISOString();
  const fields = {
    Name: row.fullName,
    Title: row.designation,
    Organization: row.organization,
    Email: row.email,
    WhatsApp: row.phone,
    City: row.city,
    Event: row.eventName,
    'Registration ID': row.registrationId
  };
  return postToSheet({
    timestamp,
    kind: 'founder',
    tab: TAB_BY_KIND.founder,
    skipAll: true,
    values: rowForKind('founder', timestamp, fields),
    ...fields
  });
}

export async function appendFormToSheet(input: {
  kind: string;
  subject: string;
  fields: Record<string, string>;
}) {
  const kind = (input.kind in TAB_BY_KIND ? input.kind : 'contact') as FormSheetKind;
  const timestamp = new Date().toISOString();
  return postToSheet({
    timestamp,
    kind,
    tab: TAB_BY_KIND[kind],
    subject: input.subject,
    fields: input.fields,
    values: rowForKind(kind, timestamp, input.fields),
    allValues: allSubmissionsRow(kind, timestamp, input.subject, input.fields),
    ...input.fields
  });
}
