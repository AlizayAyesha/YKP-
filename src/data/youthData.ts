import {
  ProgramOffering,
  BlogPost,
  Testimonial,
  YkpVideo,
  YkpEvent,
  PastEventStat,
  GalleryAlbum
} from '../types';

export const SITE_INFO = {
  name: "Youth ka Pakistan",
  tagline: "Empowering Pakistani Youth",
  domain: "youthkapakistan.com",
  contactEmail: "info@youthkapakistan.com",
  contactPhone: "+923002530110",
  address: "Karachi Pakistan",
  copyright: "Copyright © 2026 youthkapakistan.com",
  socials: {
    facebook: "https://facebook.com/youthkapakistan",
    youtube: "https://youtube.com/youthkapakistan",
    instagram: "https://instagram.com/youthkapakistan"
  }
};

export const HERO_DATA = {
  title: "Skills. Stage. Opportunity.",
  subtitle: "A nationwide movement helping Pakistani youth build real skills, find mentors, and step into opportunities that change their future.",
  ctaText: "Join the Movement"
};

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80";

export const VISION_DATA = {
  title: "The Vision Behind Youth ka Pakistan",
  content: "Youth ka Pakistan is a nationwide non-profit organization focused on promoting the skills and talents of Pakistani youth. Founded with a vision to uplift the youth of Pakistan, the initiative began as a grassroots movement. Over the years, we have proudly served thousands of youth from diverse backgrounds, connecting them with opportunities to showcase their talents through events and workshops.",
  ctaText: "Learn More"
};

