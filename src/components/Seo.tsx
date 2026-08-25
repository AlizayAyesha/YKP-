import { useEffect } from 'react';
import { ActiveTab } from '../types';
import { applyDocumentSeo, seoPageFromPath } from '../lib/seo';

export function Seo({ tab }: { tab: ActiveTab }) {
  useEffect(() => {
    applyDocumentSeo(seoPageFromPath(window.location.pathname));
    const onPop = () => applyDocumentSeo(seoPageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [tab]);

  return null;
}
