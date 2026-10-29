import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DIFFERENTIATORS } from "@/lib/company";
import { CheckCircle2, Target, Maximize2, Smile, Sparkles } from "lucide-react";

export function DifferentiatorsSection() {
  const getIcon = (id: string) => {
    switch (id) {
      case "practical-solutions":
        return <Target className="w-6 h-6 text-[#FF6B2C]" />;
      case "scalable-architecture":
        return <Maximize2 className="w-6 h-6 text-[#2563EB]" />;
      case "user-focused":
        return <Smile className="w-6 h-6 text-[#102A56]" />;
      case "continuous-improvement":
        return <Sparkles className="w-6 h-6 text-[#2563EB]" />;
      default:
        return <Target className="w-6 h-6 text-[#2563EB]" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <SectionHeader
          badge="Our Engineering Philosophy"
          badgeVariant="blue"
          title="Engineered for reliability."
          highlightText="Designed for humans."
          description="We take a disciplined engineering approach to solving real-world enterprise operational hurdles without unnecessary complexity."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {DIFFERENTIATORS.map((diff, index) => (
            <div
              key={diff.id}
              className="relative p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F7FB] border border-slate-200/80 flex items-center justify-center">
                    {getIcon(diff.id)}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-300">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-[#102A56] leading-snug">
                  {diff.title}
                </h3>

                <p className="mt-1.5 text-xs font-semibold text-[#2563EB]">
                  {diff.tagline}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {diff.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {diff.keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
