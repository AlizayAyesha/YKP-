import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { ActiveTab } from '../types';

export const BackToTopButton: React.FC<{ page: ActiveTab }> = ({ page }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const featured = document.getElementById('featured-event');
      if (featured) {
        setVisible(featured.getBoundingClientRect().bottom < 72);
      } else {
        setVisible(window.scrollY > 480);
      }
    };

    update();
    const frame = window.requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [page]);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:bottom-8 sm:right-8 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[var(--ykp-gold)] text-[var(--ykp-ink)] [box-shadow:0_10px_18px_rgba(11,31,20,0.12),0_28px_40px_-8px_rgba(11,31,20,0.28)] transition-all duration-300 cursor-pointer hover:bg-[var(--ykp-gold-bright)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
    </button>
  );
};
