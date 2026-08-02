import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { FEATURED_EVENT, TALENTS_SECTION } from '../../data/youthData';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    age: '',
    track: TALENTS_SECTION.offerings[0]?.title ?? 'Skills Development',
    school: '',
    motivation: ''
  });

  if (!isOpen) return null;

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
      <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--ykp-green)]/10">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-5 border-b border-[var(--ykp-green)]/10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-1">
              Become a student
            </p>
            <h3 className="font-display text-2xl font-semibold text-[var(--ykp-ink)]">
              Join Youth ka Pakistan
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--ykp-muted)] hover:text-[var(--ykp-ink)] p-2 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-[var(--ykp-muted)] leading-relaxed border-l-2 border-[var(--ykp-gold)] pl-3">
                Register as a student for <strong className="text-[var(--ykp-ink)]">{FEATURED_EVENT.title}</strong> and ongoing YKP programs — free across Pakistan.
              </p>

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
                    placeholder="e.g. Lahore"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Age *</label>
                  <input
                    type="number"
                    required
                    min={12}
                    max={35}
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="18"
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>School / College / University</label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    placeholder="Optional"
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Program Track *</label>
                  <select
                    required
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className={fieldClass}
                  >
                    {TALENTS_SECTION.offerings.map((o) => (
                      <option key={o.id} value={o.title}>
                        {o.title}
                      </option>
                    ))}
                    <option value="Summit Attendance">Summit Attendance — {FEATURED_EVENT.title}</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Why do you want to join? *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    placeholder="Tell us briefly about your goals..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm py-3.5 transition-colors cursor-pointer"
              >
                Submit student registration
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[var(--ykp-gold)] mx-auto" />
              <h4 className="font-display text-2xl font-semibold text-[var(--ykp-ink)]">
                Welcome, {formData.fullName}
              </h4>
              <p className="text-sm text-[var(--ykp-muted)] leading-relaxed max-w-md mx-auto">
                You are registered as a YKP student for <strong className="text-[var(--ykp-ink)]">{formData.track}</strong>.
                Next steps will be sent to <strong className="text-[var(--ykp-ink)]">{formData.email}</strong>.
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
