import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import { injectSeoHtml, SEO_PAGES } from './src/lib/seo';

export function seoPrerender(): Plugin {
  return {
    name: 'seo-prerender',
    apply: 'build',
    writeBundle() {
      const indexPath = path.resolve('dist/index.html');
      if (!fs.existsSync(indexPath)) return;

      const html = fs.readFileSync(indexPath, 'utf8');

      for (const page of Object.values(SEO_PAGES)) {
        const rendered = injectSeoHtml(html, page);
        if (page.path === '/') {
          fs.writeFileSync(indexPath, rendered);
          continue;
        }

        const dir = path.resolve('dist', page.path.replace(/^\//, ''));
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), rendered);
      }
    }
  };
}
