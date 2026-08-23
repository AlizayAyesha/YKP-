import { ActiveTab } from '../types';
import { SITE_INFO } from '../data/youthData';

export const SITE_URL = 'https://youthkapakistan.com';
export const SITE_NAME = 'Youth ka Pakistan';
export const SITE_TAGLINE = 'Empowering Pakistani Youth';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/ykp-logo.png`;

export type SeoPageId = 'home' | 'events' | 'gallery' | 'blog' | 'contact' | 'admin';

export interface SeoPage {
  id: SeoPageId;
  path: string;
  title: string;
  description: string;
  robots: string;
  ogType: 'website' | 'article';
  preloadImage?: string;
}

export const SEO_PAGES: Record<SeoPageId, SeoPage> = {
  home: {
    id: 'home',
    path: '/',
    title: 'Youth ka Pakistan | Skills, Mentorship & Opportunity for Pakistani Youth',
    description:
      'Youth ka Pakistan is a nationwide nonprofit helping Pakistani youth build real skills, find mentors, and access free programs, events, and opportunities across the country.',
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    ogType: 'website',
    preloadImage: '/images/hero-vocational-center.png'
  },
  events: {
    id: 'events',
    path: '/events',
    title: 'URAAN-E-AI 2026 | National IT & AI Seminar | Youth ka Pakistan',
    description:
      'Join URAAN-E-AI 2026 - Pakistan\'s Digital Flight. A national IT and Artificial Intelligence seminar on 1 September 2026 at DHA Suffa University, Karachi. RSVP free.',
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    ogType: 'website',
    preloadImage: '/images/pdf-digital-flight-logo.png'
  },
  gallery: {
    id: 'gallery',
    path: '/gallery',
    title: 'Gallery | Youth ka Pakistan Events & Youth Stories',
    description:
      'Browse photo albums from Youth ka Pakistan events, talent showcases, workshops, and youth gatherings across Pakistan.',
    robots: 'index,follow,max-image-preview:large',
    ogType: 'website'
  },
  blog: {
    id: 'blog',
    path: '/blog',
    title: 'Blog | Skills, Mentorship & Youth Opportunity in Pakistan',
    description:
      'Stories and guidance from Youth ka Pakistan on skills development, mentorship, AI careers, and opportunities for young people nationwide.',
    robots: 'index,follow,max-image-preview:large,max-snippet:-1',
    ogType: 'article'
  },
  contact: {
    id: 'contact',
    path: '/contact',
    title: 'Contact Youth ka Pakistan | Students, Mentors & Partners',
    description:
      'Visit Youth ka Pakistan in Karachi. Find us on Google Maps and Bing Maps, or email info@youthkapakistan.com about student programs, mentorship, and partnership.',
    robots: 'index,follow,max-image-preview:large',
    ogType: 'website'
  },
  admin: {
    id: 'admin',
    path: '/admin',
    title: 'Admin | Youth ka Pakistan',
    description: 'Private attendee administration for Youth ka Pakistan.',
    robots: 'noindex,nofollow',
    ogType: 'website'
  }
};

export const TAB_PATH: Record<ActiveTab, string> = {
  home: '/',
  about: '/',
  offerings: '/',
  events: '/events',
  gallery: '/gallery',
  blog: '/blog',
  contact: '/contact',
  admin: '/admin'
};

export function pathToTab(pathname: string): ActiveTab {
  const clean = pathname.replace(/\/+$/, '') || '/';
  switch (clean) {
    case '/events':
      return 'events';
    case '/gallery':
      return 'gallery';
    case '/blog':
      return 'blog';
    case '/contact':
      return 'contact';
    case '/admin':
      return 'admin';
    default:
      return 'home';
  }
}

export function tabToPath(tab: ActiveTab): string {
  return TAB_PATH[tab] || '/';
}

export function tabToSeoId(tab: ActiveTab): SeoPageId {
  if (tab === 'about' || tab === 'offerings' || tab === 'home') return 'home';
  return tab;
}

export function canonicalUrl(path: string): string {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

export function getSeoPage(tab: ActiveTab): SeoPage {
  return SEO_PAGES[tabToSeoId(tab)];
}

function organizationJsonLd() {
  return {
    '@type': 'NGO',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ['YKP', 'YKP Foundation', 'Youth Ka Pakistan'],
    legalName: 'Youth ka Pakistan',
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512
    },
    image: DEFAULT_OG_IMAGE,
    description:
      'A nationwide nonprofit dedicated to unlocking the potential of Pakistani youth through skills, mentorship, events, and opportunity.',
    email: 'info@youthkapakistan.com',
    telephone: '+92-300-2530110',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      addressCountry: 'PK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.8607,
      longitude: 67.0011
    },
    hasMap: [
      'https://www.google.com/maps/search/?api=1&query=Karachi%2C%20Sindh%2C%20Pakistan',
      'https://www.bing.com/maps?cp=24.8607~67.0011&lvl=12&q=Karachi%2C%20Sindh%2C%20Pakistan'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan'
    },
    sameAs: [
      'https://www.facebook.com/YouthKaPakistan.YKP',
      'https://www.instagram.com/ykpfoundation/',
      'https://www.linkedin.com/in/ykp-foundation-374461426/',
      'https://youtube.com/youthkapakistan'
    ],
    foundingLocation: {
      '@type': 'Place',
      name: 'Karachi',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.8607,
        longitude: 67.0011
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Karachi',
        addressCountry: 'PK'
      }
    },
    knowsAbout: [
      'Youth skills development',
      'Mentorship',
      'Artificial Intelligence education',
      'Talent promotion',
      'Event management',
      'Pakistani youth empowerment'
    ],
    employee: [
      {
        '@type': 'Person',
        name: SITE_INFO.patronInChief.name,
        jobTitle: SITE_INFO.patronInChief.role,
        image: `${SITE_URL}${SITE_INFO.patronInChief.photoUrl}`,
        worksFor: { '@id': `${SITE_URL}/#organization` }
      },
      {
        '@type': 'Person',
        name: SITE_INFO.chairperson.name,
        jobTitle: SITE_INFO.chairperson.role,
        image: `${SITE_URL}${SITE_INFO.chairperson.photoUrl}`,
        worksFor: { '@id': `${SITE_URL}/#organization` }
      },
      {
        '@type': 'Person',
        name: SITE_INFO.president.name,
        honorificSuffix: SITE_INFO.president.honorific,
        jobTitle: SITE_INFO.president.role,
        image: `${SITE_URL}${SITE_INFO.president.photoUrl}`,
        worksFor: { '@id': `${SITE_URL}/#organization` }
      },
      {
        '@type': 'Person',
        name: SITE_INFO.vicePresident.name,
        jobTitle: SITE_INFO.vicePresident.role,
        image: `${SITE_URL}${SITE_INFO.vicePresident.photoUrl}`,
        worksFor: { '@id': `${SITE_URL}/#organization` }
      }
    ]
  };
}

