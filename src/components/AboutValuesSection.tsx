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

const ease = [0.22, 1, 0.36, 1] as const;

export const AboutValuesSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease }}
        className="lg:col-span-6 space-y-6"
      >
        <span className="inline-flex items-center rounded-full border border-[var(--ykp-gold)]/35 bg-black/25 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ykp-gold)]">
          {ABOUT_DATA.eyebrow}
        </span>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white tracking-tight leading-[1.15] text-balance">
          {ABOUT_DATA.heading}
        </h2>

        <div className="space-y-3">
          <p className="font-display text-lg sm:text-xl text-[var(--ykp-gold)] font-semibold tracking-tight">
            {VISION_DATA.motto}
          </p>
          <span className="block h-px w-14 bg-gradient-to-r from-[var(--ykp-gold)] to-transparent" />
        </div>

        <div className="space-y-4 text-white/65 text-[15px] sm:text-base leading-relaxed max-w-xl">
          {ABOUT_DATA.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <GlassNote
            icon={Eye}
            tone="green"
            title={ABOUT_DATA.vision.title}
            body={ABOUT_DATA.vision.description}
            delay={0.08}
          />
          <GlassNote
            icon={Target}
            tone="gold"
            title={ABOUT_DATA.mission.title}
            body={ABOUT_DATA.mission.description}
            delay={0.16}
          />
        </div>
      </motion.div>

      <div className="lg:col-span-6 relative overflow-visible pb-8 lg:pb-20">
        <div
          className="pointer-events-none absolute -top-10 right-4 h-48 w-48 rounded-full bg-[var(--ykp-gold)]/[0.12] blur-3xl ykp-glow-pulse"
          aria-hidden
        />
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {ABOUT_DATA.values.map((item, index) => (
            <ValueCard
              key={item.id}
              item={item}
              delay={index * 0.08}
              className={index % 2 === 1 ? 'sm:mt-10 lg:mt-14' : ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const GlassNote: React.FC<{
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: 'green' | 'gold';
  title: string;
  body: string;
  delay: number;
}> = ({ icon: Icon, tone, title, body, delay }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease }}
    whileHover={{ y: -4 }}
    className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md p-5 hover:border-[var(--ykp-gold)]/30 hover:bg-white/[0.08] transition-colors"
  >
    <span
      className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
        tone === 'gold'
          ? 'bg-[var(--ykp-gold)]/15 text-[var(--ykp-gold)]'
          : 'bg-white/10 text-[var(--ykp-gold-bright)]'
      }`}
    >
      <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
    </span>
    <h3 className="font-semibold text-white mb-1.5">{title}</h3>
    <p className="text-sm text-white/60 leading-relaxed">{body}</p>
  </motion.article>
);

const ValueCard: React.FC<{
  item: (typeof ABOUT_DATA.values)[number];
  delay: number;
  className?: string;
}> = ({ item, delay, className = '' }) => {
  const Icon = VALUE_ICONS[item.id as keyof typeof VALUE_ICONS] ?? BookOpen;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease }}
      whileHover={{ y: -6 }}
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-5 sm:p-6 hover:border-[var(--ykp-gold)]/35 hover:bg-white/[0.09] transition-colors ${className}`}
    >
      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--ykp-gold)]/12 text-[var(--ykp-gold)] transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
      </span>
      <h3 className="font-semibold text-white mb-1.5">{item.title}</h3>
      <p className="text-sm text-white/60 leading-relaxed">{item.short}</p>
    </motion.article>
  );
};
