import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ALBUMS } from '../data/youthData';
import { tabToPath } from '../lib/seo';
import { ActiveTab } from '../types';

const AUTO_MS = 4500;

interface EventGallerySliderProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const EventGallerySlider: React.FC<EventGallerySliderProps> = ({ setActiveTab }) => {
  const slides = useMemo(
    () =>
      GALLERY_ALBUMS.flatMap((album) =>
        album.images
          .filter((image) => !/poster|cover/i.test(`${image.id} ${image.caption} ${image.url}`))
          .slice(0, 5)
          .map((image) => ({
            id: `${album.id}-${image.id}`,
            url: image.url,
            eventName: album.name,
            year: album.year,
            caption: image.caption
          }))
      ),
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const total = slides.length;
  const current = slides[index];

  const goTo = (next: number, dir: number) => {
    if (!total) return;
    setDirection(dir);
    setIndex((next + total) % total);
  };

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, total, index]);

  if (!current) return null;

  const openGallery = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    setActiveTab('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="pt-6 pb-4 sm:pt-8 sm:pb-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[21/9] overflow-hidden rounded-2xl bg-[var(--ykp-green-deep)] shadow-[0_18px_50px_rgba(3,40,22,0.22)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={current.id}
              src={current.url}
              alt={`${current.eventName} — ${current.caption}`}
              custom={direction}
              initial={{ opacity: 0, scale: 1.06, x: direction * 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10 z-10">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase text-[var(--ykp-gold)] mb-1.5">
              {current.year} · Gallery
            </p>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight text-balance">
              {current.eventName}
            </h3>
            {current.caption && (
              <p className="mt-1.5 text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
                {current.caption}
              </p>
            )}
          </div>

          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1, -1)}
              aria-label="Previous event photo"
              className="w-10 h-10 rounded-full bg-black/35 hover:bg-black/55 border border-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1, 1)}
              aria-label="Next event photo"
              className="w-10 h-10 rounded-full bg-black/35 hover:bg-black/55 border border-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 right-5 sm:bottom-6 sm:right-8 z-10 flex items-center gap-1.5">
            <span className="sm:hidden text-xs font-medium text-white/80 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show ${slide.eventName}`}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === index ? 'w-7 bg-[var(--ykp-gold)]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <a
            href={tabToPath('gallery')}
            onClick={openGallery}
            className="text-sm font-semibold text-[var(--ykp-green)] hover:text-[var(--ykp-green-deep)]"
          >
            View full gallery
          </a>
        </div>
      </div>
    </section>
  );
};
