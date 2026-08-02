import { ImpactProject } from '../types';

export const INITIAL_IMPACT_PROJECTS: ImpactProject[] = [
  {
    id: "proj-101",
    title: "Clean Water Access Initiative & Solar Filtration",
    leadName: "Tariq Mahmood",
    leadCountry: "Kenya",
    sdgGoals: [6, 7, 13],
    sdgLabels: ["Clean Water & Sanitation", "Affordable & Clean Energy", "Climate Action"],
    volunteersCount: 450,
    beneficiariesCount: 85000,
    status: "Active",
    location: "Garissa & Turkana Counties",
    summary: "Deployed solar-powered water purifiers in off-grid rural communities, delivering clean drinking water to thousands while training youth technical operators.",
    outcomes: [
      "24 solar filtration stations installed",
      "85,000 community members provided clean water access",
      "60 local youth certified as maintenance technicians"
    ],
    dateSubmitted: "2025-06-12",
    reportCycle: "IYC11"
  },
  {
    id: "proj-102",
    title: "Digital Literacy & Tech Academy for Refugee Youth",
    leadName: "Yara Al-Hassan",
    leadCountry: "Jordan",
    sdgGoals: [4, 8, 10],
    sdgLabels: ["Quality Education", "Decent Work & Economic Growth", "Reduced Inequalities"],
    volunteersCount: 220,
    beneficiariesCount: 14200,
    status: "Scaling",
    location: "Zaatari & Amman",
    summary: "Coding, AI fundamentals, and remote freelance bootcamps for displaced youth, enabling employment in international digital markets.",
    outcomes: [
      "1,400+ graduates from coding bootcamp",
      "78% employment/freelance placement rate",
      "Partnership with 12 international tech firms"
    ],
    dateSubmitted: "2024-11-04",
    reportCycle: "IYC10"
  },
  {
    id: "proj-103",
    title: "Pacific Youth Climate Legal Advocacy Project",
    leadName: "Sione Tuipulotu",
    leadCountry: "Fiji",
    sdgGoals: [13, 14, 16],
    sdgLabels: ["Climate Action", "Life Below Water", "Peace, Justice & Strong Institutions"],
    volunteersCount: 310,
    beneficiariesCount: 450000,
    status: "Active",
    location: "Suva & Pacific Island States",
    summary: "Empowering young legal scholars and indigenous delegates to submit climate advisory opinions to international maritime tribunals.",
    outcomes: [
      "3 advisory briefs submitted to regional international courts",
      "Representation at UN COP climate summits",
      "15 coastal ecosystem rehabilitation zones established"
    ],
    dateSubmitted: "2025-01-20",
    reportCycle: "IYC11"
  },
  {
    id: "proj-104",
    title: "Zero Waste Urban Youth Farmers Network",
    leadName: "Camila Rodriguez",
    leadCountry: "Colombia",
    sdgGoals: [2, 11, 12],
    sdgLabels: ["Zero Hunger", "Sustainable Cities", "Responsible Consumption"],
    volunteersCount: 680,
    beneficiariesCount: 62000,
    status: "Completed",
    location: "Medellin & Bogota",
    summary: "Transforming vacant urban spaces into high-yield organic community gardens operated by young urban youth, addressing food security.",
    outcomes: [
      "18 community gardens established in Medellin & Bogota",
      "42 metric tons of fresh produce harvested annually",
      "3,000 school children participating in eco-nutrition"
    ],
    dateSubmitted: "2024-08-15",
    reportCycle: "IYC9"
  },
  {
    id: "proj-105",
    title: "Youth Conflict Mediation & Peace Dialogues",
    leadName: "David Okyere",
    leadCountry: "Ghana",
    sdgGoals: [16, 17],
    sdgLabels: ["Peace, Justice & Strong Institutions", "Partnerships for the Goals"],
    volunteersCount: 540,
    beneficiariesCount: 120000,
    status: "Active",
    location: "West African Sub-Region",
    summary: "Cross-border youth mediation councils resolving inter-community disputes, countering extremist recruitment, and building civic trust.",
    outcomes: [
      "42 youth peace committees operational",
      "Zero escalation in targeted dispute pilot zones",
      "Commendation from ECOWAS Youth Commission"
    ],
    dateSubmitted: "2025-03-30",
    reportCycle: "IYC11"
  },
  {
    id: "proj-106",
    title: "AI Ethics & Algorithmic Transparency Monitor",
    leadName: "Linus Lindqvist",
    leadCountry: "Sweden",
    sdgGoals: [9, 10, 16],
    sdgLabels: ["Industry & Innovation", "Reduced Inequalities", "Strong Institutions"],
    volunteersCount: 190,
    beneficiariesCount: 230000,
    status: "Active",
    location: "Stockholm / EU Regional",
    summary: "Youth-led audit group monitoring facial recognition and automated decision systems in public services for racial and youth bias.",
    outcomes: [
      "Published 4 major open-source policy audit reports",
      "Adopted guidelines in 2 municipal councils",
      "Over 12,000 policy downloads"
    ],
    dateSubmitted: "2024-10-10",
    reportCycle: "IYC10"
  }
];
