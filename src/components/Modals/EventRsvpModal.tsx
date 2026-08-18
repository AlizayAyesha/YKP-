import React, { useEffect, useState } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Calendar,
  MapPin,
  Download,
  Expand,
  LoaderCircle
} from 'lucide-react';
import { YkpEvent } from '../../types';
import { registerAttendee, RegistrationSuccess } from '../../lib/registerAttendee';

interface EventRsvpModalProps {
  event: YkpEvent | null;
  onClose: () => void;
  onBackToEvents?: () => void;
}

const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const EventRsvpModal: React.FC<EventRsvpModalProps> = ({ event, onClose, onBackToEvents }) => {
  const [submitted, setSubmitted] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<RegistrationSuccess | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [titleCategory, setTitleCategory] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    organization: '',
    publicConsent: false
  });

  useEffect(() => {
    if (event) {
      setSubmitted(false);
      setGenerating(false);
      setError('');
      setResult(null);
      setPhoto(null);
      setPhotoPreview('');
      setTitleCategory('');
      setCustomTitle('');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        organization: '',
        publicConsent: false
      });
    }
  }, [event?.id]);

  if (!event) return null;

  const fieldClass =
    'w-full bg-[var(--ykp-canvas)] border border-[var(--ykp-green)]/15 px-3.5 py-2.5 text-sm text-[var(--ykp-ink)] focus:outline-none focus:border-[var(--ykp-green)] transition-colors';
  const labelClass =
    'block text-[11px] font-semibold text-[var(--ykp-muted)] uppercase tracking-[0.18em] mb-1.5';
  const eventName = [event.title, event.subtitle].filter(Boolean).join(' — ') || event.dates;

  const handlePhoto = (file?: File) => {
    setError('');
    if (!file) return;
    if (!ALLOWED.includes(file.type)) {
      setError('Please upload a JPG, JPEG, PNG, or WebP portrait.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Photograph must be 8MB or smaller.');
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    const probe = new Image();
    probe.onload = () => {
      if (probe.width < 300 || probe.height < 300) {
        URL.revokeObjectURL(previewUrl);
        setPhoto(null);
        setPhotoPreview('');
        setError('Please upload a clearer portrait at least 300×300 pixels.');
        return;
      }
      setPhoto(file);
      setPhotoPreview(previewUrl);
    };
    probe.onerror = () => {
      URL.revokeObjectURL(previewUrl);
      setPhoto(null);
      setPhotoPreview('');
      setError('That file could not be read as an image. Please upload a JPG, PNG, or WebP portrait.');
    };
    probe.src = previewUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      setError('Please upload a personal photograph.');
      return;
    }
    const designation =
      titleCategory === 'Other' ? customTitle.trim() : titleCategory.trim();
    if (!designation) {
      setError('Please choose your title, or write it if you selected Other.');
      return;
    }
    setError('');
    setGenerating(true);
    try {
      const data = await registerAttendee({
        eventId: event.id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        designation,
        organization: formData.organization,
        notes: '',
        publicConsent: formData.publicConsent,
        photo
      });
      setResult(data);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[var(--ykp-green-deep)]/75 backdrop-blur-sm">
      <div className={`bg-white w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--ykp-green)]/10 rounded-t-2xl sm:rounded-none ${submitted ? 'max-w-2xl' : 'max-w-lg'}`}>
        <div className="sticky top-0 bg-white z-10 flex items-start justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--ykp-green)]/10">
          <div className="pr-4">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-1">
              {submitted ? 'Registration successful' : 'Event RSVP'}
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--ykp-ink)] leading-snug">
              {eventName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--ykp-muted)] hover:text-[var(--ykp-ink)] p-2 cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-5">
          {generating && (
            <div className="py-16 text-center space-y-4">
              <LoaderCircle className="w-10 h-10 mx-auto text-[var(--ykp-gold)] animate-spin" />
              <p className="font-display text-xl font-semibold text-[var(--ykp-ink)]">
                Your personalized attendee poster is being prepared...
              </p>
              <p className="text-sm text-[var(--ykp-muted)]">
                Recording your registration and preparing your official YKP poster.
              </p>
            </div>
          )}

          {!generating && !submitted && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-wrap gap-4 text-xs text-[var(--ykp-muted)] pb-1">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--ykp-green)]" />
                  {event.dates}
                </span>
                {event.city && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--ykp-green)]" />
                    {event.city}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Title / Designation *</label>
                  <select
                    required
                    value={titleCategory}
                    onChange={(e) => setTitleCategory(e.target.value)}
                    className={fieldClass}
                  >
                    <option value="">Select title</option>
                    <option value="Student">Student</option>
                    <option value="Founder & CEO">Founder &amp; CEO</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {titleCategory === 'Other' && (
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Your title *</label>
                    <input
                      type="text"
                      required
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="Write your title"
                      className={fieldClass}
                    />
                  </div>
                )}
                <div className="sm:col-span-2">
                  <label className={labelClass}>Organization / Institution</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Write your organization or institution"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 0000000"
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Karachi"
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Upload Your Photo *</label>
                  <label className="block cursor-pointer border border-dashed border-[var(--ykp-green)]/25 bg-[var(--ykp-canvas)] px-4 py-5 text-center hover:border-[var(--ykp-green)]/50 transition-colors">
                    <p className="text-sm font-semibold text-[var(--ykp-ink)]">Upload Your Photo</p>
                    <p className="mt-1 text-xs text-[var(--ykp-muted)] leading-relaxed">
                      Your photo will be placed into the official YKP attendee poster.
                    </p>
                    <p className="mt-2 text-[11px] text-[var(--ykp-muted)]">JPG, JPEG, PNG, or WebP · 300×300px or larger · up to 8MB</p>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,.jpg,.jpeg"
                      onChange={(e) => handlePhoto(e.target.files?.[0])}
                      className="sr-only"
                    />
                  </label>
                  {photoPreview && (
                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={photoPreview}
                        alt="Portrait preview"
                        className="w-20 h-20 object-cover rounded-full border border-[var(--ykp-green)]/15"
                      />
                      <p className="text-xs text-[var(--ykp-muted)]">
                        Preview only. The final poster uses the official circular frame.
                      </p>
                    </div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm text-[var(--ykp-muted)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.publicConsent}
                      onChange={(e) => setFormData({ ...formData, publicConsent: e.target.checked })}
                      className="mt-0.5"
                    />
                    <span>Allow my name, designation and organization to be displayed publicly as an attendee of this event.</span>
                  </label>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm py-3.5 transition-colors cursor-pointer"
              >
                Confirm RSVP
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}

          {!generating && submitted && result && (
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[var(--ykp-gold)] mx-auto" />
                <h4 className="font-display text-2xl font-semibold text-[var(--ykp-ink)]">
                  You&apos;re Registered!
                </h4>
                <p className="text-sm text-[var(--ykp-muted)]">
                  You&apos;re officially registered for:{' '}
                  <strong className="text-[var(--ykp-ink)]">URAAN-E-AI 2026 — Pakistan&apos;s Digital Flight</strong>
                </p>
                <div className="text-sm space-y-1">
                  <p>
                    Registration ID:{' '}
                    <strong className="tracking-wide">{result.registrationId}</strong>
                  </p>
                  <p>Date: {event.dates}</p>
                  {event.time && <p>Time: {event.time}</p>}
                  <p>Venue: {[event.venue, event.city].filter(Boolean).join(', ')}</p>
                </div>
                {result.emailSent ? (
                  <p className="text-xs text-[var(--ykp-muted)]">A confirmation email is on its way.</p>
                ) : (
                  <p className="text-xs text-[var(--ykp-muted)]">
                    {result.emailNote || 'Your registration is saved. Email sending is not configured on this server.'}
                  </p>
                )}
              </div>

              <div className="bg-[var(--ykp-canvas)] p-3 sm:p-4">
                <img
                  src={result.posterUrl}
                  alt="Your attendee poster"
                  className="w-full max-h-[70vh] object-contain mx-auto"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={result.posterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--ykp-green)] text-white font-semibold text-sm py-3"
                >
                  <Expand className="w-4 h-4" />
                  View Poster
                </a>
                <a
                  href={result.posterUrl}
                  download={`${result.registrationId}.png`}
                  className="inline-flex items-center justify-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm py-3 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Poster
                </a>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBackToEvents?.();
                  }}
                  className="inline-flex items-center justify-center border border-[var(--ykp-green)]/20 text-[var(--ykp-green)] font-semibold text-sm py-3 cursor-pointer"
                >
                  Back to Event
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
