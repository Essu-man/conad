import React from "react";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import {
  CheckCircle2,
  ArrowRight,
  GitBranch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Solutions & Consulting Services",
  description:
    "Bespoke software development, business automation pipelines, and technical consulting from Conad Tech.",
};

export default function ServicesPage() {
  const lifecycleSteps = [
    {
      step: "01",
      title: "Discovery & Architecture",
      desc: "Deep analysis of your operational friction points, existing tech stack, database models, and target performance metrics.",
    },
    {
      step: "02",
      title: "Iterative Sprint Execution",
      desc: "High-velocity, milestone-driven development with weekly demos, test-driven logic, and visible code review stages.",
    },
    {
      step: "03",
      title: "Hardening & Integration",
      desc: "Rigorous load testing, end-to-end integration with your payment gateways/ERPs, and security penetration checks.",
    },
    {
      step: "04",
      title: "Deployment & Knowledge Transfer",
      desc: "Zero-downtime production launch, thorough developer documentation, and direct staff handoff with SLA monitoring.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-white">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <SectionHeader
            badge="POS & Inventory Services"
            badgeVariant="midnight"
            title="Deployment & Setup."
            highlightText="Made effortless."
            description="From configuring touchscreen registers, barcode scanners, and thermal printers to multi-warehouse inventory syncing and data migration, our team handles your entire store rollout."
          />
        </div>

        {/* Services List */}
        <div className="mt-12 sm:mt-16 space-y-8 sm:space-y-12">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={service.slug}
              className={`p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm transition-all duration-300 ${
                index % 2 === 1 ? "bg-[#F5F7FB]" : "bg-white"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-[#BFDBFE]/60">
                    <DynamicIcon name={service.iconName} className="w-6 h-6" />
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#102A56]">
                    {service.name}
                  </h2>

                  <p className="text-sm font-semibold text-[#FF6B2C]">
                    {service.tagline}
                  </p>

                  <p className="text-base text-[#64748B] leading-relaxed">
                    {service.description}
                  </p>

                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#102A56] mb-1">
                      Business Value
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      {service.businessValue}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#102A56]">
                    Key Deliverables
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                      Primary Technologies
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      href={`/contact?type=custom_software`}
                      variant="primary"
                      size="sm"
                      className="w-full justify-center"
                    >
                      Inquire About {service.name}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Development Lifecycle Process */}
        <div className="mt-20 py-12 px-6 sm:px-10 rounded-3xl bg-[#102A56] text-white border border-[#1A3D78]">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B2C] uppercase tracking-wider">
              <GitBranch className="w-4 h-4" />
              Delivery Framework
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              How we build and deliver enterprise software
            </h3>
            <p className="text-sm text-slate-300">
              A transparent, engineering-led lifecycle ensuring on-time delivery, clean code, and zero vendor lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifecycleSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-black text-[#FF6B2C]">
                    {step.step}
                  </span>
                  <h4 className="mt-2 font-heading text-base font-bold text-white">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 text-center">
            <Button
              href="/contact?type=custom_software"
              variant="white"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start a Project Discussion
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
