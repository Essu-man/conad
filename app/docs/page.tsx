import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  Download,
  Laptop,
  CreditCard,
  Boxes,
  ShieldCheck,
  FileText,
  CheckCircle2,
  ArrowRight,
  Wifi,
  QrCode,
  DollarSign,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation & Commercial Terms | Conad POS & Inventory",
  description:
    "Official documentation, Windows .exe installation guides, GRA E-VAT integration walkthroughs, and commercial terms (2% fee per transaction) for Conad POS and Conad Inventory.",
};

export default function DocsPage() {
  return (
    <div className="py-12 md:py-20 bg-white min-h-screen">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <SectionHeader
            badge="Official Knowledge Base"
            badgeVariant="blue"
            title="Conad POS & Inventory"
            highlightText="Documentation & Terms."
            description="Complete operational manuals, Windows desktop installation walkthroughs, and commercial terms of service for merchants across Ghana."
          />

          {/* Quick Anchor Navigation */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            <a
              href="#downloads"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] transition-colors"
            >
              Application Downloads (.exe)
            </a>
            <a
              href="#terms"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              Terms & 2% Fee Policy
            </a>
            <a
              href="#pos-docs"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Conad POS Guide
            </a>
            <a
              href="#inventory-docs"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Conad Inventory Guide
            </a>
          </div>
        </div>

        {/* SECTION 1: DOWNLOADS & INSTALLERS */}
        <section id="downloads" className="scroll-mt-24 mb-16">
          <div className="bg-[#102A56] text-white rounded-3xl p-6 sm:p-10 border border-[#1A3D78] shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6B2C]">
                  <Download className="w-4 h-4" />
                  <span>Desktop Executables</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  Download Conad Windows Applications
                </h2>
                <p className="text-sm text-slate-300 max-w-xl">
                  Install Conad POS and Conad Inventory directly on your Windows touchscreen terminals, counter registers, and warehouse management PCs.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 px-4 py-2 rounded-xl border border-white/10 shrink-0">
                <Laptop className="w-4 h-4 text-[#93C5FD]" />
                <span>Compatible with Windows 10 & 11 (64-bit)</span>
              </div>
            </div>

            {/* Product Download Cards Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Conad POS Download Card */}
              <div className="bg-[#0A1C3B] p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-[#2563EB]/20 text-[#60A5FA]">
                      <CreditCard className="w-6 h-6" />
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                      v3.2.0 Stable
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white">Conad POS for Windows</h3>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                    High-speed retail register software with sub-second barcode scans, MTN MoMo & Telecel Cash prompt-push, GRA E-VAT receipts, and offline mode.
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 space-y-1">
                    <div>Format: Standalone Windows Installer (.exe)</div>
                    <div>Hardware: Thermal Printers (ESC/POS), 2D Barcode Scanners, Cash Drawers</div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    href="/api/download/conad-pos"
                    variant="primary"
                    size="md"
                    icon={<Download className="w-4 h-4" />}
                    className="w-full justify-center shadow-md shadow-[#FF6B2C]/20"
                  >
                    Download Conad POS (.exe)
                  </Button>
                </div>
              </div>

              {/* Conad Inventory Download Card */}
              <div className="bg-[#0A1C3B] p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-[#FF6B2C]/20 text-[#FF6B2C]">
                      <Boxes className="w-6 h-6" />
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                      v3.2.0 Stable
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white">Conad Inventory for Windows</h3>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                    Multi-location stock management, real-time depot synchronization, supplier purchase orders in Cedis, barcode printing, and cycle count auditing.
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 space-y-1">
                    <div>Format: Standalone Windows Installer (.exe)</div>
                    <div>Hardware: Desktop PCs, Back-office Terminals, Thermal Label Printers</div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    href="/api/download/conad-inventory"
                    variant="white"
                    size="md"
                    icon={<Download className="w-4 h-4" />}
                    className="w-full justify-center"
                  >
                    Download Conad Inventory (.exe)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: TERMS AND CONDITIONS & 2% TRANSACTION FEE POLICY */}
        <section id="terms" className="scroll-mt-24 mb-16">
          <div className="rounded-3xl bg-[#FFFDF5] border-2 border-amber-300/80 p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Commercial Agreement & Pricing
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#102A56]">
                  Terms & Conditions (2% Transaction Fee Policy)
                </h2>
                <p className="text-sm text-slate-700">
                  Effective from October 2024. Applies to all merchant deployments of Conad POS and Conad Inventory across the Republic of Ghana.
                </p>
              </div>
            </div>

            {/* Highlighted 2% Fee Callout */}
            <div className="p-6 rounded-2xl bg-white border border-amber-300/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
                <DollarSign className="w-5 h-5 text-amber-600" />
                <span>Flat 2.0% Fee Per Settled Transaction</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Conad Tech charges a transparent, flat <strong>2.0% transaction fee</strong> on all gross settled retail transactions processed through the Conad POS and Conad Inventory software ecosystem. This includes all tenders: <strong>MTN Mobile Money (MoMo), Telecel Cash, GhQR, debit/credit cards, and cash sales</strong> recorded on active store registers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#102A56] block">No Monthly Rental</span>
                  <span className="text-slate-600">You do not pay terminal rental fees or software seat licenses.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#102A56] block">Transparent Ledger</span>
                  <span className="text-slate-600">The 2.0% fee is calculated and itemized on daily shift reconciliations in GH₵.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#102A56] block">No Hidden Charges</span>
                  <span className="text-slate-600">Software updates, security patches, and offline engine sync are fully included.</span>
                </div>
              </div>
            </div>

            {/* Detailed Clauses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200/80">
                <h4 className="font-bold text-[#102A56] text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#102A56] text-white flex items-center justify-center text-xs">1</span>
                  Software License & Terminal Installation
                </h4>
                <p className="leading-relaxed text-slate-600">
                  Conad Tech grants the merchant a non-exclusive, non-transferable license to install and run Conad POS (.exe) and Conad Inventory (.exe) on registered store workstations, touch registers, and back-office computers within the merchant&apos;s physical premises.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200/80">
                <h4 className="font-bold text-[#102A56] text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#102A56] text-white flex items-center justify-center text-xs">2</span>
                  Transaction Fee Billing & Settlements
                </h4>
                <p className="leading-relaxed text-slate-600">
                  The 2.0% transaction fee is automatically accounted for during daily register closures and batch ledger reconciliations. Merchants receive an automated monthly statement in Cedis (GH₵) detailing gross sales volume, total completed tickets, and the corresponding 2.0% fee.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200/80">
                <h4 className="font-bold text-[#102A56] text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#102A56] text-white flex items-center justify-center text-xs">3</span>
                  Offline Resilience & Local Data Integrity
                </h4>
                <p className="leading-relaxed text-slate-600">
                  The software features offline-first local queueing. During ECG power cuts or network outages, transactions are stored in an encrypted local data store. The merchant agrees to reconnect the workstation to the internet at least once every 7 calendar days to synchronize pending transaction logs.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200/80">
                <h4 className="font-bold text-[#102A56] text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#102A56] text-white flex items-center justify-center text-xs">4</span>
                  GRA E-VAT Compliance & Tax Integrity
                </h4>
                <p className="leading-relaxed text-slate-600">
                  Conad POS formats receipts to comply with Ghana Revenue Authority (GRA) E-VAT fiscal standards (including VAT, NHIL, GETFund, and QR codes). The merchant remains solely responsible for the accuracy of their registered TIN, tax exemption categories, and timely remittance to the GRA.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CONAD POS OPERATIONAL DOCUMENTATION */}
        <section id="pos-docs" className="scroll-mt-24 mb-16 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              <CreditCard className="w-4 h-4" />
              <span>Register User Guide</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#102A56]">
              Conad POS Operational Guide
            </h2>
            <p className="text-sm text-[#64748B]">
              Step-by-step instructions for installing the desktop software, ringing sales, pairing MoMo terminals, and reconciling cash drawers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200/80 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB] font-mono">
                Guide 01 &bull; Hardware Setup
              </div>
              <h3 className="font-heading text-lg font-bold text-[#102A56]">
                Terminal & Peripheral Pairing
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Connect 80mm ESC/POS thermal receipt printer via USB or local network IP.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Plug in USB HID laser barcode scanner (automatic driver installation).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Connect RJ11 drawer cable to thermal printer drawer port for auto-kick.</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200/80 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF6B2C] font-mono">
                Guide 02 &bull; Shift Opening
              </div>
              <h3 className="font-heading text-lg font-bold text-[#102A56]">
                Cash Float & Cashier Login
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Enter Cashier ID and secure PIN on the touch login screen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Count and declare the opening cash float in Cedis (GH₵) (e.g. GH₵500.00).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Register status turns green with active IndexedDB offline buffer enabled.</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200/80 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                Guide 03 &bull; Payments
              </div>
              <h3 className="font-heading text-lg font-bold text-[#102A56]">
                MoMo Prompt-Push & Receipt
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Scan customer items; subtotal updates with GRA tax breakdown automatically.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Select MTN MoMo or Telecel Cash; customer receives instant USSD PIN prompt on phone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Upon approval, register automatically prints receipt with GRA verification QR code.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 4: CONAD INVENTORY OPERATIONAL DOCUMENTATION */}
        <section id="inventory-docs" className="scroll-mt-24 mb-16 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6B2C]">
              <Boxes className="w-4 h-4" />
              <span>Depot & Stock User Guide</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#102A56]">
              Conad Inventory Operational Guide
            </h2>
            <p className="text-sm text-[#64748B]">
              Managing multi-branch storage hubs across Accra and Kumasi, barcode labeling, automatic stock deduction, and purchase order drafting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#2563EB]">
                <Building2 className="w-5 h-5" />
                <h3 className="font-heading text-lg font-bold text-[#102A56]">
                  Multi-Depot Stock Allocation
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Assign product quantities to central distribution warehouses (e.g., Spintex Depot, North Industrial Area) or storefront shelves (e.g., Osu Branch, Kumasi Main). Transfers between locations include manifest generation, driver sign-off, and barcode verification upon arrival.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#FF6B2C]">
                <QrCode className="w-5 h-5" />
                <h3 className="font-heading text-lg font-bold text-[#102A56]">
                  Barcode Generation & Thermal Labels
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Generate standard EAN-13, Code-128, or QR codes for newly unboxed products. Print shelf talkers and adhesive price stickers directly on standard 80mm or 58mm thermal sticker rolls with item name, barcode, and price in Cedis (GH₵).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-600">
                <Wifi className="w-5 h-5" />
                <h3 className="font-heading text-lg font-bold text-[#102A56]">
                  Real-Time Deduction on POS Sales
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whenever a cashier rings an item on Conad POS, stock counts decrement across the central ledger within 300ms. If multiple lanes sell the last remaining unit simultaneously, local safety buffer locks prevent accidental overselling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-600">
                <FileText className="w-5 h-5" />
                <h3 className="font-heading text-lg font-bold text-[#102A56]">
                  Safe Stock Reorders & Purchase Orders
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Set minimum safe stock thresholds per product. When inventory dips below the safe level, Conad Inventory alerts managers via SMS/email and pre-drafts purchase orders in Cedis (GH₵) ready to dispatch to local Ghanaian suppliers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: TAILORING & CUSTOM SOLUTIONS CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#102A56] text-white border border-[#1A3D78] shadow-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-[#FF6B2C] uppercase tracking-wider">
              Bespoke Software Adaptation
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Need custom modifications for your retail chain?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our Accra-based software engineering team can tailor Conad POS and Inventory to your exact counter hardware, warehouse layout, or custom ERP integration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button
              href="/contact?type=custom_software"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              className="shadow-md shadow-[#FF6B2C]/20"
            >
              Tailor This Software
            </Button>
            <Button
              href="/contact"
              variant="white"
              size="lg"
            >
              Contact Support
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
