import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/company";
import {
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  ArrowRight,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Conad Tech | Our Mission & Engineering Principles",
  description:
    "Learn about Conad Tech, a forward-thinking technology company building intelligent software products and modern business tools.",
};

export default function AboutPage() {
  const principles = [
    {
      title: "Pragmatic Engineering Over Hype",
      description:
        "We build software that solves actual friction: busy cashier lanes, multi-warehouse sync, and automated invoice dispatches. We select durable, battle-tested technologies that perform predictably under load.",
      icon: Target,
    },
    {
      title: "Offline-First & Fault Resilient",
      description:
        "Modern commerce cannot afford downtime. Our systems are engineered so that even if the internet fails or an external API falters, transactions and records continue locally and sync seamlessly once reconnected.",
      icon: Zap,
    },
    {
      title: "Respect for the User's Time",
      description:
        "Every second a cashier or manager spends fighting bad software is lost revenue. We invest deeply in ergonomic workflows, keyboard shortcuts, fast touch interfaces, and clean information hierarchy.",
      icon: Users,
    },
    {
      title: "Strict Data Ownership & Integrity",
      description:
        "Your operational and financial metrics belong to you. We build with transparent data structures, comprehensive audit logging, and open export formats so businesses are never trapped in a walled garden.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-white">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <SectionHeader
            badge="About Conad Tech"
            badgeVariant="blue"
            title="Technology engineered for"
            highlightText="real business operations."
            description={COMPANY_INFO.subheadline}
          />
        </div>

        {/* Company Overview & Mission */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-base">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#102A56]">
              Who We Are
            </h2>
            <p>
              <strong>Conad Tech</strong> is a forward-thinking software technology company founded to
              develop intelligent, high-performance software products that simplify daily business
              operations and unlock new commercial opportunities.
            </p>
            <p>
              From cloud-native point of sale (POS) systems engineered for sub-second, offline-resilient
              checkouts, to multi-location warehouse and inventory synchronization, our software is built
              from the ground up for modern retail operations.
            </p>
            <p>
              Our engineering team partners with growing retail chains and merchants to deploy reliable
              touchscreen registers, configure thermal receipt printers and barcode scanners, and synchronize
              multi-branch inventory depots with zero data loss.
            </p>

            <div className="pt-2">
              <Button href="/contact" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Talk With Our Team
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#102A56] text-white p-8 rounded-3xl border border-[#1A3D78] shadow-xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6B2C] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Our Core Identity
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-xl font-bold text-white">Our Mission</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {COMPANY_INFO.mission}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10">
              <h3 className="font-heading text-xl font-bold text-white">Our Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {COMPANY_INFO.vision}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Established Software Practice</span>
              <span className="font-mono text-emerald-400 font-bold">100% Focused on Quality</span>
            </div>
          </div>
        </div>

        {/* Engineering Philosophy Principles */}
        <div id="philosophy" className="mt-24">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#102A56]">
              Our Engineering Principles
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#64748B]">
              The core standards that guide every line of code we write and every product interface we design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-[#F5F7FB] border border-slate-200/80 shadow-xs flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-white text-[#2563EB] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#102A56]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Standards & Commitments */}
        <div className="mt-20 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-heading text-xl font-bold text-[#102A56]">
              Looking to deploy Conad Tech products in your stores or facilities?
            </h3>
            <p className="text-sm text-[#64748B]">
              We offer pilot onboarding, hardware setup guidance, and continuous SLA support.
            </p>
          </div>
          <Button href="/contact?type=demo" variant="primary" size="md">
            Request an Architecture Walkthrough &rarr;
          </Button>
        </div>
      </Container>
    </div>
  );
}
