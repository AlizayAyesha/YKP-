import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, BadgeCheck, ArrowRight } from 'lucide-react';
import { FEATURED_EVENT } from '../data/youthData';
import { ModalType } from '../types';

interface EventRegistrationSectionProps {
  openModal: (type: ModalType) => void;
}

export const EventRegistrationSection: React.FC<EventRegistrationSectionProps> = ({ openModal }) => {
  return (
    <section id="events" className="py-20 sm:py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — event story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[var(--ykp-ink)] tracking-tight leading-tight">
              {FEATURED_EVENT.title}
            </h2>
            <p className="text-[var(--ykp-muted)] text-base leading-relaxed max-w-xl">
              {FEATURED_EVENT.summary}
            </p>
            <ul className="space-y-4 pt-2">
              {FEATURED_EVENT.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--ykp-ink)]">
                  <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-[var(--ykp-green)]/10 text-[var(--ykp-green)] flex items-center justify-center">
                    <BadgeCheck className="w-3.5 h-3.5" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-5 pt-2 text-sm text-[var(--ykp-muted)]">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--ykp-green)]" />
                {FEATURED_EVENT.city}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--ykp-green)]" />
                {FEATURED_EVENT.dates}
              </span>
            </div>
          </motion.div>

          {/* Right — registration card (IYCO-style) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="lg:col-span-6"
          >
            <div className="bg-[var(--ykp-green-deep)] text-white rounded-2xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(3,40,22,0.25)]">
              <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-white/10">
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-2">
                  {FEATURED_EVENT.status}
                </p>
                <h3 className="font-display text-2xl font-semibold">Student Registration</h3>
                <p className="text-white/55 text-sm mt-2">
                  Become a student of Youth ka Pakistan — free programs & summit access.
                </p>
              </div>

              <div className="px-6 sm:px-8 py-5 space-y-3 text-sm border-b border-white/10">
                {[
                  { label: 'Venue', value: `${FEATURED_EVENT.venue}, ${FEATURED_EVENT.city}` },
                  { label: 'Date', value: FEATURED_EVENT.dates },
                  { label: 'Fees', value: FEATURED_EVENT.fees }
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4">
                    <span className="text-[var(--ykp-gold)]/90 font-medium shrink-0">{row.label}</span>
                    <span className="text-white/85 text-right">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="px-6 sm:px-8 py-6 space-y-3">
                <button
                  type="button"
                  onClick={() => openModal('student-register')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm py-3.5 rounded-lg transition-colors cursor-pointer"
                >
                  Become a Student
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openModal('program-enroll')}
                  className="w-full bg-[var(--ykp-green)] hover:bg-[var(--ykp-green-soft)] text-white font-semibold text-sm py-3.5 rounded-lg transition-colors cursor-pointer"
                >
                  Program Enrollment
                </button>
                <button
                  type="button"
                  onClick={() => openModal('learn-more')}
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm py-3.5 rounded-lg border border-white/15 transition-colors cursor-pointer"
                >
                  Learn More
                </button>
                <button
                  type="button"
                  onClick={() => openModal('contact')}
                  className="w-full bg-transparent hover:bg-white/5 text-white/80 font-semibold text-sm py-3.5 rounded-lg border border-white/15 transition-colors cursor-pointer"
                >
                  Partner / Mentor Inquiry
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
