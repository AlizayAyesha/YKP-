import { Conference, ImpactReport, CorePrinciple, PartnerInstitution, VideoHighlight, TeamMember } from '../types';

export const GLOBAL_METRICS = {
  projects: "922",
  projectsLabel: "YOUTH-LED PROJECTS",
  countries: "164",
  countriesLabel: "COUNTRIES INVOLVED",
  volunteers: "79,445",
  volunteersLabel: "VOLUNTEERS MOBILIZED",
  directBeneficiaries: "27,002,947",
  directBeneficiariesLabel: "DIRECT BENEFICIARIES",
  indirectImpact: "96,263,135",
  indirectImpactLabel: "INDIRECT IMPACT"
};

export const CURRENT_CONFERENCE: Conference = {
  id: "iyc14",
  title: "International Youth Conference 14",
  editionNumber: 14,
  dates: "Sep 22–25, 2026",
  location: "New York City, USA",
  venue: "New York City, USA",
  theme: "Youth and the Future of Global Governance",
  targetGroup: "Youth 18–35",
  countriesCount: 186,
  onlineRegistered: "25,000+",
  inPersonDelegates: "1,200",
  status: "Upcoming",
  isUpcoming: true,
  summary: "The old models of diplomacy are no longer enough. At IYC14, we advance Youth-Led Global Governance, bringing the next generation to the center of international decision-making during the UNGA81 High-Level Week.",
  highlights: [
    "Four days of diplomacy, policy, and direct UN advocacy",
    "In-person & global virtual attendance accessible worldwide",
    "UNGA81 High-Level Week side-event alignment",
    "Organized by IOY (International Organization of Youth)"
  ]
};

export const CORE_PRINCIPLES: CorePrinciple[] = [
  {
    number: "01",
    title: "Peace Begins Locally",
    description: "Sustainable peace starts in communities and scales to international institutions through authentic youth engagement.",
    sdgRef: "SDG 16: Peace, Justice & Strong Institutions"
  },
  {
    number: "02",
    title: "Youth as Architects",
    description: "Young people are not merely beneficiaries of governance; they are its designers, policy makers, and implementers.",
    sdgRef: "SDG 17: Partnerships for the Goals"
  },
  {
    number: "03",
    title: "No Peace Without Inclusion",
    description: "Durable solutions require the full participation of all groups, especially those historically excluded from decision-making.",
    sdgRef: "SDG 10: Reduced Inequalities"
  },
  {
    number: "04",
    title: "Technology Must Serve Humanity",
    description: "Emerging technologies and artificial intelligence must be governed with human rights, equity, and sustainability at the center.",
    sdgRef: "SDG 9: Industry, Innovation & Infrastructure"
  },
  {
    number: "05",
    title: "Partnership is the Only Path",
    description: "Complex global challenges require multi-sector, cross-border, and intergenerational collaboration across all regions.",
    sdgRef: "SDG 17: Partnerships for the Goals"
  }
];

