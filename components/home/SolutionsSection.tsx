import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { SERVICES } from "@/lib/services";

export function SolutionsSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-[#F5F7FB] border-t border-slate-200/80">
      <Container>
        {/* Distinction Banner & Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <SectionHeader
            badge="Engineering & Advisory Services"
            badgeVariant="midnight"
            title="Beyond products."
            highlightText="Tailored software engineering."
            description="In addition to our software products, Conad Tech provides specialized engineering services to design, build, and integrate custom business systems."
          />
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-[#64748B]">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
            <span>Distinction: Proprietary SaaS platforms vs. client-commissioned custom systems</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200">
                  <DynamicIcon name={service.iconName} className="w-6 h-6" />
                </div>

                <h3 className="mt-5 font-heading text-xl font-bold text-[#102A56] group-hover:text-[#2563EB] transition-colors">
                  {service.name}
                </h3>

                <p className="mt-2 text-xs font-semibold text-[#FF6B2C]">
                  {service.tagline}
                </p>

                <p className="mt-3 text-sm text-[#64748B] leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="text-xs font-bold text-[#102A56] uppercase tracking-wider mb-2.5">
                    Core Deliverables
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/services#${service.slug}`}
                  className="text-xs font-bold text-[#102A56] group-hover:text-[#2563EB] flex items-center gap-1 transition-colors shrink-0 ml-2"
                >
                  Details
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Prompt */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-heading text-lg font-bold text-[#102A56]">
              Have a unique technical challenge or legacy system to modernize?
            </h4>
            <p className="text-sm text-[#64748B]">
              Our lead engineers evaluate your software requirements and provide candid feasibility feedback.
            </p>
          </div>
          <Link
            href="/contact?type=custom_software"
            className="inline-flex items-center justify-center font-semibold rounded-lg px-5 py-2.5 text-sm bg-[#102A56] text-white hover:bg-[#1A3D78] shadow-sm transition-colors shrink-0"
          >
            Consult with an Engineer &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}
