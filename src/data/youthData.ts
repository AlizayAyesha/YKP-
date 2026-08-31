import {
  ProgramOffering,
  BlogPost,
  Testimonial,
  YkpVideo,
  YkpEvent,
  PastEventStat,
  GalleryAlbum,
  PublicEventProfile
} from '../types';
import eventsJson from './events.json';

export const SITE_INFO = {
  name: "Youth ka Pakistan",
  tagline: "Empowering Pakistani Youth",
  domain: "youthkapakistan.com",
  contactEmail: "info@youthkapakistan.com",
  contactPhone: "+923002530110",
  address: "Karachi, Sindh, Pakistan",
  copyright: "Copyright © 2026 youthkapakistan.com",
  patronInChief: {
    name: "Syed Nasir Hussain Shah",
    role: "Patron-in-Chief",
    note: "YKP events are held under his supervision.",
    photoUrl: "/images/leadership/nasir-hussain-shah.png"
  },
  chairperson: {
    name: "Ms. Sabi",
    role: "Chairperson",
    organization: "Youth Ka Pakistan YKP Foundation",
    photoUrl: "/images/leadership/ms-sabi.png"
  },
  president: {
    name: "Saima Agha",
    honorific: "MPA",
    role: "President",
    photoUrl: "/images/leadership/saima-agha.png"
  },
  vicePresident: {
    name: "Azhar Zia Muhammad",
    role: "Vice President",
    organization: "YKP Foundation",
    affiliation: "EMA Group of Companies",
    photoUrl: "/images/leadership/azhar-zia-muhammad.png"
  },
  socials: {
    facebook: "https://www.facebook.com/YouthKaPakistan.YKP",
    instagram: "https://www.instagram.com/ykpfoundation/",
    linkedin: "https://www.linkedin.com/company/youth-ka-pakistan/",
    youtube: "https://youtube.com/youthkapakistan"
  }
};

export const HERO_DATA = {
  title: "Skills. Stage. Opportunity.",
  subtitle: "A nationwide movement helping Pakistani youth build real skills, find mentors, and step into opportunities that change their future.",
  ctaText: "Join the Movement"
};

export const HERO_IMAGE = "/images/hero-vocational-center.png";

export const VISION_DATA = {
  title: "The Vision Behind Youth ka Pakistan",
  motto: "Educate. Empower. Skill. Connect.",
  content: "Youth ka Pakistan is a nationwide non-profit organization dedicated to unlocking the potential of Pakistan's youth by creating meaningful opportunities to learn, grow, develop skills, and build connections.",
  ctaText: "Learn More"
};

export const ABOUT_DATA = {
  eyebrow: "About Us",
  title: "The Vision Behind Youth ka Pakistan",
  heading: "Empowering Youth to Build a Stronger Pakistan",
  paragraphs: [
    "Youth ka Pakistan is a nationwide non-profit dedicated to unlocking the potential of Pakistani youth — giving them the skills, stage, and opportunity to lead, innovate, and contribute to the nation's progress.",
    "Built around four pillars — Educate, Empower, Skill, Connect — we create free workshops, national events, talent platforms, and mentorship so young Pakistanis can turn potential into impact."
  ],
  vision: {
    title: "Our Vision",
    description: "A Pakistan where every young person has the skills, stage, and opportunity to reach their full potential."
  },
  mission: {
    title: "Our Mission",
    description: "To educate, empower, skill, and connect youth through free programs, events, and networks that prepare them to lead."
  },
  pillarsIntro: "Our mission is built around four core pillars:",
  closing: [
    "From our grassroots beginnings to our growing national presence, Youth ka Pakistan continues to create platforms where young Pakistanis can discover their potential, develop their abilities, and connect with a community that believes in their future."
  ],
  closer: "We don't just believe in the potential of Pakistan's youth — we believe in creating the opportunities that help them realize it.",
  coreValuesTitle: "Four Core Pillars",
  coreValuesSub: "Our mission is built around four core pillars:",
  values: [
    {
      id: "educate",
      title: "Educate",
      short: "Access to knowledge, workshops, and learning that broaden perspective.",
      description: "Creating access to knowledge, learning experiences, workshops, and educational opportunities that broaden perspectives and inspire growth."
    },
    {
      id: "empower",
      title: "Empower",
      short: "Confidence, leadership, and purpose so youth can take initiative.",
      description: "Building confidence, leadership, and a sense of purpose so young people can take initiative and create meaningful change."
    },
    {
      id: "skill",
      title: "Skill",
      short: "Practical, future-ready abilities for careers and an evolving economy.",
      description: "Promoting practical, future-ready skills that help youth prepare for careers, entrepreneurship, innovation, and an evolving world."
    },
    {
      id: "connect",
      title: "Connect",
      short: "Peers, mentors, and opportunities that open doors across Pakistan.",
      description: "Bringing young people together with peers, mentors, professionals, organizations, and opportunities to build meaningful networks and collaborations."
    }
  ]
};

