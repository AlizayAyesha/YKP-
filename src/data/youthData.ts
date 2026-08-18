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
  socials: {
    facebook: "https://www.facebook.com/YouthKaPakistan.YKP",
    instagram: "https://www.instagram.com/ykpfoundation/",
    linkedin: "https://www.linkedin.com/in/ykp-foundation-374461426/",
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
  eyebrow: "Youth ka Pakistan",
  title: "The Vision Behind Youth ka Pakistan",
  paragraphs: [
    "Youth ka Pakistan is a nationwide non-profit organization dedicated to unlocking the potential of Pakistan's youth by creating meaningful opportunities to learn, grow, develop skills, and build connections.",
    "We believe that an empowered generation begins with access to the right knowledge, practical skills, supportive networks, and opportunities to lead."
  ],
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
      description: "Creating access to knowledge, learning experiences, workshops, and educational opportunities that broaden perspectives and inspire growth."
    },
    {
      id: "empower",
      title: "Empower",
      description: "Building confidence, leadership, and a sense of purpose so young people can take initiative and create meaningful change."
    },
    {
      id: "skill",
      title: "Skill",
      description: "Promoting practical, future-ready skills that help youth prepare for careers, entrepreneurship, innovation, and an evolving world."
    },
    {
      id: "connect",
      title: "Connect",
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
    role: "Talent Program Graduate",
    city: "Karachi",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    quote: "The skills workshops were free, practical, and serious. I built a portfolio, met peers from other cities, and finally felt part of something bigger.",
    author: "Hassan Ali",
    role: "Skills Development Track",
    city: "Lahore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    quote: "Before this, opportunity felt far away. Now I know where to learn, who to ask, and how to show up for my future.",
    author: "Fatima Noor",
    role: "Mentorship Participant",
    city: "Islamabad",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80"
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
    title: "Skills that open doors: why practical learning matters for Pakistani youth",
    excerpt: "Degrees help, but employers hire people who can do the work. Youth ka Pakistan focuses on free, practical skills young people can use immediately.",
    content: "Across Pakistan, thousands of talented young people finish school or university without a clear path into work. Youth ka Pakistan exists to close that gap. Our skills programmes focus on what students can actually use: communication, digital tools, event production, and the confidence to show up on a stage or in a workplace.\n\nWe believe opportunity should not depend on a family’s income or a city’s postcode. That is why our resources and student pathways are free. If you are ready to learn, there is a place for you in this movement.\n\nJoin as a student to get on the waitlist for forthcoming virtual classes, workshops, and national events such as URAAN-E-AI 2026.",
    date: "January 25, 2026",
    author: "Youth ka Pakistan",
    category: "Skills",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "How mentorship helps young Pakistanis turn talent into a career",
    excerpt: "A mentor shortens the distance between potential and a first real opportunity. Here is how Youth ka Pakistan connects students with people who have walked the path.",
    content: "Talent is common. Access is not. Mentorship is one of the fastest ways a young person in Karachi, Lahore, Peshawar, or a smaller city can see a realistic next step — a portfolio, an interview, a first stage, a first job.\n\nYouth ka Pakistan invites educators, industry professionals, and partners to offer time, not just advice. Students get guidance. Mentors get to invest in the generation that will shape Pakistan’s economy and culture.\n\nIf you can teach, hire, or open a door, send a partner inquiry. If you are a student looking for that door, register and tell us what you want to learn.",
    date: "January 25, 2026",
    author: "Youth ka Pakistan",
    category: "Mentorship",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "URAAN-E-AI 2026: Pakistan’s Digital Flight lands in Karachi",
    excerpt: "On 1 September 2026 at DHA Suffa University, Youth ka Pakistan hosts a national IT and Artificial Intelligence seminar for students, educators, and innovators.",
    content: "URAAN-E-AI 2026 — Pakistan’s Digital Flight — is a national conversation on an AI-first economy. Students, educators, technology professionals, entrepreneurs, and emerging innovators will gather at DHA Suffa University in Karachi on Tuesday, 1 September 2026 from 2:00 PM onwards.\n\nThe panel explores business adoption, future skills, startups, education, ethics, and national development. Admission is free with RSVP.\n\nWhether you are a student planning an AI-ready career or an organisation preparing your workforce, this seminar is the place to listen, ask, and connect. RSVP on the events page and follow Pakistan’s Digital Flight on Instagram and Facebook for updates.",
    date: "August 19, 2026",
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
  channelUrl: "https://youtube.com/youthkapakistan",
  channelCta: "Visit YouTube Channel",
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
  }
];

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: "album-summit-prep",
    eventId: "ykp-summit-2026",
    name: "Youth ka Pakistan Summit 2026",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    images: [
      { id: "1", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80", caption: "Opening hall" },
      { id: "2", url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80", caption: "Keynote stage" },
      { id: "3", url: "https://images.unsplash.com/photo-1591115765373-5207764f72bc?auto=format&fit=crop&w=1200&q=80", caption: "Youth delegates" },
      { id: "4", url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80", caption: "Workshop corner" },
      { id: "5", url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80", caption: "Networking lounge" },
      { id: "6", url: "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=1200&q=80", caption: "Closing moments" }
    ]
  },
  {
    id: "album-talent-2025",
    eventId: "national-talent-2025",
    name: "National Talent Showcase 2025",
    year: "2025",
    coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    images: [
      { id: "1", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", caption: "Group celebration" },
      { id: "2", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80", caption: "Stage lights" },
      { id: "3", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80", caption: "Performance night" },
      { id: "4", url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80", caption: "Audience energy" },
      { id: "5", url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80", caption: "Crowd cheer" },
      { id: "6", url: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=1200&q=80", caption: "Award moment" }
    ]
  },
  {
    id: "album-bootcamp-lahore",
    eventId: "skills-bootcamp-lahore",
    name: "Skills Bootcamp — Lahore",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
    images: [
      { id: "1", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80", caption: "Team learning" },
      { id: "2", url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80", caption: "Classroom session" },
      { id: "3", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80", caption: "Hands-on practice" },
      { id: "4", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80", caption: "Peer collaboration" },
      { id: "5", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80", caption: "Mentor circle" },
      { id: "6", url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80", caption: "Project demos" }
    ]
  },
  {
    id: "album-forums-2023",
    eventId: "community-forums-2023",
    name: "Community Youth Forums 2023",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80",
    images: [
      { id: "1", url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80", caption: "Forum circle" },
      { id: "2", url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80", caption: "Community leaders" },
      { id: "3", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80", caption: "Discussion panel" },
      { id: "4", url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80", caption: "Youth speakers" },
      { id: "5", url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80", caption: "Partner meetup" },
      { id: "6", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80", caption: "Team planning" }
    ]
  }
];

export const PAST_EVENTS: PastEventStat[] = [
  {
    id: "1",
    year: "2025",
    title: "National Talent Showcase",
    stats: [
      { label: "Youth", value: "1,200+" },
      { label: "Cities", value: "18" },
      { label: "Workshops", value: "24" }
    ]
  },
  {
    id: "2",
    year: "2024",
    title: "Skills Bootcamp Series",
    stats: [
      { label: "Youth", value: "860+" },
      { label: "Cities", value: "12" },
      { label: "Mentors", value: "40" }
    ]
  },
  {
    id: "3",
    year: "2023",
    title: "Community Youth Forums",
    stats: [
      { label: "Youth", value: "640+" },
      { label: "Cities", value: "9" },
      { label: "Partners", value: "15" }
    ]
  },
  {
    id: "4",
    year: "2022",
    title: "Grassroots Launch Year",
    stats: [
      { label: "Youth", value: "320+" },
      { label: "Cities", value: "5" },
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
