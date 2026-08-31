import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ALBUMS, HOME_GALLERY_FRAMES } from '../data/youthData';
import { tabToPath } from '../lib/seo';
import { ActiveTab } from '../types';

const AUTO_MS = 4500;

const FRAME_SIZE: Record<(typeof HOME_GALLERY_FRAMES)[number]['size'], string> = {
  hero: 'col-span-2 md:col-span-8 aspect-[16/10] md:aspect-auto md:min-h-[260px] lg:min-h-[300px]',
  tall: 'col-span-1 md:col-span-4 md:row-span-2 aspect-[3/4] md:aspect-auto',
  tile: 'col-span-1 md:col-span-4 aspect-[4/3]',
  wide: 'col-span-2 md:col-span-12 aspect-[16/8] md:aspect-[21/8]'
};

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
    <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 bg-white">
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

        <div className="mt-4 sm:mt-5 grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4">
          {HOME_GALLERY_FRAMES.map((frame, i) => (
            <motion.button
              key={frame.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.24) }}
              onClick={(event) => {
                event.preventDefault();
                setActiveTab('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`group relative overflow-hidden rounded-2xl bg-[var(--ykp-green-deep)] text-left cursor-pointer [box-shadow:0_10px_18px_rgba(3,40,22,0.06),0_28px_48px_-10px_rgba(3,40,22,0.16)] ${FRAME_SIZE[frame.size]}`}
            >
              <img
                src={frame.url}
                alt={frame.alt}
                loading="lazy"
                className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.04] ${
                  frame.fit === 'contain' ? 'object-contain p-2 sm:p-3' : 'object-cover'
                }`}
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <span className="block text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--ykp-gold)]">
                  {frame.year}
                </span>
                <span className="mt-0.5 block font-display text-sm sm:text-base font-semibold text-white leading-snug">
                  {frame.eventName}
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
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