export const TALENTS_SECTION = {
  title: "Our Offerings",
  subtitle: "Empowering Pakistani Youth Talents",
  description: "Discover the various programs and events designed to nurture and showcase the skills of Pakistani youth, both boys and girls.",
  offerings: [
    {
      id: "skills-development",
      num: "01",
      title: "Skills Development",
      description: "We organize skill development workshops that focus on various talents such as arts, sports, and technology. These workshops are designed to equip our youth with essential skills for their future.",
      image: "/images/offering-skills-development.png",
      category: "Training & Workshops",
      details: [
        "Digital Literacy & Tech Bootcamps",
        "Arts & Creative Media Skillsets",
        "Sports Leadership & Team Building",
        "Entrepreneurship Foundations"
      ]
    },
    {
      id: "event-management",
      num: "02",
      title: "Event Management",
      description: "Our platform offers talent showcases where young artists and performers can present their work to a wider audience, gaining confidence and recognition in their respective fields.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      category: "Events & Showcases",
      details: [
        "Regional Talent Conventions",
        "Live Cultural & Arts Performing Showcases",
        "Youth Expos & Networking Hubs",
        "Mentorship Assemblies"
      ]
    },
    {
      id: "talent-promotion",
      num: "03",
      title: "Talent Promotion",
      description: "We host regular events, both indoor and outdoor, that not only provide entertainment but also foster networking opportunities among youth, connecting them with industry professionals.",
      image: "/images/offering-talent-promotion.png",
      category: "Media & Professional Network",
      details: [
        "National Talent Competitions",
        "Direct Professional & Industry Connections",
        "Indoor & Outdoor Youth Activities",
        "Featured Youth Success Highlights"
      ]
    }
  ] as ProgramOffering[]
};

export const VIRTUAL_CLASS_COURSES = [
  'AI for Everyone',
  'Cybersecurity',
  'Digital Literacy',
  'Data Fundamentals',
  'Web Development',
  'Entrepreneurship Foundations',
  'Creative Media',
  'Leadership & Communication'
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "I walked in with talent and no direction. Youth ka Pakistan gave me mentors, a stage, and the confidence to turn my passion into real work.",
    author: "Aisha Khan",
    role: "Student at New York Institute of Technology",
    city: "",
    image: "/images/testimonials/aisha-khan.png",
    linkedinUrl: "https://www.linkedin.com/in/aisha-khan-ak"
  },
  {
    id: "2",
    quote: "The skills workshops were free, practical, and serious. I built a portfolio, met peers from other cities, and finally felt part of something bigger.",
    author: "Hasan Ali",
    role: "LPC LLM Student at BPP University",
    city: "",
    image: "/images/testimonials/hasan-ali.png",
    linkedinUrl: "https://www.linkedin.com/in/hasan-ali-0932661ba"
  },
  {
    id: "3",
    quote: "Before this, opportunity felt far away. Now I know where to learn, who to ask, and how to show up for my future.",
    author: "Fatima Noor",
    role: "Human Resource Manager / Connecting Talent with Opportunity",
    city: "",
    image: "/images/testimonials/fatima-noor.png",
    linkedinUrl: "https://www.linkedin.com/in/fatima-noor-8b56a5160"
  }
];

