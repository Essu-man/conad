import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "conad-pos",
    name: "Conad POS",
    slug: "conad-pos",
    tagline: "High-performance cloud point of sale engineered for speed and reliability.",
    category: "Commerce & Retail",
    badge: "Flagship Product",
    shortDescription:
      "A fast, modern point-of-sale platform providing touch-optimized checkout, live stock verification, offline transactions, and unified register management.",
    fullDescription:
      "Conad POS is designed for modern retail environments, dining venues, and multi-location stores. Engineered with offline-first architecture, it ensures seamless transactions even during connectivity interruptions while synchronizing inventory, tax calculations, and receipts instantaneously when reconnected.",
    highlights: [
      "Offline-first resilient checkout engine",
      "Sub-second barcode lookup and payment processing",
      "Unified multi-register cash and card reconciliation",
      "Direct integration with warehouse inventory",
    ],
    metrics: [
      { label: "Checkout Latency", value: "< 250ms", detail: "Average transaction response time" },
      { label: "Offline Resilience", value: "100%", detail: "Local queue sync when connection drops" },
      { label: "Multi-Store Sync", value: "Real-time", detail: "Instantaneous register synchronization" },
    ],
    features: [
      {
        title: "Fast Touch & Barcode Checkout",
        description:
          "Ergonomic, rapid keypad and scanner interface with item search, modifiers, split payments, and customized discounts.",
        iconName: "CreditCard",
      },
      {
        title: "Live Inventory Decrement",
        description:
          "Automatic stock depletion across all active sales registers with low-stock alerts and multi-location lookup.",
        iconName: "Boxes",
      },
      {
        title: "Terminal & Drawer Management",
        description:
          "Detailed register opening and closing audits, cash float reconciliation, shift reports, and user role permissioning.",
        iconName: "ShieldCheck",
      },
      {
        title: "Sales Analytics & Daily Reporting",
        description:
          "Real-time visibility into peak sales hours, top category margins, payment breakdown, and staff performance.",
        iconName: "BarChart3",
      },
    ],
    capabilities: [
      "Multi-currency and split tender handling",
      "Digital, email, and thermal receipt printing",
      "Customer loyalty lookup and reward redemptions",
      "Direct webhook API for ERP and eCommerce synchronization",
    ],
    productPageUrl: "/products/conad-pos",
    launchUrl: "#launch-pos-demo",
    availabilityStatus: "Available Now",
    targetAudience: ["Retail Stores", "Boutiques & Supermarkets", "Quick-Service Venues", "Multi-branch Franchises"],
    mockupType: "pos",
    architectureNotes:
      "Built with an offline IndexedDB caching pipeline, optimistic UI updates, and WebSocket events for real-time ledger dispatch.",
  },
  {
    id: "conad-flow",
    name: "Conad Flow",
    slug: "conad-flow",
    tagline: "Automate complex business processes and operations with modular logic.",
    category: "Operations & Automation",
    badge: "Operations Hub",
    shortDescription:
      "A no-code and low-code operational workflow orchestrator that coordinates customer orders, approval stages, vendor dispatches, and notification queues.",
    fullDescription:
      "Conad Flow streamlines internal operational friction by connecting sales channels, logistics partners, and internal approval trees into automated visual pipelines. Reduce manual administrative overhead and prevent human data-entry errors.",
    highlights: [
      "Visual workflow builder with rule conditions",
      "Automated event triggers for purchase orders and fulfillment",
      "Audit logs with immutable step tracking",
      "Pre-built webhooks for internal and third-party tools",
    ],
    metrics: [
      { label: "Step Execution", value: "99.98%", detail: "Automated trigger success rate" },
      { label: "Time Saved", value: "18+ hrs/wk", detail: "Average administrative reduction" },
      { label: "Queue Response", value: "Instant", detail: "Event-driven asynchronous processing" },
    ],
    features: [
      {
        title: "Trigger-Action Automation",
        description:
          "Configure conditional actions when invoices are paid, stock reaches thresholds, or new corporate accounts are created.",
        iconName: "Workflow",
      },
      {
        title: "Multi-Department Approvals",
        description:
          "Structured routing for expense approvals, credit overrides, and custom invoice allowances with notification alerts.",
        iconName: "CheckCircle2",
      },
      {
        title: "External Webhook Bridge",
        description:
          "Seamlessly relay operational payloads to external accounting systems, messaging queues, or custom microservices.",
        iconName: "Zap",
      },
      {
        title: "Complete Process Audit Trails",
        description:
          "Every automated execution step is logged with full payload snapshots, timestamps, and retry telemetry.",
        iconName: "FileSpreadsheet",
      },
    ],
    capabilities: [
      "Conditional branch branching and fallback routes",
      "Scheduled maintenance and recurring daily batch tasks",
      "Granular team access rights and approval hierarchies",
      "Rest API access for custom developer extensions",
    ],
    productPageUrl: "/products/conad-flow",
    availabilityStatus: "Available Now",
    targetAudience: ["Operations Managers", "Supply Chain Teams", "Corporate Offices", "Logistics Coordinators"],
    mockupType: "flow",
    architectureNotes:
      "Powered by distributed state machines, durable execution routines, and enterprise message broker integrations.",
  },
  {
    id: "conad-ledger",
    name: "Conad Ledger",
    slug: "conad-ledger",
    tagline: "Intelligent financial tracking, automated invoicing, and cash-flow visibility.",
    category: "Financial Intelligence",
    badge: "Financial Engine",
    shortDescription:
      "A financial oversight and invoicing platform designed for small-to-mid enterprise accounting, automatic tax categorization, and real-time revenue analytics.",
    fullDescription:
      "Conad Ledger unifies transaction feeds from POS terminals, bank deposits, and client purchase orders. It provides business leaders with accurate, live gross margin reports, accounts receivable aging, and automated recurring billing.",
    highlights: [
      "Unified double-entry transaction record keeping",
      "Automated recurring invoicing and automated payment reminders",
      "Tax calculation and localized fiscal compliance readiness",
      "Real-time cash flow runway and profit margin projections",
    ],
    metrics: [
      { label: "Reconciliation", value: "Automated", detail: "Instant balance sheet ledger checks" },
      { label: "Reporting", value: "Real-Time", detail: "On-demand P&L and tax summaries" },
      { label: "Precision", value: "Enterprise", detail: "Accurate to the cent across currencies" },
    ],
    features: [
      {
        title: "Automated Invoicing & Reminders",
        description:
          "Generate professional corporate invoices, track view dates, and automatically send polite payment follow-ups.",
        iconName: "Receipt",
      },
      {
        title: "Live Revenue & Margin Dashboards",
        description:
          "Interactive visual charts displaying gross profit, operational expenditure, pending receivables, and net cash flow.",
        iconName: "TrendingUp",
      },
      {
        title: "Tax & Compliance Reports",
        description:
          "Group transactions by tax brackets and export clean financial summaries for periodic reporting and audits.",
        iconName: "ShieldAlert",
      },
      {
        title: "Multi-Entity Financial Views",
        description:
          "Consolidate bookkeeping across multiple retail branches, subsidiaries, or distinct legal business accounts.",
        iconName: "Layers",
      },
    ],
    capabilities: [
      "Exportable CSV, PDF, and audit-ready data formats",
      "Automated bank statement reconciliation assistant",
      "Role-based financial confidentiality controls",
      "Multi-currency exchange rate adjustments",
    ],
    productPageUrl: "/products/conad-ledger",
    availabilityStatus: "Available Now",
    targetAudience: ["Finance Directors", "Business Owners", "Accountants", "Franchise Operators"],
    mockupType: "ledger",
    architectureNotes:
      "Engineered with immutable transaction tables, rigorous cryptographic checksum verification, and sub-second analytical aggregations.",
  },
  {
    id: "conad-inventory",
    name: "Conad Inventory",
    slug: "conad-inventory",
    tagline: "Omnichannel stock synchronization, barcode tracking, and warehouse management.",
    category: "Operations & Automation",
    badge: "Stock Control",
    shortDescription:
      "Real-time inventory coordination across central warehouses, storefront shelves, and online channels with smart reorder automation.",
    fullDescription:
      "Conad Inventory eliminates stock-outs and overselling by unifying product quantities across all physical locations and sales channels into a single source of truth with barcode scanning and supplier purchasing workflows.",
    highlights: [
      "Live multi-warehouse stock allocation",
      "Automated low-inventory reorder recommendations",
      "Batch, serial number, and expiration date tracking",
      "Seamless handheld barcode scanner integration",
    ],
    metrics: [
      { label: "Sync Speed", value: "< 500ms", detail: "Across all registered distribution nodes" },
      { label: "Stock Accuracy", value: "99.9%", detail: "With barcode verification cycles" },
      { label: "Inventory Turn", value: "Optimized", detail: "Predictive purchase orders" },
    ],
    features: [
      {
        title: "Multi-Location Stock Transfer",
        description:
          "Create transfer orders between warehouses and retail branches with dispatch tracking and receipt confirmations.",
        iconName: "Truck",
      },
      {
        title: "Automated Reorder Thresholds",
        description:
          "Set minimum safe stock levels that automatically draft purchase orders to preferred suppliers.",
        iconName: "RefreshCw",
      },
      {
        title: "Barcode & QR Code Printing",
        description:
          "Generate custom thermal barcode labels, SKU designations, and batch identifiers directly from the web app.",
        iconName: "QrCode",
      },
      {
        title: "Supplier & Vendor Directory",
        description:
          "Maintain supplier catalogs, lead times, payment terms, and past delivery performance in one place.",
        iconName: "Building2",
      },
    ],
    capabilities: [
      "Stock audit and cycle counting workflows",
      "Bundling and bill-of-materials kitting",
      "Historical inventory turnover velocity analytics",
      "Direct API integration with Conad POS and Conad Flow",
    ],
    productPageUrl: "/products/conad-inventory",
    availabilityStatus: "Enterprise Pilot",
    targetAudience: ["Warehouse Managers", "Wholesale Distributors", "Retail Store Networks", "E-Commerce Brands"],
    mockupType: "inventory",
    architectureNotes:
      "Distributed event log architecture ensuring eventual consistency across intermittently connected mobile scanner terminals.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProduct(): Product {
  return PRODUCTS[0]; // Conad POS is flagship
}
