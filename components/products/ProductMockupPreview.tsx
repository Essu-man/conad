import React from "react";
import {
  CreditCard,
  CheckCircle2,
  TrendingUp,
  Workflow,
  ArrowRight,
  Boxes,
  FileSpreadsheet,
  QrCode,
  Truck,
  Activity,
  Layers,
} from "lucide-react";

interface ProductMockupPreviewProps {
  type: "pos" | "flow" | "ledger" | "inventory";
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
              <span className="text-emerald-400 font-mono font-bold">$148.50</span>
            </div>
            <div className="text-[10px] text-slate-400">3 items &bull; Customer #C-842</div>
            <div className="flex gap-1.5 pt-1">
              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-slate-300">NFC Tap</span>
              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-slate-300">EMV Chip</span>
              <span className="text-[9px] bg-[#2563EB]/40 px-2 py-0.5 rounded text-blue-200">Split Pay</span>
            </div>
          </div>

          {isDetailed && (
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-white/5 p-2 rounded border border-white/5">
                <span className="text-slate-400">Drawer Cash</span>
                <p className="font-bold text-white mt-0.5 font-mono">$1,850.00</p>
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
            <span className="text-emerald-400 font-semibold text-[10px]">99.99% Fast</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "flow") {
    return (
      <div
        className={`w-full bg-[#102A56] rounded-xl overflow-hidden text-white border border-[#1A3D78] shadow-inner select-none font-sans ${className}`}
      >
        <div className="bg-[#0A1C3B] px-3 py-2 flex items-center justify-between border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <Workflow className="w-3.5 h-3.5 text-[#FF6B2C]" />
            <span className="font-semibold text-slate-200">Conad Flow Pipeline</span>
          </div>
          <span className="text-[10px] text-amber-300 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800">
            Active Logic
          </span>
        </div>

        <div className="p-3 bg-[#0E2448] space-y-2">
          {/* Node 1 */}
          <div className="flex items-center gap-2 text-xs bg-white/5 p-2 rounded-lg border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-200 text-[11px]">Event: Order Received</div>
              <div className="text-[9px] text-slate-400">Webhook from POS / Web</div>
            </div>
          </div>

          <div className="flex justify-center -my-1">
            <ArrowRight className="w-3.5 h-3.5 text-[#2563EB] rotate-90" />
          </div>

          {/* Node 2 */}
          <div className="flex items-center gap-2 text-xs bg-[#2563EB]/20 p-2 rounded-lg border border-[#2563EB]/40">
            <Activity className="w-3.5 h-3.5 text-[#93C5FD] shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white text-[11px]">Auto Dispatch & Reserve Stock</div>
              <div className="text-[9px] text-blue-200">Condition: Stock &gt; 5</div>
            </div>
          </div>

          {isDetailed && (
            <>
              <div className="flex justify-center -my-1">
                <ArrowRight className="w-3.5 h-3.5 text-[#FF6B2C] rotate-90" />
              </div>
              <div className="flex items-center gap-2 text-xs bg-white/5 p-2 rounded-lg border border-white/10">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#FF6B2C] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-200 text-[11px]">Generate Invoice & Notify</div>
                  <div className="text-[9px] text-slate-400">Automated ledger record</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (type === "ledger") {
    return (
      <div
        className={`w-full bg-[#102A56] rounded-xl overflow-hidden text-white border border-[#1A3D78] shadow-inner select-none font-sans ${className}`}
      >
        <div className="bg-[#0A1C3B] px-3 py-2 flex items-center justify-between border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-slate-200">Conad Ledger Analytics</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Q3 Real-Time</span>
        </div>

        <div className="p-3 bg-[#0E2448] space-y-2.5">
          <div className="flex justify-between items-end pb-1 border-b border-white/10">
            <div>
              <div className="text-[10px] text-slate-400">Total Net Revenue</div>
              <div className="text-base font-extrabold text-white font-mono">$184,290.00</div>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
              +28.4%
            </span>
          </div>

          {/* Simple CSS Bar Graph */}
          <div className="space-y-1">
            <div className="text-[9px] text-slate-400 flex justify-between">
              <span>Weekly Gross Velocity</span>
              <span>100% Reconciled</span>
            </div>
            <div className="flex items-end gap-1.5 h-12 pt-1">
              <div className="flex-1 bg-[#2563EB]/40 rounded-t h-[40%]"></div>
              <div className="flex-1 bg-[#2563EB]/60 rounded-t h-[65%]"></div>
              <div className="flex-1 bg-[#2563EB]/80 rounded-t h-[55%]"></div>
              <div className="flex-1 bg-[#2563EB] rounded-t h-[85%]"></div>
              <div className="flex-1 bg-[#FF6B2C] rounded-t h-[100%]"></div>
            </div>
          </div>

          <div className="text-[10px] text-slate-300 flex items-center justify-between pt-1">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#93C5FD]" /> Automatic Tax Partition
            </span>
            <span className="text-slate-400">Audit Ready</span>
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
