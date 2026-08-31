import React from 'react';
import { ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { ActiveTab, ModalType } from '../types';
import { SITE_INFO } from '../data/youthData';
import { tabToPath } from '../lib/seo';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openModal: (type: ModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[var(--ykp-green-deep)] text-white/70 font-sans text-sm">
      <div className="h-[2px] bg-[linear-gradient(90deg,#05472A_0%,#C9A227_50%,#05472A_100%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-5 lg:col-span-1">
            <div className="inline-block bg-white rounded-xl px-3 py-2">
              <img
                src="/ykp-logo.png"
                alt="Youth Ka Pakistan logo — educate, empower, skills, and networking for Pakistani youth"
                className="h-16 w-auto object-contain"
                width={220}
                height={64}
              />
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              Unleashing the potential of Pakistani youth through skills, mentorship, and real opportunities nationwide.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              {SITE_INFO.patronInChief.role}: {SITE_INFO.patronInChief.name}
              <br />
              {SITE_INFO.chairperson.role}: {SITE_INFO.chairperson.name}
              <br />
              {SITE_INFO.president.role}: {SITE_INFO.president.name}, {SITE_INFO.president.honorific}
              <br />
              {SITE_INFO.vicePresident.role}: {SITE_INFO.vicePresident.name}
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { href: SITE_INFO.socials.facebook, icon: Facebook, label: 'Facebook' },
                { href: SITE_INFO.socials.instagram, icon: Instagram, label: 'Instagram' },
                { href: SITE_INFO.socials.linkedin, icon: Linkedin, label: 'LinkedIn' }
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-[var(--ykp-gold)] hover:text-[var(--ykp-gold)] hover:bg-white/5 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="pt-6">
              <h2 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-5">
                Get in touch
              </h2>
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
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[var(--ykp-gold)] shrink-0 mt-0.5" />
                  <a
                    href="/#contact"
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
                        return;
                      }
                      event.preventDefault();
                      setActiveTab('home');
                      window.history.replaceState({ tab: 'home' }, '', '/#contact');
                      window.setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 120);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {SITE_INFO.address}
                  </a>
                </li>
                <li className="flex flex-col items-start gap-2 pt-1">
                  <button
                    onClick={() => openModal('student-register')}
                    className="inline-flex items-center gap-2 bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-xs tracking-wide px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Become a Student
                  </button>
                  <button
                    onClick={() => openModal('partner-inquiry')}
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-[var(--ykp-gold)] hover:text-[var(--ykp-gold)] font-semibold text-xs tracking-wide px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Partner / Mentor Inquiry
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-5">
              Navigate
            </h2>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home', tab: 'home' as ActiveTab },
                { label: 'Events', tab: 'events' as ActiveTab },
                { label: 'Gallery', tab: 'gallery' as ActiveTab },
                { label: 'Blog', tab: 'blog' as ActiveTab },
                { label: 'Contact', tab: 'contact' as ActiveTab }
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.tab === 'contact' ? '/#contact' : tabToPath(item.tab)}
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
                        return;
                      }
                      event.preventDefault();
                      if (item.tab === 'contact') {
                        setActiveTab('home');
                        window.history.replaceState({ tab: 'home' }, '', '/#contact');
                        window.setTimeout(() => {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }, 120);
                        return;
                      }
                      setActiveTab(item.tab);
                      scrollToTop();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)] mb-5">
              Programs
            </h2>
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