function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: SITE_TAGLINE,
    inLanguage: 'en-PK',
    publisher: { '@id': `${SITE_URL}/#organization` }
  };
}

function eventJsonLd() {
  return {
    '@type': 'Event',
    '@id': `${SITE_URL}/events#uraan-e-ai-2026`,
    name: 'URAAN-E-AI 2026',
    alternateName: "Pakistan's Digital Flight",
    description:
      "National IT & Artificial Intelligence Seminar 2026. A national gathering of students, educators, technology professionals, and innovators exploring Pakistan's AI-first economy.",
    url: `${SITE_URL}/events`,
    image: [`${SITE_URL}/images/pdf-digital-flight-logo.png`, DEFAULT_OG_IMAGE],
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: '2026-09-01T14:00:00+05:00',
    eventSchedule: {
      '@type': 'Schedule',
      startDate: '2026-09-01',
      startTime: '14:00:00',
      scheduleTimezone: 'Asia/Karachi'
    },
    location: {
      '@type': 'Place',
      name: 'DHA Suffa University',
      hasMap: [
        'https://www.google.com/maps/search/?api=1&query=DHA%20Suffa%20University%2C%20Karachi',
        'https://www.bing.com/maps?q=DHA%20Suffa%20University%20Karachi'
      ],
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.8142,
        longitude: 67.0478
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'DHA Suffa University, DHA Phase 7',
        addressLocality: 'Karachi',
        addressRegion: 'Sindh',
        addressCountry: 'PK'
      }
    },
    organizer: { '@id': `${SITE_URL}/#organization` },
    performer: { '@id': `${SITE_URL}/#organization` },
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/events`,
      price: 0,
      priceCurrency: 'PKR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01'
    }
  };
}

export function buildJsonLd(page: SeoPage): object {
  const webPage = {
    '@type': 'WebPage',
    '@id': `${canonicalUrl(page.path)}#webpage`,
    url: canonicalUrl(page.path),
    name: page.title,
    description: page.description,
    inLanguage: 'en-PK',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: DEFAULT_OG_IMAGE
    }
  };

  const graph: object[] = [organizationJsonLd(), websiteJsonLd(), webPage];

  if (page.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.title.split(' | ')[0],
          item: canonicalUrl(page.path)
        }
      ]
    });
  }

  if (page.id === 'events') {
    graph.push(eventJsonLd());
  }

  if (page.id === 'contact') {
    graph.push({
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#contact`,
      url: `${SITE_URL}/contact`,
      name: 'Contact Youth ka Pakistan',
      mainEntity: { '@id': `${SITE_URL}/#organization` }
    });
    graph.push({
      '@type': 'Place',
      '@id': `${SITE_URL}/contact#place`,
      name: 'Youth ka Pakistan — Karachi',
      url: `${SITE_URL}/contact`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Karachi',
        addressRegion: 'Sindh',
        addressCountry: 'PK'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.8607,
        longitude: 67.0011
      },
      hasMap: [
        'https://www.google.com/maps/search/?api=1&query=Karachi%2C%20Sindh%2C%20Pakistan',
        'https://www.bing.com/maps?cp=24.8607~67.0011&lvl=12&q=Karachi%2C%20Sindh%2C%20Pakistan'
      ],
      telephone: '+92-300-2530110'
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function setOrCreateMeta(selector: { name?: string; property?: string }, content: string) {
  const attr = selector.property ? 'property' : 'name';
  const key = selector.property || selector.name || '';
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(data: object) {
  let el = document.getElementById('ykp-jsonld') as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = 'ykp-jsonld';
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function applyDocumentSeo(page: SeoPage) {
  if (typeof document === 'undefined') return;
  const url = canonicalUrl(page.path);
  document.title = page.title;
  document.documentElement.lang = 'en';

  setOrCreateMeta({ name: 'description' }, page.description);
  setOrCreateMeta({ name: 'robots' }, page.robots);
  setCanonical(url);

  setOrCreateMeta({ property: 'og:title' }, page.title);
  setOrCreateMeta({ property: 'og:description' }, page.description);
  setOrCreateMeta({ property: 'og:url' }, url);
  setOrCreateMeta({ property: 'og:type' }, page.ogType);
  setOrCreateMeta({ property: 'og:image' }, DEFAULT_OG_IMAGE);
  setOrCreateMeta({ name: 'twitter:title' }, page.title);
  setOrCreateMeta({ name: 'twitter:description' }, page.description);
  setOrCreateMeta({ name: 'twitter:image' }, DEFAULT_OG_IMAGE);
  setOrCreateMeta({ name: 'twitter:url' }, url);

  const hreflang = document.head.querySelector('link[rel="alternate"][hreflang="en"]') as HTMLLinkElement | null;
  if (hreflang) hreflang.setAttribute('href', url);
  const hreflangDefault = document.head.querySelector(
    'link[rel="alternate"][hreflang="x-default"]'
  ) as HTMLLinkElement | null;
  if (hreflangDefault) hreflangDefault.setAttribute('href', url);

  setJsonLd(buildJsonLd(page));
}

export function injectSeoHtml(html: string, page: SeoPage): string {
  const url = canonicalUrl(page.path);
  const title = escapeAttr(page.title);
  const description = escapeAttr(page.description);
  const jsonLd = JSON.stringify(buildJsonLd(page));
  const preload = page.preloadImage
    ? `<link rel="preload" as="image" href="${page.preloadImage}" fetchpriority="high" />`
    : '';

  let next = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<meta name="robots" content="[^"]*"\s*\/?>/,
      `<meta name="robots" content="${page.robots}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${url}" />`
    )
    .replace(
      /<link rel="alternate" hreflang="en" href="[^"]*"\s*\/?>/,
      `<link rel="alternate" hreflang="en" href="${url}" />`
    )
    .replace(
      /<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/,
      `<link rel="alternate" hreflang="x-default" href="${url}" />`
    )
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)
    .replace(
      /<meta property="og:type" content="[^"]*"\s*\/?>/,
      `<meta property="og:type" content="${page.ogType}" />`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${description}" />`
    )
    .replace(
      /<meta name="twitter:url" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:url" content="${url}" />`
    )
    .replace(
      /<script type="application\/ld\+json" id="ykp-jsonld">[\s\S]*?<\/script>/,
      `<script type="application/ld+json" id="ykp-jsonld">${jsonLd}</script>`
    )
    .replace(/<link rel="preload" as="image"[^>]*>/, preload);

  return next;
}
