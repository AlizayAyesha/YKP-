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
  const response = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Could not save your student interest. Please try again.');
  }
  return data as { ok: true; id: string };
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
  const response = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Could not send your inquiry. Please try again.');
  }
  return data as { ok: true; id: string };
}
