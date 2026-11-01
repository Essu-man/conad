import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ProductMockupPreview } from "@/components/products/ProductMockupPreview";
import { DownloadHeroActions } from "@/components/products/DownloadHeroActions";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;
export const instant = false;

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Conad Tech Software`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Conad Tech`,
      description: product.shortDescription,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-10 md:py-16 bg-white">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] mb-8">
          <Link href="/" className="hover:text-[#102A56] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#102A56] transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-[#102A56] font-bold">{product.name}</span>
        </div>

        {/* Hero Section of Product */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-14 border-b border-slate-200">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="blue" size="sm">
                {product.category}
              </Badge>
              <Badge variant="orange" size="sm">
                {product.badge}
              </Badge>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                Status: {product.availabilityStatus}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A56] tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-lg text-[#2563EB] font-semibold leading-relaxed">
              {product.tagline}
            </p>

            <p className="text-base text-[#64748B] leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Interactive Multi-Platform Download Center */}
            <DownloadHeroActions
              slug={product.slug}
              productName={product.name}
              version={product.version}
            />
          </div>

          {/* Realistic High-Fidelity UI Mockup Visualizer */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A1C3B] p-4 sm:p-5 rounded-2xl border border-[#1A3D78] shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-slate-300">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {product.name} Live View
                </span>
                <span className="text-[10px] font-mono text-[#93C5FD]">v3.2 Production</span>
              </div>
              <ProductMockupPreview type={product.mockupType} isDetailed={true} />
            </div>
          </div>
        </div>

        {/* Key Metrics Strip */}
        <div className="my-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {product.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200/80 shadow-xs"
            >
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                {metric.label}
              </div>
              <div className="mt-2 text-3xl font-extrabold text-[#102A56] font-mono">
                {metric.value}
              </div>
              <p className="mt-1 text-xs text-slate-600 font-medium">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="py-10">
          <div className="max-w-3xl mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#102A56]">
              Engineered Capabilities
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#64748B]">
              Every component of {product.name} is designed to eliminate friction and maximize operational speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#2563EB]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-4">
                  <DynamicIcon name={feature.iconName} className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#102A56]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture & Target Environments */}
        <div className="my-10 p-8 rounded-2xl bg-[#102A56] text-white border border-[#1A3D78]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6B2C]">
                <Cpu className="w-4 h-4" />
                System Architecture Note
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Under the hood of {product.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {product.architectureNotes ||
                  "Designed with resilient event-driven architecture, distributed storage, and zero-compromise encryption protocols."}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {product.capabilities.map((cap, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/10 text-slate-200 px-3 py-1 rounded-full border border-white/10"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0A1C3B] p-6 rounded-xl border border-white/10 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
                Ideal Target Deployment
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {product.targetAudience.map((audience, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{audience}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-white/10">
                <Button
                  href="/contact?type=demo"
                  variant="primary"
                  size="sm"
                  className="w-full justify-center"
                >
                  Request Technical Proof of Concept
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-6 flex justify-between items-center text-xs font-semibold">
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-[#2563EB] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Software Products
          </Link>
          <Link href="/services" className="text-[#64748B] hover:text-[#102A56]">
            Explore Custom Development Services &rarr;
          </Link>
        </div>
      </Container>
    </div>
  );
}
