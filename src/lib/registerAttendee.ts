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

  const response = await fetch('/api/registrations', {
    method: 'POST',
    body
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Registration failed. Please try again.');
  }

  return data as RegistrationSuccess;
}
