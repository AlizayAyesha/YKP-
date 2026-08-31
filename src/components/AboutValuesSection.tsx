import React from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, Eye, Sparkles, Target, Users } from 'lucide-react';
import { ABOUT_DATA, VISION_DATA } from '../data/youthData';

const VALUE_ICONS = {
  educate: BookOpen,
  empower: Sparkles,
  skill: Award,
  connect: Users
} as const;

export const AboutValuesSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-6 space-y-6"
      >
        <span className="inline-flex items-center rounded-full bg-[#E7F2EC] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ykp-green)]">
          {ABOUT_DATA.eyebrow}
        </span>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[var(--ykp-ink)] tracking-tight leading-[1.15] text-balance">
          {ABOUT_DATA.heading}
        </h2>

        <p className="font-display text-lg sm:text-xl text-[var(--ykp-green)] font-semibold tracking-tight">
          {VISION_DATA.motto}
        </p>

        <div className="space-y-4 text-[var(--ykp-muted)] text-[15px] sm:text-base leading-relaxed max-w-xl">
          {ABOUT_DATA.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <article className="rounded-2xl bg-white border border-black/[0.04] p-5 [box-shadow:0_8px_16px_rgba(11,31,20,0.04),0_28px_44px_-10px_rgba(11,31,20,0.10)]">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F2EC] text-[var(--ykp-green)]">
              <Eye className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
            </span>
            <h3 className="font-semibold text-[var(--ykp-ink)] mb-1.5">{ABOUT_DATA.vision.title}</h3>
            <p className="text-sm text-[var(--ykp-muted)] leading-relaxed">
              {ABOUT_DATA.vision.description}
            </p>
          </article>

          <article className="rounded-2xl bg-white border border-black/[0.04] p-5 [box-shadow:0_8px_16px_rgba(11,31,20,0.04),0_28px_44px_-10px_rgba(11,31,20,0.10)]">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6EED4] text-[var(--ykp-gold)]">
              <Target className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
            </span>
            <h3 className="font-semibold text-[var(--ykp-ink)] mb-1.5">{ABOUT_DATA.mission.title}</h3>
            <p className="text-sm text-[var(--ykp-muted)] leading-relaxed">
              {ABOUT_DATA.mission.description}
            </p>
          </article>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-6 relative overflow-visible pb-16 lg:pb-20"
      >
        <div
          className="pointer-events-none absolute -top-10 right-4 h-48 w-48 rounded-full bg-[var(--ykp-green)]/[0.06] blur-3xl"
          aria-hidden
        />
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {ABOUT_DATA.values.map((item, index) => (
            <ValueCard
              key={item.id}
              item={item}
              delay={index * 0.06}
              className={index % 2 === 1 ? 'sm:mt-10 lg:mt-14' : ''}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ValueCard: React.FC<{
  item: (typeof ABOUT_DATA.values)[number];
  delay: number;
  className?: string;
}> = ({ item, delay, className = '' }) => {
  const Icon = VALUE_ICONS[item.id as keyof typeof VALUE_ICONS] ?? BookOpen;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`relative rounded-2xl bg-white border border-black/[0.04] p-6 [box-shadow:0_10px_18px_rgba(11,31,20,0.05),0_44px_70px_-8px_rgba(11,31,20,0.14)] ${className}`}
    >
      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F2EC] text-[var(--ykp-green)]">
        <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
      </span>
      <h3 className="font-semibold text-[var(--ykp-ink)] mb-1.5">{item.title}</h3>
      <p className="text-sm text-[var(--ykp-muted)] leading-relaxed">{item.short}</p>
    </motion.article>
  );
};
