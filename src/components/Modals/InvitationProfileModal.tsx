import React, { useEffect, useState } from 'react';
import { X, ArrowRight, LoaderCircle } from 'lucide-react';
import { FEATURED_EVENT } from '../../data/youthData';
import { EventProfileRole, YkpEvent } from '../../types';

interface InvitationProfileModalProps {
  isOpen: boolean;
  event?: YkpEvent;
  onClose: () => void;
}

const ROLES: EventProfileRole[] = [
  'Guest of Honor',
  'Speaker',
  'Panelist',
  'Educational Leader',
  'Corporate Representative',
  'Participant'
];

const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const InvitationProfileModal: React.FC<InvitationProfileModalProps> = ({
  isOpen,
  event = FEATURED_EVENT,
  onClose
}) => {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    designation: '',
    organization: '',
    phone: '',
    email: '',
    role: 'Speaker' as EventProfileRole,
    bio: ''
  });

  useEffect(() => {
    if (isOpen) {
      setError('');
      setDone(false);
      setSubmitting(false);
      setPhoto(null);
      setPreview('');
      setForm({
        fullName: '',
        designation: '',
        organization: '',
        phone: '',
        email: '',
        role: 'Speaker',
        bio: ''
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const fieldClass =
    'w-full bg-[var(--ykp-canvas)] border border-[var(--ykp-green)]/15 px-3.5 py-2.5 text-sm text-[var(--ykp-ink)] focus:outline-none focus:border-[var(--ykp-green)]';
  const labelClass = 'block text-[11px] font-semibold text-[var(--ykp-muted)] uppercase tracking-[0.18em] mb-1.5';

  const handlePhoto = (file?: File) => {
    setError('');
    if (!file) return;
    if (!ALLOWED.includes(file.type)) {
      setError('Please upload a JPG, JPEG, PNG, or WebP photograph.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Photograph must be 8MB or smaller.');
      return;
    }
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      setError('Please upload a high-resolution photograph.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const body = new FormData();
      body.append('eventId', event.id);
      body.append('fullName', form.fullName);
      body.append('designation', form.designation);
      body.append('organization', form.organization);
      body.append('phone', form.phone);
      body.append('email', form.email);
      body.append('role', form.role);
      body.append('bio', form.bio);
      body.append('photo', photo);
      const response = await fetch('/api/profiles', { method: 'POST', body });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Submission failed.');
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[var(--ykp-green-deep)]/75">
      <div className="bg-white w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-none">
        <div className="sticky top-0 bg-white flex items-start justify-between px-5 py-4 border-b border-[var(--ykp-green)]/10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)]">Invitation profile</p>
            <h3 className="font-display text-xl font-semibold">Submit your profile for review</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 text-[var(--ykp-muted)] cursor-pointer" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 py-5">
          {done ? (
            <div className="space-y-3 py-8 text-center">
              <h4 className="font-display text-2xl font-semibold">Submitted for review</h4>
              <p className="text-sm text-[var(--ykp-muted)]">
                Your profile will not appear on the event page until a YKP admin approves it.
              </p>
              <button type="button" onClick={onClose} className="mt-4 bg-[var(--ykp-green)] text-white px-5 py-3 text-sm font-semibold cursor-pointer">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <p className="text-xs text-[var(--ykp-muted)]">
                This is for invited guests, speakers and leaders. Ordinary RSVP attendees remain private.
              </p>
              <div>
                <label className={labelClass}>Full Name *</label>
                <input required className={fieldClass} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Current Designation *</label>
                <input required className={fieldClass} value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Organization / Institution *</label>
                <input required className={fieldClass} value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Mobile Number *</label>
                  <input required className={fieldClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" required className={fieldClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Requested Event Role *</label>
                <select className={fieldClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as EventProfileRole })}>
                  {ROLES.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Short biography (optional)</label>
                <textarea rows={3} className={`${fieldClass} resize-none`} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>High-resolution photograph *</label>
                <input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg" onChange={(e) => handlePhoto(e.target.files?.[0])} className={fieldClass} />
                {preview && <img src={preview} alt="Preview" className="mt-3 w-20 h-20 object-cover rounded-md" />}
              </div>
              {error && <p className="text-sm text-red-700 bg-red-50 px-3 py-2">{error}</p>}
              <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 bg-[var(--ykp-gold)] font-semibold text-sm py-3.5 cursor-pointer">
                {submitting ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                Submit for admin review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
