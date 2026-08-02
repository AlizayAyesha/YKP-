import React from 'react';
import { ActiveTab, ModalType } from '../types';
import { Menu, X } from 'lucide-react';

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

  const handleNavClick = (id: ActiveTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white text-[var(--ykp-ink)] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.5rem] sm:h-[5rem] flex items-center justify-between gap-4">
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center focus:outline-none shrink-0 hover:opacity-90 transition-opacity"
          aria-label="Youth ka Pakistan — Home"
        >
          <img
            src="/ykp-logo.png"
            alt="Youth Ka Pakistan — Education & Skills Business Forum"
            className="h-11 sm:h-14 w-auto object-contain"
          />
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--ykp-green)]'
                    : 'text-[var(--ykp-muted)] hover:text-[var(--ykp-green)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openModal('student-register')}
            className="hidden sm:inline-flex items-center bg-[var(--ykp-gold)] hover:bg-[var(--ykp-gold-bright)] text-[var(--ykp-ink)] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-md transition-colors cursor-pointer"
          >
            Become a Student
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[var(--ykp-ink)] hover:text-[var(--ykp-green)] p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-[var(--ykp-green)]/8 text-[var(--ykp-green)]'
                  : 'text-[var(--ykp-muted)] hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
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
        </div>
      )}
    </header>
  );
};
