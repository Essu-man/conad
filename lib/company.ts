import { CompanyDifferentiator } from "./types";

export const DIFFERENTIATORS: CompanyDifferentiator[] = [
  {
    id: "practical-solutions",
    title: "Practical Business Solutions",
    tagline: "Solving real operational friction over hype.",
    description:
      "We design software around everyday realities: busy retail checkouts, high-volume inventory transfers, and rapid billing cycles. Every feature is engineered to remove friction, not add unnecessary complexity.",
    iconName: "Target",
    keyBenefits: [
      "Intuitive layouts requiring zero staff retraining",
      "Immediate workflow feedback and error recovery",
      "Features driven by genuine operational feedback",
    ],
  },
  {
    id: "scalable-architecture",
    title: "Scalable Software Architecture",
    tagline: "Built to run seamlessly today and scale smoothly tomorrow.",
    description:
      "Our applications leverage modular cloud foundations, edge caching, and resilient database schemas. Whether processing 50 daily transactions or 50,000 across multiple branches, performance remains consistently sub-second.",
    iconName: "Maximize2",
    keyBenefits: [
      "Offline-first resilience for uninterrupted operations",
      "Sub-second API response times and minimal latency",
      "Cloud native microservices that scale horizontally",
    ],
  },
  {
    id: "user-focused",
    title: "User-Focused Experiences",
    tagline: "Software that your teams actually enjoy using.",
    description:
      "Business software shouldn't feel like a chore. We combine clean visual hierarchy, generous touch targets, dark-mode accessibility, and snappy micro-interactions to create tools that elevate worker satisfaction.",
    iconName: "Smile",
    keyBenefits: [
      "Ergonomic keyboard shortcuts and touch-friendly controls",
      "Clear visual indicators and proactive validations",
      "Accessible typography adhering to WCAG standards",
    ],
  },
  {
    id: "continuous-improvement",
    title: "Continuous Product Evolution",
    tagline: "Continuous updates without disruption or breaking changes.",
    description:
      "Software isn't a one-time project; it is a living operational engine. We ship regular performance enhancements, security patches, and capability updates with zero downtime and backwards compatibility.",
    iconName: "Sparkles",
    keyBenefits: [
      "Automated continuous delivery with zero downtime",
      "Rigorous regression testing and proactive security audits",
      "Clear version changelogs and documented roadmap goals",
    ],
  },
];

export const COMPANY_INFO = {
  name: "Conad Tech",
  tagline: "Technology that moves your business forward.",
  subheadline:
    "Build, manage, and grow with intelligent software designed to simplify operations and unlock new possibilities.",
  mission:
    "To build durable, intelligent software products and digital systems that empower modern enterprises to operate efficiently, eliminate manual friction, and scale with confidence.",
  vision:
    "To be the trusted technology foundation for ambitious businesses across commerce, supply chain, and professional services.",
  contactEmail: "inquiries@conadtech.com",
  operatingHours: "Monday – Friday, 8:00 AM – 6:00 PM",
  responseGuarantee: "Typical response within 24 business hours",
  establishedYear: 2024,
};
