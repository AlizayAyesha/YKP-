import React, { useState } from 'react';
import { SITE_INFO } from '../data/youthData';
import { JoinMovementBanner } from './JoinMovementBanner';
import { Mail, PhoneCall, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { ModalType } from '../types';

interface ContactViewProps {
  openModal: (type: ModalType) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ openModal }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="text-[var(--ykp-ink)]">
      <section className="relative bg-section-green text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.15),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-4">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold-bright)]">
            Get in touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold italic text-white tracking-tight">
            We&apos;d love to hear from you
          </h1>
          <p className="text-white/65 text-base max-w-xl mx-auto">
            Questions, virtual classes, or mentoring and partnership — we&apos;ll guide you in.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-canvas-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-3">
                <h2 className="font-display text-3xl font-semibold text-[var(--ykp-ink)]">
                  Contact details
                </h2>
                <p className="text-sm text-[var(--ykp-muted)] leading-relaxed">
                  Nationwide support across Pakistan. We respond to every serious inquiry.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: MapPin, label: 'Address', value: SITE_INFO.address },
                  {
                    icon: PhoneCall,
                    label: 'Phone',
                    value: SITE_INFO.contactPhone,
                    href: `tel:${SITE_INFO.contactPhone}`
                  },
                  {
                    icon: Mail,
                    label: 'Email',
                    value: SITE_INFO.contactEmail,
                    href: `mailto:${SITE_INFO.contactEmail}`
                  }
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[var(--ykp-green)] text-[var(--ykp-gold-bright)] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ykp-muted)] font-semibold">
                        {label}
                      </div>
                      {href ? (
                        <a href={href} className="text-base font-medium text-[var(--ykp-green)] hover:underline mt-1 block">
                          {value}
                        </a>
                      ) : (
                        <div className="text-base font-medium text-[var(--ykp-ink)] mt-1">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openModal('student-register')}
                  className="inline-flex items-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm px-5 py-3 cursor-pointer"
                >
                  Become a Student
                </button>
                <button
                  type="button"
                  onClick={() => openModal('partner-inquiry')}
                  className="inline-flex items-center gap-2 border border-[var(--ykp-green)]/20 hover:border-[var(--ykp-green)] text-[var(--ykp-green)] font-semibold text-sm px-5 py-3 cursor-pointer"
                >
                  Partner / Mentor Inquiry
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 sm:p-10 border border-[var(--ykp-green)]/10">
                  <div>
                    <label className="block text-[11px] font-semibold text-[var(--ykp-muted)] uppercase tracking-[0.18em] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ali Khan"
                      className="w-full bg-[var(--ykp-canvas)] border border-[var(--ykp-green)]/15 px-4 py-3 text-sm focus:outline-none focus:border-[var(--ykp-green)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[var(--ykp-muted)] uppercase tracking-[0.18em] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@email.com"
                      className="w-full bg-[var(--ykp-canvas)] border border-[var(--ykp-green)]/15 px-4 py-3 text-sm focus:outline-none focus:border-[var(--ykp-green)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[var(--ykp-muted)] uppercase tracking-[0.18em] mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how you want to get involved..."
                      className="w-full bg-[var(--ykp-canvas)] border border-[var(--ykp-green)]/15 px-4 py-3 text-sm focus:outline-none focus:border-[var(--ykp-green)] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[var(--ykp-green)] hover:bg-[var(--ykp-green-deep)] text-white font-semibold text-sm px-8 py-3.5 transition-colors cursor-pointer"
                  >
                    Send message
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-16 space-y-5 bg-white border border-[var(--ykp-green)]/10 px-8">
                  <CheckCircle2 className="w-12 h-12 text-[var(--ykp-gold)] mx-auto" />
                  <h3 className="font-display text-3xl font-semibold text-[var(--ykp-ink)]">
                    Thank you, {formData.name}
                  </h3>
                  <p className="text-[var(--ykp-muted)] text-sm max-w-md mx-auto leading-relaxed">
                    Your message is in. We&apos;ll reply at <strong className="text-[var(--ykp-ink)]">{formData.email}</strong> soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-semibold text-[var(--ykp-green)] link-underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <JoinMovementBanner openModal={openModal} />
    </div>
  );
};
