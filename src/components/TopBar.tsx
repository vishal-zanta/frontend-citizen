import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Bell, Menu, LogOut, Settings, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "@/context/LanguageContext";

const CITIZEN_NOTIFICATIONS = [
  { id: 1, text: "Your complaint BH-2026-047821 has been resolved ✅", time: "2h ago", type: "success" },
  { id: 2, text: "Your complaint BH-2026-047823 was escalated to L2 ⚠️", time: "5h ago", type: "warning" },
  { id: 3, text: "New service available: Animal Rescue 🐕", time: "1d ago", type: "info" },
  { id: 4, text: "Officer assigned to your complaint BH-2026-047825", time: "2d ago", type: "info" },
];

interface TopBarProps {
  role?: string;
  profile?: any;
  onProfileChange?: (p: any) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function TopBar({ onToggleSidebar, sidebarOpen }: TopBarProps) {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { t } = useLanguage();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const fullName = profile?.fullName || "Citizen";
  const avatar = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "C";

  const info = {
    label: t("Citizen Portal", "नागरिक पोर्टल"),
    user: fullName,
    title: profile?.mobile || "Citizen",
    avatar: avatar,
    settingsPath: "/citizen/settings",
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
     localStorage.removeItem("usertoken");
      sessionStorage.removeItem("usertoken");
      navigate("/");
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
              <div className="px-4 py-2 border-b border-border font-bold text-xs text-foreground">{t("Notifications", "सूचनाएं")}</div>
              <div className="divide-y divide-border max-h-64 overflow-y-auto">
                {CITIZEN_NOTIFICATIONS.map(n => (
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
                {t("Settings", "सेटिंग्स")}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-destructive hover:bg-red-50 hover:text-destructive transition-colors text-left"
              >
                <LogOut className="w-4 h-4 text-destructive/80" />
                {t("Logout", "लॉगआउट")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}