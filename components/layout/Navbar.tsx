"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Boxes,
  Workflow,
  Receipt,
  Truck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/lib/products";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Sync menu state when route changes without effect cascading renders
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
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
        setIsProductsDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Products", href: "/products", hasDropdown: true },
    { label: "Solutions & Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const getProductIcon = (mockupType: string) => {
    switch (mockupType) {
      case "pos":
        return <Boxes className="w-5 h-5 text-[#2563EB]" />;
      case "flow":
        return <Workflow className="w-5 h-5 text-[#FF6B2C]" />;
      case "ledger":
        return <Receipt className="w-5 h-5 text-[#102A56]" />;
      case "inventory":
        return <Truck className="w-5 h-5 text-[#2563EB]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#2563EB]" />;
    }
  };

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
              setIsProductsDropdownOpen(false);
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

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setIsProductsDropdownOpen(true)}
                    onMouseLeave={() => setIsProductsDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? "text-[#2563EB] bg-[#EFF6FF]"
                          : "text-slate-700 hover:text-[#102A56] hover:bg-slate-100/70"
                      }`}
                      aria-expanded={isProductsDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isProductsDropdownOpen ? "rotate-180 text-[#2563EB]" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Desktop Products Dropdown Menu */}
                    {isProductsDropdownOpen && (
                      <div className="absolute top-full left-0 pt-3 w-[460px] z-50">
                        <div
                          className="rounded-2xl shadow-2xl border border-slate-200/90 p-4 animate-in fade-in slide-in-from-top-2 duration-150"
                          style={{
                            background: "rgba(255, 255, 255, 0.96)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                          }}
                        >
                          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                              Product Ecosystem
                            </span>
                            <Link
                              href="/products"
                              onClick={() => setIsProductsDropdownOpen(false)}
                              className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 group"
                            >
                              View all products
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-1 gap-1.5">
                            {PRODUCTS.map((product) => (
                              <Link
                                key={product.id}
                                href={product.productPageUrl}
                                onClick={() => setIsProductsDropdownOpen(false)}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F5F7FB] transition-colors group"
                              >
                                <div className="p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs group-hover:border-[#2563EB]/40 transition-colors">
                                  {getProductIcon(product.mockupType)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-[#102A56] group-hover:text-[#2563EB] transition-colors">
                                      {product.name}
                                    </span>
                                    <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                                      {product.category}
                                    </span>
                                  </div>
                                  <p className="text-xs text-[#64748B] line-clamp-1 mt-0.5">
                                    {product.tagline}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>

                          <div className="mt-3 pt-3 border-t border-slate-100 bg-[#F5F7FB] -mx-4 -mb-4 p-3 rounded-b-2xl flex items-center justify-between text-xs text-[#64748B]">
                            <span className="flex items-center gap-1.5 font-medium text-slate-700">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              All systems operational
                            </span>
                            <Link
                              href="/contact?type=demo"
                              onClick={() => setIsProductsDropdownOpen(false)}
                              className="font-semibold text-[#FF6B2C] hover:text-[#E85819]"
                            >
                              Request Architecture Demo &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

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
              href="/products"
              variant="primary"
              size="sm"
              className="rounded-full px-4 py-2"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Products
            </Button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center gap-1.5">
            <Button
              href="/products"
              variant="primary"
              size="sm"
              className="text-xs px-3 py-1.5 rounded-full font-bold"
            >
              Products
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
            <div className="space-y-1">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-base font-bold ${
                  pathname.startsWith("/products")
                    ? "bg-[#EFF6FF] text-[#2563EB]"
                    : "text-[#102A56] hover:bg-slate-100/60"
                }`}
              >
                Products Portfolio
              </Link>

              {/* Sub-list of individual products on mobile */}
              <div className="pl-3 space-y-1 pb-2">
                {PRODUCTS.map((prod) => (
                  <Link
                    key={prod.id}
                    href={prod.productPageUrl}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-[#64748B] hover:text-[#102A56] hover:bg-slate-100/50"
                  >
                    <span className="font-medium">{prod.name}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {prod.category}
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-base font-bold ${
                  pathname === "/services"
                    ? "bg-[#EFF6FF] text-[#2563EB]"
                    : "text-[#102A56] hover:bg-slate-100/60"
                }`}
              >
                Solutions & Services
              </Link>

              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-base font-bold ${
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
                className={`block px-3.5 py-2.5 rounded-xl text-base font-bold ${
                  pathname === "/contact"
                    ? "bg-[#EFF6FF] text-[#2563EB]"
                    : "text-[#102A56] hover:bg-slate-100/60"
                }`}
              >
                Contact Team
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2">
              <Button
                href="/products"
                variant="primary"
                size="md"
                className="w-full justify-center rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore All Products
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="md"
                className="w-full justify-center rounded-xl border-slate-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Talk to Our Team
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
