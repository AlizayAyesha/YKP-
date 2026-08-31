async function postJson<T>(url: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  } catch {
    throw new Error('Could not reach the server. Please try again in a moment.');
  }

  const data = (await response.json().catch(() => ({}))) as { error?: string } & T;
  if (!response.ok) {
    throw new Error(data.error || 'Could not submit the form. Please try again.');
  }
  return data;
}

export async function submitStudentInterest(input: {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  age: string;
  school: string;
  educationLevel: string;
  interests: string[];
  motivation: string;
}) {
  return postJson<{ ok: true; id: string }>('/api/students', input);
}

export async function submitPartnerInquiry(input: {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  organization: string;
  role: string;
  otherRole: string;
  supportTypes: string[];
  expertise: string;
  supportDetails: string;
  availability: string;
  website: string;
}) {
  return postJson<{ ok: true; id: string }>('/api/inquiries', input);
}

export async function submitContactMessage(input: {
  kind?: 'contact' | 'enroll';
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  message?: string;
  program?: string;
}) {
  return postJson<{ ok: true; id: string }>('/api/contact', {
    kind: input.kind || 'contact',
    fullName: input.fullName,
    name: input.fullName,
    email: input.email,
    phone: input.phone || '',
    city: input.city || '',
    message: input.message || '',
    program: input.program || ''
  });
}
