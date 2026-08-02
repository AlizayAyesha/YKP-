import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { EVENTS_DATA } from '../data/youthData';
import { YkpEvent } from '../types';

interface EventsViewProps {
  onRsvp: (event: YkpEvent) => void;
}

const statusStyles: Record<YkpEvent['status'], string> = {
  Open: 'bg-[var(--ykp-gold)] text-[var(--ykp-ink)]',
  Upcoming: 'bg-[var(--ykp-green)]/10 text-[var(--ykp-green)]',
  Completed: 'bg-gray-100 text-gray-500'
};

export const EventsView: React.FC<EventsViewProps> = ({ onRsvp }) => {
  const openEvents = EVENTS_DATA.filter((e) => e.status !== 'Completed');
  const pastEvents = EVENTS_DATA.filter((e) => e.status === 'Completed');

  return (
    <div className="text-[var(--ykp-ink)]">
      <section className="relative bg-section-green text-white py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.15),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-4">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold-bright)]">
            Join us live
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            YKP Events
          </h1>
          <p className="text-white/70 text-base max-w-xl mx-auto leading-relaxed">
            Workshops, showcases, and summits across Pakistan. RSVP to reserve your seat — free for students.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-8">
              Upcoming & open for RSVP
            </h2>
            <div className="space-y-8">
              {openEvents.map((event, i) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
                >
                  <div className="lg:col-span-5 aspect-[16/10] lg:aspect-auto lg:min-h-[260px] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${statusStyles[event.status]}`}>
                        {event.status === 'Open' ? 'RSVP Open' : event.status}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ykp-muted)] px-2.5 py-1 bg-[var(--ykp-canvas)] rounded">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ykp-ink)] leading-tight">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-sm text-[var(--ykp-muted)] leading-relaxed flex-1">
                      {event.summary}
                    </p>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-[var(--ykp-muted)]">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[var(--ykp-green)] shrink-0" />
                        {event.dates}
                      </span>
                      {event.time && (
                        <span className="inline-flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[var(--ykp-green)] shrink-0" />
                          {event.time}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[var(--ykp-green)] shrink-0" />
                        {event.venue}, {event.city}
                      </span>
                      {event.capacity && (
                        <span className="inline-flex items-center gap-2">
                          <Users className="w-4 h-4 text-[var(--ykp-green)] shrink-0" />
                          {event.capacity} · {event.fees}
                        </span>
                      )}
                    </div>
                    <ul className="mt-4 space-y-1.5">
                      {event.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="text-xs text-[var(--ykp-muted)] flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--ykp-gold)] shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => onRsvp(event)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm px-6 py-3.5 rounded-md transition-colors cursor-pointer"
                      >
                        RSVP for this event
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {pastEvents.length > 0 && (
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-8">
                Past events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.map((event) => (
                  <article
                    key={event.id}
                    className="border border-gray-200 rounded-xl overflow-hidden bg-[var(--ykp-canvas)]"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${statusStyles.Completed}`}>
                        Completed
                      </span>
                      <h3 className="font-display text-xl font-semibold">{event.title}</h3>
                      <p className="text-sm text-[var(--ykp-muted)]">{event.dates} · {event.city}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
