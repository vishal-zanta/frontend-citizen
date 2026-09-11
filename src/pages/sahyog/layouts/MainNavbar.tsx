import React, { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  FileText,
  UserCheck,
  HelpCircle,
  Shield,
  FileCheck,
  Contact,
  GraduationCap,
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
          {/* Left Items */}
          <div className="flex items-center gap-1 sm:gap-6 text-xs font-semibold">
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/sahyog"
                className="px-4 py-3 rounded-lg hover:bg-blue-800/80 transition-colors font-medium"
              >
                {t.navbar.home}
              </Link>

              {/* Citizen Services Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => toggleDropdown("citizen")}
                  className="flex items-center gap-1 px-4 py-3 rounded-lg hover:bg-blue-800/80 transition-colors font-medium cursor-pointer"
                >
                  <span>{t.navbar.citizenServices}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/login"
                    state={{ to: "/citizen/raise" }}
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 text-xs font-medium transition-colors"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>{t.navbar.newComplaint}</span>
                  </Link>
                  <Link
                    to="/login"
                    state={{ to: "/citizen" }}
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 text-xs font-medium transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>{t.navbar.registeredUser}</span>
                  </Link>
                </div>
              </div>

              {/* Important Links Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => toggleDropdown("important")}
                  className="flex items-center gap-1 px-4 py-3 rounded-lg hover:bg-blue-800/80 transition-colors font-medium cursor-pointer"
                >
                  <span>{t.navbar.importantLinks}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block w-60 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/sahyog/faq"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-700 text-xs font-medium"
                  >
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <span>{t.navbar.faq}</span>
                  </Link>
                  <a
                    href="https://jaankari.bihar.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2 hover:bg-blue-50 hover:text-blue-700 text-xs font-medium"
                  >
                    <span>{t.navbar.rti}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href="#privacy"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-700 text-xs font-medium"
                  >
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span>{t.navbar.privacy}</span>
                  </a>
                  <a
                    href="#accessibility"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-700 text-xs font-medium"
                  >
                    <FileCheck className="w-4 h-4 text-amber-600" />
                    <span>{t.navbar.accessibility}</span>
                  </a>
                  <a
                    href="#contact"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-700 text-xs font-medium"
                  >
                    <Contact className="w-4 h-4 text-emerald-600" />
                    <span>{t.navbar.contact}</span>
                  </a>
                </div>
              </div>

              <a
                href="https://portal.lumirex.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-lg hover:bg-blue-800/80 transition-colors font-medium"
              >
                {t.navbar.sssPortal}
              </a>

              <a
                href="https://sahyog.bihar.gov.in/SLSPMS/default.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-lg hover:bg-blue-800/80 transition-colors font-medium flex items-center gap-1"
              >
                <span>{t.navbar.stateLevelProgram}</span>
                <ExternalLink className="w-3 h-3 text-blue-200" />
              </a>

              <a
                href="https://vidyarthisahyog.bihar.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-lg bg-orange-600/90 hover:bg-orange-600 transition-colors font-bold flex items-center gap-1.5 shadow-xs"
              >
                <GraduationCap className="w-4 h-4 text-orange-200" />
                <span>{t.navbar.vidyarthiProgram}</span>
              </a>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-800 text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            <ChevronDown className="w-4 h-4" />
          </button>
          {activeDropdown === "mob-citizen" && (
            <div className="pl-4 space-y-2 py-2 text-slate-200">
              <Link
                to="/login"
                state={{ to: "/citizen/raise" }}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1"
              >
                {t.navbar.newComplaint}
              </Link>
              <Link
                to="/login"
                state={{ to: "/citizen" }}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1"
              >
                {t.navbar.registeredUser}
              </Link>
            </div>
          )}

          <Link
            to="/sahyog/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white font-medium border-b border-blue-800"
          >
            {t.navbar.faq}
          </Link>

          <a
            href="https://vidyarthisahyog.bihar.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-orange-300 font-bold"
          >
            {t.navbar.vidyarthiProgram} 🎓
          </a>
        </div>
      )}
    </nav>
  );
}
