export interface Conference {
  id: string;
  title: string;
  editionNumber: number;
  dates: string;
  location: string;
  venue: string;
  theme: string;
  targetGroup: string;
  countriesCount: number;
  onlineRegistered: string;
  inPersonDelegates: string;
  appUsers?: string;
  livestreamViewers?: string;
  activeAppUsers?: string;
  socialMediaReach?: string;
  appInteractions?: string;
  isUpcoming?: boolean;
  status: 'Upcoming' | 'Completed';
  summary: string;
  highlights: string[];
}

export interface ImpactReport {
  id: string;
  code: string; // e.g. "IYC11", "IYC10"
  title: string;
  year: string;
  cycleName: string;
  projectsCount: number;
  countriesCount: number;
  volunteersCount: number;
  beneficiariesCount: number;
  downloadUrl?: string;
  pdfFileName: string;
  colorHex: string; // Brand accent color for card button
  sdgFocus: string[];
  executiveSummary: string;
}

export interface CorePrinciple {
  number: string;
  title: string;
  description: string;
  sdgRef?: string;
}

export interface PartnerInstitution {
  name: string;
  code: string;
  category: string;
  website?: string;
}

export interface VideoHighlight {
  id: string;
  title: string;
  subtitle: string;
  event: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  views: string;
}

export interface YkpVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  duration: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  country: string;
  bio: string;
  avatarUrl: string;
  category: 'Executive Council' | 'Youth Advisory' | 'Regional Director' | 'Alumni Ambassador';
}

export interface ImpactProject {
  id: string;
  title: string;
  leadName: string;
  leadCountry: string;
  sdgGoals: number[];
  sdgLabels: string[];
  volunteersCount: number;
  beneficiariesCount: number;
  status: 'Active' | 'Completed' | 'Scaling';
  location: string;
  summary: string;
  outcomes: string[];
  dateSubmitted: string;
  reportCycle: string;
}

export type ActiveTab =
  | 'home'
  | 'about'
  | 'offerings'
  | 'blog'
  | 'contact'
  | 'events'
  | 'gallery';

export type ModalType =
  | 'contact'
  | 'program-enroll'
  | 'learn-more'
  | 'resource-download'
  | 'student-register'
  | 'event-rsvp'
  | null;

export interface YkpEvent {
  id: string;
  title: string;
  summary: string;
  venue: string;
  city: string;
  dates: string;
  time?: string;
  fees: string;
  status: 'Upcoming' | 'Open' | 'Completed';
  category: string;
  image: string;
  highlights: string[];
  capacity?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

export interface GalleryAlbum {
  id: string;
  eventId: string;
  name: string;
  year: string;
  coverImage: string;
  images: GalleryImage[];
}

export interface PastEventStat {
  id: string;
  year: string;
  title: string;
  stats: { label: string; value: string }[];
}

export interface ProgramOffering {
  id: string;
  num?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  details: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  city: string;
  image: string;
}
