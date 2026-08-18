export interface RegistrationSuccess {
  registrationId: string;
  eventName: string;
  posterUrl: string;
  emailSent: boolean;
  emailNote?: string;
}

export async function registerAttendee(input: {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  designation: string;
  organization: string;
  notes: string;
  publicConsent: boolean;
  photo: File;
}): Promise<RegistrationSuccess> {
  const body = new FormData();
  body.append('eventId', input.eventId);
  body.append('fullName', input.fullName);
  body.append('email', input.email);
  body.append('phone', input.phone);
  body.append('city', input.city);
  body.append('designation', input.designation);
  body.append('organization', input.organization);
  body.append('notes', input.notes);
  body.append('publicConsent', String(input.publicConsent));
  body.append('photo', input.photo);

  let response: Response;
  try {
    response = await fetch('/api/registrations', {
      method: 'POST',
      body
    });
  } catch {
    throw new Error('Could not reach the registration server. Make sure the YKP site is open at localhost:3000 with the API running.');
  }

  const text = await response.text();
  let data: { error?: string } = {};
  try {
    data = text ? (JSON.parse(text) as { error?: string }) : {};
  } catch {
    const plain = text.replace(/\s+/g, ' ').trim().slice(0, 180);
    if (response.status === 404 || response.status === 502) {
      throw new Error('The registration API is not running. Start it with npm run dev, then try again.');
    }
    if (plain) {
      throw new Error(`Registration failed (${response.status}): ${plain}`);
    }
    throw new Error('Registration failed. Please try again.');
  }

  if (!response.ok) {
    throw new Error(data.error || 'Registration failed. Please try again.');
  }

  return data as RegistrationSuccess;
}
