"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductCategory } from "@/lib/types";
import { ProductCard } from "@/components/products/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Search, Sparkles, ArrowRight, ShieldCheck, Zap, Database } from "lucide-react";

const CATEGORIES: ProductCategory[] = [
  "All",
  "Point of Sale",
  "Inventory Management",
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 md:py-20 bg-white">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <SectionHeader
            badge="Software Products"
            badgeVariant="blue"
            title="Conad POS & Inventory."
            highlightText="Engineered for retail."
            description="Explore our focused systems built for rapid touch checkouts, offline resilience, and real-time multi-location warehouse stock coordination."
          />
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#F5F7FB] border border-slate-200">
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#102A56] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:text-[#102A56] border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-2 text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
              <p className="text-slate-600 font-medium">
                No products match &ldquo;{searchQuery}&rdquo; in this category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* System Ecosystem Architecture Highlight */}
        <div className="mt-20 rounded-2xl bg-[#102A56] text-white p-8 md:p-12 border border-[#1A3D78] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B2C] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Interconnected Architecture
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Independent strength. Exponential value together.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Conad POS and Conad Inventory are engineered with an integrated architecture where sub-second
                counter sales instantly decrement central warehouse reserves, trigger automated safe-stock
                alerts, and synchronize register audit logs across all active retail locations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <Zap className="w-4 h-4 text-[#FF6B2C] mb-1" />
                  <div className="text-xs font-bold text-white">WebSocket Sync</div>
                  <div className="text-[11px] text-slate-300">Live transaction broadcasts</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <Database className="w-4 h-4 text-[#2563EB] mb-1" />
                  <div className="text-xs font-bold text-white">Single Schema</div>
                  <div className="text-[11px] text-slate-300">Zero data translation loss</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                  <div className="text-xs font-bold text-white">Offline Buffer</div>
                  <div className="text-[11px] text-slate-300">Guaranteed idempotency</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0A1C3B] p-6 rounded-xl border border-white/10 text-center space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
                Need a Custom Combination?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                We can provision multi-branch tenant environments, custom hardware SDKs, or tailored
                integration bridges for your existing enterprise systems.
              </p>
              <Button
                href="/contact?type=demo"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full justify-center"
              >
                Schedule Technical Consultation
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
