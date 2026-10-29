"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  CreditCard,
  Wifi,
  Sparkles,
  CheckCircle2,
  Boxes,
  CircleDollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-20 lg:pb-32 bg-white">
      {/* Background ambient lighting and subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#2563EB]/10 via-[#FF6B2C]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2">
              <Badge variant="blue" size="md" className="font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB] mr-1 inline" />
                Intelligent Enterprise Software
              </Badge>
              <span className="text-xs font-semibold text-[#FF6B2C] bg-[#FFF7ED] px-2.5 py-1 rounded-full border border-[#FFEDD5]">
                New: Conad POS v3.2
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#102A56] leading-[1.12]">
              Technology that moves your{" "}
              <span className="text-[#2563EB] relative inline-block">
                business forward.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl font-normal">
              Build, manage, and grow with intelligent software designed to simplify operations,
              accelerate transactions, and unlock new possibilities.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                href="/products"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="shadow-md shadow-[#FF6B2C]/20 justify-center rounded-xl"
              >
                Explore Our Products
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="text-[#102A56] hover:bg-slate-50 border-slate-300 justify-center rounded-xl"
              >
                Talk to Our Team
              </Button>
            </div>

            {/* Trust Assurances */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 sm:gap-4 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#102A56]">
                  <Zap className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="truncate">Sub-250ms</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5">High-Speed Execution</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#102A56]">
                  <Wifi className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">Offline-First</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5">Resilient Checkout</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#102A56]">
                  <ShieldCheck className="w-4 h-4 text-[#FF6B2C] shrink-0" />
                  <span className="truncate">Enterprise</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5">Audited Integrity</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Realistic Software Interface Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 relative w-full"
          >
            {/* Visual Frame */}
            <div className="relative mx-auto max-w-xl lg:max-w-none rounded-2xl bg-white border border-slate-200/90 shadow-2xl shadow-[#102A56]/12 overflow-hidden">
              
              {/* Window Header */}
              <div className="bg-[#102A56] px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between text-white border-b border-[#1A3D78]">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
                  </div>
                  <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-medium text-slate-300 truncate max-w-[170px] sm:max-w-none">
                    Conad POS &mdash; Register 04 [Terminal Central]
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Live Sync
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-300 font-mono">v3.2</span>
                </div>
              </div>

              {/* Main Dashboard Workspace */}
              <div className="p-3 sm:p-5 bg-[#F5F7FB] space-y-3 sm:space-y-4">
                
                {/* Metric Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/70 shadow-xs">
                    <div className="text-[10px] sm:text-[11px] font-medium text-[#64748B]">Today&apos;s Gross Sales</div>
                    <div className="text-base sm:text-lg font-extrabold text-[#102A56] mt-0.5">
                      $42,850.20
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +14.2% vs yesterday
                    </div>
                  </div>

                  <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/70 shadow-xs">
                    <div className="text-[10px] sm:text-[11px] font-medium text-[#64748B]">Total Completed Orders</div>
                    <div className="text-base sm:text-lg font-extrabold text-[#102A56] mt-0.5">
                      618
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 font-mono">
                      Avg: $69.34 / ticket
                    </div>
                  </div>

                  <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/70 shadow-xs">
                    <div className="text-[10px] sm:text-[11px] font-medium text-[#64748B]">Stock Depletion</div>
                    <div className="text-base sm:text-lg font-extrabold text-[#2563EB] mt-0.5">
                      Real-Time
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                      0 queue bottlenecks
                    </div>
                  </div>
                </div>

                {/* Two-Pane POS Register & Sales Monitor */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  
                  {/* Active Cart / Checkout Register Preview */}
                  <div className="sm:col-span-7 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Boxes className="w-4 h-4 text-[#2563EB]" />
                        <span className="text-xs font-bold text-[#102A56]">Active Checkout</span>
                      </div>
                      <span className="text-[11px] text-[#64748B] font-mono">#ORD-9021</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <div>
                          <div className="font-semibold text-slate-800">Conad Dual POS Terminal</div>
                          <div className="text-[10px] text-[#64748B]">SKU: HW-POS-900 &bull; Qty: 1</div>
                        </div>
                        <div className="font-bold text-[#102A56]">$850.00</div>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <div>
                          <div className="font-semibold text-slate-800">Wireless 2D Scanner Kit</div>
                          <div className="text-[10px] text-[#64748B]">SKU: HW-SCN-42 &bull; Qty: 2</div>
                        </div>
                        <div className="font-bold text-[#102A56]">$320.00</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                      <div className="flex justify-between text-[#64748B]">
                        <span>Subtotal (3 items)</span>
                        <span>$1,170.00</span>
                      </div>
                      <div className="flex justify-between text-[#64748B]">
                        <span>Tax (Calculated)</span>
                        <span>$70.20</span>
                      </div>
                      <div className="flex justify-between text-sm font-extrabold text-[#102A56] pt-1 border-t border-dashed border-slate-200">
                        <span>Total Due</span>
                        <span className="text-[#2563EB] font-mono">$1,240.20</span>
                      </div>
                    </div>

                    <div className="pt-1 flex gap-2">
                      <button
                        type="button"
                        className="flex-1 bg-[#FF6B2C] hover:bg-[#E85819] text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        Charge $1,240.20
                      </button>
                      <button
                        type="button"
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Split
                      </button>
                    </div>
                  </div>

                  {/* Real-Time Live Feed & Sync Monitor */}
                  <div className="sm:col-span-5 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-[#102A56]">Recent Activity</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">100% Up</span>
                      </div>

                      <div className="space-y-2 mt-2">
                        <div className="p-2 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE]/60 text-[11px]">
                          <div className="font-semibold text-[#102A56] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            Register #02 Settled
                          </div>
                          <div className="text-[10px] text-[#64748B] mt-0.5">
                            $3,420.00 &bull; 44 trans
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px]">
                          <div className="font-semibold text-slate-800 flex items-center gap-1">
                            <CircleDollarSign className="w-3 h-3 text-[#2563EB] shrink-0" />
                            Warehouse Sync
                          </div>
                          <div className="text-[10px] text-[#64748B] mt-0.5">
                            14 SKU counts adjusted
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#0A1C3B] text-white text-[10px] space-y-1">
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Offline Sync Buffer</span>
                        <span className="text-emerald-400 font-mono">0 pending</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#2563EB] h-1.5 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="bg-white px-3 sm:px-4 py-2.5 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-[10px] sm:text-[11px] text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  Conad Cloud Architecture v3.2 &bull; Multi-Node
                </span>
                <Link
                  href="/products/conad-pos"
                  className="font-semibold text-[#2563EB] hover:underline"
                >
                  View Architecture &rarr;
                </Link>
              </div>
            </div>

            {/* Subtle decorative floating badges (XL only to preserve mobile clearance) */}
            <div className="hidden xl:flex absolute -bottom-5 -left-5 bg-white p-3 rounded-xl shadow-xl border border-slate-200 items-center gap-3">
              <div className="p-2 bg-[#FFF7ED] rounded-lg">
                <Sparkles className="w-5 h-5 text-[#FF6B2C]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#102A56]">Continuous Uptime</div>
                <div className="text-[11px] text-[#64748B]">Zero-drop failover mode</div>
              </div>
            </div>

            <div className="hidden xl:flex absolute -top-4 -right-4 bg-[#102A56] text-white p-3 rounded-xl shadow-xl border border-[#1A3D78] items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <CreditCard className="w-5 h-5 text-[#93C5FD]" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Instant Tap & Pay</div>
                <div className="text-[11px] text-slate-300">Integrated merchant gateway</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
