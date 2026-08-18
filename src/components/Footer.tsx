import React from 'react';
import { ArrowUp, Facebook, Youtube, Instagram, Mail } from 'lucide-react';
import { ActiveTab, ModalType } from '../types';
import { SITE_INFO } from '../data/youthData';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openModal: (type: ModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--ykp-green-deep)] text-white/70 font-sans text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-5 lg:col-span-1">
            <div className="inline-block bg-white rounded-md px-3 py-2">
              <img
                src="/ykp-logo.png"
                alt="Youth Ka Pakistan — Education & Skills Business Forum"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              Unleashing the potential of Pakistani youth through skills, mentorship, and real opportunities nationwide.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { href: SITE_INFO.socials.facebook, icon: Facebook, label: 'Facebook' },
                { href: SITE_INFO.socials.youtube, icon: Youtube, label: 'Youtube' },
                { href: SITE_INFO.socials.instagram, icon: Instagram, label: 'Instagram' }
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/15 hover:border-[var(--ykp-gold)] hover:text-[var(--ykp-gold)] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="pt-6">
              <h4 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-5">
                Get in touch
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[var(--ykp-gold)] shrink-0" />
                  <a
                    href={`mailto:${SITE_INFO.contactEmail}`}
                    className="hover:text-white transition-colors"
                  >
                    {SITE_INFO.contactEmail}
                  </a>
                </li>
                <li className="flex flex-col items-start gap-2 pt-1">
                  <button
                    onClick={() => openModal('student-register')}
                    className="inline-flex items-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-xs tracking-wide px-5 py-2.5 transition-colors cursor-pointer"
                  >
                    Become a Student
                  </button>
                  <button
                    onClick={() => openModal('partner-inquiry')}
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-[var(--ykp-gold)] hover:text-[var(--ykp-gold)] font-semibold text-xs tracking-wide px-5 py-2.5 transition-colors cursor-pointer"
                  >
                    Partner / Mentor Inquiry
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-5">
              Navigate
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home', action: () => { setActiveTab('home'); scrollToTop(); } },
                { label: 'Events', action: () => { setActiveTab('events'); scrollToTop(); } },
                { label: 'Gallery', action: () => { setActiveTab('gallery'); scrollToTop(); } },
                { label: 'Blog', action: () => { setActiveTab('blog'); scrollToTop(); } },
                { label: 'Contact', action: () => { setActiveTab('contact'); scrollToTop(); } }
              ].map((item) => (
                <li key={item.label}>
                  <button onClick={item.action} className="hover:text-white transition-colors cursor-pointer">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-5">
              Programs
            </h4>
            <ul className="space-y-3 text-sm text-white/55">
              {['Skills Development', 'Event Management', 'Talent Promotion', 'Free Mentorship'].map((label) => (
                <li key={label}>
                  <button
                    onClick={() => openModal('program-enroll')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>{SITE_INFO.copyright}</div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-[var(--ykp-gold)] transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
