import { ServiceItem } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "pos-hardware-deployment",
    name: "POS Terminal & Hardware Deployment",
    slug: "pos-hardware-deployment",
    tagline: "Turnkey configuration of touchscreen registers, printers, scanners, and MoMo terminals.",
    description:
      "We provide full on-site and remote setup for Ghanaian retail counters. From configuring GRA-compliant 80mm thermal receipt printers and 2D barcode scanners to setting up cash drawers and MTN MoMo / Telecel Cash / GhQR payment terminals, we ensure your lanes are fast, offline-resilient, and ready on day one.",
    iconName: "CreditCard",
    deliverables: [
      "Touch terminal & register workstation setup",
      "GRA-compliant 80mm thermal receipt printer protocol configuration",
      "Handheld 1D/2D barcode scanner & cash drawer integration",
      "MTN MoMo & Telecel Cash prompt-push terminal pairing",
      "Cashier staff training and operational handover in Cedis (GH₵)",
    ],
    technologies: ["ESC/POS", "USB HID Scanners", "Thermal Printers", "MoMo APIs", "Network Cash Drawers", "Offline Caching"],
    businessValue:
      "Eliminate checkout delays with pre-tested, plug-and-play POS hardware tailored to high-volume Ghanaian retail counters.",
  },
  {
    id: "inventory-sync-setup",
    name: "Multi-Store Inventory Synchronization",
    slug: "inventory-sync-setup",
    tagline: "Unify stock levels between central warehouses (Accra, Kumasi) and storefront lanes.",
    description:
      "We connect your main storage warehouses (e.g. Spintex, North Industrial Area) and regional storefront registers into a single real-time inventory feed. As sales ring up on Conad POS, stock counts automatically decrement with automated safe-stock alerts and purchase order drafting in Cedis (GH₵).",
    iconName: "Boxes",
    deliverables: [
      "Central warehouse depot & regional branch location architecture",
      "Real-time stock deduction rule configuration across stores",
      "Automated safe-stock reorder thresholds in Cedis (GH₵)",
      "Mobile barcode scanning for stock counts & inter-branch transfers",
    ],
    technologies: ["WebSocket Sync", "Real-Time Queues", "Barcode Verification", "Warehouse APIs"],
    businessValue:
      "Prevent accidental overselling and stock shrinkage across your Ghanaian branches with instant inventory accuracy.",
  },
  {
    id: "retail-data-migration",
    name: "Retail Catalog & Data Migration",
    slug: "retail-data-migration",
    tagline: "Clean, zero-downtime migration from legacy POS systems and spreadsheets in Cedis (GH₵).",
    description:
      "Moving to Conad doesn't mean starting from scratch. Our team cleans, normalizes, and imports your existing inventory catalogs, barcodes, local Ghanaian supplier lists, Cedis pricing tiers, and customer data directly into Conad POS & Inventory.",
    iconName: "RefreshCw",
    deliverables: [
      "Product SKU, barcode, and Cedis (GH₵) price tier mapping",
      "Ghanaian supplier and vendor contact catalog migration",
      "Historical inventory quantity reconciliation across depots",
      "Cutover planning with zero downtime for active sales",
    ],
    technologies: ["Data Sanitization", "CSV/SQL Importers", "Barcode Re-Indexing", "Schema Mapping"],
    businessValue:
      "Transition your stores to modern software smoothly without interrupting daily retail transactions or losing ledger history.",
  },
];