export const ABOUT_DATA = {
  eyebrow: "Empowering Youth",
  title: "The Vision Behind Youth ka Pakistan",
  paragraphs: [
    "Youth ka Pakistan is a nationwide non-profit organization focused on promoting the skills and talents of Pakistani youth. We believe in the potential of every young individual and strive to provide the necessary resources and opportunities for their development.",
    "Founded with a vision to uplift the youth of Pakistan, the initiative began as a grassroots movement. With a small group of passionate individuals, we aimed to make a significant impact in the lives of young boys and girls across the nation.",
    "Over the years, we have proudly served thousands of youth from diverse backgrounds, connecting them with opportunities to showcase their talents through events and workshops, enhancing their skills and confidence."
  ],
  coreValuesTitle: "Our Core Values",
  coreValuesSub: "We are guided by principles that reflect our commitment to youth development and community empowerment.",
  values: [
    {
      id: "inclusivity",
      title: "Inclusivity",
      description: "We believe in equal opportunities for all, regardless of background, ensuring every young person has a voice and a chance to shine."
    },
    {
      id: "empowerment",
      title: "Empowerment",
      description: "Our mission is to empower the youth by providing the tools, resources, and platforms needed to cultivate their skills and passions."
    },
    {
      id: "community-engagement",
      title: "Community Engagement",
      description: "We prioritize community involvement, fostering collaborations that amplify the impact of our initiatives and strengthen our collective mission."
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
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
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
    title: "Crafting Captivating Headlines: Your awesome post title goes here",
    excerpt: "Engaging Introductions: Capturing Your Audience’s Interest The initial impression your blog post makes is crucial, and that’s where your introduction […]",
    content: "Engaging Introductions: Capturing Your Audience’s Interest The initial impression your blog post makes is crucial, and that’s where your introduction sets the stage for empowering Pakistani youth with real skillsets, guidance, and opportunity.",
    date: "January 25, 2026",
    author: "youthadminpakistan",
    category: "Blog",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "The Art of Drawing Readers In: Your attractive post title goes here",
    excerpt: "Engaging Introductions: Capturing Your Audience’s Interest The initial impression your blog post makes is crucial, and that’s where your introduction",
    content: "Engaging Introductions: Capturing Your Audience’s Interest The initial impression your blog post makes is crucial, and that’s where your introduction creates a gateway for learning and professional growth.",
    date: "January 25, 2026",
    author: "youthadminpakistan",
    category: "Blog",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "Mastering the First Impression: Your intriguing post title goes here",
    excerpt: "Engaging Introductions: Capturing Your Audience’s Interest The initial impression your blog post makes is crucial, and that’s where your introduction",
    content: "Engaging Introductions: Capturing Your Audience’s Interest The initial impression your blog post makes is crucial, and that’s where your introduction connects youth with lifelong mentors and resources.",
    date: "January 25, 2026",
    author: "youthadminpakistan",
    category: "Blog",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
  }
];

export const MOVEMENT_BANNER = {
  title: "Your future starts with one step",
  description: "Register to learn with us, meet mentors, and join thousands of young Pakistanis building skills that open real doors.",
  ctaText: "Register Now"
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

export const EVENTS_DATA: YkpEvent[] = [
  {
    id: "ykp-summit-2026",
    title: "Youth ka Pakistan Summit 2026",
    summary:
      "A nationwide gathering for young learners to build skills, meet mentors, and showcase talent through workshops, stages, and networking.",
    venue: "Expo Center",
    city: "Karachi, Pakistan",
    dates: "15–17 August 2026",
    time: "9:00 AM – 6:00 PM",
    fees: "Free for students",
    status: "Open",
    category: "Summit",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    capacity: "2,000 seats",
    highlights: [
      "Skills workshops in arts, tech, and leadership",
      "Live talent showcases and mentorship circles",
      "Open to youth from every city across Pakistan"
    ]
  },
  {
    id: "skills-bootcamp-lahore",
    title: "Skills Bootcamp — Lahore",
    summary:
      "A hands-on weekend of digital skills, creative media, and career mentorship for youth ready to build real portfolios.",
    venue: "Alhamra Arts Council",
    city: "Lahore, Pakistan",
    dates: "5–6 September 2026",
    time: "10:00 AM – 5:00 PM",
    fees: "Free",
    status: "Open",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    capacity: "300 seats",
    highlights: [
      "Portfolio-building workshops",
      "Mentor office hours",
      "Certificate of participation"
    ]
  },
  {
    id: "talent-showcase-islamabad",
    title: "National Talent Showcase — Islamabad",
    summary:
      "Young performers, creators, and innovators take the stage before mentors, media, and community leaders.",
    venue: "Pakistan National Council of the Arts",
    city: "Islamabad, Pakistan",
    dates: "20 September 2026",
    time: "3:00 PM – 9:00 PM",
    fees: "Free entry with RSVP",
    status: "Upcoming",
    category: "Showcase",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    capacity: "800 seats",
    highlights: [
      "Live performances & exhibitions",
      "Industry networking lounge",
      "Youth awards spotlight"
    ]
  },
  {
    id: "mentorship-forum-karachi",
    title: "Mentorship Forum — Karachi",
    summary:
      "Small-group mentorship circles connecting youth with professionals across tech, arts, sports, and entrepreneurship.",
    venue: "Youth Hub Karachi",
    city: "Karachi, Pakistan",
    dates: "12 October 2026",
    time: "11:00 AM – 4:00 PM",
    fees: "Free",
    status: "Upcoming",
    category: "Mentorship",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    capacity: "150 seats",
    highlights: [
      "1:1 mentor matching",
      "Career path panels",
      "Peer collaboration labs"
    ]
  },
  {
    id: "national-talent-2025",
    title: "National Talent Showcase 2025",
    summary:
      "A landmark year of talent, workshops, and community — now in our gallery archives.",
    venue: "Multiple venues",
    city: "Nationwide",
    dates: "November 2025",
    fees: "—",
    status: "Completed",
    category: "Showcase",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "1,200+ youth participants",
      "18 cities represented",
      "24 workshops delivered"
    ]
  }
];

export const FEATURED_EVENT: YkpEvent = EVENTS_DATA[0];

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
