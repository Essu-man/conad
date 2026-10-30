import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";

export function ProductPortfolio() {
  return (
    <section id="products" className="py-16 md:py-24 bg-[#F5F7FB] border-y border-slate-200/80">
      <Container>
        {/* Simple Section Header */}
        <SectionHeader
          badge="Core Software Suite"
          badgeVariant="blue"
          title="Two focused systems."
          highlightText="Unified retail operations."
          description="Conad POS accelerates your checkout counters with sub-second Mobile Money and cash transactions in Cedis (GH₵), while Conad Inventory keeps central warehouses and storefront branches across Ghana in real-time sync."
        />

        {/* Direct Product Jump Links */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <Link
            href="/products/conad-pos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] bg-white px-3.5 py-1.5 rounded-full border border-slate-200/90 shadow-xs hover:border-[#2563EB] transition-all"
          >
            <span>Jump to Conad POS</span>
            <span className="text-[#FF6B2C]">&rarr;</span>
          </Link>
          <Link
            href="/products/conad-inventory"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B2C] bg-white px-3.5 py-1.5 rounded-full border border-slate-200/90 shadow-xs hover:border-[#FF6B2C] transition-all"
          >
            <span>Jump to Conad Inventory</span>
            <span className="text-[#2563EB]">&rarr;</span>
          </Link>
        </div>

        {/* 2-Product Focused Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Informative Note */}
        <div className="mt-12 p-4 rounded-xl bg-white border border-slate-200/80 text-center max-w-xl mx-auto shadow-xs">
          <p className="text-xs text-[#64748B]">
            Need custom hardware integration, GRA-compliant receipt printers, or barcode scanner support?{" "}
            <Link href="/contact" className="text-[#2563EB] hover:underline font-semibold">
              Speak with our Accra deployment engineers &rarr;
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