export const WHY_CHOOSE_DATA = {
  title: "Why Choose Youth Ka Pakistan for Your Growth?",
  description: "We are committed to nurturing the potential of every Pakistani youth through dedicated programs, personalized mentorship, and community support.",
  features: [
    {
      id: "nationwide-reach",
      title: "Nationwide Reach",
      description: "Our organization operates across Pakistan, ensuring that no talented youth are left behind. We connect youth from every corner with opportunities that matter.",
      image: "/images/map-of-pakistan.png",
      ctaText: "Learn More"
    },
    {
      id: "free-resources",
      title: "Free Resources",
      description: "All our programs and resources are completely free. We believe in providing equal access to skills and opportunities, regardless of background.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      ctaText: "Learn More"
    }
  ]
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "skills-that-open-doors",
    title: "Skills that open doors: why practical learning matters for Pakistani youth",
    excerpt: "Degrees help, but employers hire people who can do the work. Youth ka Pakistan focuses on free, practical skills young people can use immediately.",
    content: "Across Pakistan, thousands of talented young people finish school or university without a clear path into work. Youth ka Pakistan exists to close that gap. Our skills programmes focus on what students can actually use: communication, digital tools, event production, and the confidence to show up on a stage or in a workplace.\n\nWe believe opportunity should not depend on a family’s income or a city’s postcode. That is why our resources and student pathways are free. If you are ready to learn, there is a place for you in this movement.\n\nJoin as a student to get on the waitlist for forthcoming virtual classes, workshops, and national events such as URAAN-E-AI 2026.",
    date: "January 25, 2026",
    dateIso: "2026-01-25",
    author: "Youth ka Pakistan",
    category: "Skills",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    slug: "mentorship-for-pakistani-youth",
    title: "How mentorship helps young Pakistanis turn talent into a career",
    excerpt: "A mentor shortens the distance between potential and a first real opportunity. Here is how Youth ka Pakistan connects students with people who have walked the path.",
    content: "Talent is common. Access is not. Mentorship is one of the fastest ways a young person in Karachi, Lahore, Peshawar, or a smaller city can see a realistic next step — a portfolio, an interview, a first stage, a first job.\n\nYouth ka Pakistan invites educators, industry professionals, and partners to offer time, not just advice. Students get guidance. Mentors get to invest in the generation that will shape Pakistan’s economy and culture.\n\nIf you can teach, hire, or open a door, send a partner inquiry. If you are a student looking for that door, register and tell us what you want to learn.",
    date: "January 25, 2026",
    dateIso: "2026-01-25",
    author: "Youth ka Pakistan",
    category: "Mentorship",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    slug: "uraan-e-ai-2026-digital-flight",
    title: "URAAN-E-AI 2026: Pakistan’s Digital Flight lands in Karachi",
    excerpt: "On 1 September 2026 at DHA Suffa University, Youth ka Pakistan hosts a national IT and Artificial Intelligence seminar for students, educators, and innovators.",
    content: "URAAN-E-AI 2026 — Pakistan’s Digital Flight — is a national conversation on an AI-first economy. Students, educators, technology professionals, entrepreneurs, and emerging innovators will gather at DHA Suffa University in Karachi on Tuesday, 1 September 2026 from 2:00 PM onwards.\n\nThe panel explores business adoption, future skills, startups, education, ethics, and national development. Admission is free with RSVP.\n\nWhether you are a student planning an AI-ready career or an organisation preparing your workforce, this seminar is the place to listen, ask, and connect. RSVP on the events page and follow Pakistan’s Digital Flight on Instagram and Facebook for updates.",
    date: "August 19, 2026",
    dateIso: "2026-08-19",
    author: "Youth ka Pakistan",
    category: "Events",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
  }
];

export const MOVEMENT_BANNER = {
  title: "Your future starts with one step",
  description: "Join the waitlist for forthcoming virtual classes, meet mentors, and join thousands of young Pakistanis building skills that open real doors.",
  ctaText: "Become a Student"
};

