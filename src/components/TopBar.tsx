import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Bell, Menu, LogOut, Settings, CheckCircle2, AlertCircle, Info, X, Shield, Repeat } from "lucide-react";
import { PORTAL_META } from "@/lib/biharData";

interface RoleInfo {
  label: string;
  user: string;
  title: string;
  avatar: string;
  settingsPath: string;
}

const roleInfo: Record<string, RoleInfo> = {
  superadmin: { label: "Super Admin Console", user: "Ramanuj Prasad", title: "SUDA Administrator", avatar: "RP", settingsPath: "/admin/users" },
  officer: { label: "Officer Portal", user: "Rajesh Kumar Singh", title: "L1 Field Officer — Patna", avatar: "RS", settingsPath: "/officer/settings" },
  crm: { label: "CRM / Call Centre", user: "Priya Sharma", title: "CCE Agent — Morning Shift", avatar: "PS", settingsPath: "/crm/settings" },
  citizen: { label: "Citizen Portal", user: "Ramesh Prasad", title: "Citizen — Patna", avatar: "RP", settingsPath: "/citizen/settings" },
};

const officerProfiles = [
  { id: "l1", label: "L1 Field Officer", user: "Rajesh Kumar Singh", title: "L1 Field Officer — Patna", avatar: "RS" },
  { id: "l2", label: "L2 Supervisory Officer", user: "Prakash Jha", title: "L2 Supervisory Officer — Patna", avatar: "PJ" },
  { id: "zone", label: "Zone Administrator", user: "Vikash Prasad", title: "Zone Administrator — Patna", avatar: "VP" },
  { id: "division", label: "Divisional Administrator", user: "Vikash Prasad", title: "Divisional Administrator — Patna", avatar: "VP" },
  { id: "suda", label: "SUDA Administrator", user: "Ramanuj Prasad", title: "SUDA Administrator — Patna", avatar: "RP" },
];

const crmProfiles = [
  { id: "agent", label: "CCE Agent", user: "Priya Sharma", title: "CCE Agent — Morning Shift", avatar: "PS" },
  { id: "supervisor", label: "CC Supervisor", user: "Sneha Gupta", title: "CC Supervisor — Full Day", avatar: "SG" },
];

const CITIZEN_NOTIFICATIONS = [
  { id: 1, text: "Your complaint BH-2026-047821 has been resolved ✅", time: "2h ago", type: "success" },
  { id: 2, text: "Your complaint BH-2026-047823 was escalated to L2 ⚠️", time: "5h ago", type: "warning" },
  { id: 3, text: "New service available: Animal Rescue 🐕", time: "1d ago", type: "info" },
  { id: 4, text: "Officer assigned to your complaint BH-2026-047825", time: "2d ago", type: "info" },
];

const STAFF_NOTIFICATIONS = [
  { id: 1, text: "3 new complaints assigned to your ward", time: "10m ago", type: "info" },
  { id: 2, text: "SLA breach warning: 2 complaints approaching deadline", time: "30m ago", type: "warning" },
  { id: 3, text: "Shift change reminder: Handover at 2:00 PM", time: "1h ago", type: "info" },
];

interface TopBarProps {
  role?: string;
  profile?: any;
  onProfileChange?: (p: any) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function TopBar({ role = "superadmin", profile, onProfileChange, onToggleSidebar, sidebarOpen }: TopBarProps) {
  const baseInfo = roleInfo[role] || roleInfo.superadmin;
  const navigate = useNavigate();
  const isCitizen = role === "citizen";
  const isOfficer = role === "officer";
  const isCRM = role === "crm";
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const switcherRef = useRef<HTMLDivElement>(null);

  const notifications = isCitizen ? CITIZEN_NOTIFICATIONS : STAFF_NOTIFICATIONS;

  // Determine current sub-profile from props (passed by PortalLayout)
  let profiles: any[] | null = null;
  let currentProfileId = profile || "default";
  if (isOfficer) {
    profiles = officerProfiles;
    if (!currentProfileId || currentProfileId === "default") currentProfileId = "l1";
  } else if (isCRM) {
    profiles = crmProfiles;
    if (!currentProfileId || currentProfileId === "default") currentProfileId = "agent";
  }
  const currentProfile = profiles ? profiles.find(p => p.id === currentProfileId) || profiles[0] : null;
  const info = currentProfile ? { ...baseInfo, ...currentProfile } : baseInfo;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) setShowSwitcher(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("usertoken");
    sessionStorage.removeItem("usertoken");
    navigate("/");
  };

  const handleSwitchProfile = (profileId: string) => {
    setShowSwitcher(false);
    setShowProfile(false);
    if (onProfileChange) onProfileChange(profileId);
    navigate(`/${role}`);
  };

  const notifIcon = (type: string) => {
    if (type === "success") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    if (type === "warning") return <AlertCircle className="w-4 h-4 text-amber-500" />;
    return <Info className="w-4 h-4 text-blue-500" />;
  };

  return (
    <header className="h-14 bg-white border-b border-border flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1 hover:bg-muted rounded-lg text-foreground focus:outline-none lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-semibold text-foreground text-sm lg:text-base hidden sm:inline">
          {info.label}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Profile switcher (Staff only) */}
        {profiles && profiles.length > 0 && (
          <div ref={switcherRef} className="relative">
            <button
              onClick={() => setShowSwitcher(!showSwitcher)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-muted text-xs font-semibold text-primary rounded-lg border border-border transition-colors cursor-pointer"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Switch View</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {showSwitcher && (
              <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-lg border border-border shadow-lg py-1 z-50">
                {profiles.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSwitchProfile(p.id)}
                    className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-muted transition-colors flex items-center justify-between ${currentProfileId === p.id ? "text-primary font-bold bg-blue-50/50" : "text-foreground"}`}
                  >
                    <span>{p.label}</span>
                    {currentProfileId === p.id && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-colors relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {showNotifs && (
            <div className="absolute right-0 mt-1.5 w-80 bg-white rounded-xl border border-border shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-border font-bold text-xs text-foreground">Notifications</div>
              <div className="divide-y divide-border max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="p-3 flex items-start gap-2.5 hover:bg-muted/50 transition-colors">
                    <div className="mt-0.5 shrink-0">{notifIcon(n.type)}</div>
                    <div>
                      <div className="text-xs text-foreground font-medium leading-normal">{n.text}</div>
                      <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1.5 hover:bg-muted rounded-lg transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {info.avatar}
            </div>
            <div className="text-left hidden md:block leading-none">
              <div className="text-xs font-bold text-foreground">{info.user}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{info.title}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:block" />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl border border-border shadow-lg py-1 z-50">
              <div className="px-3 py-2 border-b border-border">
                <div className="text-xs font-bold text-foreground">{info.user}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{info.title}</div>
              </div>
              <Link
                to={info.settingsPath}
                onClick={() => setShowProfile(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition-colors"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-destructive hover:bg-red-50 hover:text-destructive transition-colors text-left"
              >
                <LogOut className="w-4 h-4 text-destructive/80" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}