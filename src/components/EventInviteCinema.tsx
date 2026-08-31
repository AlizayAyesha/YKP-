import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { YkpEvent } from '../types';
import { SmartImage } from './SmartImage';

interface EventInviteCinemaProps {
  event: YkpEvent;
  className?: string;
}

export const EventInviteCinema: React.FC<EventInviteCinemaProps> = ({ event, className = '' }) => {
  const [playing, setPlaying] = useState(false);
  const youtubeId = event.inviteYoutubeId?.trim();
  const fileUrl = event.inviteVideoUrl?.trim();
  const canPlay = Boolean(youtubeId || fileUrl);
  const poster = event.invitePoster || event.image;
  const title = [event.title, event.subtitle].filter(Boolean).join(' — ');

  const start = () => {
    if (canPlay) setPlaying(true);
  };

  return (
    <div className={`relative overflow-visible ${className}`}>
      <div className="relative rounded-2xl p-[1px] bg-[linear-gradient(135deg,#E8C547_0%,#7a5c12_18%,#05472A_42%,#C9A227_68%,#032816_100%)] [box-shadow:0_14px_28px_rgba(0,0,0,0.45),0_36px_64px_rgba(0,0,0,0.52)]">
        <div className="relative overflow-hidden rounded-[15px] bg-[#010a06]">
          <div className="relative aspect-video bg-black">
            {playing && youtubeId ? (
              <iframe
                title={`${title} official invitation`}
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : playing && fileUrl ? (
              <video
                src={fileUrl}
                poster={poster}
                autoPlay
                controls
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <button
                type="button"
                onClick={start}
                className="group absolute inset-0 cursor-pointer text-left"
                aria-label={`Play official invitation for ${title}`}
              >
                <SmartImage
                  src={poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover scale-105 motion-safe:animate-[ykp-kenburns_22s_ease-in-out_infinite_alternate]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,10,6,0.15)_0%,rgba(1,10,6,0.35)_45%,rgba(1,10,6,0.82)_100%)]" />
                <div className="absolute inset-0 opacity-[0.14] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

                <span className="absolute top-3 left-3 sm:top-6 sm:left-6 inline-flex items-center gap-2 rounded-full border border-[var(--ykp-gold)]/40 bg-black/40 px-2.5 sm:px-3 py-1 sm:py-1.5 backdrop-blur-sm max-w-[calc(100%-1.5rem)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--ykp-gold)] shrink-0" />
                  <span className="text-[9px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[var(--ykp-gold)] truncate">
                    Official invitation
                  </span>
                </span>

                <span className="absolute inset-0 flex items-center justify-center -translate-y-3 sm:translate-y-0">
                  <span className="relative flex h-14 w-14 sm:h-24 sm:w-24 items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-[var(--ykp-gold)]/50 motion-safe:animate-ping opacity-40" />
                    <span className="absolute inset-1 rounded-full border border-white/20" />
                    <span className="relative flex h-11 w-11 sm:h-[4.5rem] sm:w-[4.5rem] items-center justify-center rounded-full bg-[var(--ykp-gold)] text-[var(--ykp-ink)] shadow-[0_12px_40px_rgba(201,162,39,0.45)] transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-5 w-5 sm:h-8 sm:w-8 fill-current ml-0.5 sm:ml-1" />
                    </span>
                  </span>
                </span>

                <span className="absolute bottom-0 inset-x-0 p-3 sm:p-8">
                  <p className="font-display text-lg sm:text-3xl lg:text-4xl font-semibold text-white leading-tight text-balance">
                    {event.title}
                  </p>
                  {event.subtitle && (
                    <p className="mt-0.5 sm:mt-1 text-[var(--ykp-gold)] font-display text-sm sm:text-xl">
                      {event.subtitle}
                    </p>
                  )}
                  <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm text-white/70 tracking-wide leading-snug break-words">
                    {[event.dates, event.time, event.venue].filter(Boolean).join('  ·  ')}
                  </p>
                  <span className="mt-2 sm:mt-4 flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-[9px] sm:text-[11px] font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-white/50">
                      YKP Foundation  ·  Pakistan&apos;s Digital Flight
                    </span>
                    <span className="text-[9px] sm:text-[11px] font-semibold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[var(--ykp-gold)]">
                      {event.registrationStatus || 'Invitation'}
                    </span>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <span className="pointer-events-none absolute -top-px left-8 h-px w-16 bg-[var(--ykp-gold)]/80" />
      <span className="pointer-events-none absolute -top-px right-8 h-px w-16 bg-[var(--ykp-gold)]/80" />
      <span className="pointer-events-none absolute left-[8%] right-[8%] -bottom-2 h-12 rounded-[100%] bg-black/50 blur-2xl" />
    </div>
  );
};
