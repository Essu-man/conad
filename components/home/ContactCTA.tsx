import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function ContactCTA() {
  return (
    <section className="py-20 md:py-24 bg-[#102A56] text-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#2563EB]/25 via-[#FF6B2C]/10 to-transparent blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-[#93C5FD] border border-white/15">
            <Zap className="w-3.5 h-3.5 text-[#FF6B2C]" />
            <span>Ready for seamless store operations?</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Deploy Conad POS & Inventory in your stores.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Fast MoMo prompt-push checkout, GRA-compliant receipts, and real-time multi-branch stock synchronization in Cedis (GH₵).
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact?type=demo"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-lg shadow-[#FF6B2C]/25"
            >
              Schedule a Live Demo
            </Button>
            <Button
              href="/contact"
              variant="white"
              size="lg"
              className="w-full sm:w-auto"
            >
              Talk to Our Accra Team
            </Button>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Accra On-Site & Remote Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#93C5FD]" />
              <span>GRA E-VAT Receipt Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B2C]" />
              <span>Offline Resilience (Zero Lost Sales)</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
