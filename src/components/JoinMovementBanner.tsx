import React from 'react';
import { motion } from 'motion/react';
import { MOVEMENT_BANNER } from '../data/youthData';
import { ModalType } from '../types';
import { ArrowRight } from 'lucide-react';

interface JoinMovementBannerProps {
  openModal?: (type: ModalType) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export const JoinMovementBanner: React.FC<JoinMovementBannerProps> = ({ openModal }) => {
  return (
    <section className="relative overflow-hidden bg-[#02150c] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_-20%,rgba(201,162,39,0.18),transparent_55%)]" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ykp-gold)]/10 blur-3xl ykp-glow-pulse"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
        className="relative max-w-3xl mx-auto text-center space-y-6"
      >
        <p className="ykp-eyebrow">Join the movement</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white text-balance">
          {MOVEMENT_BANNER.title}
        </h2>
        <span className="mx-auto block h-px w-16 bg-gradient-to-r from-transparent via-[var(--ykp-gold)] to-transparent" />
        <p className="text-white/65 text-base max-w-xl mx-auto leading-relaxed">
          {MOVEMENT_BANNER.description}
        </p>
        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          onClick={() => openModal?.('student-register')}
          className="ykp-btn-gold cursor-pointer"
        >
          {MOVEMENT_BANNER.ctaText}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  );
};
