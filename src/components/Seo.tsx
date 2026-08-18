import { useEffect } from 'react';
import { ActiveTab } from '../types';
import { applyDocumentSeo, getSeoPage } from '../lib/seo';

export function Seo({ tab }: { tab: ActiveTab }) {
  useEffect(() => {
    applyDocumentSeo(getSeoPage(tab));
  }, [tab]);

  return null;
}
