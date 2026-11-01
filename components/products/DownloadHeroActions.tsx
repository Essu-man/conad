"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Monitor, Apple, ArrowRight, ExternalLink, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DownloadHeroActionsProps {
  slug: string;
  productName: string;
  version?: string;
}

export function DownloadHeroActions({ slug, productName, version = "v3.2.0" }: DownloadHeroActionsProps) {
  const [selectedFormat, setSelectedFormat] = useState<"exe" | "msi" | "dmg">("exe");
  const [isCopied, setIsCopied] = useState(false);

  const downloadUrls = {
    exe: `/api/download/${slug}?format=exe`,
    msi: `/api/download/${slug}?format=msi`,
    dmg: `/api/download/${slug}?format=dmg&os=mac`,
  };

  const formatLabels = {
    exe: { label: "Windows (.exe)", sub: "Portable / Standalone (13.7 MB)", icon: Monitor },
    msi: { label: "Windows (.msi)", sub: "Windows Installer Package", icon: Monitor },
    dmg: { label: "macOS (.dmg)", sub: "Apple Silicon & Intel Universal", icon: Apple },
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText("SHA256: 4a2d7b...conad_pos_verified");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Primary Action Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Direct Download Button */}
        <a
          href={downloadUrls[selectedFormat]}
          download
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#102A56] hover:bg-[#1A3D78] shadow-lg shadow-[#102A56]/20 transition-all border border-slate-700"
        >
          <Download className="w-4 h-4 text-[#FF6B2C]" />
          <span>Download {formatLabels[selectedFormat].label}</span>
        </a>

        {/* Live Cloud POS Web Access */}
        <Link
          href="/pos"
          target="_blank"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#102A56] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all"
        >
          <span>Launch Cloud POS Terminal</span>
          <ExternalLink className="w-4 h-4 text-slate-500" />
        </Link>
      </div>

      {/* Format Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-semibold text-slate-500 mr-1">Other packages:</span>
        
        {(["exe", "msi", "dmg"] as const).map((fmt) => {
          const active = selectedFormat === fmt;
          const Icon = formatLabels[fmt].icon;
          return (
            <button
              key={fmt}
              type="button"
              onClick={() => setSelectedFormat(fmt)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                active
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{formatLabels[fmt].label}</span>
            </button>
          );
        })}
      </div>

      {/* Package Specs strip */}
      <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-[#64748B] pt-1">
        <span className="font-medium">
          Target: <strong className="text-slate-800">{formatLabels[selectedFormat].sub}</strong>
        </span>
        <span>•</span>
        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold inline-flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          2% Flat Fee Per Transaction
        </span>
        <span>•</span>
        <button
          type="button"
          onClick={handleCopyHash}
          className="text-slate-500 hover:text-slate-800 underline inline-flex items-center gap-1"
        >
          {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : null}
          <span>{isCopied ? "Checksum copied!" : "Verify checksum"}</span>
        </button>
      </div>
    </div>
  );
}
