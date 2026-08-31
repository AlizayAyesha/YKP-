import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SITE_INFO } from '../data/youthData';
import { Mail, PhoneCall, MapPin, CheckCircle2, ArrowRight, LoaderCircle } from 'lucide-react';
import { ModalType } from '../types';
import { HQ_LOCATION } from '../lib/location';
import { submitContactMessage } from '../lib/submitInquiry';

interface ContactSectionProps {
  openModal: (type: ModalType) => void;
  compact?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ openModal, compact = false }) => {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setError('');
    setSaving(true);
    try {
      await submitContactMessage({
        kind: 'contact',
        fullName: formData.name,
        email: formData.email,
        message: formData.message
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your message. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-24 bg-canvas-glow scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {compact && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3"
            >
              <p className="inline-flex items-center rounded-full bg-[#E7F2EC] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ykp-green)]">
                Get in touch
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--ykp-ink)] tracking-tight text-balance">
                We&apos;d love to hear from you
              </h2>
              <p className="text-[var(--ykp-muted)] text-base leading-relaxed">
                Questions, virtual classes, or mentoring and partnership — we&apos;ll guide you in.
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 space-y-8 sm:space-y-10"
            >
              <div className="space-y-3">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ykp-ink)]">
                  Contact details
                </h3>
                <p className="text-sm text-[var(--ykp-muted)] leading-relaxed">
                  Nationwide support across Pakistan. We respond to every serious inquiry.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: MapPin,
                    label: 'Address',
                    value: SITE_INFO.address,
                    href: HQ_LOCATION.googleMapsUrl,
                    external: true
                  },
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
                ].map(({ icon: Icon, label, value, href, external }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[var(--ykp-green)] text-[var(--ykp-gold-bright)] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <address className="not-italic min-w-0">
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ykp-muted)] font-semibold">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="text-base font-medium text-[var(--ykp-green)] hover:underline mt-1 block break-words"
                        >
                          {value}
                        </a>
                      ) : (
                        <div className="text-base font-medium text-[var(--ykp-ink)] mt-1">{value}</div>
                      )}
                    </address>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openModal('student-register')}
                  className="inline-flex items-center justify-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm px-5 py-3 rounded-full cursor-pointer w-full sm:w-auto"
                >
                  Become a Student
                </button>
                <button
                  type="button"
                  onClick={() => openModal('partner-inquiry')}
                  className="inline-flex items-center justify-center gap-2 border border-[var(--ykp-green)]/20 hover:border-[var(--ykp-green)] text-[var(--ykp-green)] font-semibold text-sm px-5 py-3 rounded-full cursor-pointer w-full sm:w-auto"
                >
                  Partner / Mentor Inquiry
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="ykp-card space-y-5 p-5 sm:p-8 lg:p-10"
                  name="contact"
                  method="post"
                >
                  <div>
                    <label htmlFor="contact-name" className="block text-[11px] font-semibold text-[var(--ykp-muted)] uppercase tracking-[0.18em] mb-2">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ali Khan"
                      className="w-full bg-[var(--ykp-canvas)] border border-[var(--ykp-green)]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--ykp-green)] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[11px] font-semibold text-[var(--ykp-muted)] uppercase tracking-[0.18em] mb-2">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@email.com"
                      className="w-full bg-[var(--ykp-canvas)] border border-[var(--ykp-green)]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--ykp-green)] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] font-semibold text-[var(--ykp-muted)] uppercase tracking-[0.18em] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      minLength={8}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how you want to get involved..."
                      className="w-full bg-[var(--ykp-canvas)] border border-[var(--ykp-green)]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--ykp-green)] transition-colors resize-none"
                    />
                  </div>
                  {error && <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>}
                  <button
                    type="submit"
                    disabled={saving}
                    className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[var(--ykp-green)] hover:bg-[var(--ykp-green-deep)] text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-colors cursor-pointer disabled:opacity-70"
                  >
                    {saving ? (
                      <>
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="ykp-card text-center py-12 sm:py-16 space-y-5 px-5 sm:px-8">
                  <CheckCircle2 className="w-12 h-12 text-[var(--ykp-gold)] mx-auto" />
                  <h3 className="font-display text-3xl font-semibold text-[var(--ykp-ink)]">
                    Thank you, {formData.name}
                  </h3>
                  <p className="text-[var(--ykp-muted)] text-sm max-w-md mx-auto leading-relaxed">
                    Your message is in. We&apos;ll reply at <strong className="text-[var(--ykp-ink)]">{formData.email}</strong> soon.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                      setError('');
                    }}
                    className="text-sm font-semibold text-[var(--ykp-green)] link-underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
  );
};
