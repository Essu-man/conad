"use client";

import React, { useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductCategory } from "@/lib/types";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";

const CATEGORIES: ProductCategory[] = [
  "All",
  "Commerce & Retail",
  "Operations & Automation",
  "Financial Intelligence",
];

export function ProductPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("All");

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="py-16 md:py-24 bg-[#F5F7FB] border-y border-slate-200/80">
      <Container>
        {/* Section Header */}
        <SectionHeader
          badge="Product Portfolio"
          badgeVariant="blue"
          title="One ecosystem."
          highlightText="Multiple possibilities."
          description="Explore Conad Tech's suite of specialized software solutions engineered to work together seamlessly or plug directly into your current stack."
        />

        {/* Category Filter Pills - Touch friendly scroll on mobile */}
        <div className="mt-8 sm:mt-10 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 px-2 -mx-4 sm:mx-0 sm:flex-wrap scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-[#102A56] text-white shadow-sm"
                    : "bg-white text-slate-600 hover:text-[#102A56] hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Informative Note regarding illustrative mockups */}
        <div className="mt-12 p-4 rounded-xl bg-white border border-slate-200/80 text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-xs text-[#64748B]">
            <strong className="text-[#102A56]">Developer Note:</strong> Interface mockups represent our
            active production component designs and architecture. Looking for specific technical APIs,
            custom schemas, or hardware SDKs?{" "}
            <a href="/contact" className="text-[#2563EB] hover:underline font-semibold">
              Contact our engineering team
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
