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

        {/* 2-Product Focused Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
