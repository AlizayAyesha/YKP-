import React from 'react';
import { MOVEMENT_BANNER } from '../data/youthData';
import { ModalType } from '../types';
import { ArrowRight } from 'lucide-react';

interface JoinMovementBannerProps {
  openModal?: (type: ModalType) => void;
}

export const JoinMovementBanner: React.FC<JoinMovementBannerProps> = ({ openModal }) => {
  return (
    <section className="bg-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--ykp-green)]/10">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--ykp-ink)] text-balance">
          {MOVEMENT_BANNER.title}
        </h2>
        <p className="text-[var(--ykp-muted)] text-base max-w-xl mx-auto leading-relaxed">
          {MOVEMENT_BANNER.description}
        </p>
        <button
          type="button"
          onClick={() => openModal?.('student-register')}
          className="inline-flex items-center justify-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-sm px-8 py-3.5 rounded-md transition-colors cursor-pointer"
        >
          {MOVEMENT_BANNER.ctaText}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
