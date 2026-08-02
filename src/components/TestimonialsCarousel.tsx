import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/youthData';

const AUTO_MS = 5500;

export const TestimonialsCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[index];

  const goTo = (next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + total) % total);
  };

  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, total, index]);

  return (
    <section className="py-20 sm:py-24 bg-[var(--ykp-green-deep)] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold)]">
            Voices from the movement
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Real youth. Real change.
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[320px] sm:min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -48 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center"
              >
                <div className="md:col-span-4 flex justify-center md:justify-start">
                  <div className="relative">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-4 ring-[var(--ykp-gold)]/40 shadow-2xl">
                      <img
                        src={current.image}
                        alt={current.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[var(--ykp-gold)] text-[var(--ykp-ink)] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                      {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8 text-center md:text-left">
                  <span className="font-display text-6xl leading-none text-[var(--ykp-gold)]/35 select-none">
                    “
                  </span>
                  <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-medium italic leading-snug text-white/95 -mt-6 text-balance">
                    {current.quote}
                  </blockquote>
                  <div className="mt-8 pt-5 border-t border-white/10 inline-flex flex-col md:items-start items-center">
                    <p className="font-semibold text-base text-white">{current.author}</p>
                    <p className="text-sm text-[var(--ykp-gold)] mt-1">
                      {current.role} · {current.city}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-white/20 hover:border-[var(--ykp-gold)] hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-white/20 hover:border-[var(--ykp-gold)] hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === index
                      ? 'w-8 bg-[var(--ykp-gold)]'
                      : 'w-3 bg-white/25 hover:bg-white/45'
                  }`}
                />
              ))}
            </div>

            {/* Auto progress bar */}
            <div className="hidden sm:block w-24 h-1 rounded-full bg-white/15 overflow-hidden">
              <motion.div
                key={`${index}-${paused}`}
                className="h-full bg-[var(--ykp-gold)]"
                initial={{ width: '0%' }}
                animate={{ width: paused ? '0%' : '100%' }}
                transition={
                  paused
                    ? { duration: 0 }
                    : { duration: AUTO_MS / 1000, ease: 'linear' }
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
