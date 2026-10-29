import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { ProductMockupPreview } from "./ProductMockupPreview";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2563EB]/40 transition-all duration-300 overflow-hidden">
      
      {/* Top Header Information */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="blue" size="sm">
            {product.category}
          </Badge>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            {product.availabilityStatus}
          </span>
        </div>

        <h3 className="font-heading text-xl font-bold text-[#102A56] group-hover:text-[#2563EB] transition-colors">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-[#64748B] leading-relaxed line-clamp-2">
          {product.shortDescription}
        </p>
      </div>

      {/* Realistic Software Dashboard Preview Container */}
      <div className="px-6 py-2">
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-[#EFF6FF]/40 group-hover:border-[#BFDBFE]/60 transition-all">
          <ProductMockupPreview type={product.mockupType} />
        </div>
      </div>

      {/* Highlights / Key Capabilities */}
      <div className="px-6 py-4 flex-1">
        <div className="text-xs font-semibold text-[#102A56] uppercase tracking-wider mb-2">
          Key Capabilities
        </div>
        <ul className="space-y-1.5 text-xs text-slate-600">
          {product.highlights.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-[#F5F7FB] border-t border-slate-100 flex items-center justify-between mt-auto">
        <Link
          href={product.productPageUrl}
          className="text-sm font-bold text-[#102A56] group-hover:text-[#2563EB] flex items-center gap-1.5 transition-colors"
        >
          <span>Explore Product</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        {product.launchUrl && (
          <Link
            href={product.productPageUrl}
            className="text-xs font-semibold text-[#FF6B2C] hover:text-[#E85819] transition-colors"
          >
            Launch Interactive Tour
          </Link>
        )}
      </div>
    </div>
  );
}
