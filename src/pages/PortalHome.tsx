import React from "react";
import { Link } from "react-router-dom";
import { Users, ShieldCheck, Zap } from "lucide-react";
import { PORTAL_META, DASHBOARD_KPIS } from "@/lib/biharData";
import Login from "./Login";

interface PortalOption {
  role: string;
  path: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  gradient: string;
  stats: string[];
  user: string;
  title2: string;
}

const portals: PortalOption[] = [
  {
    role: "citizen",
    path: "/citizen",
    title: "Citizen Portal",
    desc: "Raise grievances via 3-step form, track complaint with full timeline, AI chatbot assistance, print complaint",
    icon: Users,
    gradient: "from-blue-600 to-sky-400",
    stats: ["Raise Complaint", "Track Status", "AI Assistant", "Timeline View"],
    user: "Ramesh Prasad",
    title2: "Citizen - Patna",
  },
];

export default function PortalHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-sky-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 text-white">
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
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
          <span className="text-blue-800 font-medium">{PORTAL_META.tagline}</span>
          <div className="flex items-center gap-3 text-xs text-blue-600">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-green-600" /> All systems operational</span>
            <span>-</span>
            <span>Last synced: {PORTAL_META.lastSync}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        <div className="text-center mb-10 max-w-2xl">
          <h1 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            Unified Citizen Grievance Portal
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Welcome to the e-Grievance platform of the Urban Development & Housing Department, Government of Bihar. 
            Click the link below to enter the Citizen Portal to file a new complaint or track your existing complaints.
          </p>
        </div>

        {/* Portal cards (centered single card) */}
        {/* <div className="w-full flex justify-center mb-8">
          {portals.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.role}
                to={p.path}
                className="group bg-white rounded-2xl border border-border hover:border-primary hover:shadow-2xl transition-all overflow-hidden max-w-xl w-full"
              >
                <div className={`h-2 bg-gradient-to-r ${p.gradient}`}></div>
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <div className="text-xs text-muted-foreground mt-1">
                        Active Profile: <span className="font-semibold text-foreground">{p.user}</span> — {p.title2}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {p.stats.map((s, i) => (
                      <span key={i} className="text-[11px] px-3 py-1 bg-muted rounded-full text-muted-foreground font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div> */}
        <Login/>

        <div className="text-center mt-12 text-xs text-muted-foreground">
          {PORTAL_META.name} — {PORTAL_META.version} — Government of Bihar — All Rights Reserved
        </div>
      </div>
    </div>
  );
}