export const IMPACT_REPORTS: ImpactReport[] = [
  {
    id: "iyc11-report",
    code: "IYC11",
    title: "IYC11 Impact Report",
    year: "2025",
    cycleName: "11th Conference Cycle - Los Angeles",
    projectsCount: 184,
    countriesCount: 141,
    volunteersCount: 18650,
    beneficiariesCount: 6850000,
    pdfFileName: "IYC11_Impact_Report_Final.pdf",
    colorHex: "#3b82f6", // Royal blue accent
    sdgFocus: ["SDG 16", "SDG 13", "SDG 4"],
    executiveSummary: "Documenting 184 youth-led community initiatives launched post-IYC11 in Los Angeles, addressing climate resilience, civic literacy, and youth diplomacy."
  },
  {
    id: "iyc10-report",
    code: "IYC10",
    title: "IYC10 Impact Report",
    year: "2024",
    cycleName: "10th Conference Cycle - New York City",
    projectsCount: 162,
    countriesCount: 136,
    volunteersCount: 15400,
    beneficiariesCount: 5200000,
    pdfFileName: "IYC10_Impact_Report_Final.pdf",
    colorHex: "#10b981", // Emerald green accent
    sdgFocus: ["SDG 10", "SDG 5", "SDG 16"],
    executiveSummary: "Highlighting global outcomes from UNGA79 week, tracking 162 projects focused on reducing inequality, digital rights, and peacebuilding."
  },
  {
    id: "iyc9-report",
    code: "IYC9",
    title: "IYC9 Impact Report",
    year: "2024",
    cycleName: "9th Conference Cycle - Los Angeles",
    projectsCount: 148,
    countriesCount: 125,
    volunteersCount: 12800,
    beneficiariesCount: 4100000,
    pdfFileName: "IYC9_Impact_Report_Final.pdf",
    colorHex: "#d97706", // Amber gold accent
    sdgFocus: ["SDG 17", "SDG 11", "SDG 3"],
    executiveSummary: "Comprehensive metric breakdown of regional action hubs established across 5 continents following the 9th International Youth Conference."
  },
  {
    id: "iyc7-report",
    code: "IYC7",
    title: "IYC7 Impact Report",
    year: "2023",
    cycleName: "7th Conference Cycle - Virtual & Hybrid",
    projectsCount: 130,
    countriesCount: 118,
    volunteersCount: 10500,
    beneficiariesCount: 3800000,
    pdfFileName: "IYC7_Impact_Report_Final.pdf",
    colorHex: "#9333ea", // Purple accent
    sdgFocus: ["SDG 4", "SDG 8", "SDG 9"],
    executiveSummary: "Scaling digital youth advocacy during global transitions, providing skill bootcamps and micro-grants to 130 youth project leaders."
  },
  {
    id: "iyc6-report",
    code: "IYC6",
    title: "IYC6 Impact Report",
    year: "2022",
    cycleName: "6th Conference Cycle - New York City",
    projectsCount: 115,
    countriesCount: 104,
    volunteersCount: 9200,
    beneficiariesCount: 2900000,
    pdfFileName: "IYC6_Impact_Report_Final.pdf",
    colorHex: "#ef4444", // Red orange accent
    sdgFocus: ["SDG 13", "SDG 16", "SDG 1"],
    executiveSummary: "Mobilizing grassroots responses to ecological crises and humanitarian relief through youth peace networks."
  },
  {
    id: "iyc5-report",
    code: "IYC5",
    title: "IYC5 Impact Report",
    year: "2021",
    cycleName: "5th Conference Cycle - Foundational Action",
    projectsCount: 95,
    countriesCount: 92,
    volunteersCount: 7800,
    beneficiariesCount: 2100000,
    pdfFileName: "IYC5_Impact_Report_Final.pdf",
    colorHex: "#14b8a6", // Teal accent
    sdgFocus: ["SDG 3", "SDG 4", "SDG 17"],
    executiveSummary: "Early evaluation of the IOY delegate incubation network, establishing key monitoring and evaluation frameworks."
  }
];

export const PAST_CONFERENCES: Conference[] = [
  {
    id: "iyc13",
    title: "International Youth Conference 13",
    editionNumber: 13,
    dates: "May 21–24, 2026",
    location: "Los Angeles, USA",
    venue: "UCLA Luskin Center & Online",
    theme: "Innovative Diplomacy: Youth Advancing Peace and Security",
    targetGroup: "Youth 18-35",
    countriesCount: 141,
    onlineRegistered: "23,659",
    inPersonDelegates: "307",
    appUsers: "6,427",
    status: "Completed",
    summary: "Focused on modern security architectures, AI ethics, and multilateral peacebuilding with key participation from UN diplomats and university scholars.",
    highlights: ["307 In-Person delegates", "23k+ online participants", "141 countries represented"]
  },
  {
    id: "iyc12",
    title: "International Youth Conference 12",
    editionNumber: 12,
    dates: "Sep 20–23, 2025",
    location: "New York City, USA",
    venue: "UN Headquarters Area",
    theme: "Youth Governance & The SDG 2030 Horizon",
    targetGroup: "Youth 18-35",
    countriesCount: 164,
    onlineRegistered: "22,008",
    inPersonDelegates: "550",
    livestreamViewers: "3.2M",
    activeAppUsers: "9,000",
    socialMediaReach: "200M+",
    status: "Completed",
    summary: "Convened delegates alongside UNGA80 to deliver youth recommendations on multilateral governance reform.",
    highlights: ["550 In-Person delegates", "200M+ social media impressions", "164 countries"]
  },
  {
    id: "iyc11",
    title: "International Youth Conference 11",
    editionNumber: 11,
    dates: "May 2025",
    location: "Los Angeles, USA",
    venue: "LA Convention & Civic Center",
    theme: "Local Actions, Global Impact",
    targetGroup: "Youth 18-35",
    countriesCount: 174,
    onlineRegistered: "18,658",
    inPersonDelegates: "237",
    livestreamViewers: "586,678",
    status: "Completed",
    summary: "Empowered community organizers with project incubation, policy drafting tools, and seed funding connections.",
    highlights: ["18.6k registered online", "174 countries", "586k livestream views"]
  },
  {
    id: "iyc10",
    title: "International Youth Conference 10",
    editionNumber: 10,
    dates: "Sep 2024",
    location: "New York City, USA",
    venue: "UN High Level Week Campus",
    theme: "Shaping the Summit of the Future",
    targetGroup: "Youth 18-35",
    countriesCount: 186,
    onlineRegistered: "17,200",
    inPersonDelegates: "422",
    livestreamViewers: "581,668",
    socialMediaReach: "4.5M+",
    status: "Completed",
    summary: "Delivered official youth declarations to UN leaders for the Summit of the Future.",
    highlights: ["422 In-Person delegates", "4.5M+ social media reach", "186 countries"]
  },
  {
    id: "iyc9",
    title: "International Youth Conference 9",
    editionNumber: 9,
    dates: "Jun 2024",
    location: "Los Angeles, USA",
    venue: "UCLA Campus",
    theme: "Climate Resilience & Youth Migration",
    targetGroup: "Youth 18-35",
    countriesCount: 181,
    onlineRegistered: "15,900",
    inPersonDelegates: "225",
    livestreamViewers: "474,572",
    socialMediaReach: "79.6M+",
    status: "Completed",
    summary: "Addressed climate displacement, indigenous youth rights, and sustainable urbanization policies.",
    highlights: ["181 countries", "79.6M digital reach", "225 in-person leaders"]
  },
  {
    id: "iyc8",
    title: "International Youth Conference 8",
    editionNumber: 8,
    dates: "May 2024",
    location: "New York City, USA",
    venue: "UN Area & Columbia University",
    theme: "Digital Governance & Human Rights",
    targetGroup: "Youth 18-35",
    countriesCount: 174,
    onlineRegistered: "17,456",
    inPersonDelegates: "401",
    livestreamViewers: "581,668",
    appInteractions: "1.7M+",
    status: "Completed",
    summary: "Explored artificial intelligence ethics, youth privacy, and global digital compactness.",
    highlights: ["401 in-person delegates", "1.7M app interactions"]
  }
];

