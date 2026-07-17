import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Search,
  Users,
  ShieldCheck,
  Building2,
  Phone,
  Workflow,
  SlidersHorizontal,
  UserCog,
  ScrollText,
  Network,
  Activity,
  TrendingUp,
  BarChart3,
  ChevronDown,
  X,
  History,
  MessageSquare,
  ClipboardList,
  HardHat,
  Headphones,
} from "lucide-react";
import { PORTAL_META } from "@/lib/biharData";

// Simple stub for FileBarChart since it was omitted from Lucide imports in build to avoid error
const FileBarChart = LayoutDashboard;

interface SidebarItem {
  label: string;
  path: string;
  icon?: React.ComponentType<any>;
  children?: { label: string; path: string }[];
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface RoleConfig {
  label: string;
  color: string;
  sections: SidebarSection[];
}

const roleConfig: Record<string, RoleConfig> = {
  citizen: {
    label: "Citizen",
    color: "text-sky-400",
    sections: [
      {
        title: "Overview",
        items: [
          { label: "Dashboard", path: "/citizen", icon: LayoutDashboard },
        ],
      },
      {
        title: "Grievances",
        items: [
          { label: "Raise Complaint", path: "/citizen/raise", icon: FileText },
          { label: "Track Complaint", path: "/citizen/track", icon: Search },
        ],
      },
      {
        title: "Support",
        items: [
          { label: "Feedback", path: "/citizen/feedback", icon: MessageSquare },
        ],
      },
    ],
  },
};

interface SidebarProps {
  role?: string;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({
  role = "citizen",
  open,
  onClose,
}: SidebarProps) {
  const location = useLocation();
  const config = roleConfig[role] || roleConfig.citizen;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (path: string) => {
    const update = path.split("?")?.[0];
    return update === location.pathname;
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border z-50 transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-14 border-b border-sidebar-border flex items-center justify-between px-4 shrink-0">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-sidebar-border/30">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
              </div>
              <span className="font-bold text-sm leading-tight text-white">
                {PORTAL_META.name}
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-1 hover:bg-sidebar-accent rounded-lg lg:hidden text-sidebar-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info banner */}
          {/* <div className="px-4 py-3 border-b border-sidebar-border/50 bg-sidebar-accent/10 shrink-0">
            <div className="text-xs text-sidebar-foreground/60">
              Active Role
            </div>
            <div className="font-bold text-white text-sm mt-0.5">
              {config.label}
            </div>
          </div> */}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-3 space-y-4">
            {config.sections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <div className="px-3 text-[10px] font-bold text-sidebar-foreground/40 uppercase tracking-wider">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item, itemIdx) => {
                    const Icon = item.icon || LayoutDashboard;
                    const hasChildren =
                      item.children && item.children.length > 0;
                    const isItemActive = isActive(item.path);

                    return (
                      <div key={itemIdx} className="space-y-0.5">
                        {hasChildren ? (
                          <button
                            onClick={() => toggleDropdown(item.label)}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg hover:bg-sidebar-accent hover:text-white transition-all cursor-pointer ${isItemActive ? "bg-sidebar-accent text-white" : "text-sidebar-foreground/80"}`}
                          >
                            <span className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4 shrink-0" />
                              {item.label}
                            </span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                            />
                          </button>
                        ) : (
                          <Link
                            to={item.path}
                            onClick={onClose}
                            className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg hover:bg-sidebar-accent hover:text-white transition-all ${isItemActive ? "bg-sidebar-accent text-white border-l-2 border-sky-400" : "text-sidebar-foreground/80"}`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            {item.label}
                          </Link>
                        )}

                        {hasChildren && openDropdown === item.label && (
                          <div className="pl-6 space-y-0.5">
                            {item.children?.map((child, childIdx) => (
                              <Link
                                key={childIdx}
                                to={child.path}
                                onClick={onClose}
                                className={`flex items-center py-1.5 px-3 text-[11px] font-medium rounded-lg hover:text-white transition-all ${isActive(child.path) ? "text-sky-400 font-semibold" : "text-sidebar-foreground/60"}`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
