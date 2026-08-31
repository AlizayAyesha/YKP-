import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, BadgeCheck, ArrowRight } from 'lucide-react';
import { FEATURED_EVENT } from '../data/youthData';
import { ActiveTab, ModalType, YkpEvent } from '../types';
import { EventInviteCinema } from './EventInviteCinema';

interface EventRegistrationSectionProps {
  openModal: (type: ModalType) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onRsvp: (event: YkpEvent) => void;
}

export const EventRegistrationSection: React.FC<EventRegistrationSectionProps> = ({
  openModal,
  setActiveTab,
  onRsvp
}) => {
  return (
    <section id="featured-event" className="relative py-14 sm:py-24 bg-[#02150c] text-white scroll-mt-24 overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(201,162,39,0.14),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(5,71,42,0.45),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 sm:mb-12 space-y-4">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold)]">
            Featured event
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold tracking-tight leading-tight">
            {FEATURED_EVENT.title}
          </h2>
          {FEATURED_EVENT.subtitle && (
            <p className="text-lg sm:text-xl text-[var(--ykp-gold)] font-display">
              {FEATURED_EVENT.subtitle}
            </p>
          )}
          {FEATURED_EVENT.tagline && (
            <p className="text-sm uppercase tracking-[0.14em] text-white/50">
              {FEATURED_EVENT.tagline}
            </p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto overflow-visible pb-10"
        >
          <EventInviteCinema event={FEATURED_EVENT} />
        </motion.div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {FEATURED_EVENT.summary && (
              <p className="text-white/70 text-base leading-relaxed max-w-xl">
                {FEATURED_EVENT.summary}
              </p>
            )}
            {FEATURED_EVENT.highlights.length > 0 && (
              <ul className="space-y-4 pt-1">
                {FEATURED_EVENT.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                    <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-[var(--ykp-gold)]/15 text-[var(--ykp-gold)] flex items-center justify-center">
                      <BadgeCheck className="w-3.5 h-3.5" />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-5 pt-2 text-sm text-white/60">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--ykp-gold)]" />
                {FEATURED_EVENT.dates}
              </span>
              {FEATURED_EVENT.city && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--ykp-gold)]" />
                  {[FEATURED_EVENT.venue, FEATURED_EVENT.city].filter(Boolean).join(', ')}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => onRsvp(FEATURED_EVENT)}
                className="inline-flex items-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm px-6 py-3 rounded-full cursor-pointer"
              >
                RSVP for URAAN-E-AI 2026
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('events');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-[var(--ykp-gold)] cursor-pointer"
              >
                Explore Event
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="lg:col-span-6"
          >
            <div className="bg-white/[0.04] text-white rounded-2xl border border-[var(--ykp-gold)]/20 overflow-hidden">
              <div className="px-4 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-white/10">
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-2">
                  {FEATURED_EVENT.status === 'Open' ? 'RSVP Open' : FEATURED_EVENT.status}
                </p>
                <h3 className="font-display text-2xl font-semibold">Event Registration</h3>
                <p className="text-white/55 text-sm mt-2">
                  RSVP for this event, join the virtual-class waitlist, or inquire as a mentor, educator, or partner.
                </p>
              </div>

              <div className="px-4 sm:px-8 py-5 space-y-3 text-sm border-b border-white/10">
                {[
                  {
                    label: 'Venue',
                    value: [FEATURED_EVENT.venue, FEATURED_EVENT.city].filter(Boolean).join(', ')
                  },
                  { label: 'Date', value: FEATURED_EVENT.dates },
                  { label: 'Time', value: FEATURED_EVENT.time || '' },
                  { label: 'Fees', value: FEATURED_EVENT.fees }
                ]
                  .filter((row) => row.value)
                  .map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4">
                      <span className="text-[var(--ykp-gold)]/90 font-medium shrink-0">{row.label}</span>
                      <span className="text-white/85 text-right break-words min-w-0">{row.value}</span>
                    </div>
                  ))}
              </div>

              <div className="px-4 sm:px-8 py-6 space-y-3">
                <button
                  type="button"
                  onClick={() => onRsvp(FEATURED_EVENT)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm py-3.5 rounded-full transition-colors cursor-pointer"
                >
                  RSVP for URAAN-E-AI 2026
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openModal('student-register')}
                  className="w-full bg-[var(--ykp-green)] hover:bg-[var(--ykp-green-soft)] text-white font-semibold text-sm py-3.5 rounded-full transition-colors cursor-pointer"
                >
                  Become a Student
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('events');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm py-3.5 rounded-full border border-white/15 transition-colors cursor-pointer"
                >
                  Browse All Events
                </button>
                <button
                  type="button"
                  onClick={() => openModal('partner-inquiry')}
                  className="w-full bg-transparent hover:bg-white/5 text-white/80 font-semibold text-sm py-3.5 rounded-full border border-white/15 transition-colors cursor-pointer"
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
