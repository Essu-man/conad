import { ServiceItem } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "custom-software",
    name: "Custom Software Engineering",
    slug: "custom-software",
    tagline: "Bespoke digital systems crafted for specific operational hurdles.",
    description:
      "When off-the-shelf software falls short, our engineering team architects tailored web and cloud platforms aligned with your unique business workflows, compliance mandates, and scaling targets.",
    iconName: "Code2",
    deliverables: [
      "Full-cycle architecture & software development",
      "Tailored internal tools and operational portals",
      "Scalable REST and GraphQL API services",
      "Enterprise database design and query tuning",
    ],
    technologies: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
    businessValue:
      "Eliminate software compromises with proprietary platforms owned entirely by your organization.",
  },
  {
    id: "business-automation",
    name: "Business Process Automation",
    slug: "business-automation",
    tagline: "Eliminate repetitive tasks and streamline inter-departmental operations.",
    description:
      "We design automated pipelines connecting your existing tools, databases, and third-party APIs. Replace manual spreadsheet copying and human error with reliable background triggers.",
    iconName: "Cpu",
    deliverables: [
      "Cross-platform workflow orchestrations",
      "Automated document and invoice generation",
      "Event-driven background processing queues",
      "Custom alerts and escalation monitoring",
    ],
    technologies: ["Node.js", "Python", "Message Queues", "Webhook Bridges", "Scheduled Workers"],
    businessValue:
      "Save hundreds of hours monthly and reduce operational latency across sales, dispatch, and accounting.",
  },
  {
    id: "web-app-development",
    name: "Modern Web Application Development",
    slug: "web-app-development",
    tagline: "Fast, responsive, and secure web applications built on modern frameworks.",
    description:
      "From high-conversion SaaS frontends to complex business management suites, we deliver responsive web applications engineered for speed, search optimization, and seamless user experiences.",
    iconName: "Globe2",
    deliverables: [
      "Responsive, touch-friendly user interfaces",
      "Robust state management and client caching",
      "Strict web accessibility (WCAG) compliance",
      "Core Web Vitals performance optimization",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Vercel / Cloudflare"],
    businessValue:
      "Deliver delightful experiences to your customers and staff across desktops, tablets, and phones.",
  },
  {
    id: "system-integration",
    name: "System & API Integration",
    slug: "system-integration",
    tagline: "Unify fragmented software silos into an interconnected data ecosystem.",
    description:
      "We bridge disparate ERPs, legacy accounting tools, payment gateways, and custom inventory databases into cohesive, real-time synchronized environments with zero data loss.",
    iconName: "Network",
    deliverables: [
      "Custom middleware and API gateways",
      "Bi-directional legacy system sync",
      "Payment gateway & banking connections",
      "Security auditing and data tokenization",
    ],
    technologies: ["REST", "gRPC", "WebSockets", "OAuth 2.0", "Enterprise Bus"],
    businessValue:
      "Prevent data fragmentation and ensure every team makes decisions using the same unified numbers.",
  },
  {
    id: "technical-consulting",
    name: "Technical Architecture & Consulting",
    slug: "technical-consulting",
    tagline: "Strategic technical guidance to future-proof your digital investments.",
    description:
      "Receive pragmatic advisory on software roadmaps, cloud infrastructure cost containment, cybersecurity readiness, and architectural modernization from veteran engineers.",
    iconName: "Lightbulb",
    deliverables: [
      "Codebase and infrastructure health audits",
      "Scalability bottleneck identification",
      "Cloud migration strategy and cost audits",
      "Technology vendor evaluation & RFP review",
    ],
    technologies: ["AWS", "Google Cloud", "Microservices", "DevOps", "CI/CD"],
    businessValue:
      "Avoid costly architectural missteps and build tech investments on proven, durable foundations.",
  },
];
