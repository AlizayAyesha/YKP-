import { ActiveTab } from '../types';
import { SITE_INFO, GALLERY_ALBUMS, BLOG_POSTS } from '../data/youthData';
import { SITE_FAQS } from '../data/faq';

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
    title: 'Youth Ka Pakistan (YKP Foundation) | Skills, Mentorship & Youth Events in Pakistan',
    description:
      'Youth Ka Pakistan (YKP Foundation) is a nationwide nonprofit in Karachi helping Pakistani youth build skills, find mentors, and join free events such as URAAN-E-AI 2026. Led by President Saima Agha, MPA.',
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    ogType: 'website',
    preloadImage: '/images/hero-vocational-center.webp'
  },
  events: {
    id: 'events',
    path: '/events',
    title: 'URAAN-E-AI 2026 | National IT & AI Seminar in Karachi | YKP Foundation',
    description:
      'URAAN-E-AI 2026 — Pakistan\'s Digital Flight. Free national IT and Artificial Intelligence seminar on 1 September 2026 at DHA Suffa University, Karachi, hosted by Youth Ka Pakistan (YKP Foundation). RSVP now.',
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    ogType: 'website',
    preloadImage: '/images/pdf-digital-flight-logo.webp'
  },
  gallery: {
    id: 'gallery',
    path: '/gallery',
    title: 'Gallery | Pakistan Chef Icon Award, Marka e Haq & YKP Events',
    description:
      'Photo gallery from Youth Ka Pakistan (YKP Foundation) events including Pakistan Chef Icon Award, Celebration Pakistan Chef Icon Award, and Marka e Haq Excellence Award.',
    robots: 'index,follow,max-image-preview:large',
    ogType: 'website'
  },
  blog: {
    id: 'blog',
    path: '/blog',
    title: 'Blog | Youth Skills, Mentorship & URAAN-E-AI | YKP Foundation',
    description:
      'Read Youth Ka Pakistan stories on practical skills, mentorship for Pakistani youth, and URAAN-E-AI 2026 — Pakistan\'s Digital Flight in Karachi.',
    robots: 'index,follow,max-image-preview:large,max-snippet:-1',
    ogType: 'article'
  },
  contact: {
    id: 'contact',
    path: '/contact',
    title: 'Contact Youth Ka Pakistan | YKP Foundation Karachi',
    description:
      'Contact Youth Ka Pakistan (YKP Foundation) in Karachi, Sindh. Email info@youthkapakistan.com or call +92 300 2530110 for students, mentors, and partners.',
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
    case '/contact':
      return 'contact';
    case '/admin':
      return 'admin';
    default:
      if (clean.startsWith('/blog')) return 'blog';
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

export function blogPostFromPath(pathname: string) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const match = clean.match(/^\/blog\/([^/]+)$/);
  if (!match) return null;
  return BLOG_POSTS.find((post) => post.slug === match[1]) ?? null;
}

export function seoPageFromPath(pathname: string): SeoPage {
  const post = blogPostFromPath(pathname);
  if (post) {
    return {
      id: 'blog',
      path: `/blog/${post.slug}`,
      title: `${post.title} | YKP Foundation`,
      description: post.excerpt,
      robots: SEO_PAGES.blog.robots,
      ogType: 'article'
    };
  }
  return getSeoPage(pathToTab(pathname));
}

export function indexableUrls(): string[] {
  return [
    `${SITE_URL}/`,
    `${SITE_URL}/events`,
    `${SITE_URL}/gallery`,
    `${SITE_URL}/blog`,
    ...BLOG_POSTS.map((post) => `${SITE_URL}/blog/${post.slug}`),
    `${SITE_URL}/contact`
  ];
}

