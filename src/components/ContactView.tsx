import React from 'react';
import { JoinMovementBanner } from './JoinMovementBanner';
import { ContactSection } from './ContactSection';
import { ModalType } from '../types';

interface ContactViewProps {
  openModal: (type: ModalType) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ openModal }) => {
  return (
    <div className="text-[var(--ykp-ink)]">
      <section className="relative bg-section-green text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.15),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-4">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold-bright)]">
            Get in touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold italic text-white tracking-tight">
            We&apos;d love to hear from you
          </h1>
          <p className="text-white/65 text-base max-w-xl mx-auto">
            Questions, virtual classes, or mentoring and partnership — we&apos;ll guide you in.
          </p>
        </div>
      </section>

      <ContactSection openModal={openModal} />

      <JoinMovementBanner openModal={openModal} />
    </div>
  );
};
