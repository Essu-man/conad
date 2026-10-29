"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  CreditCard,
  Boxes,
  BarChart3,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Wifi,
  Layers,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

type ShowcaseTab = "terminal" | "inventory" | "analytics" | "reporting";

export function FeaturedProductShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("terminal");

  const tabs = [
    {
      id: "terminal" as ShowcaseTab,
      label: "POS Terminal & Checkout",
      icon: CreditCard,
      badge: "Sub-250ms",
      headline: "High-speed checkout with zero delay and offline resilience.",
      description:
        "Designed for busy registers with rapid touch lookups, barcode scanning, split payments, and instant receipt dispatch. Keeps processing transactions seamlessly even if internet connectivity drops.",
    },
    {
      id: "inventory" as ShowcaseTab,
      label: "Live Inventory Decrement",
      icon: Boxes,
      badge: "Real-Time",
      headline: "Instant stock synchronization across all active store lanes.",
      description:
        "Every ring-up automatically decrements central warehouse counts. Prevent accidental double-selling across online and physical channels with instant low-stock notifications.",
    },
    {
      id: "analytics" as ShowcaseTab,
      label: "Sales & Margin Analytics",
      icon: BarChart3,
      badge: "Live Telemetry",
      headline: "Visual telemetry into margins, peak hours, and product velocity.",
      description:
        "Understand exactly when your registers are busiest, which product categories produce the highest net margin, and how average basket values fluctuate across shifts.",
    },
    {
      id: "reporting" as ShowcaseTab,
      label: "Shift & Register Audits",
      icon: FileText,
      badge: "Audited",
      headline: "Automated end-of-day register balancing and cash float audits.",
      description:
        "Generate immutable audit trails for every cash drawer open, cashier login, tender breakdown, and shift turnover. Export comprehensive CSV or PDF summaries instantly.",
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <Container>
        {/* Section Header */}
        <SectionHeader
          badge="Featured SaaS Product"
          badgeVariant="orange"
          title="Deep Dive:"
          highlightText="Conad POS System"
          description="A complete cloud-native point of sale platform built for speed, durability, and multi-location retail scale."
        />

        {/* Interactive Tab Selector - Smooth scroll on mobile, flex-wrap on desktop */}
        <div className="mt-8 sm:mt-12 flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-0 px-2 -mx-4 sm:mx-0 sm:flex-wrap scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#102A56] text-white shadow-md shadow-[#102A56]/20 border border-[#102A56]"
                    : "bg-[#F5F7FB] text-slate-700 hover:text-[#102A56] hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#FF6B2C]" : "text-[#2563EB]"}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
                <span
                  className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white text-slate-500 border border-slate-200"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Preview Canvas */}
        <div className="mt-8 sm:mt-10 rounded-2xl bg-[#0A1C3B] p-4 sm:p-8 text-white border border-[#1A3D78] shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF6B2C]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Mockup Frame Bar */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-white/10 gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2 flex-wrap">
                <span>Conad POS Enterprise</span>
                <span className="text-[10px] font-mono text-[#93C5FD] bg-[#2563EB]/25 px-2 py-0.5 rounded">
                  View: {currentTab.label}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] sm:text-xs">
                <Wifi className="w-3.5 h-3.5" />
                Zero-Drop Offline Active
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300 font-mono text-[11px]">Build 2026.4</span>
            </div>
          </div>

          {/* Main Animated View Area */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
            
            {/* Left Detail Description for the Tab */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B2C] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Capability
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {currentTab.headline}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentTab.description}
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Configurable tax tiers & automated fiscal receipts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sub-second biometric & NFC cashier authorization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Optimistic offline storage with automatic resynchronization</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Button
                  href="/products/conad-pos"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Conad POS
                </Button>
                <Link
                  href="/contact?type=demo"
                  className="text-xs font-semibold text-slate-300 hover:text-white underline underline-offset-4"
                >
                  Schedule Demo &rarr;
                </Link>
              </div>
            </div>

            {/* Right Interactive Dashboard Canvas Mockup */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl bg-[#102A56] border border-[#1A3D78] p-5 shadow-inner"
                >
                  {/* TAB 1: TERMINAL VIEW */}
                  {activeTab === "terminal" && (
                    <div className="space-y-4 font-sans text-xs">
                      <div className="flex justify-between items-center bg-[#0A1C3B] p-3 rounded-lg border border-white/10">
                        <div>
                          <div className="text-[10px] text-slate-400">Cashier: Sarah M. (ID: #409)</div>
                          <div className="font-bold text-white text-sm">Register #02 &bull; Main Floor</div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-emerald-400 font-mono">Cart items: 3</span>
                          <div className="text-base font-extrabold text-[#FF6B2C] font-mono">$1,240.20</div>
                        </div>
                      </div>

                      {/* Item list */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-[#2563EB] flex items-center justify-center text-[10px] font-bold">1</span>
                            <div>
                              <div className="font-semibold text-white">Conad Touch Terminal HW-800</div>
                              <div className="text-[10px] text-slate-400">Barcode: 8492048102</div>
                            </div>
                          </div>
                          <div className="font-mono font-bold text-slate-200">$850.00</div>
                        </div>

                        <div className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-[#2563EB] flex items-center justify-center text-[10px] font-bold">2</span>
                            <div>
                              <div className="font-semibold text-white">Laser Barcode Engine S-200</div>
                              <div className="text-[10px] text-slate-400">Qty: 2 &bull; Barcode: 7729104</div>
                            </div>
                          </div>
                          <div className="font-mono font-bold text-slate-200">$320.00</div>
                        </div>
                      </div>

                      {/* Payment buttons */}
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <button type="button" className="bg-[#FF6B2C] text-white p-2.5 rounded-lg font-bold text-center hover:bg-[#E85819] transition-colors">
                          Card / NFC Tap
                        </button>
                        <button type="button" className="bg-white/10 text-slate-200 p-2.5 rounded-lg font-semibold text-center hover:bg-white/20 transition-colors">
                          Cash Float
                        </button>
                        <button type="button" className="bg-white/10 text-slate-200 p-2.5 rounded-lg font-semibold text-center hover:bg-white/20 transition-colors">
                          Invoice / PO
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: INVENTORY VIEW */}
                  {activeTab === "inventory" && (
                    <div className="space-y-4 font-sans text-xs">
                      <div className="flex justify-between items-center bg-[#0A1C3B] p-3 rounded-lg border border-white/10">
                        <div>
                          <div className="text-[10px] text-slate-400">Inventory Status</div>
                          <div className="font-bold text-white text-sm">Multi-Location Depots (3 Warehouses)</div>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-semibold">
                          Synced Across Registers
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="bg-white/5 p-2.5 rounded border border-white/5 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-white">Dual-Display POS Register</div>
                            <div className="text-[10px] text-slate-400">SKU: HW-POS-900 &bull; Min safe stock: 5</div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-emerald-400 font-mono">42 in stock</span>
                            <div className="text-[10px] text-slate-400">14 in central depot</div>
                          </div>
                        </div>

                        <div className="bg-white/5 p-2.5 rounded border border-white/5 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-white">Wireless 2D Scanner Kit</div>
                            <div className="text-[10px] text-slate-400">SKU: HW-SCN-42 &bull; Min safe stock: 8</div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-amber-400 font-mono">3 in stock (Low)</span>
                            <div className="text-[10px] text-amber-300">Auto reorder queued</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-between text-[11px] text-blue-200">
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#93C5FD]" />
                          Automatic reservation on active cart scan
                        </span>
                        <span className="font-mono text-white">Zero overselling</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: ANALYTICS VIEW */}
                  {activeTab === "analytics" && (
                    <div className="space-y-4 font-sans text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#0A1C3B] p-3 rounded-lg border border-white/10">
                          <div className="text-[10px] text-slate-400">Today&apos;s Gross Volume</div>
                          <div className="text-lg font-bold text-white font-mono">$42,850.20</div>
                          <div className="text-[10px] text-emerald-400">+14.2% vs 7-day average</div>
                        </div>
                        <div className="bg-[#0A1C3B] p-3 rounded-lg border border-white/10">
                          <div className="text-[10px] text-slate-400">Gross Margin</div>
                          <div className="text-lg font-bold text-[#FF6B2C] font-mono">38.4%</div>
                          <div className="text-[10px] text-slate-300">$16,454.47 net contribution</div>
                        </div>
                      </div>

                      {/* Realistic Visual Velocity Graph */}
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="flex justify-between items-center mb-2 text-[10px] text-slate-400">
                          <span>Hourly Transaction Velocity (08:00 - 20:00)</span>
                          <span className="text-[#93C5FD]">Peak: 14:00 (124 tickets/hr)</span>
                        </div>
                        <div className="flex items-end gap-2 h-20 pt-2">
                          <div className="flex-1 bg-[#2563EB]/30 rounded-t h-[25%]"></div>
                          <div className="flex-1 bg-[#2563EB]/40 rounded-t h-[45%]"></div>
                          <div className="flex-1 bg-[#2563EB]/60 rounded-t h-[60%]"></div>
                          <div className="flex-1 bg-[#2563EB]/80 rounded-t h-[90%]"></div>
                          <div className="flex-1 bg-[#FF6B2C] rounded-t h-[100%]"></div>
                          <div className="flex-1 bg-[#2563EB]/80 rounded-t h-[75%]"></div>
                          <div className="flex-1 bg-[#2563EB]/50 rounded-t h-[50%]"></div>
                        </div>
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-300">
                        <span>Top Sales Channel: In-Store Registers (72%)</span>
                        <span className="text-emerald-400 font-semibold">100% On-Track</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: REPORTING VIEW */}
                  {activeTab === "reporting" && (
                    <div className="space-y-4 font-sans text-xs">
                      <div className="flex justify-between items-center bg-[#0A1C3B] p-3 rounded-lg border border-white/10">
                        <div>
                          <div className="text-[10px] text-slate-400">Register Reconciliation</div>
                          <div className="font-bold text-white text-sm">Daily End-of-Day Balancing</div>
                        </div>
                        <span className="text-emerald-400 font-mono text-xs font-bold">
                          Zero Variance ($0.00)
                        </span>
                      </div>

                      <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                        <table className="w-full text-left text-[11px]">
                          <thead className="bg-white/10 text-slate-300 border-b border-white/10">
                            <tr>
                              <th className="p-2 font-semibold">Register</th>
                              <th className="p-2 font-semibold">Cashier</th>
                              <th className="p-2 font-semibold">Expected</th>
                              <th className="p-2 font-semibold text-right">Actual Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-slate-200">
                            <tr>
                              <td className="p-2 font-mono">Lane 01</td>
                              <td className="p-2">Sarah M.</td>
                              <td className="p-2 font-mono">$14,210.00</td>
                              <td className="p-2 text-right text-emerald-400 font-semibold">Balanced</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-mono">Lane 02</td>
                              <td className="p-2">David K.</td>
                              <td className="p-2 font-mono">$18,440.20</td>
                              <td className="p-2 text-right text-emerald-400 font-semibold">Balanced</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-mono">Lane 03</td>
                              <td className="p-2">Elena R.</td>
                              <td className="p-2 font-mono">$10,200.00</td>
                              <td className="p-2 text-right text-emerald-400 font-semibold">Balanced</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Cryptographically sealed audit report
                        </span>
                        <span className="text-slate-400 font-mono">Export: PDF / CSV / ERP</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C]"></span>
              <span>Illustrative software preview representing production interface architecture</span>
            </div>
            <Link
              href="/products/conad-pos"
              className="text-[#93C5FD] hover:text-white font-semibold transition-colors"
            >
              Read Full Technical Specifications &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