export const YKP_IN_ACTION = {
  eyebrow: "Watch & get inspired",
  title: "YKP in Action",
  description: "See workshops, stages, and youth stories from across Pakistan — then join the movement yourself.",
  channelUrl: "https://www.linkedin.com/company/youth-ka-pakistan/posts/?feedView=all",
  channelCta: "Visit LinkedIn",
  videos: [
    {
      id: "1",
      youtubeId: "Ks-_Mh1QhMc",
      title: "Confidence on Stage — Youth Showcase Highlights",
      description: "Moments from our talent showcases where young voices found their stage.",
      duration: "6:12"
    },
    {
      id: "2",
      youtubeId: "eIho2S0ZahI",
      title: "Skills That Open Doors — Workshop Recap",
      description: "Inside a free skills session — practical learning youth can use immediately.",
      duration: "4:48"
    },
    {
      id: "3",
      youtubeId: "D9Ihs241zeg",
      title: "Mentors & Movement — Voices of YKP",
      description: "Participants share how mentorship and community changed their path.",
      duration: "5:30"
    },
    {
      id: "4",
      youtubeId: "iCvmsMzlF7o",
      title: "Nationwide Reach — YKP Across Pakistan",
      description: "A look at how Youth ka Pakistan connects talent from every corner.",
      duration: "3:55"
    }
  ] as YkpVideo[]
};

export const EVENTS_DATA: YkpEvent[] = eventsJson as YkpEvent[];

export const FEATURED_EVENT: YkpEvent = EVENTS_DATA[0];

