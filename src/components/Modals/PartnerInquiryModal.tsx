import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, ArrowRight, LoaderCircle } from 'lucide-react';
import { InquiryRole } from '../../types';
import { submitPartnerInquiry } from '../../lib/submitInquiry';

interface PartnerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLES: InquiryRole[] = ['Mentor', 'Educator', 'Partner / Sponsor', 'Other'];

const SUPPORT_OPTIONS = [
  'Mentorship / coaching',
  'Teaching virtual classes',
  'Financial sponsorship',
  'Venue / event support',
  'In-kind support (equipment, software, materials)',
  'Media / outreach',
  'Other'
];

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  organization: '',
  role: '' as InquiryRole | '',
  otherRole: '',
  expertise: '',
  supportDetails: '',
  availability: '',
  website: ''
};

export const PartnerInquiryModal: React.FC<PartnerInquiryModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [inquiryId, setInquiryId] = useState('');
  const [supportTypes, setSupportTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setSaving(false);
      setError('');
      setInquiryId('');
      setSupportTypes([]);
      setFormData(emptyForm);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const fieldClass =
    'w-full bg-[var(--ykp-canvas)] border border-[var(--ykp-green)]/15 px-3.5 py-2.5 text-sm text-[var(--ykp-ink)] focus:outline-none focus:border-[var(--ykp-green)] transition-colors';
  const labelClass =
    'block text-[11px] font-semibold text-[var(--ykp-muted)] uppercase tracking-[0.18em] mb-1.5';

  const toggleSupport = (value: string) => {
    setSupportTypes((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.role) {
      setError('Please choose how you want to work with YKP.');
      return;
    }
    if (formData.role === 'Other' && !formData.otherRole.trim()) {
      setError('Please describe your role.');
      return;
    }
    if (supportTypes.length === 0) {
      setError('Please select at least one way you can support YKP.');
      return;
    }
    setSaving(true);
    try {
      const result = await submitPartnerInquiry({
        ...formData,
        role: formData.role,
        supportTypes
      });
      setInquiryId(result.id);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your inquiry. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[var(--ykp-green-deep)]/75 backdrop-blur-sm">
      <div className="bg-white max-w-xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--ykp-green)]/10 rounded-t-2xl sm:rounded-none">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--ykp-green)]/10">
          <div className="min-w-0 pr-2">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-1">
              Partner / mentor
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--ykp-ink)]">
              Work with Youth ka Pakistan
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

        <div className="px-4 sm:px-6 py-5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-[var(--ykp-muted)] leading-relaxed border-l-2 border-[var(--ykp-gold)] pl-3">
                Tell us whether you want to mentor, teach, or partner with YKP — and exactly how you will support the movement.
              </p>

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
                  <label className={labelClass}>Organization / Institution *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Company, university, or independent"
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>I want to be a *</label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as InquiryRole, otherRole: '' })
                    }
                    className={fieldClass}
                  >
                    <option value="">Select a role</option>
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                {formData.role === 'Other' && (
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Describe your role *</label>
                    <input
                      type="text"
                      required
                      value={formData.otherRole}
                      onChange={(e) => setFormData({ ...formData, otherRole: e.target.value })}
                      placeholder="e.g. Advisor, volunteer coordinator"
                      className={fieldClass}
                    />
                  </div>
                )}
                <div className="sm:col-span-2">
                  <p className={labelClass}>How can you support YKP? *</p>
                  <div className="grid grid-cols-1 gap-2">
                    {SUPPORT_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className="flex items-start gap-2 text-sm text-[var(--ykp-ink)] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5"
                          checked={supportTypes.includes(option)}
                          onChange={() => toggleSupport(option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Expertise / what you bring *</label>
                  <input
                    type="text"
                    required
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    placeholder="e.g. AI education, youth mentorship, brand sponsorship"
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>How will you support us? *</label>
                  <textarea
                    required
                    rows={4}
                    minLength={30}
                    value={formData.supportDetails}
                    onChange={(e) => setFormData({ ...formData, supportDetails: e.target.value })}
                    placeholder="Share the details: hours you can mentor, subjects you can teach, sponsorship type and amount, in-kind gifts, venues, or other support."
                    className={`${fieldClass} resize-none`}
                  />
                </div>
                <div>
                  <label className={labelClass}>Availability</label>
                  <input
                    type="text"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    placeholder="e.g. evenings, 2 hours / week"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>LinkedIn / Website</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://"
                    className={fieldClass}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-700">{error}</p>}

              <button
                type="submit"
                disabled={saving}
                className="group w-full inline-flex items-center justify-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm py-3.5 transition-colors cursor-pointer disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Submit inquiry
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[var(--ykp-gold)] mx-auto" />
              <h4 className="font-display text-2xl font-semibold text-[var(--ykp-ink)]">
                Thank you, {formData.fullName}
              </h4>
              <p className="text-sm text-[var(--ykp-muted)] leading-relaxed max-w-md mx-auto">
                We received your {formData.role.toLowerCase()} inquiry
                {inquiryId ? ` (${inquiryId})` : ''}. Our team will follow up at{' '}
                <strong className="text-[var(--ykp-ink)]">{formData.email}</strong>.
              </p>
              <button
                type="button"
                onClick={onClose}
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
