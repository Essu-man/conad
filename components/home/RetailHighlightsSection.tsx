import React from "react";
import { Container } from "@/components/ui/Container";
import { Zap, Wifi, ShieldCheck, Building2 } from "lucide-react";

export function RetailHighlightsSection() {
  const highlights = [
    {
      icon: Zap,
      title: "Instant MoMo in Cedis",
      description: "Push payment prompts to MTN MoMo and Telecel Cash phones. Fast cash drawer float balancing in Cedis (GH₵).",
      accent: "text-[#FF6B2C]",
      bg: "bg-[#FFF7ED]",
    },
    {
      icon: Wifi,
      title: "100% Offline Resilience",
      description: "Keep ringing sales uninterrupted during internet or grid power dips. Queued transactions sync automatically.",
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: ShieldCheck,
      title: "GRA E-VAT Compliant",
      description: "Generate compliant thermal receipts with required Ghana tax splits (VAT, NHIL, GETFund) and verification QR codes.",
      accent: "text-[#2563EB]",
      bg: "bg-[#EFF6FF]",
    },
    {
      icon: Building2,
      title: "Multi-Depot Stock Sync",
      description: "Live inventory deduction between central warehouses (Accra, Kumasi) and storefront registers with zero overselling.",
      accent: "text-[#102A56]",
      bg: "bg-slate-100",
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200/80">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#BFDBFE]/60">
            Engineered for Ghanaian Commerce
          </span>
          <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-extrabold text-[#102A56] tracking-tight">
            Built for how retail actually works.
          </h2>
          <p className="mt-2 text-sm text-[#64748B]">
            Practical software designed to eliminate friction at checkout counters and storage depots.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F5F7FB] border border-slate-200/70 shadow-xs hover:border-[#2563EB]/30 transition-all flex flex-col"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.accent} flex items-center justify-center mb-3.5 shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-[#102A56]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-[#64748B] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