function organizationJsonLd() {
  return {
    '@type': ['NGO', 'EducationalOrganization'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [
      'YKP',
      'YKP Foundation',
      'Youth Ka Pakistan',
      'Youth Ka Pakistan YKP Foundation',
      'Youthka Pakistan',
      'youthkapakistan.com'
    ],
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
    hasMap: 'https://www.google.com/maps/search/?api=1&query=Karachi%2C%20Sindh%2C%20Pakistan',
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan'
    },
    sameAs: [
      'https://www.facebook.com/YouthKaPakistan.YKP',
      'https://www.instagram.com/ykpfoundation/',
      'https://www.linkedin.com/company/youth-ka-pakistan/',
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
    slogan: 'Educate. Empower. Skill. Connect.',
    knowsAbout: [
      'Youth skills development',
      'Mentorship',
      'Artificial Intelligence education',
      'Talent promotion',
      'Event management',
      'Pakistani youth empowerment',
      'URAAN-E-AI',
      'Pakistan Chef Icon Award'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@youthkapakistan.com',
      telephone: '+92-300-2530110',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu']
    },
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
    alternateName: ['YKP Foundation', 'Youth Ka Pakistan', 'Youth Ka Pakistan YKP Foundation'],
    description:
      'Nationwide nonprofit in Karachi helping Pakistani youth build skills, find mentors, and join free events such as URAAN-E-AI 2026.',
    inLanguage: 'en-PK',
    publisher: { '@id': `${SITE_URL}/#organization` },
    about: { '@id': `${SITE_URL}/#organization` }
  };
}

function faqJsonLd() {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: SITE_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

function inviteVideoJsonLd() {
  return {
    '@type': 'VideoObject',
    '@id': `${SITE_URL}/#uraan-invite-video`,
    name: 'URAAN-E-AI 2026 Official Invitation',
    description:
      "Official invitation video for URAAN-E-AI 2026 — Pakistan's Digital Flight, a free national IT and AI seminar in Karachi.",
    thumbnailUrl: `${SITE_URL}/images/pdf-digital-flight-logo.webp`,
    embedUrl: `${SITE_URL}/events`,
    uploadDate: '2026-08-31',
    duration: 'PT35S',
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` }
  };
}

function galleryListJsonLd() {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/gallery#albums`,
    name: 'Youth Ka Pakistan event photo albums',
    numberOfItems: GALLERY_ALBUMS.length,
    itemListElement: GALLERY_ALBUMS.map((album, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: album.name,
      url: `${SITE_URL}/gallery`,
      image: `${SITE_URL}${album.coverImage}`
    }))
  };
}

function articleJsonLd(page: SeoPage) {
  const post = BLOG_POSTS.find((item) => page.path === `/blog/${item.slug}`);
  if (!post) return null;
  return {
    '@type': 'Article',
    '@id': `${canonicalUrl(page.path)}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.dateIso,
    dateModified: post.dateIso,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        width: 512,
        height: 512
      }
    },
    mainEntityOfPage: { '@id': `${canonicalUrl(page.path)}#webpage` },
    articleSection: post.category,
    inLanguage: 'en-PK'
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
    image: [`${SITE_URL}/images/pdf-digital-flight-logo.webp`, DEFAULT_OG_IMAGE],
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: '2026-09-01T14:00:00+05:00',
    endDate: '2026-09-01T20:00:00+05:00',
    doorTime: '2026-09-01T14:00:00+05:00',
    inLanguage: ['en', 'ur'],
    isAccessibleForFree: true,
    typicalAgeRange: '16-35',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student'
    },
    performer: { '@id': `${SITE_URL}/#organization` },
    video: { '@id': `${SITE_URL}/#uraan-invite-video` },
    location: {
      '@type': 'Place',
      name: 'DHA Suffa University',
      hasMap: 'https://www.google.com/maps/search/?api=1&query=DHA%20Suffa%20University%2C%20Karachi',
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
    organizer: {
      '@type': 'NGO',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`
    },
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
  const dateModified = '2026-08-31';
  const webPage: Record<string, unknown> = {
    '@type': page.id === 'gallery' ? 'CollectionPage' : page.id === 'contact' ? 'ContactPage' : page.id === 'blog' ? 'Blog' : 'WebPage',
    '@id': `${canonicalUrl(page.path)}#webpage`,
    url: canonicalUrl(page.path),
    name: page.title,
    description: page.description,
    inLanguage: 'en-PK',
    dateModified,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: DEFAULT_OG_IMAGE
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#about h2', '#faq-heading']
    }
  };

  const graph: object[] = [organizationJsonLd(), websiteJsonLd(), webPage];

  graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl(page.path)}#breadcrumb`,
    itemListElement:
      page.path === '/'
        ? [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`
            }
          ]
        : [
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

  if (page.id === 'home') {
    webPage.mainEntity = { '@id': `${SITE_URL}/#faq` };
    graph.push(faqJsonLd(), inviteVideoJsonLd());
  }

  if (page.id === 'events') {
    graph.push(eventJsonLd(), inviteVideoJsonLd());
  }

  if (page.id === 'gallery') {
    graph.push(galleryListJsonLd());
  }

  const article = articleJsonLd(page);
  if (article) {
    graph.push(article);
  }

  if (page.id === 'contact') {
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
      hasMap: 'https://www.google.com/maps/search/?api=1&query=Karachi%2C%20Sindh%2C%20Pakistan',
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
  document.documentElement.lang = 'en-PK';

  setOrCreateMeta({ name: 'description' }, page.description);
  setOrCreateMeta({ name: 'robots' }, page.robots);
  setOrCreateMeta(
    { name: 'google-site-verification' },
    'dhhD5h7vVGIoiIH9n1nVO1Tu1JRse7t1QdsuA6KsMrU'
  );
  setOrCreateMeta(
    { name: 'keywords' },
    'Youth Ka Pakistan, YKP Foundation, Youth ka Pakistan, URAAN-E-AI 2026, Saima Agha MPA, Pakistani youth, skills, mentorship, Karachi'
  );
  setCanonical(url);

  setOrCreateMeta({ property: 'og:title' }, page.title);
  setOrCreateMeta({ property: 'og:description' }, page.description);
  setOrCreateMeta({ property: 'og:url' }, url);
  setOrCreateMeta({ property: 'og:type' }, page.ogType);
  setOrCreateMeta({ property: 'og:image' }, DEFAULT_OG_IMAGE);
  setOrCreateMeta({ property: 'og:locale' }, 'en_PK');
  setOrCreateMeta({ property: 'og:site_name' }, SITE_NAME);
  setOrCreateMeta({ name: 'twitter:card' }, 'summary_large_image');
  setOrCreateMeta({ name: 'twitter:title' }, page.title);
  setOrCreateMeta({ name: 'twitter:description' }, page.description);
  setOrCreateMeta({ name: 'twitter:image' }, DEFAULT_OG_IMAGE);
  setOrCreateMeta({ name: 'twitter:url' }, url);

  const post = blogPostFromPath(page.path);
  if (post) {
    setOrCreateMeta({ property: 'article:published_time' }, `${post.dateIso}T00:00:00+05:00`);
    setOrCreateMeta({ property: 'article:author' }, post.author);
    setOrCreateMeta({ property: 'article:section' }, post.category);
  }

  const hreflangPk = document.head.querySelector('link[rel="alternate"][hreflang="en-PK"]') as HTMLLinkElement | null;
  if (hreflangPk) hreflangPk.setAttribute('href', url);
  const hreflang = document.head.querySelector('link[rel="alternate"][hreflang="en"]') as HTMLLinkElement | null;
  if (hreflang) hreflang.setAttribute('href', url);
  const hreflangDefault = document.head.querySelector(
    'link[rel="alternate"][hreflang="x-default"]'
  ) as HTMLLinkElement | null;
  if (hreflangDefault) hreflangDefault.setAttribute('href', url);

  setJsonLd(buildJsonLd(page));
}

function wrapSeoMain(inner: string): string {
  return `<main class="ykp-seo-boot" hidden style="max-width:46rem;margin:2.5rem auto;padding:0 1.25rem 3rem;font-family:Georgia,serif;color:#0B1F14;line-height:1.55"><!--ykp-seo-start-->${inner}<!--ykp-seo-end--></main>`;
}

export function seoBodyHtml(page: SeoPage): string {
  const nav = `<nav><p><a href="/">Home</a> · <a href="/events">Events</a> · <a href="/gallery">Gallery</a> · <a href="/blog">Blog</a> · <a href="/contact">Contact</a></p></nav>`;

  if (page.id === 'events') {
    return wrapSeoMain(`
      <h1>URAAN-E-AI 2026 — Pakistan's Digital Flight</h1>
      ${nav}
      <p>Youth Ka Pakistan (YKP Foundation) hosts a free national IT and Artificial Intelligence seminar on Tuesday, 1 September 2026 from 2:00 PM at DHA Suffa University, Karachi.</p>
      <p>Students, educators, technology professionals, entrepreneurs, and innovators are invited to RSVP on this page.</p>
    `);
  }

  if (page.id === 'gallery') {
    const albums = GALLERY_ALBUMS.map((album) => `<li>${album.name} (${album.year})</li>`).join('');
    return wrapSeoMain(`
      <h1>Youth Ka Pakistan Gallery</h1>
      ${nav}
      <p>Photo albums from YKP Foundation events across Pakistan.</p>
      <ul>${albums}</ul>
    `);
  }

  if (page.id === 'blog') {
    const post = BLOG_POSTS.find((item) => page.path === `/blog/${item.slug}`);
    if (post) {
      return wrapSeoMain(`
        <article>
          <h1>${post.title}</h1>
          ${nav}
          <p>${post.date} · ${post.author} · ${post.category}</p>
          <p>${post.excerpt}</p>
          <p>${post.content.replace(/\n\n/g, '</p><p>')}</p>
        </article>
      `);
    }
    const posts = BLOG_POSTS.map(
      (item) => `<li><a href="/blog/${item.slug}"><strong>${item.title}</strong></a> — ${item.excerpt}</li>`
    ).join('');
    return wrapSeoMain(`
      <h1>Youth Ka Pakistan Blog</h1>
      ${nav}
      <p>Stories on skills, mentorship, and youth opportunity in Pakistan from YKP Foundation.</p>
      <ul>${posts}</ul>
    `);
  }

  if (page.id === 'contact') {
    return wrapSeoMain(`
      <h1>Contact Youth Ka Pakistan (YKP Foundation)</h1>
      ${nav}
      <p>Karachi, Sindh, Pakistan</p>
      <p>Email: <a href="mailto:info@youthkapakistan.com">info@youthkapakistan.com</a></p>
      <p>Phone: <a href="tel:+923002530110">+92 300 2530110</a></p>
    `);
  }

  if (page.id === 'admin') {
    return wrapSeoMain(`<h1>Youth ka Pakistan administration</h1>`);
  }

  return wrapSeoMain(`
    <h1>Youth Ka Pakistan (YKP Foundation)</h1>
    ${nav}
    <p>Youth Ka Pakistan is a nationwide nonprofit dedicated to unlocking the potential of Pakistan's youth through skills, mentorship, events, and opportunity. Educate. Empower. Skill. Connect.</p>
    <h2>Leadership</h2>
    <ul>
      <li>${SITE_INFO.patronInChief.role}: ${SITE_INFO.patronInChief.name}</li>
      <li>${SITE_INFO.chairperson.role}: ${SITE_INFO.chairperson.name}</li>
      <li>${SITE_INFO.president.role}: ${SITE_INFO.president.name}, ${SITE_INFO.president.honorific}</li>
      <li>${SITE_INFO.vicePresident.role}: ${SITE_INFO.vicePresident.name}, ${SITE_INFO.vicePresident.organization}</li>
    </ul>
    <h2>Upcoming event</h2>
    <p><a href="/events">URAAN-E-AI 2026</a> — Pakistan's Digital Flight, 1 September 2026 at DHA Suffa University, Karachi.</p>
    <h2>Offerings</h2>
    <p>Skills development, event management, talent promotion, and free mentorship for Pakistani youth — boys and girls, nationwide.</p>
    <h2>Frequently asked questions</h2>
    ${SITE_FAQS.map((item) => `<h3>${item.question}</h3><p>${item.answer}</p>`).join('')}
  `);
}

export function injectSeoHtml(html: string, page: SeoPage): string {
  const url = canonicalUrl(page.path);
  const title = escapeAttr(page.title);
  const description = escapeAttr(page.description);
  const jsonLd = JSON.stringify(buildJsonLd(page));
  const preload = page.preloadImage
    ? `<link rel="preload" as="image" type="image/webp" href="${page.preloadImage}" fetchpriority="high" />`
    : '';

  let next = html
    .replace(/<html lang="[^"]*">/, '<html lang="en-PK">')
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
      /<meta name="keywords" content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="Youth Ka Pakistan, YKP Foundation, Youth ka Pakistan, URAAN-E-AI 2026, Saima Agha MPA, Pakistani youth, skills, mentorship, Karachi" />`
    )
    .replace(
      /<div id="root">[\s\S]*?<\/div>(\s*<noscript>)/,
      `<div id="root">${seoBodyHtml(page)}</div>$1`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${url}" />`
    )
    .replace(
      /<link rel="alternate" hreflang="en-PK" href="[^"]*"\s*\/?>/,
      `<link rel="alternate" hreflang="en-PK" href="${url}" />`
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
