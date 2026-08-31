import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  Sparkles,
  Users,
  Mic2,
  GraduationCap,
  Cpu,
  Network
} from 'lucide-react';
import { FEATURED_EVENT, FEATURED_EVENT_SPEAKERS } from '../data/youthData';
import { EventProfileRole, PublicEventProfile, YkpEvent } from '../types';
import { LocationMap } from './LocationMap';
import { EVENT_VENUE_LOCATION } from '../lib/location';
import { EventInviteCinema } from './EventInviteCinema';

interface EventDetailViewProps {
  event?: YkpEvent;
  onRsvp: (event: YkpEvent) => void;
  onSubmitProfile: (event: YkpEvent) => void;
}

const ROLE_FILTERS: Array<{ id: 'all' | EventProfileRole; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'Guest of Honor', label: 'Guests of Honor' },
  { id: 'Speaker', label: 'Speakers' },
  { id: 'Panelist', label: 'Panelists' }
];

const expectIcons = [Mic2, Cpu, GraduationCap, Network, Sparkles];

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  event = FEATURED_EVENT,
  onRsvp,
  onSubmitProfile
}) => {
  const [apiProfiles, setApiProfiles] = useState<PublicEventProfile[]>([]);
  const [filter, setFilter] = useState<'all' | EventProfileRole>('all');
  const [selected, setSelected] = useState<PublicEventProfile | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/events/${event.id}/profiles`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setApiProfiles(data.profiles || []);
      })
      .catch(() => {
        if (!cancelled) setApiProfiles([]);
      });
    return () => {
      cancelled = true;
    };
  }, [event.id]);

  const profiles = useMemo(() => {
    const unique = new Map<string, PublicEventProfile>();
    for (const person of FEATURED_EVENT_SPEAKERS) {
      unique.set(person.fullName.toLowerCase(), person);
    }
    for (const person of apiProfiles) {
      const existing = unique.get(person.fullName.toLowerCase());
      unique.set(person.fullName.toLowerCase(), {
        ...existing,
        ...person,
        linkedinUrl: person.linkedinUrl || existing?.linkedinUrl,
        photoUrl: person.photoUrl || existing?.photoUrl,
        featuredSpeaker: Boolean(person.featuredSpeaker || existing?.featuredSpeaker),
        featuredPanelist: Boolean(person.featuredPanelist || existing?.featuredPanelist)
      });
    }
    return Array.from(unique.values());
  }, [apiProfiles]);

  const distinguished = useMemo(
    () => profiles.filter((person) => person.role !== 'Participant'),
    [profiles]
  );
  const filtered = distinguished.filter((person) => filter === 'all' || person.role === filter);
  const featuredSpeakers = profiles.filter((person) => person.featuredSpeaker);
  const panelists = profiles.filter((person) => person.role === 'Panelist' || person.featuredPanelist);
  const place = [event.venue, event.city].filter(Boolean).join(', ');

  return (
    <div className="text-[var(--ykp-ink)]">
      <section className="relative overflow-hidden bg-section-green text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.18),transparent_52%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold-bright)]">
                National seminar
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08]">
                {event.title}
              </h1>
              <p className="text-xl sm:text-2xl text-[var(--ykp-gold)] font-display">
                {event.subtitle}
              </p>
              <p className="text-white/75 text-base sm:text-lg">
                {event.tagline}
              </p>
              {event.themeEnglish && (
                <p className="text-white/80 italic">{event.themeEnglish}</p>
              )}
              {event.themeUrdu && (
                <p className="text-white/70 text-lg" dir="rtl">{event.themeUrdu}</p>
              )}
              <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-white/75">
                <span>{event.dates}</span>
                <span className="text-[var(--ykp-gold)]">·</span>
                <span>{event.time}</span>
                <span className="text-[var(--ykp-gold)]">·</span>
                <span>{place}</span>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onRsvp(event)}
                  className="inline-flex items-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm px-6 py-3.5 rounded-md cursor-pointer"
                >
                  RSVP for URAAN-E-AI 2026
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#about-uraan"
                  className="inline-flex items-center gap-2 border border-white/25 hover:border-[var(--ykp-gold)] text-white font-semibold text-sm px-6 py-3.5 rounded-md"
                >
                  Explore Event
                </a>
              </div>
            </div>
            <div className="lg:col-span-6 pb-10">
              <EventInviteCinema event={event} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Calendar, label: 'Date', value: event.dates },
            { icon: Clock, label: 'Time', value: event.time },
            { icon: MapPin, label: 'Venue', value: place, href: EVENT_VENUE_LOCATION.googleMapsUrl }
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-4 bg-[var(--ykp-canvas)] rounded-xl">
              <item.icon className="w-5 h-5 text-[var(--ykp-green)] mt-0.5" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--ykp-muted)] font-semibold">{item.label}</p>
                {'href' in item && item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 font-medium text-[var(--ykp-green)] hover:underline block"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 font-medium">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <LocationMap
        location={EVENT_VENUE_LOCATION}
        title="Event venue"
        description="URAAN-E-AI 2026 is at DHA Suffa University, Karachi. Switch between Google Maps and Bing Maps, or open directions in a new tab."
      />

      <section id="about-uraan" className="py-16 sm:py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold)]">Event overview</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">About URAAN-E-AI 2026</h2>
          {(event.about || [event.description]).map((paragraph) => (
            <p key={paragraph} className="text-[var(--ykp-muted)] leading-relaxed text-base sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <PeopleSection
        title="Distinguished Guests & Participants"
        eyebrow="Officially confirmed"
        people={filtered}
        empty="Confirmed guests, speakers and leaders will appear here after YKP approval. No unpublished profiles are shown."
        filters={ROLE_FILTERS}
        filter={filter}
        onFilter={setFilter}
        onSelect={setSelected}
        extra={(
          <button
            type="button"
            onClick={() => onSubmitProfile(event)}
            className="text-sm font-semibold text-[var(--ykp-green)] cursor-pointer"
          >
            Invited to participate? Submit your profile
          </button>
        )}
      />

      <PeopleSection
        title="Featured Speakers"
        eyebrow="Stage"
        people={featuredSpeakers}
        empty="Featured speakers will be published here once YKP marks approved profiles as featured."
        onSelect={setSelected}
        prominent
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold)]">Panel discussion</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">{event.panelTitle}</h2>
            <p className="text-lg text-[var(--ykp-green)] font-display">{event.panelSubtitle}</p>
            {event.panelIntro?.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="text-[var(--ykp-muted)] leading-relaxed">{paragraph}</p>
            ))}
            {event.panelSummary && (
              <p className="text-[var(--ykp-ink)] font-medium leading-relaxed">{event.panelSummary}</p>
            )}
          </div>
          {panelists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {panelists.map((person) => (
                <div key={person.id} className="contents">
                  <PersonCard person={person} onSelect={setSelected} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--ykp-muted)]">Panelists will appear here after they are approved by YKP.</p>
          )}
        </div>
      </section>

      {event.panelTopics && event.panelTopics.length > 0 && (
        <section className="py-16 sm:py-20 bg-[var(--ykp-canvas)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-semibold mb-8">Six Panel Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {event.panelTopics.map((topic, i) => (
                <article key={topic.title} className="bg-white p-6 rounded-xl border border-gray-100">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ykp-gold)]">0{i + 1}</p>
                  <h3 className="font-display text-xl font-semibold mt-2">{topic.title}</h3>
                  <p className="mt-2 text-sm text-[var(--ykp-muted)] leading-relaxed">{topic.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {event.panelQuestion && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold)]">Signature question</p>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold leading-snug">
              {event.panelQuestion}
            </h2>
          </div>
        </section>
      )}

      {event.expect && (
        <section className="py-16 sm:py-20 bg-[var(--ykp-canvas)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-semibold mb-8">What to Expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {event.expect.map((item, i) => {
                const Icon = expectIcons[i] || Sparkles;
                return (
                  <article key={item.title} className="bg-white p-6 rounded-xl border border-gray-100">
                    <Icon className="w-6 h-6 text-[var(--ykp-green)]" />
                    <h3 className="font-display text-xl font-semibold mt-4">{item.title}</h3>
                    <p className="mt-2 text-sm text-[var(--ykp-muted)] leading-relaxed">{item.detail}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {event.whoShouldAttend && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-6 h-6 text-[var(--ykp-green)]" />
              <h2 className="font-display text-3xl font-semibold">Who Should Attend</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {event.whoShouldAttend.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-[var(--ykp-green)]/8 text-[var(--ykp-green)] text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="rsvp" className="py-16 sm:py-20 bg-[var(--ykp-green-deep)] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-5">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">Reserve your place</h2>
          <p className="text-white/70">
            RSVP to receive your unique registration ID and official URAAN-E-AI attendee poster. Regular attendee details stay private unless you opt in.
          </p>
          <button
            type="button"
            onClick={() => onRsvp(event)}
            className="inline-flex items-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm px-7 py-3.5 rounded-md cursor-pointer"
          >
            RSVP for URAAN-E-AI 2026
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <h2 className="font-display text-2xl font-semibold">{event.title}</h2>
              <p className="text-[var(--ykp-muted)]">{event.subtitle}</p>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <Info label="Date" value={event.dates} />
              <Info label="Time" value={event.time} />
              <Info label="Venue" value={place} />
              <Info label="Organizer" value={event.organizer} />
              <Info label="Contact" value={event.contactPhone} />
            </dl>
            <div className="flex flex-wrap gap-3 pt-2">
              {event.instagramUrl && (
                <a href={event.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--ykp-green)]">
                  <Instagram className="w-4 h-4" /> Official Instagram
                </a>
              )}
              {event.facebookUrl && (
                <a href={event.facebookUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--ykp-green)]">
                  <Facebook className="w-4 h-4" /> Official Facebook
                </a>
              )}
              {event.contactPhone && (
                <a href={`tel:${event.contactPhone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-sm text-[var(--ykp-green)]">
                  <Phone className="w-4 h-4" /> {event.contactPhone}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--ykp-canvas)]">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-5">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">Ready to Join Pakistan's Digital Flight?</h2>
          <p className="text-[var(--ykp-muted)]">Be part of the conversation shaping Pakistan's AI future.</p>
          <button
            type="button"
            onClick={() => onRsvp(event)}
            className="inline-flex items-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm px-7 py-3.5 rounded-md cursor-pointer"
          >
            RSVP for URAAN-E-AI 2026
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[var(--ykp-green-deep)]/70" onClick={() => setSelected(null)}>
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-xl p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <img src={selected.photoUrl} alt={selected.fullName} className="w-full aspect-[4/5] object-cover object-top rounded-lg" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--ykp-gold)] font-semibold">{selected.role}</p>
              <h3 className="font-display text-2xl font-semibold mt-1">{selected.fullName}</h3>
              {selected.designation ? <p className="text-sm text-[var(--ykp-ink)] mt-1">{selected.designation}</p> : null}
              {selected.organization ? <p className="text-sm text-[var(--ykp-muted)]">{selected.organization}</p> : null}
            </div>
            {selected.bio && <p className="text-sm text-[var(--ykp-muted)] leading-relaxed">{selected.bio}</p>}
            {selected.linkedinUrl && (
              <a
                href={selected.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ykp-green)] hover:underline"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn profile
              </a>
            )}
            <button type="button" onClick={() => setSelected(null)} className="w-full border border-[var(--ykp-green)]/20 py-3 text-sm font-semibold cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function Info({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--ykp-muted)] font-semibold">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}