export const FEATURED_EVENT_SPEAKERS: PublicEventProfile[] = [
  {
    id: 'beyond-tahir',
    fullName: 'Beyond Tahir',
    designation: 'Chair – AAAI Pakistan',
    organization: 'PureDesigners',
    role: 'Speaker',
    bio: 'Forbes-nominated, government-awarded AI leader. IBM Certified Coach Champion & Partner, founder of PureDesigners, and author. Chair of AAAI Pakistan.',
    photoUrl: '/images/speakers/beyond-tahir.png',
    linkedinUrl: 'https://www.linkedin.com/in/beyondtahir/',
    featuredSpeaker: true,
    featuredPanelist: false
  },
  {
    id: 'ahmed-rauf-essa',
    fullName: 'Ahmed Rauf Essa',
    designation: 'Founder, Telemart & ARE Ventures',
    organization: 'Telemart',
    role: 'Speaker',
    bio: 'Forbes 30 Under 30 entrepreneur, 14-time global awards winner, and Chair of the International Business Awards. Founder of Telemart and ARE Ventures, and a global mentor at Startup World Cup.',
    photoUrl: '/images/speakers/ahmed-rauf-essa.png',
    linkedinUrl: 'https://www.linkedin.com/in/ahmed-rauf-essa/',
    featuredSpeaker: true,
    featuredPanelist: false
  },
  {
    id: 'imran-batada',
    fullName: 'Dr. Imran Batada',
    designation: 'Chief Digital Officer',
    organization: 'Institute of Business Management',
    role: 'Speaker',
    bio: 'Five-time Global CIO Award winner and author of Digital Pakistan. Chief Digital Officer at IoBM, former CIO at IBA Karachi, and educator who has trained 25,000+ professionals in digital transformation.',
    photoUrl: '/images/speakers/imran-batada.png',
    linkedinUrl: 'https://www.linkedin.com/in/imranbatada/',
    featuredSpeaker: true,
    featuredPanelist: false
  },
  {
    id: 'azam-mughal',
    fullName: 'M. Azam Mughal',
    designation: '',
    organization: '',
    role: 'Panelist',
    bio: '',
    photoUrl: '/images/speakers/azam-mughal.png',
    linkedinUrl: 'https://www.linkedin.com/in/mazammug/',
    featuredSpeaker: false,
    featuredPanelist: true
  },
  {
    id: 'jamil-ur-rehman',
    fullName: 'Jamil ur Rehman',
    designation: '',
    organization: '',
    role: 'Panelist',
    bio: '',
    photoUrl: '/images/speakers/jamil-ur-rehman.png',
    linkedinUrl: 'https://www.linkedin.com/in/jamilurehman/',
    featuredSpeaker: false,
    featuredPanelist: true
  },
  {
    id: 'majid-noor-khan',
    fullName: 'Majid Noor Khan',
    designation: '',
    organization: '',
    role: 'Panelist',
    bio: '',
    photoUrl: '/images/speakers/majid-noor-khan.png',
    linkedinUrl: 'https://www.linkedin.com/in/majid-noor-9929b978/',
    featuredSpeaker: false,
    featuredPanelist: true
  },
  {
    id: 'najeeb-ur-rehman-malik',
    fullName: 'Dr. Najeeb ur Rehman Malik',
    designation: '',
    organization: '',
    role: 'Panelist',
    bio: '',
    photoUrl: '/images/speakers/najeeb-ur-rehman-malik.png',
    featuredSpeaker: false,
    featuredPanelist: true
  },
  {
    id: 'daniyal-nagori',
    fullName: 'Daniyal Nagori',
    designation: 'CEO',
    organization: 'Governor Sindh IT Initiative',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/daniyal-nagori.png',
    linkedinUrl: 'https://www.linkedin.com/in/daniyalnagori/',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'junaid-ahmed-khan',
    fullName: 'Junaid Ahmed Khan',
    designation: 'President',
    organization: 'All Pakistan Media Alliance',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/junaid-ahmed-khan.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'haider-raza-khan',
    fullName: 'LtCol M Haider Raza Khan (Retd)',
    designation: 'Retired Lieutenant Colonel',
    organization: '',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/haider-raza-khan.png',
    linkedinUrl: 'https://www.linkedin.com/in/lt-col-haider-raza/',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'saleem-sheikh',
    fullName: 'M. Saleem Sheikh',
    designation: 'Chairman & CEO; Corporate Tax Attorney',
    organization: 'MSS Associate',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/saleem-sheikh.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'imran-khaliq',
    fullName: 'Imran Khaliq',
    designation: 'Director, IK Coaching Center; IN Foundation President',
    organization: 'Friends / Lions Club International',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/imran-khaliq.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'ghulam-azfar-mahisar',
    fullName: 'Ghulam Azfar Mahisar',
    designation: 'DIGP CTD',
    organization: 'Sindh Police, Karachi',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/ghulam-azfar-mahisar.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'mariam-sana',
    fullName: 'Mariam Sana',
    designation: 'AVP',
    organization: 'National Bank of Pakistan',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/mariam-sana.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'muhammad-umer-khan',
    fullName: 'Muhammad Umer Khan',
    designation: '',
    organization: '',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/muhammad-umer-khan.png',
    linkedinUrl: 'https://www.linkedin.com/in/umerconsulting/',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'atif-iqbal',
    fullName: 'Atif Iqbal',
    designation: 'Group CEO',
    organization: 'Hi-Q Group & Hi-Q Pharmaceuticals',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/atif-iqbal.png',
    linkedinUrl: 'https://www.linkedin.com/in/atif-iqbal-11290835/',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'hasan-baig',
    fullName: 'Hasan Baig',
    designation: 'Influencer',
    organization: '',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/hasan-baig.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'zulfiqar-halepoto',
    fullName: 'Zulfiqar Hali Poto',
    designation: 'Author & Social Development Consultant',
    organization: '',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/zulfiqar-halepoto.png',
    linkedinUrl: 'https://www.linkedin.com/in/zulfiqar-halepoto-b3015b16/',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'ali-arsh-khan',
    fullName: 'Ali Arsh Khan',
    designation: 'Founder & Chairman, International Business Forum (IBF); CEO/Founder, A Group; Co-founder, H&A Group',
    organization: '',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/ali-arsh-khan.png',
    linkedinUrl: 'https://www.linkedin.com/in/ali-arsh-khan-42974137b/',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'azhar-zia-mohammad',
    fullName: 'Azhar Zia Mohammad',
    designation: '',
    organization: 'EMA Group of Companies',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/azhar-zia-mohammad.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'mohsin-ismail',
    fullName: 'Mohsin Ismail',
    designation: 'Blogger',
    organization: 'Chaltay Phirtay',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/mohsin-ismail.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'zulfikar-ali-memon',
    fullName: 'Dr. Zulfikar Ali Memon',
    designation: 'Director',
    organization: 'FAST-NUCES Karachi',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/zulfikar-ali-memon.png',
    linkedinUrl: 'https://www.linkedin.com/in/memonzulfiqar/',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'hafiz-muzammil-malik',
    fullName: 'Hafiz Muzammil Malik',
    designation: 'Founder & President',
    organization: 'Sirat-e-Mustaqeem Welfare Trust',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/hafiz-muzammil-malik.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'fahad-yasin',
    fullName: 'Fahad Yasin',
    designation: 'CEO, DS Skills Academy; Manager, Shahji Digital Academy',
    organization: '',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/fahad-yasin.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'syed-ali-raza',
    fullName: 'Syed Ali Raza',
    designation: 'Senior Anchor Person',
    organization: 'ARY News',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/syed-ali-raza.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'mujtaba-sumsum',
    fullName: 'Barrister Mujtaba Sumsum',
    designation: 'Chairman',
    organization: 'Voice of Youth Karachi',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/mujtaba-sumsum.png',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'noman-ali-sheikh',
    fullName: 'Noman Ali Sheikh',
    designation: 'Public Relations Coordinator; Secretary',
    organization: "Pakistan People's Party",
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/noman-ali-sheikh.png',
    linkedinUrl: 'https://www.linkedin.com/in/noman-ali-shaikh-a49a1924/',
    featuredSpeaker: false,
    featuredPanelist: false
  },
  {
    id: 'amna-shahzad',
    fullName: 'Amna Shahzad',
    designation: "Pakistan's youngest data scientist; Co-Founder & CTO",
    organization: 'Deventra Solutions',
    role: 'Guest of Honor',
    bio: '',
    photoUrl: '/images/speakers/amna-shahzad.png',
    linkedinUrl: 'https://www.linkedin.com/in/amna-shahzad-data-scientist/',
    featuredSpeaker: false,
    featuredPanelist: false
  }
];

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 'album-china-consulate-meetup',
    eventId: 'uraan-e-ai-2026',
    name: 'YKP & Consulate General of China',
    year: '2026',
    coverImage: '/images/gallery/china-consulate-meetup/poster.png',
    images: [
      {
        id: 'poster',
        url: '/images/gallery/china-consulate-meetup/poster.png',
        caption: 'Sabi Arsh, Chairperson YKP Foundation, with Mr. Feng Deheng, Acting Consul General of China in Karachi'
      }
    ]
  },
  {
    id: 'album-chef-iconic-awards-2026',
    eventId: 'pakistan-chef-iconic-awards-2026',
    name: 'Pakistan Chef Icon Award',
    year: '2026',
    coverImage: '/images/gallery/chef-iconic-awards-2026/01.jpg',
    images: [
      { id: '1', url: '/images/gallery/chef-iconic-awards-2026/01.jpg', caption: 'Official poster — Pakistan Chef Icon Award 2026' },
      { id: '2', url: '/images/gallery/chef-iconic-awards-2026/02.jpg', caption: 'Stage and culinary panel' },
      { id: '3', url: '/images/gallery/chef-iconic-awards-2026/03.jpg', caption: 'Syed Nasir Hussain Shah addressing the ceremony' },
      { id: '4', url: '/images/gallery/chef-iconic-awards-2026/04.jpg', caption: 'Award presentation' },
      { id: '5', url: '/images/gallery/chef-iconic-awards-2026/05.jpg', caption: 'Chief guest with award recipients' },
      { id: '6', url: '/images/gallery/chef-iconic-awards-2026/06.jpg', caption: 'Pakistan Chef Icon Award presentation' },
      { id: '7', url: '/images/gallery/chef-iconic-awards-2026/07.jpg', caption: 'Guests and chefs on stage' },
      { id: '8', url: '/images/gallery/chef-iconic-awards-2026/08.jpg', caption: 'Trophy presentation' },
      { id: '9', url: '/images/gallery/chef-iconic-awards-2026/09.jpg', caption: 'YKP Foundation guests of honour' },
      { id: '10', url: '/images/gallery/chef-iconic-awards-2026/10.jpg', caption: 'Group photo' },
      { id: '11', url: '/images/gallery/chef-iconic-awards-2026/11.jpg', caption: 'Guest of Honour award' },
      { id: '12', url: '/images/gallery/chef-iconic-awards-2026/12.jpg', caption: 'Cake cutting at Desi Tadka' }
    ]
  },
  {
    id: 'album-marka-e-haq-excellence-award',
    eventId: 'marka-e-haq-excellence-award',
    name: 'Marka e Haq Excellence Award',
    year: '2025',
    coverImage: '/images/gallery/marka-e-haq-excellence-award/cover.jpg',
    images: [
      { id: 'cover', url: '/images/gallery/marka-e-haq-excellence-award/cover.jpg', caption: 'Official poster — Marka e Haq Excellence Award' },
      { id: '1', url: '/images/gallery/marka-e-haq-excellence-award/01.jpg', caption: 'Award presentation' },
      { id: '2', url: '/images/gallery/marka-e-haq-excellence-award/02.jpg', caption: 'Mr. Master World 2024 championship belt' },
      { id: '3', url: '/images/gallery/marka-e-haq-excellence-award/03.jpg', caption: 'Excellence award handshake' },
      { id: '4', url: '/images/gallery/marka-e-haq-excellence-award/04.jpg', caption: 'Award presentation' },
      { id: '5', url: '/images/gallery/marka-e-haq-excellence-award/05.jpg', caption: 'Recipients with awards' },
      { id: '6', url: '/images/gallery/marka-e-haq-excellence-award/06.jpg', caption: 'Marka-e-Haq Excellence Award' },
      { id: '7', url: '/images/gallery/marka-e-haq-excellence-award/07.jpg', caption: 'Award presentation' },
      { id: '8', url: '/images/gallery/marka-e-haq-excellence-award/08.jpg', caption: 'Award with guests' },
      { id: '9', url: '/images/gallery/marka-e-haq-excellence-award/09.jpg', caption: 'Group photo' },
      { id: '10', url: '/images/gallery/marka-e-haq-excellence-award/10.jpg', caption: 'Studio conversation' },
      { id: '11', url: '/images/gallery/marka-e-haq-excellence-award/11.jpg', caption: 'Cake cutting and award ceremony' }
    ]
  },
  {
    id: 'album-celebration-pakistan-chef-icon-award',
    eventId: 'celebration-pakistan-chef-icon-award',
    name: 'Celebration Pakistan Chef Icon Award',
    year: '2024',
    coverImage: '/images/gallery/celebration-pakistan-chef-icon-award/06.jpg',
    images: [
      { id: '1', url: '/images/gallery/celebration-pakistan-chef-icon-award/01.jpg', caption: 'Guests in conversation' },
      { id: '2', url: '/images/gallery/celebration-pakistan-chef-icon-award/02.jpg', caption: 'Guest of Honour award' },
      { id: '3', url: '/images/gallery/celebration-pakistan-chef-icon-award/03.jpg', caption: 'Group with Pakistan Chef Icon Award' },
      { id: '4', url: '/images/gallery/celebration-pakistan-chef-icon-award/04.jpg', caption: 'Guests of the celebration' },
      { id: '5', url: '/images/gallery/celebration-pakistan-chef-icon-award/05.jpg', caption: 'Celebration guests' },
      { id: '6', url: '/images/gallery/celebration-pakistan-chef-icon-award/06.jpg', caption: 'Group photo' },
      { id: '7', url: '/images/gallery/celebration-pakistan-chef-icon-award/07.jpg', caption: 'Celebration banner' },
      { id: '8', url: '/images/gallery/celebration-pakistan-chef-icon-award/08.jpg', caption: 'Chef Irfan Wasti award' },
      { id: '9', url: '/images/gallery/celebration-pakistan-chef-icon-award/09.jpg', caption: 'Kiran Khan award' },
      { id: '10', url: '/images/gallery/celebration-pakistan-chef-icon-award/10.jpg', caption: 'Award presentation' },
      { id: '11', url: '/images/gallery/celebration-pakistan-chef-icon-award/11.jpg', caption: 'Award with chefs and guests' },
      { id: '12', url: '/images/gallery/celebration-pakistan-chef-icon-award/12.jpg', caption: 'Cake cutting' }
    ]
  }
];

