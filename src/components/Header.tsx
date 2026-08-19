import React from 'react';
import { ActiveTab, ModalType } from '../types';
import { Menu, X } from 'lucide-react';
import { tabToPath } from '../lib/seo';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openModal: (type: ModalType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, openModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: ActiveTab) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white text-[var(--ykp-ink)] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[6.75rem] sm:min-h-[8rem] py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
        <a
          href="/"
          onClick={(event) => handleNavClick(event, 'home')}
          className="flex items-center focus:outline-none shrink-0 hover:opacity-90 transition-opacity"
          aria-label="Youth ka Pakistan — Home"
        >
          <img
            src="/ykp-logo.png"
            alt="Youth Ka Pakistan logo — educate, empower, skills, and networking for Pakistani youth"
            className="h-[5.5rem] sm:h-[6.75rem] w-auto object-contain object-left"
            width={260}
            height={108}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={tabToPath(item.id)}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => handleNavClick(event, item.id)}
                className={`px-3 xl:px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--ykp-green)]'
                    : 'text-[var(--ykp-muted)] hover:text-[var(--ykp-green)]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => openModal('student-register')}
            className="hidden sm:inline-flex items-center bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-xs sm:text-sm px-3 lg:px-5 py-2.5 rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            Become a Student
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[var(--ykp-ink)] hover:text-[var(--ykp-green)] p-2 -mr-1"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-nav" className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-5 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto" aria-label="Mobile">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={tabToPath(item.id)}
              aria-current={activeTab === item.id ? 'page' : undefined}
              onClick={(event) => handleNavClick(event, item.id)}
              className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-[var(--ykp-green)]/8 text-[var(--ykp-green)]'
                  : 'text-[var(--ykp-muted)] hover:bg-gray-50'
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              openModal('student-register');
            }}
            className="w-full mt-2 bg-[var(--ykp-gold)] text-[var(--ykp-ink)] font-semibold text-sm py-3 rounded-md cursor-pointer"
          >
            Become a Student
          </button>
        </nav>
      )}
    </header>
  );
};