function PeopleSection({
  title,
  eyebrow,
  people,
  empty,
  filters,
  filter,
  onFilter,
  onSelect,
  extra,
  prominent
}: {
  title: string;
  eyebrow: string;
  people: PublicEventProfile[];
  empty: string;
  filters?: typeof ROLE_FILTERS;
  filter?: 'all' | EventProfileRole;
  onFilter?: (value: 'all' | EventProfileRole) => void;
  onSelect: (person: PublicEventProfile) => void;
  extra?: React.ReactNode;
  prominent?: boolean;
}) {
  return (
    <section className={`py-16 sm:py-20 ${prominent ? 'bg-white' : 'bg-[var(--ykp-canvas)]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold)]">{eyebrow}</p>
            <h2 className="font-display text-3xl font-semibold mt-2">{title}</h2>
          </div>
          {extra}
        </div>
        {filters && onFilter && (
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onFilter(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                  filter === item.id
                    ? 'bg-[var(--ykp-green)] text-white'
                    : 'bg-white text-[var(--ykp-muted)] border border-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
        {people.length === 0 ? (
          <p className="text-sm text-[var(--ykp-muted)]">{empty}</p>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${prominent ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-5`}>
            {people.map((person) => (
              <div key={person.id} className="contents">
                <PersonCard person={person} onSelect={onSelect} prominent={prominent} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PersonCard({
  person,
  onSelect,
  prominent
}: {
  person: PublicEventProfile;
  onSelect: (person: PublicEventProfile) => void;
  prominent?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-left bg-white rounded-xl overflow-hidden border border-gray-100 ${prominent ? 'shadow-sm' : ''}`}
    >
      <button type="button" onClick={() => onSelect(person)} className="w-full text-left cursor-pointer">
        <img src={person.photoUrl} alt={person.fullName} className="w-full aspect-[4/5] object-cover object-top" />
        <div className="p-4 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[var(--ykp-gold)]">{person.role}</p>
          <h3 className="font-display text-lg font-semibold leading-tight">{person.fullName}</h3>
          {person.designation ? <p className="text-sm">{person.designation}</p> : null}
          {person.organization ? <p className="text-xs text-[var(--ykp-muted)]">{person.organization}</p> : null}
        </div>
      </button>
      {person.linkedinUrl && (
        <div className="px-4 pb-4">
          <a
            href={person.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ykp-green)] hover:underline"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
        </div>
      )}
    </motion.article>
  );
}
