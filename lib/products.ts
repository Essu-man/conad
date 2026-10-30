import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "conad-pos",
    name: "Conad POS",
    slug: "conad-pos",
    tagline: "High-speed retail POS with Mobile Money prompt-push, GRA E-VAT compliance, and offline resilience.",
    category: "Point of Sale",
    badge: "Flagship Ghana POS",
    shortDescription:
      "A fast, modern point-of-sale platform tailored for Ghanaian retail: instant MTN MoMo & Telecel Cash prompt-push, cash drawer audits in Cedis (GH₵), GRA-compliant receipts, and offline resilience.",
    fullDescription:
      "Conad POS is specifically optimized for Ghanaian retail stores, supermarkets, pharmacies, and high-traffic merchant checkout counters. Engineered with an offline-first architecture, it ensures checkout lanes continue ringing up sales seamlessly during internet interruptions or grid power fluctuations, automatically synchronizing Cedis cash floats, Mobile Money tenders, and inventory decrements the second connectivity restores.",
    highlights: [
      "Offline-first resilient checkout engine: zero transaction loss during network or power dips",
      "Instant Mobile Money checkout: push prompt to MTN MoMo & Telecel Cash customer phones",
      "GRA E-VAT compliant receipts with configurable Ghana tax tiers (VAT, NHIL, GETFund)",
      "Multi-register cash drawer float balancing, cashier shift audits, and live inventory sync in Cedis (GH₵)",
    ],
    metrics: [
      { label: "Checkout Latency", value: "< 250ms", detail: "Sub-second barcode scan & item lookup" },
      { label: "MoMo Integration", value: "Instant", detail: "Automated prompt-push to customer phone" },
      { label: "Offline Resilience", value: "100%", detail: "Uninterrupted sales without active internet" },
    ],
    features: [
      {
        title: "Mobile Money & Multi-Tender Checkout",
        description:
          "Accept MTN Mobile Money, Telecel Cash, GhQR, card, and cash in Cedis (GH₵) with instant payment prompt-push and split-tender flexibility.",
        iconName: "CreditCard",
      },
      {
        title: "Live Inventory Decrement",
        description:
          "Automatic stock depletion across all active storefront checkout lanes and storage depots with real-time low-stock alerts.",
        iconName: "Boxes",
      },
      {
        title: "Register & Shift Audits in Cedis",
        description:
          "Cash float balancing, cashier login security, end-of-shift drawer reconciliations in GH₵, and comprehensive daily sales audit reports.",
        iconName: "ShieldCheck",
      },
      {
        title: "GRA E-VAT & Thermal Receipts",
        description:
          "Direct integration with 80mm ESC/POS thermal receipt printers formatted with GRA E-VAT tax splits, QR verification, and digital receipt dispatch.",
        iconName: "Receipt",
      },
    ],
    capabilities: [
      "MTN MoMo, Telecel Cash, AT Money, GhQR, Card & Cash tender options",
      "Thermal ESC/POS and Bluetooth receipt printer compatibility (80mm & 58mm)",
      "High-speed 1D/2D laser barcode scanners and USB scales support",
      "Biometric and PIN-based cashier login with immutable shift audit trails",
    ],
    productPageUrl: "/products/conad-pos",
    launchUrl: "#demo",
    availabilityStatus: "Available Now",
    targetAudience: [
      "Ghanaian Supermarkets & Groceries",
      "Boutiques & Fashion Retailers",
      "Pharmacies & Drug Stores",
      "Multi-Branch Retail Chains across Accra & Kumasi",
    ],
    mockupType: "pos",
    architectureNotes:
      "Engineered with client-side IndexedDB caching for uninterrupted offline sales, optimistic reconciliation, and local device peripheral drivers.",
  },
  {
    id: "conad-inventory",
    name: "Conad Inventory",
    slug: "conad-inventory",
    tagline: "Omnichannel stock synchronization, multi-branch depot tracking, and barcode control in Cedis (GH₵).",
    category: "Inventory Management",
    badge: "Real-Time Stock Engine",
    shortDescription:
      "Real-time inventory coordination across central warehouses (e.g. Spintex, North Industrial Area), storefront shelves, and regional retail branches across Ghana.",
    fullDescription:
      "Conad Inventory eliminates stock-outs, inventory shrinkage, and manual stock-taking discrepancies by unifying product quantities across all physical branches and storage depots into a single synchronized source of truth with barcode scanning and supplier purchase order workflows in Cedis (GH₵).",
    highlights: [
      "Live multi-branch and warehouse stock allocation across Greater Accra, Ashanti, and regional nodes",
      "Automated safe-stock alerts with supplier purchase order drafting in Cedis (GH₵)",
      "Batch tracking, expiry date monitoring, SKU classification, and barcode label printing",
      "Instantaneous deduction whenever sales occur at any Conad POS register",
    ],
    metrics: [
      { label: "Sync Speed", value: "< 300ms", detail: "Across all registered branch depots" },
      { label: "Stock Accuracy", value: "99.9%", detail: "With barcode verification cycles" },
      { label: "Depot Coverage", value: "Multi-Store", detail: "Central warehouse & branch tracking in GH₵" },
    ],
    features: [
      {
        title: "Multi-Branch Stock Transfers",
        description:
          "Easily schedule and verify stock transfers between central warehouses and retail storefronts with dispatch tracking and driver sign-off.",
        iconName: "Truck",
      },
      {
        title: "Automated Reorder Thresholds in Cedis",
        description:
          "Set minimum safe stock levels per branch that automatically alert managers and draft purchase orders for local and international suppliers.",
        iconName: "RefreshCw",
      },
      {
        title: "Barcode & Price Tag Printing",
        description:
          "Generate custom thermal barcode labels, product SKU tags, and shelf price stickers in Cedis (GH₵) directly from the dashboard.",
        iconName: "QrCode",
      },
      {
        title: "Stock Audits & Cycle Counting",
        description:
          "Streamlined physical inventory counts using handheld barcode scanners to reconcile expected vs. actual stock and eliminate shrinkage.",
        iconName: "FileSpreadsheet",
      },
    ],
    capabilities: [
      "Live stock reservation during active POS transactions",
      "Local supplier contact catalog and purchase order tracking in GH₵",
      "Historical inventory turnover velocity analytics",
      "Seamless native synchronization with Conad POS",
    ],
    productPageUrl: "/products/conad-inventory",
    launchUrl: "#demo",
    availabilityStatus: "Available Now",
    targetAudience: [
      "Warehouse Managers",
      "Retail Inventory Controllers",
      "FMCG & Wholesale Distributors",
      "Multi-Branch Store Operators across Ghana",
    ],
    mockupType: "inventory",
    architectureNotes:
      "Built with high-throughput event queues and distributed state replication ensuring immediate stock consistency across all locations.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProduct(): Product {
  return PRODUCTS[0];
}