export const HOME_GALLERY_FRAMES: {
  id: string;
  url: string;
  alt: string;
  eventName: string;
  year: string;
  size: 'hero' | 'tall' | 'tile' | 'wide';
  fit?: 'cover' | 'contain';
}[] = [
  {
    id: 'chef-group',
    url: '/images/gallery/chef-iconic-awards-2026/10.jpg',
    alt: 'Guests at the Pakistan Chef Icon Award',
    eventName: 'Pakistan Chef Icon Award',
    year: '2026',
    size: 'hero'
  },
  {
    id: 'china-poster',
    url: '/images/gallery/china-consulate-meetup/poster.png',
    alt: 'YKP Chairperson Sabi Arsh with Acting Consul General of China in Karachi',
    eventName: 'YKP & Consulate General of China',
    year: '2026',
    size: 'tall',
    fit: 'contain'
  },
  {
    id: 'marka-handshake',
    url: '/images/gallery/marka-e-haq-excellence-award/03.jpg',
    alt: 'Marka e Haq Excellence Award handshake',
    eventName: 'Marka e Haq Excellence Award',
    year: '2025',
    size: 'tile'
  },
  {
    id: 'celebration-group',
    url: '/images/gallery/celebration-pakistan-chef-icon-award/06.jpg',
    alt: 'Celebration Pakistan Chef Icon Award group photo',
    eventName: 'Celebration Pakistan Chef Icon Award',
    year: '2024',
    size: 'tile'
  },
  {
    id: 'chef-stage',
    url: '/images/gallery/chef-iconic-awards-2026/07.jpg',
    alt: 'Guests and chefs on stage',
    eventName: 'Pakistan Chef Icon Award',
    year: '2026',
    size: 'tile'
  },
  {
    id: 'marka-group',
    url: '/images/gallery/marka-e-haq-excellence-award/09.jpg',
    alt: 'Marka e Haq Excellence Award group photo',
    eventName: 'Marka e Haq Excellence Award',
    year: '2025',
    size: 'tile'
  },
  {
    id: 'celebration-award',
    url: '/images/gallery/celebration-pakistan-chef-icon-award/08.jpg',
    alt: 'Chef Irfan Wasti award presentation',
    eventName: 'Celebration Pakistan Chef Icon Award',
    year: '2024',
    size: 'tile'
  },
  {
    id: 'chef-honour',
    url: '/images/gallery/chef-iconic-awards-2026/09.jpg',
    alt: 'YKP Foundation guests of honour',
    eventName: 'Pakistan Chef Icon Award',
    year: '2026',
    size: 'wide'
  }
];

