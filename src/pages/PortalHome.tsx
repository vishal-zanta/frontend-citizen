import React from "react";
import { ShieldCheck, Zap } from "lucide-react";
import { PORTAL_META, DASHBOARD_KPIS } from "@/lib/biharData";
import Login from "./Login";

export default function PortalHome() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-sky-50 overflow-x-hidden">
      {/* Header */}
      <div className="relative z-20 bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center ring-2 ring-white/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xl font-bold">{PORTAL_META.name}</div>
              <div className="text-sm text-white/70">{PORTAL_META.dept}</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold">{DASHBOARD_KPIS.totalComplaints.toLocaleString("en-IN")}</div>
              <div className="text-[11px] text-white/60">Total Complaints</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">{DASHBOARD_KPIS.resolved.toLocaleString("en-IN")}</div>
              <div className="text-[11px] text-white/60">Resolved</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">{DASHBOARD_KPIS.citizenSatisfaction}/5</div>
              <div className="text-[11px] text-white/60">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tagline banner */}
      <div className="relative z-20 bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
          <span className="text-blue-800 font-medium">{PORTAL_META.tagline}</span>
          <div className="flex items-center gap-3 text-xs text-blue-600">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-green-600" /> All systems operational</span>
            <span>-</span>
            <span>Last synced: {PORTAL_META.lastSync}</span>
          </div>
        </div>
      </div>

      {/* Main content — login stays centered (same as before) */}
      <div className="relative max-w-7xl mx-auto p-4 sm:px-6 sm:py-12 flex flex-col items-center">
        <div className="relative z-10 w-full flex flex-col items-center">
          <Login />
          <div className="text-center mt-12 text-xs text-muted-foreground">
            {PORTAL_META.name} — {PORTAL_META.version} — Government of Bihar — All Rights Reserved
          </div>
        </div>
      </div>

      {/* CM photo — right side only, sharp, no login move */}
      <img
        src="/images/cm-samrat.png"
        alt="Shri Samrat Choudhary, Hon'ble Chief Minister of Bihar"
        className="hidden lg:block pointer-events-none fixed right-0 bottom-0 z-[1] h-[min(85vh,720px)] w-auto max-w-[40vw] object-contain object-bottom"
      />
      <div className="hidden lg:block pointer-events-none fixed right-4 bottom-3 z-[2] text-right">
        <p className="text-sm font-semibold text-foreground bg-white/90 rounded-lg px-3 py-1.5 shadow-sm inline-block">
          Shri Samrat Choudhary
          <span className="block text-xs font-normal text-muted-foreground">
            Hon&apos;ble Chief Minister of Bihar
          </span>
        </p>
      </div>
    </div>
  );
}
