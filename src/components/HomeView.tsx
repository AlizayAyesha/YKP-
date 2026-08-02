import React from 'react';
import { motion } from 'motion/react';
import { ActiveTab, ModalType, YkpEvent } from '../types';
import {
  HERO_DATA,
  HERO_IMAGE,
  TALENTS_SECTION,
  VISION_DATA,
  ABOUT_DATA,
  WHY_CHOOSE_DATA,
  PARTNERS_DATA,
  PAST_EVENTS
} from '../data/youthData';
import { JoinMovementBanner } from './JoinMovementBanner';
import { YkpInAction } from './YkpInAction';
import { EventRegistrationSection } from './EventRegistrationSection';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { ArrowRight } from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  openModal: (type: ModalType) => void;
  onRsvp: (event: YkpEvent) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const valueAccents = ['#C9A227', '#05472A', '#8B3A3A'];

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, openModal, onRsvp }) => {
  const titleParts = HERO_DATA.title.split('. ');
  const lastPart = titleParts.length > 1 ? titleParts[titleParts.length - 1] : '';
  const firstParts = titleParts.length > 1 ? titleParts.slice(0, -1).join('. ') + '.' : HERO_DATA.title;

  return (
    <div className="bg-white text-[var(--ykp-ink)]">

      {/* HERO — IYCO-style large serif H1 */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Pakistani youth together"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,40,22,0.92)_0%,rgba(5,71,42,0.75)_50%,rgba(3,40,22,0.55)_100%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-3xl space-y-7"
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold)]"
            >
              Youth ka Pakistan
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] text-balance"
            >
              <span className="text-white">{firstParts}</span>
              {lastPart && (
                <>
                  {' '}
                  <span className="text-[var(--ykp-gold)]">{lastPart.replace(/\.$/, '')}.</span>
                </>
              )}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-white/75 max-w-xl leading-relaxed"
            >
              {HERO_DATA.subtitle}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => openModal('student-register')}
                className="inline-flex items-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm px-7 py-3.5 rounded-md transition-colors cursor-pointer"
              >
                {HERO_DATA.ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => document.getElementById('featured-event')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 border border-white/30 hover:border-[var(--ykp-gold)] text-white hover:text-[var(--ykp-gold)] font-semibold text-sm px-6 py-3.5 rounded-md transition-colors cursor-pointer"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured event + RSVP / student registration card */}
      <EventRegistrationSection
        openModal={openModal}
        setActiveTab={setActiveTab}
        onRsvp={onRsvp}
      />

      {/* YKP in Action — 3-column YouTube */}
      <div className="bg-[var(--ykp-canvas)]">
        <YkpInAction />
      </div>

      {/* ABOUT — text + image collage */}
      <section id="about" className="py-20 sm:py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-5"
            >
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--ykp-ink)] tracking-tight leading-tight text-balance">
                {VISION_DATA.title}
              </h2>
              <div className="space-y-4 text-[var(--ykp-muted)] text-base leading-relaxed">
                {ABOUT_DATA.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <button
                onClick={() => openModal('learn-more')}
                className="inline-flex items-center gap-2 bg-[var(--ykp-green)] hover:bg-[var(--ykp-green-deep)] text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors cursor-pointer"
              >
                {VISION_DATA.ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 relative h-[380px] sm:h-[440px]"
            >
              <div className="absolute top-0 right-0 w-[68%] aspect-[4/5] overflow-hidden rounded-xl shadow-lg z-10">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-[55%] aspect-[4/3] overflow-hidden rounded-xl shadow-xl border-4 border-white z-20">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-[35%] left-[8%] w-[38%] aspect-square overflow-hidden rounded-xl shadow-md border-4 border-white z-30">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core values — accent-top cards */}
      <section className="py-20 sm:py-24 bg-[var(--ykp-canvas)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ykp-ink)]">
              {ABOUT_DATA.coreValuesTitle}
            </h2>
            <p className="text-[var(--ykp-muted)] text-base">
              {ABOUT_DATA.coreValuesSub}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_DATA.values.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm"
                style={{ borderTopWidth: 3, borderTopColor: valueAccents[i % valueAccents.length] }}
              >
                <h3 className="font-display text-xl font-semibold text-[var(--ykp-ink)] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--ykp-muted)] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="py-20 sm:py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ykp-ink)]">
              {TALENTS_SECTION.subtitle}
            </h2>
            <p className="text-[var(--ykp-muted)] text-base leading-relaxed">
              {TALENTS_SECTION.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TALENTS_SECTION.offerings.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                <div className="aspect-[16/11] overflow-hidden rounded-xl mb-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ykp-gold)] mb-2">
                  {item.num}
                </p>
                <h3 className="font-display text-2xl font-semibold text-[var(--ykp-ink)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--ykp-muted)] leading-relaxed mb-4">
                  {item.description}
                </p>
                <button
                  onClick={() => openModal('student-register')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ykp-green)] cursor-pointer"
                >
                  Become a Student
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose — two features */}
      <section className="py-20 sm:py-24 bg-[var(--ykp-canvas)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ykp-ink)] text-balance">
              {WHY_CHOOSE_DATA.title}
            </h2>
            <p className="text-[var(--ykp-muted)] text-base">
              {WHY_CHOOSE_DATA.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_CHOOSE_DATA.features.map((feature) => (
              <div key={feature.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display text-2xl font-semibold text-[var(--ykp-ink)]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--ykp-muted)] leading-relaxed">
                    {feature.description}
                  </p>
                  <button
                    onClick={() => openModal('learn-more')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ykp-green)] cursor-pointer"
                  >
                    {feature.ctaText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past events / impact stats */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ykp-ink)]">
              Past Events & Impact
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAST_EVENTS.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
              >
                <div className="bg-[var(--ykp-green-deep)] text-white px-4 py-3">
                  <p className="text-[var(--ykp-gold)] text-xs font-semibold tracking-wider">{event.year}</p>
                  <h3 className="font-display text-base font-semibold mt-0.5 leading-snug">{event.title}</h3>
                </div>
                <ul className="px-4 py-4 space-y-2 text-sm">
                  {event.stats.map((stat) => (
                    <li key={stat.label} className="flex justify-between gap-3 text-[var(--ykp-muted)]">
                      <span>{stat.label}</span>
                      <span className="font-semibold text-[var(--ykp-ink)]">{stat.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners — logo cloud */}
      <section id="partners" className="py-16 bg-[var(--ykp-canvas)] border-y border-[var(--ykp-green)]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ykp-ink)] mb-8">
            Our Partners
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-sm sm:text-base text-[var(--ykp-muted)] font-medium">
            {PARTNERS_DATA.map((partner, i) => (
              <React.Fragment key={partner.id}>
                {i > 0 && <span className="text-[var(--ykp-green)]/30 hidden sm:inline">|</span>}
                <span className="hover:text-[var(--ykp-green)] transition-colors px-1">
                  {partner.name}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      <JoinMovementBanner openModal={openModal} />
    </div>
  );
};