export const PAST_EVENTS: PastEventStat[] = [
  {
    id: "1",
    year: "2025",
    title: "National Talent Showcase",
    stats: [
      { label: "Youth", value: "1,200+" },
      { label: "City", value: "Karachi" },
      { label: "Workshops", value: "24" }
    ]
  },
  {
    id: "2",
    year: "2024",
    title: "Skills Bootcamp Series",
    stats: [
      { label: "Youth", value: "860+" },
      { label: "City", value: "Karachi" },
      { label: "Mentors", value: "40" }
    ]
  },
  {
    id: "3",
    year: "2023",
    title: "Community Youth Forums",
    stats: [
      { label: "Youth", value: "640+" },
      { label: "City", value: "Karachi" },
      { label: "Partners", value: "15" }
    ]
  },
  {
    id: "4",
    year: "2022",
    title: "Grassroots Launch Year",
    stats: [
      { label: "Youth", value: "320+" },
      { label: "City", value: "Karachi" },
      { label: "Events", value: "8" }
    ]
  }
];

export const PARTNERS_DATA = [
  { id: "1", name: "National Youth Council", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80", category: "Govt Alliance" },
  { id: "2", name: "Pakistan Skill Trust", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80", category: "Education Partner" },
  { id: "3", name: "Global Youth Initiative", logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=80", category: "International NGO" },
  { id: "4", name: "Tech Pakistan Network", logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=300&q=80", category: "Industry Partner" },
  { id: "5", name: "Youth Empowerment Hub", logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80", category: "Community Hub" },
  { id: "6", name: "Higher Skill Council", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80", category: "Academy Partner" }
];
