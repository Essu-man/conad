import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { SERVICES } from "@/lib/services";
import { COMPANY_INFO } from "@/lib/company";
import { Shield, Mail, Clock, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#102A56] text-white border-t border-[#1A3D78] mt-auto">
      {/* Upper Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-md"
              aria-label="Conad Tech Homepage"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white border border-white/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-white"
                >
                  <path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-2.5 1.55v12.42a1.78 1.78 0 0 0 2.5 1.55L16.5 14.6a1.78 1.78 0 0 0 0-3.2z" />
                  <circle cx="18" cy="12" r="2.5" fill="#FF6B2C" stroke="none" />
                </svg>
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                Conad<span className="text-[#93C5FD]">Tech</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C] inline-block"></span>
              </span>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              A forward-thinking technology company developing intelligent software products to help
              businesses simplify operations, accelerate commerce, and scale with confidence.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6B2C] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#93C5FD] shrink-0" />
                <span>{COMPANY_INFO.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Software Products Links */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
              Software Products
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={prod.productPageUrl}
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{prod.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6B2C]" />
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/products"
                  className="text-xs font-semibold text-[#FF6B2C] hover:underline"
                >
                  All Products Overview &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Engineering Solutions & Services */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
              Solutions & Services
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <Link href={`/services#${srv.slug}`} className="hover:text-white transition-colors">
                    {srv.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/services"
                  className="text-xs font-semibold text-[#FF6B2C] hover:underline"
                >
                  Architecture & Consulting &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support Links */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Conad Tech
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors font-semibold text-[#93C5FD]">
                  Documentation Hub
                </Link>
              </li>
              <li>
                <Link href="/docs#terms" className="hover:text-white transition-colors">
                  Terms & 2% Fee Policy
                </Link>
              </li>
              <li>
                <Link href="/docs#downloads" className="hover:text-white transition-colors">
                  Download Applications (.exe)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Team
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Security Banner */}
      <div className="border-t border-[#1A3D78] bg-[#0A1C3B]/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>
                &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved. Enterprise-grade software systems.
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-slate-500">
                Built with precision, performance & reliability
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
