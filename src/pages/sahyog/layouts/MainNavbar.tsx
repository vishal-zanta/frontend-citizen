import React, { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  FileText,
  UserCheck,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSahyogTranslation } from "../translations";

export default function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useSahyogTranslation();

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav className="bg-[#1C4D8D] text-white shadow-md relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left Navigation: Exactly Home Page, Citizen Services (New Complaint, Registered User, FAQ) */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold">
            {/* 1. Home Page */}
            <Link
              to="/sahyog"
              className="px-4 py-2.5 rounded-lg hover:bg-blue-800/80 transition-colors font-medium text-white"
            >
              {t.navbar.home}
            </Link>

            {/* 2. Citizen Services (Dropdown containing New Complaint, Registered User, and FAQ) */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown("citizen")}
                className="flex items-center gap-1 px-4 py-2.5 rounded-lg hover:bg-blue-800/80 transition-colors font-medium cursor-pointer"
              >
                <span>{t.navbar.citizenServices}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block w-60 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  to="/login"
                  state={{ to: "/citizen/raise" }}
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 text-xs font-medium transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>{t.navbar.newComplaint}</span>
                </Link>
                <Link
                  to="/complaint"
                  // state={{ to: "/citizen" }}
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 text-xs font-medium transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t.navbar.registeredUser}</span>
                </Link>
                <Link
                  to="/sahyog/faq"
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 text-xs font-medium transition-colors border-t border-slate-100"
                >
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>{t.navbar.faq}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-800 text-white cursor-pointer ml-auto"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#163c6f] border-t border-blue-800 px-6 py-4 space-y-2 text-xs">
          <Link
            to="/sahyog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white font-medium border-b border-blue-800"
          >
            {t.navbar.home}
          </Link>
          <button
            onClick={() => toggleDropdown("mob-citizen")}
            className="w-full flex items-center justify-between py-2 text-white font-medium border-b border-blue-800 cursor-pointer"
          >
            <span>{t.navbar.citizenServices}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                activeDropdown === "mob-citizen" ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeDropdown === "mob-citizen" && (
            <div className="pl-4 space-y-2 py-2 text-slate-200">
              <Link
                to="/login"
                state={{ to: "/citizen/raise" }}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-white"
              >
                {t.navbar.newComplaint}
              </Link>
              <Link
                to="/complaint"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-white"
              >
                {t.navbar.registeredUser}
              </Link>
              <Link
                to="/sahyog/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-white"
              >
                {t.navbar.faq}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
