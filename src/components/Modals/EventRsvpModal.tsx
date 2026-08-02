import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { YkpEvent } from '../../types';

interface EventRsvpModalProps {
  event: YkpEvent | null;
  onClose: () => void;
}

export const EventRsvpModal: React.FC<EventRsvpModalProps> = ({ event, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    guests: '1',
    notes: ''
  });

  useEffect(() => {
    if (event) {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        guests: '1',
        notes: ''
      });
    }
  }, [event?.id]);

  if (!event) return null;

  const fieldClass =
    'w-full bg-[var(--ykp-canvas)] border border-[var(--ykp-green)]/15 px-3.5 py-2.5 text-sm text-[var(--ykp-ink)] focus:outline-none focus:border-[var(--ykp-green)] transition-colors';
  const labelClass =
    'block text-[11px] font-semibold text-[var(--ykp-muted)] uppercase tracking-[0.18em] mb-1.5';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--ykp-green-deep)]/75 backdrop-blur-sm">
      <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--ykp-green)]/10">
        <div className="sticky top-0 bg-white z-10 flex items-start justify-between px-6 py-5 border-b border-[var(--ykp-green)]/10">
          <div className="pr-4">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-1">
              Event RSVP
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--ykp-ink)] leading-snug">
              {event.title}
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

        <div className="px-6 py-5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-wrap gap-4 text-xs text-[var(--ykp-muted)] pb-1">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--ykp-green)]" />
                  {event.dates}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--ykp-green)]" />
                  {event.city}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ali Khan"
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
                <div>
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
                <div>
                  <label className={labelClass}>Guests *</label>
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className={fieldClass}
                  >
                    {['1', '2', '3', '4', '5'].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === '1' ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Notes (optional)</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Accessibility needs, questions..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm py-3.5 transition-colors cursor-pointer"
              >
                Confirm RSVP
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[var(--ykp-gold)] mx-auto" />
              <h4 className="font-display text-2xl font-semibold text-[var(--ykp-ink)]">
                RSVP confirmed, {formData.fullName}
              </h4>
              <p className="text-sm text-[var(--ykp-muted)] leading-relaxed max-w-md mx-auto">
                You&apos;re registered for <strong className="text-[var(--ykp-ink)]">{event.title}</strong>.
                Details will be sent to <strong className="text-[var(--ykp-ink)]">{formData.email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="inline-flex items-center justify-center bg-[var(--ykp-green)] text-white font-semibold text-sm px-8 py-3 cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