export const VIDEO_HIGHLIGHTS: VideoHighlight[] = [
  {
    id: "video-1",
    title: "Thousands of Young People Participate",
    subtitle: "International Youth Conference Keynote",
    event: "IYC13 Highlights",
    duration: "4:20",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // embed safe link
    thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    views: "142,500"
  },
  {
    id: "video-2",
    title: "Seat at the Decision Making Table for Youth",
    subtitle: "UN General Assembly High-Level Side Event",
    event: "IYC at the United Nations",
    duration: "6:15",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
    views: "98,300"
  },
  {
    id: "video-3",
    title: "Community Action by Team IYC in Local Regions",
    subtitle: "Grassroots SDG Implementation Showcase",
    event: "Youth in Action",
    duration: "5:45",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    views: "210,000"
  }
];

export const PARTNERS: PartnerInstitution[] = [
  { name: "UNITAR", code: "UNITAR", category: "United Nations Institute for Training and Research" },
  { name: "UCLA Luskin", code: "UCLA LUSKIN", category: "School of Public Affairs" },
  { name: "UN Geneva Beyond Lab", code: "UN GENEVA BEYOND LAB", category: "Global Innovation Hub" },
  { name: "UNA-USA UCLA", code: "UNA-USA UCLA", category: "United Nations Association" },
  { name: "University of San Diego", code: "UNIV OF SAN DIEGO", category: "Academic Partner" },
  { name: "LA County Youth Development", code: "LA YOUTH DEV", category: "Civic Authority" },
  { name: "IAAI GloCha", code: "IAAI GLOCHA", category: "Climate Action Alliance" },
  { name: "LACOE", code: "LACOE", category: "Education Office" },
  { name: "UN-Habitat", code: "UN-HABITAT", category: "United Nations Human Settlements Program" },
  { name: "IOM", code: "IOM", category: "International Organization for Migration" },
  { name: "UNEP", code: "UNEP", category: "UN Environment Programme" }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Dr. Alexander V. Thorne",
    role: "President & Founder, IOY",
    country: "USA / International",
    bio: "Pioneered the International Youth Conference framework to bridge grassroots youth activists directly with UN multilateral negotiations.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    category: "Executive Council"
  },
  {
    id: "team-2",
    name: "Amina Al-Mansoor",
    role: "Director of Youth Diplomacy",
    country: "Jordan / UAE",
    bio: "Leads diplomatic training and delegate selection for UNGA High-Level Week and ECOSOC Youth Forums.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    category: "Executive Council"
  },
  {
    id: "team-3",
    name: "Kofi Boateng",
    role: "Impact & M&E Lead",
    country: "Ghana",
    bio: "Oversees the 900+ youth-led project monitoring mechanism and publishes the annual IYC Impact Reports.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    category: "Executive Council"
  },
  {
    id: "team-4",
    name: "Sophia Chen",
    role: "Asia-Pacific Regional Co-Chair",
    country: "Singapore",
    bio: "Coordinates climate action initiatives and tech policy dialogues across 35 countries in the APAC region.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    category: "Regional Director"
  },
  {
    id: "team-5",
    name: "Mateo Fernandez",
    role: "Latin America & Caribbean Director",
    country: "Colombia",
    bio: "Mobilizes indigenous youth councils and community peacebuilding programs in South America.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    category: "Regional Director"
  },
  {
    id: "team-6",
    name: "Elena Rostova",
    role: "Head of Youth Advisory Council",
    country: "Estonia",
    bio: "Specializes in e-governance, digital security for activists, and young policy drafting.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    category: "Youth Advisory"
  }
];
