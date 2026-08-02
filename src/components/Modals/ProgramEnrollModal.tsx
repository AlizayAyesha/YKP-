import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProgramEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProgramEnrollModal: React.FC<ProgramEnrollModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [track, setTrack] = useState('Skills Development');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    city: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldClass =
    'w-full bg-[var(--ykp-canvas)] border border-[var(--ykp-green)]/15 px-3.5 py-2.5 text-sm text-[var(--ykp-ink)] focus:outline-none focus:border-[var(--ykp-green)] transition-colors';
  const labelClass =
    'block text-[11px] font-semibold text-[var(--ykp-muted)] uppercase tracking-[0.18em] mb-1.5';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--ykp-green-deep)]/70 backdrop-blur-sm">
      <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto text-[var(--ykp-ink)] shadow-2xl p-6 sm:p-8 relative border border-[var(--ykp-green)]/10">
        <div className="flex items-center justify-between border-b border-[var(--ykp-green)]/10 pb-4 mb-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-1">
              Free enrollment
            </p>
            <h3 className="font-display text-2xl font-semibold text-[var(--ykp-ink)]">
              Join Youth ka Pakistan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--ykp-muted)] hover:text-[var(--ykp-ink)] p-2 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Select Program Track</label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className={fieldClass}
              >
                <option value="Skills Development">Skills Development (Training & Workshops)</option>
                <option value="Event Management">Event Management (Conferences & Expos)</option>
                <option value="Talent Promotion">Talent Promotion (Competitions & Media)</option>
                <option value="Free Resources">Free Resources & Mentorship Access</option>
              </select>
            </div>

            <div>
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
              <label className={labelClass}>Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@email.com"
                className={fieldClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Lahore"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>WhatsApp</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 300 0000000"
                  className={fieldClass}
                />
              </div>
            </div>

            <p className="text-xs text-[var(--ykp-muted)] leading-relaxed border-l-2 border-[var(--ykp-gold)] pl-3">
              <strong className="text-[var(--ykp-green)]">100% free.</strong> Workshops, mentorship, and resources are free for youth across Pakistan.
            </p>

            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 bg-[var(--ykp-green)] hover:bg-[var(--ykp-green-deep)] text-white font-semibold text-sm py-3.5 transition-colors cursor-pointer"
            >
              Confirm free enrollment
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[var(--ykp-gold)] mx-auto" />
            <h4 className="font-display text-2xl font-semibold text-[var(--ykp-ink)]">
              You&apos;re in, {formData.fullName}
            </h4>
            <p className="text-[var(--ykp-muted)] text-sm leading-relaxed">
              Welcome to <strong className="text-[var(--ykp-ink)]">{track}</strong>. Schedules and resources will be sent to{' '}
              <strong className="text-[var(--ykp-ink)]">{formData.email}</strong>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="inline-flex items-center justify-center bg-[var(--ykp-green)] text-white font-semibold text-sm px-8 py-3 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
