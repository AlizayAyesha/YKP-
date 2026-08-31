import React from 'react';
import { SITE_FAQS } from '../data/faq';

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 sm:py-20 bg-white scroll-mt-24" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="ykp-eyebrow mb-3">Questions</p>
        <h2 id="faq-heading" className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ykp-ink)] tracking-tight mb-8">
          Frequently asked questions
        </h2>
        <div className="divide-y divide-black/[0.06] border-y border-black/[0.06]">
          {SITE_FAQS.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="cursor-pointer list-none font-semibold text-[var(--ykp-ink)] pr-8 relative text-left">
                {item.question}
                <span className="absolute right-0 top-0 text-[var(--ykp-gold)] text-xl leading-none group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--ykp-muted)] leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
