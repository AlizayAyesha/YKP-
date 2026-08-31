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
  PAST_EVENTS,
  SITE_INFO
} from '../data/youthData';
import { JoinMovementBanner } from './JoinMovementBanner';
import { YkpInAction } from './YkpInAction';
import { EventRegistrationSection } from './EventRegistrationSection';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { EventGallerySlider } from './EventGallerySlider';
import { AboutValuesSection } from './AboutValuesSection';
import { ContactSection } from './ContactSection';
import { FaqSection } from './FaqSection';
import { ArrowRight } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  openModal: (type: ModalType) => void;
  onRsvp: (event: YkpEvent) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, openModal, onRsvp }) => {
  const titleParts = HERO_DATA.title.split('. ');
  const lastPart = titleParts.length > 1 ? titleParts[titleParts.length - 1] : '';
  const firstParts = titleParts.length > 1 ? titleParts.slice(0, -1).join('. ') + '.' : HERO_DATA.title;

  React.useEffect(() => {
    if (window.location.hash !== '#contact') return;
    const timer = window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white text-[var(--ykp-ink)]">

      {/* HERO — IYCO-style large serif H1 */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <SmartImage
          src={HERO_IMAGE}
          alt="Youth at a Youth ka Pakistan vocational training center in Pakistan"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="sync"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,40,22,0.92)_0%,rgba(5,71,42,0.75)_50%,rgba(3,40,22,0.55)_100%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 lg:py-32">
          <div className="max-w-3xl space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--ykp-gold)]/35 bg-black/25 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold)] backdrop-blur-sm">
              Youth ka Pakistan
            </p>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] text-balance">
              <span className="text-white">{firstParts}</span>
              {lastPart && (
                <>
                  {' '}
                  <span className="text-[var(--ykp-gold)]">{lastPart.replace(/\.$/, '')}.</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-white/75 max-w-xl leading-relaxed">
              {HERO_DATA.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1 w-full max-w-md sm:max-w-none">
              <button
                onClick={() => openModal('student-register')}
                className="ykp-btn-gold cursor-pointer"
              >
                {HERO_DATA.ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => document.getElementById('featured-event')?.scrollIntoView({ behavior: 'smooth' })}
                className="ykp-btn-outline cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>
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

      {/* ABOUT — vision, mission, four pillars */}
      <section id="about" className="relative py-20 sm:py-24 bg-[#02150c] text-white scroll-mt-24 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(201,162,39,0.14),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(5,71,42,0.45),transparent_50%)]"
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutValuesSection />

          <div className="mt-16 sm:mt-20 space-y-6">
            <p className="ykp-eyebrow mb-3">The foundation</p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              Leadership
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                name: SITE_INFO.patronInChief.name,
                role: SITE_INFO.patronInChief.role,
                org: 'Youth ka Pakistan',
                note: SITE_INFO.patronInChief.note,
                photoUrl: SITE_INFO.patronInChief.photoUrl,
                alt: `${SITE_INFO.patronInChief.name}, ${SITE_INFO.patronInChief.role} of Youth ka Pakistan`
              },
              {
                name: SITE_INFO.chairperson.name,
                role: SITE_INFO.chairperson.role,
                org: SITE_INFO.chairperson.organization,
                note: undefined as string | undefined,
                photoUrl: SITE_INFO.chairperson.photoUrl,
                alt: `${SITE_INFO.chairperson.name}, ${SITE_INFO.chairperson.role} of ${SITE_INFO.chairperson.organization}`
              },
              {
                name: `${SITE_INFO.president.name}, ${SITE_INFO.president.honorific}`,
                role: SITE_INFO.president.role,
                org: 'Youth ka Pakistan',
                note: undefined as string | undefined,
                photoUrl: SITE_INFO.president.photoUrl,
                alt: `${SITE_INFO.president.name}, ${SITE_INFO.president.honorific}, ${SITE_INFO.president.role} of Youth ka Pakistan`
              },
              {
                name: SITE_INFO.vicePresident.name,
                role: SITE_INFO.vicePresident.role,
                org: SITE_INFO.vicePresident.organization,
                note: SITE_INFO.vicePresident.affiliation,
                photoUrl: SITE_INFO.vicePresident.photoUrl,
                alt: `${SITE_INFO.vicePresident.name}, ${SITE_INFO.vicePresident.role} of ${SITE_INFO.vicePresident.organization}`
              }
            ].map((person, i) => (
              <motion.article
                key={person.role}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="ykp-card overflow-hidden"
              >
                <div className="bg-[var(--ykp-canvas)]">
                  <SmartImage
                    src={person.photoUrl}
                    alt={person.alt}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 sm:p-6 space-y-1.5 text-center">
                  <h4 className="font-display text-xl sm:text-2xl font-semibold text-[var(--ykp-ink)] leading-snug">
                    {person.name}
                  </h4>
                  <p className="text-sm font-semibold text-[var(--ykp-green)]">
                    {person.role}, {person.org}
                  </p>
                  {person.note && (
                    <p className="text-sm text-[var(--ykp-muted)] leading-relaxed pt-1">
                      {person.note}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
            </div>
          </div>

          <div className="mt-14 sm:mt-16 space-y-8">
            <div className="max-w-3xl space-y-4 text-white/65 text-base leading-relaxed">
              {ABOUT_DATA.closing.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="text-white font-semibold">
                {ABOUT_DATA.closer}
              </p>
            </div>
            <button
              onClick={() => openModal('learn-more')}
              className="ykp-btn-gold cursor-pointer"
            >
              {VISION_DATA.ctaText}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <EventGallerySlider setActiveTab={setActiveTab} />

      {/* Offerings */}
      <section id="offerings" className="py-20 sm:py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="ykp-eyebrow">Our offerings</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ykp-ink)]">
              {TALENTS_SECTION.subtitle}
            </h2>
            <p className="text-[var(--ykp-muted)] text-base leading-relaxed">
              {TALENTS_SECTION.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {TALENTS_SECTION.offerings.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group ykp-card p-3 pb-6"
              >
                <div className="aspect-[16/11] overflow-hidden rounded-xl mb-5">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="px-2">
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose — two features */}
      <section className="relative py-20 sm:py-24 bg-[#02150c] text-white overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(201,162,39,0.14),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(5,71,42,0.45),transparent_50%)]"
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="ykp-eyebrow">Why YKP</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white text-balance">
              {WHY_CHOOSE_DATA.title}
            </h2>
            <p className="text-white/65 text-base">
              {WHY_CHOOSE_DATA.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_CHOOSE_DATA.features.map((feature) => (
              <div key={feature.id} className="ykp-card overflow-hidden">
                <div className={`aspect-[16/9] overflow-hidden ${feature.id === 'nationwide-reach' ? 'bg-[#f4f1ea]' : ''}`}>
                  <SmartImage
                    src={feature.image}
                    alt={feature.title}
                    className={`w-full h-full ${feature.id === 'nationwide-reach' ? 'object-contain' : 'object-cover'}`}
                    loading="lazy"
                  />
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
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="ykp-eyebrow">Impact</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ykp-ink)]">
              Past Events & Impact
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAST_EVENTS.map((event) => (
              <div
                key={event.id}
                className="ykp-card overflow-hidden"
              >
                <div className="bg-[var(--ykp-green-deep)] text-white px-5 py-5">
                  <p className="text-[var(--ykp-gold)] text-xs font-semibold tracking-[0.2em] uppercase">{event.year}</p>
                  <h3 className="font-display text-lg font-semibold mt-1.5 leading-snug">{event.title}</h3>
                </div>
                <ul className="px-5 py-5 space-y-3 text-sm">
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
          <p className="ykp-eyebrow mb-3">Partners</p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ykp-ink)] mb-8">
            Our Partners
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-sm sm:text-base text-[var(--ykp-muted)] font-medium">
            {PARTNERS_DATA.map((partner) => (
              <span
                key={partner.id}
                className="rounded-full border border-[var(--ykp-green)]/10 bg-white px-3.5 py-1.5 hover:text-[var(--ykp-green)] hover:border-[var(--ykp-gold)]/40 transition-colors"
              >
                {partner.name}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => openModal('partner-inquiry')}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ykp-green)] cursor-pointer"
          >
            Become a mentor, educator, or partner
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <TestimonialsCarousel />

      <FaqSection />

      <ContactSection openModal={openModal} compact />

      <JoinMovementBanner openModal={openModal} />
    </div>
  );
};
