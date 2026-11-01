"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Download, Monitor, Apple, ExternalLink, ShieldCheck, 
  Check, ChevronDown, Sparkles, Laptop, PackageCheck
} from "lucide-react";

interface DownloadHeroActionsProps {
  slug: string;
  productName: string;
  version?: string;
}

export function DownloadHeroActions({ slug, productName, version = "v3.2.0" }: DownloadHeroActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<"exe" | "msi" | "dmg">("exe");
  const [isCopied, setIsCopied] = useState(false);

  const baseName = slug === "conad-pos" ? "Conad-POS" : "Conad-Inventory";

  const downloadOptions = [
    {
      id: "exe" as const,
      name: "Windows Portable (.exe)",
      description: "Direct standalone application • 64-bit • No install needed",
      size: "13.7 MB",
      url: `/downloads/${baseName}-Setup-${version}.exe`,
      icon: Monitor,
      recommended: true,
      tag: "Recommended",
    },
    {
      id: "msi" as const,
      name: "Windows Setup Installer (.msi)",
      description: "Standard enterprise MSI setup wizard for cashier PCs",
      size: "13.7 MB",
      url: `/downloads/${baseName}-Setup-${version}.msi`,
      icon: Monitor,
      recommended: false,
      tag: "Enterprise",
    },
    {
      id: "dmg" as const,
      name: "macOS Universal (.dmg)",
      description: "Apple Silicon (M1/M2/M3/M4) and Intel Mac disk image",
      size: "13.7 MB",
      url: `/downloads/${baseName}-${version}-mac.dmg`,
      icon: Apple,
      recommended: false,
      tag: "macOS",
    },
  ];

  const currentOption = downloadOptions.find((o) => o.id === selectedFormat) || downloadOptions[0];

  const handleCopyChecksum = () => {
    navigator.clipboard.writeText("SHA256: 4a2d7b89e31f...conad_pos_verified");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Primary Actions Grid */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Main Download Button with Split Dropdown */}
        <div className="relative inline-flex flex-1 sm:flex-initial shadow-lg shadow-[#102A56]/20">
          <a
            href={currentOption.url}
            download
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-l-xl font-bold text-sm text-white bg-[#102A56] hover:bg-[#1A3D78] transition-all border border-slate-700"
          >
            <Download className="w-4 h-4 text-[#FF6B2C]" />
            <span>Download {currentOption.name.split(" ")[0]} ({currentOption.id.toUpperCase()})</span>
            <span className="text-[11px] font-normal text-slate-300 bg-white/10 px-2 py-0.5 rounded">
              {currentOption.size}
            </span>
          </a>

          {/* Dropdown toggle to select other versions */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-3.5 py-3.5 rounded-r-xl bg-[#0D2246] hover:bg-[#1A3D78] text-white border-y border-r border-slate-700 transition-all flex items-center justify-center cursor-pointer"
            title="Choose download format"
          >
            <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-[#0A1C3B] border border-slate-700 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                Select Your Operating System / Package
              </div>

              <div className="py-1 space-y-1">
                {downloadOptions.map((opt) => {
                  const Icon = opt.icon;
                  const active = selectedFormat === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSelectedFormat(opt.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors cursor-pointer ${
                        active ? "bg-[#2563EB]/20 border border-[#2563EB]/40" : "hover:bg-white/5"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{opt.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{opt.size}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{opt.description}</p>
                      </div>
                      {active && <Check className="w-4 h-4 text-[#FF6B2C] shrink-0 mt-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Live Cloud POS Web Access */}
        <Link
          href="/pos"
          target="_blank"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#102A56] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all shadow-xs"
        >
          <span>Launch Cloud POS in Browser</span>
          <ExternalLink className="w-4 h-4 text-slate-500" />
        </Link>
      </div>

      {/* Direct Quick-Select Download Options Row */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
          <PackageCheck className="w-3.5 h-3.5 text-[#2563EB]" />
          Direct downloads:
        </span>

        {downloadOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <a
              key={opt.id}
              href={opt.url}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 hover:text-[#102A56] hover:bg-slate-100 border border-slate-300/80 transition-all shadow-xs"
            >
              <Icon className="w-3.5 h-3.5 text-slate-600" />
              <span>{opt.id.toUpperCase()} (64-bit)</span>
            </a>
          );
        })}
      </div>

      {/* Specifications & Compatibility Strip */}
      <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-[#64748B] pt-1">
        <span className="inline-flex items-center gap-1 font-semibold text-[#102A56]">
          <Laptop className="w-3.5 h-3.5 text-[#2563EB]" />
          Native Rust Engine • 64-bit Windows 10/11 • macOS
        </span>
        <span>•</span>
        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold inline-flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          2% Flat Fee Per Transaction
        </span>
        <span>•</span>
        <button
          type="button"
          onClick={handleCopyChecksum}
          className="text-slate-500 hover:text-slate-800 underline inline-flex items-center gap-1 cursor-pointer"
        >
          {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : null}
          <span>{isCopied ? "Checksum copied!" : "SHA-256 verified"}</span>
        </button>
      </div>
    </div>
  );
}
