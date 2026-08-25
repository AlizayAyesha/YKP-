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
  | 'gallery'
  | 'admin';

export type ModalType =
  | 'contact'
  | 'program-enroll'
  | 'learn-more'
  | 'resource-download'
  | 'student-register'
  | 'event-rsvp'
  | 'invitation-profile'
  | 'partner-inquiry'
  | null;

export type EventProfileRole =
  | 'Guest of Honor'
  | 'Speaker'
  | 'Panelist'
  | 'Educational Leader'
  | 'Corporate Representative'
  | 'Participant';

export type ProfileApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface EventContentCard {
  title: string;
  detail: string;
}

export interface YkpEvent {
  id: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  summary: string;
  description: string;
  about?: string[];
  venue: string;
  city: string;
  dates: string;
  date: string;
  time?: string;
  startTime: string;
  endTime: string;
  fees: string;
  status: 'Upcoming' | 'Open' | 'Completed';
  registrationStatus: string;
  category: string;
  image: string;
  highlights: string[];
  capacity?: string;
  posterTemplate: string;
  organizer: string;
  registrationEnabled: boolean;
  registrationPrefix?: string;
  contactPhone?: string;
  themeUrdu?: string;
  themeEnglish?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  panelTitle?: string;
  panelSubtitle?: string;
  panelIntro?: string;
  panelSummary?: string;
  panelQuestion?: string;
  panelTopics?: EventContentCard[];
  expect?: EventContentCard[];
  whoShouldAttend?: string[];
}

export interface AttendeeRegistration {
  id: string;
  registrationId: string;
  eventId: string;
  fullName: string;
  designation: string;
  organization: string;
  email: string;
  phone: string;
  city: string;
  guests: string;
  notes: string;
  publicConsent: boolean;
  photoPath: string;
  posterPath: string;
  posterUrl: string;
  posterStatus: 'pending' | 'ready' | 'failed';
  emailSent: boolean;
  createdAt: string;
}

export interface StudentInterest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  age: string;
  school: string;
  educationLevel: string;
  interests: string[];
  motivation: string;
  createdAt: string;
}

export type InquiryRole = 'Mentor' | 'Educator' | 'Partner / Sponsor' | 'Other';

export interface PartnerInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  organization: string;
  role: InquiryRole;
  otherRole: string;
  supportTypes: string[];
  expertise: string;
  supportDetails: string;
  availability: string;
  website: string;
  createdAt: string;
}

export interface EventProfile {
  id: string;
  eventId: string;
  fullName: string;
  designation: string;
  organization: string;
  role: EventProfileRole;
  bio: string;
  email: string;
  phone: string;
  photoUrl: string;
  linkedinUrl?: string;
  status: ProfileApprovalStatus;
  featuredSpeaker: boolean;
  featuredPanelist: boolean;
  createdAt: string;
}

export interface PublicEventProfile {
  id: string;
  fullName: string;
  designation: string;
  organization: string;
  role: EventProfileRole;
  bio: string;
  photoUrl: string;
  linkedinUrl?: string;
  featuredSpeaker: boolean;
  featuredPanelist: boolean;
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
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  dateIso: string;
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
