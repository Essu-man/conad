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
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Conad Tech | Product Demos & Engineering Consultations",
  description:
    "Get in touch with the Conad Tech engineering team in Accra, Ghana to discuss POS rollouts, multi-depot inventory, or system trials.",
};

function ContactFormWrapper() {
  return <ContactForm initialInquiryType="demo" />;
}

export default function ContactPage() {
  const faqs = [
    {
      q: "Does Conad POS support MTN Mobile Money, Telecel Cash, and GRA E-VAT receipts?",
      a: "Yes. Conad POS features native integration for MTN MoMo and Telecel Cash prompt-push directly on customer phones, GhQR, and generates GRA-compliant fiscal receipts with tax breakdowns and verification QR codes.",
    },
    {
      q: "How does offline checkout protect our store during power or internet cuts?",
      a: "Transactions and inventory deductions are stored securely in local encrypted IndexedDB storage on the register. Cashiers can continue ringing sales and processing cash without internet. As soon as connectivity restores, pending transactions sync automatically.",
    },
    {
      q: "Can Conad Inventory synchronize multiple warehouse depots across Accra and Kumasi?",
      a: "Yes. Conad Inventory connects central warehouses (such as Spintex or North Industrial Area) with storefront branches in real time. Stock transfers, batch tracking, safe-stock thresholds, and reorder alerts are all tracked in Ghana Cedis (GH₵).",
    },
    {
      q: "How quickly can you deploy POS registers and train our cashiers?",
      a: "Our Accra-based deployment team typically sets up registers, thermal printers, barcode scanners, and trains cashiers within 24 to 48 hours for immediate go-live.",
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
            description="Whether you're exploring our POS & inventory software or deploying multi-branch retail registers across Ghana, our team is ready to assist."
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
                  Have an inquiry or looking to roll out registers in your retail stores? Reach out to our Ghana engineering & operations team.
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
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Headquarters & Coverage
                    </div>
                    <div className="font-bold text-[#102A56] mt-0.5 text-sm">
                      Accra, Ghana
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">
                      Greater Accra, Ashanti & Nationwide Support
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="p-2 bg-[#FFF7ED] text-[#FF6B2C] rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Operating Hours (GMT)
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
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Enterprise Support
                    </div>
                    <div className="font-bold text-[#102A56] mt-0.5 text-sm">
                      Guaranteed SLA
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">
                      Dedicated on-call engineering & local technician dispatch.
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
