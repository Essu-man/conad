import React from "react";
import {
  CreditCard,
  Boxes,
  QrCode,
  Truck,
} from "lucide-react";

interface ProductMockupPreviewProps {
  type: "pos" | "inventory";
  className?: string;
  isDetailed?: boolean;
}

export function ProductMockupPreview({
  type,
  className = "",
  isDetailed = false,
}: ProductMockupPreviewProps) {
  if (type === "pos") {
    return (
      <div
        className={`w-full bg-[#102A56] rounded-xl overflow-hidden text-white border border-[#1A3D78] shadow-inner select-none font-sans ${className}`}
      >
        <div className="bg-[#0A1C3B] px-3 py-2 flex items-center justify-between border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-slate-200">Conad POS Terminal</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Lane 01 &bull; Ready</span>
        </div>

        <div className="p-3 bg-[#0E2448] space-y-2.5">
          <div className="bg-[#102A56] p-2.5 rounded-lg border border-white/5 space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Touch Checkout</span>
              <span className="text-emerald-400 font-mono font-bold">GH₵148.50</span>
            </div>
            <div className="text-[10px] text-slate-400">3 items &bull; Customer #C-842</div>
            <div className="flex gap-1.5 pt-1">
              <span className="text-[9px] bg-[#FF6B2C]/20 border border-[#FF6B2C]/40 px-2 py-0.5 rounded text-[#FF6B2C] font-semibold">MTN MoMo</span>
              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-slate-300">Telecel Cash</span>
              <span className="text-[9px] bg-[#2563EB]/40 px-2 py-0.5 rounded text-blue-200">Cash (GHS)</span>
            </div>
          </div>

          {isDetailed && (
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <span className="text-slate-400">Drawer Cash</span>
                <p className="font-bold text-white mt-0.5 font-mono">GH₵1,850.00</p>
              </div>
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <span className="text-slate-400">Offline Queue</span>
                <p className="font-bold text-emerald-400 mt-0.5">0 (Synced)</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/10 text-slate-300">
            <span className="flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-[#FF6B2C]" /> Sub-second transaction
            </span>
            <span className="text-emerald-400 font-semibold text-[10px]">GRA Ready</span>
          </div>
        </div>
      </div>
    );
  }

  // inventory
  return (
    <div
      className={`w-full bg-[#102A56] rounded-xl overflow-hidden text-white border border-[#1A3D78] shadow-inner select-none font-sans ${className}`}
    >
      <div className="bg-[#0A1C3B] px-3 py-2 flex items-center justify-between border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <Boxes className="w-3.5 h-3.5 text-[#2563EB]" />
          <span className="font-semibold text-slate-200">Conad Inventory Sync</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Hub A &bull; Active</span>
      </div>

      <div className="p-3 bg-[#0E2448] space-y-2">
        <div className="bg-white/5 p-2 rounded-lg border border-white/10 space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-200">Omni Warehouse Depot</span>
            <span className="text-emerald-400 font-mono text-[11px]">4,820 units</span>
          </div>
          <div className="text-[9px] text-slate-400">12 multi-branch locations synced</div>
        </div>

        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between text-slate-300 bg-white/5 p-1.5 rounded">
            <span className="flex items-center gap-1">
              <QrCode className="w-3 h-3 text-[#FF6B2C]" /> Barcode Scanner API
            </span>
            <span className="text-emerald-400 font-mono">Sub-100ms</span>
          </div>

          <div className="flex justify-between text-slate-300 bg-white/5 p-1.5 rounded">
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-[#2563EB]" /> Reorder Trigger
            </span>
            <span className="text-blue-300">Auto-Drafted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
