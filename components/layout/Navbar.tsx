"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  Boxes,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Sync menu state when route changes without effect cascading renders
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "POS System", href: "/products/conad-pos" },
    { label: "Inventory", href: "/products/conad-inventory" },
    { label: "Services", href: "/services" },
    { label: "Docs", href: "/docs" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="sticky top-2 sm:top-4 z-50 w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300">
      <header
        className={`w-full rounded-2xl md:rounded-full transition-all duration-300 ${
          isScrolled
            ? "shadow-lg shadow-[#102A56]/[0.08] border border-slate-200/90 py-2.5 px-4 sm:px-6"
            : "shadow-md shadow-[#102A56]/[0.04] border border-white/80 py-2.5 sm:py-3 px-4 sm:px-6"
        }`}
        style={{
          background: isScrolled
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(245, 247, 251, 0.85) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(245, 247, 251, 0.78) 100%)",
          backdropFilter: "blur(18px) saturate(180%)",
          WebkitBackdropFilter: "blur(18px) saturate(180%)",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-full"
            aria-label="Conad Tech Homepage"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#102A56] text-white shadow-sm group-hover:bg-[#1A3D78] transition-colors shrink-0">
              {/* Modern geometric tech emblem */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              >
                <path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-2.5 1.55v12.42a1.78 1.78 0 0 0 2.5 1.55L16.5 14.6a1.78 1.78 0 0 0 0-3.2z" />
                <circle cx="18" cy="12" r="2.5" fill="#FF6B2C" stroke="none" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-[#102A56] leading-none flex items-center gap-1">
                Conad<span className="text-[#2563EB]">Tech</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2C] inline-block"></span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider text-[#64748B] mt-0.5">
                Software & Systems
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#2563EB] bg-[#EFF6FF]"
                      : "text-slate-700 hover:text-[#102A56] hover:bg-slate-100/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="text-sm font-semibold text-[#102A56] hover:text-[#2563EB] px-3 py-1.5 transition-colors"
            >
              Contact Us
            </Link>
            <Button
              href="/contact?type=demo"
              variant="primary"
              size="sm"
              className="rounded-full px-4 py-2"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Book a Demo
            </Button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center gap-1.5">
            <Button
              href="/contact?type=demo"
              variant="primary"
              size="sm"
              className="text-xs px-3 py-1.5 rounded-full font-bold shadow-xs"
            >
              Book Demo
            </Button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-slate-700 hover:text-[#102A56] hover:bg-slate-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Glass-Tinted Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden mt-2 rounded-2xl border border-slate-200/90 shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(245, 247, 251, 0.94) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="space-y-3">
            {/* Direct Product Cards on Mobile */}
            <div className="space-y-2 pb-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] px-1">
                Core Software Systems
              </div>

              <Link
                href="/products/conad-pos"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  pathname === "/products/conad-pos"
                    ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]"
                    : "bg-white border-slate-200/90 text-[#102A56] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Conad POS</div>
                    <div className="text-[11px] text-[#64748B]">Checkout & Register Systems</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2563EB]" />
              </Link>

              <Link
                href="/products/conad-inventory"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  pathname === "/products/conad-inventory"
                    ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]"
                    : "bg-white border-slate-200/90 text-[#102A56] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#FFF7ED] text-[#FF6B2C]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Conad Inventory</div>
                    <div className="text-[11px] text-[#64748B]">Stock Synchronization</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#FF6B2C]" />
              </Link>
            </div>

            {/* Standard Nav Items */}
            <div className="space-y-1 pt-1 border-t border-slate-200/70">
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                  pathname === "/services"
                    ? "bg-[#EFF6FF] text-[#2563EB]"
                    : "text-[#102A56] hover:bg-slate-100/60"
                }`}
              >
                Solutions & Rollout Services
              </Link>

              <Link
                href="/docs"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                  pathname === "/docs"
                    ? "bg-[#EFF6FF] text-[#2563EB]"
                    : "text-[#102A56] hover:bg-slate-100/60"
                }`}
              >
                Docs & Terms (2% Fee)
              </Link>

              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                  pathname === "/about"
                    ? "bg-[#EFF6FF] text-[#2563EB]"
                    : "text-[#102A56] hover:bg-slate-100/60"
                }`}
              >
                About Conad Tech
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                  pathname === "/contact"
                    ? "bg-[#EFF6FF] text-[#2563EB]"
                    : "text-[#102A56] hover:bg-slate-100/60"
                }`}
              >
                Contact Team
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-200/80 flex flex-col gap-2">
              <Button
                href="/contact?type=demo"
                variant="primary"
                size="md"
                className="w-full justify-center rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Schedule Interactive Demo
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="md"
                className="w-full justify-center rounded-xl border-slate-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Speak with Deployment Team
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
