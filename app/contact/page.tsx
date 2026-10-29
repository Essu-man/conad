import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { COMPANY_INFO } from "@/lib/company";
import {
  Mail,
  Clock,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Conad Tech | Product Demos & Engineering Consultations",
  description:
    "Get in touch with the Conad Tech engineering team to discuss product trials, custom software development, or system architecture.",
};

function ContactFormWrapper() {
  return <ContactForm initialInquiryType="demo" />;
}

export default function ContactPage() {
  const faqs = [
    {
      q: "Can Conad POS integrate with our existing thermal printers and barcode scanners?",
      a: "Yes. Conad POS is built with standard USB, Bluetooth, and network ESC/POS printer protocols as well as USB HID and keyboard-wedge barcode scanners.",
    },
    {
      q: "How does offline checkout work when internet service goes down?",
      a: "Transactions and inventory deductions are stored securely in local encrypted IndexedDB storage. As soon as network connectivity is restored, the system automatically dispatches pending transactions to the central ledger with conflict resolution.",
    },
    {
      q: "Do you offer custom software development alongside your existing SaaS products?",
      a: "Yes. In addition to our software portfolio, Conad Tech provides tailored software engineering, custom workflow automation, and system integration services.",
    },
    {
      q: "What is your typical turnaround time for an inquiry?",
      a: "Our engineering and customer solutions team reviews inquiries and typically responds within 24 business hours.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-white">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <SectionHeader
            badge="Direct Communication"
            badgeVariant="blue"
            title="Let's build something"
            highlightText="extraordinary together."
            description="Whether you're exploring our software products or evaluating custom engineering solutions, our team is ready to assist."
          />
        </div>

        {/* Contact Form & Contact Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct channels and reassurance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F5F7FB] p-7 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
              <div className="space-y-2">
                <h3 className="font-heading text-xl font-bold text-[#102A56]">
                  Direct Contact Channels
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Have an urgent technical inquiry or commercial partnership question? Reach out to us directly.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="p-2 bg-[#EFF6FF] text-[#2563EB] rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Email Inquiries
                    </div>
                    <a
                      href={`mailto:${COMPANY_INFO.contactEmail}`}
                      className="font-bold text-[#102A56] hover:text-[#2563EB] transition-colors mt-0.5 block text-sm"
                    >
                      {COMPANY_INFO.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="p-2 bg-[#FFF7ED] text-[#FF6B2C] rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Operating Hours
                    </div>
                    <div className="font-bold text-[#102A56] mt-0.5 text-sm">
                      {COMPANY_INFO.operatingHours}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">
                      {COMPANY_INFO.responseGuarantee}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Security & Privacy
                    </div>
                    <div className="font-bold text-[#102A56] mt-0.5 text-sm">
                      Confidential Dialogue
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">
                      All project specs remain under strict professional non-disclosure.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What Happens Next Card */}
            <div className="bg-[#102A56] text-white p-6 rounded-3xl border border-[#1A3D78] space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF6B2C] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                What happens next?
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Your submission is routed to a solution engineer, not an outsourced call center.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>We evaluate requirements and prepare specific technical options.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>We schedule an interactive live demonstration or architectural walkthrough.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl">
                  Loading contact interface...
                </div>
              }
            >
              <ContactFormWrapper />
            </Suspense>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" />
              Frequently Answered Questions
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#102A56]">
              Common questions before getting started
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2"
              >
                <h4 className="font-heading text-base font-bold text-[#102A56]">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
