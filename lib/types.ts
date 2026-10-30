export type ProductCategory =
  | "All"
  | "Point of Sale"
  | "Inventory Management";

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
  category: "Point of Sale" | "Inventory Management";
  badge: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  metrics: ProductMetric[];
  features: ProductFeature[];
  capabilities: string[];
  productPageUrl: string;
  launchUrl?: string;
  availabilityStatus: "Available Now" | "Enterprise Ready";
  targetAudience: string[];
  mockupType: "pos" | "inventory";
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
