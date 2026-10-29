export type ProductCategory =
  | "All"
  | "Commerce & Retail"
  | "Operations & Automation"
  | "Financial Intelligence"
  | "Enterprise Systems";

export interface ProductMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: "Commerce & Retail" | "Operations & Automation" | "Financial Intelligence" | "Enterprise Systems";
  badge: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  metrics: ProductMetric[];
  features: ProductFeature[];
  capabilities: string[];
  productPageUrl: string;
  launchUrl?: string;
  availabilityStatus: "Available Now" | "Enterprise Pilot" | "Early Access";
  targetAudience: string[];
  mockupType: "pos" | "flow" | "ledger" | "inventory";
  architectureNotes?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  iconName: string;
  deliverables: string[];
  technologies: string[];
  businessValue: string;
}

export interface CompanyDifferentiator {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  keyBenefits: string[];
}
