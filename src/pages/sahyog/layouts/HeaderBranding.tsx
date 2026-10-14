import React, { useState } from "react";
import {
  UserCheck,
  User,
  Headphones,
  Menu,
  ChevronDown,
  Home,
  FileText,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSahyogTranslation } from "../translations";
import { OFFICER_URL } from "@/utils/constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function HeaderBranding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [citizenDropdownOpen, setCitizenDropdownOpen] = useState(false);
  const { t } = useSahyogTranslation();

  const cceLoginUrl = `${OFFICER_URL.endsWith("/") ? OFFICER_URL : OFFICER_URL + "/"}?role=cce`;

  return (
    <header className="bg-white border-b border-slate-200 shadow-2xs relative z-40">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Left Branding Group */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 sm:gap-3.5 text-left group min-w-0"
          >
            {/* Bihar Govt Official Logo */}
            <div className="relative w-11 h-14 sm:w-14 sm:h-16 shrink-0 flex items-center justify-center">
              <img
                src="/bihar-logo.png"
                alt="Government of Bihar"
                width={56}
                height={68}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Title & Tagline */}
            <div className="border-l-2 border-slate-200 pl-2.5 sm:pl-4 min-w-0">
              <h1 className="text-base sm:text-xl lg:text-2xl font-black text-[#1C4D8D] tracking-tight leading-tight group-hover:text-blue-900 transition-colors truncate sm:whitespace-normal">
                {t.header.title}
              </h1>
              <p className="text-xs font-extrabold text-[#C35504] tracking-wide mt-0.5">
                {t.header.govt}
              </p>
            </div>
          </Link>

          {/* Desktop Right Side: Login Buttons (Citizen Login, Officer Login & CCE Login) - Visible only on lg+ */}
          <div className="hidden lg:flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap justify-end">
            {/* Citizen Login Button */}
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>{t.header.citizenLogin}</span>
            </Link>

            {/* Officer Login Button */}
            <a
              href={OFFICER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1C4D8D] to-[#163c6f] hover:from-[#163c6f] hover:to-[#0F2A52] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t.header.officerLogin}</span>
            </a>

            {/* CCE Login Button */}
            <a
              href={cceLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Headphones className="w-4 h-4" />
              <span>{t.header.cceLogin}</span>
            </a>
          </div>

          {/* Mobile Right Side: shadcn Sheet Side Drawer (< lg) */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1C4D8D] border border-blue-200/80 transition-colors cursor-pointer shrink-0"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="w-6 h-6 stroke-[2.2]" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[85vw] max-w-sm sm:max-w-md bg-[#163c6f] text-white border-l border-blue-800 p-0 flex flex-col justify-between overflow-y-auto"
              >
                <div className="p-5 space-y-4">
                  {/* Sheet Header Branding */}
                  <SheetHeader className="text-left border-b border-blue-800/80 pb-4 pr-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-12 shrink-0 bg-white rounded-lg p-1 flex items-center justify-center">
                        <img
                          src="/bihar-logo.png"
                          alt="Government of Bihar"
                          width={40}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <SheetTitle className="text-sm font-black text-white tracking-tight leading-tight">
                          {t.header.title}
                        </SheetTitle>
                        <p className="text-xs font-bold text-amber-400 tracking-wide mt-0.5">
                          {t.header.govt}
                        </p>
                      </div>
                    </div>
                  </SheetHeader>

                  {/* Section 1: Navigation Links (from MainNavbar) */}
                  <div className="space-y-1.5 pt-1">
                    {/* Home Page Link */}
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-800/60 font-semibold text-xs text-white transition-colors"
                    >
                      <Home className="w-4 h-4 text-amber-400" />
                      <span>{t.navbar.home}</span>
                    </Link>

                    {/* Citizen Services Accordion */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setCitizenDropdownOpen(!citizenDropdownOpen)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-800/60 font-semibold text-xs text-white transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-3">
                          <UserCheck className="w-4 h-4 text-emerald-400" />
                          <span>{t.navbar.citizenServices}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            citizenDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {citizenDropdownOpen && (
                        <div className="pl-6 pr-2 py-1.5 space-y-1 bg-[#102d54]/80 rounded-xl mt-1">
                          <Link
                            to="/login"
                            state={{ to: "/citizen/raise" }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg hover:bg-blue-800/50 text-xs text-slate-200 hover:text-white transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-400" />
                            <span>{t.navbar.newComplaint}</span>
                          </Link>
                          <Link
                            to="/complaint"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg hover:bg-blue-800/50 text-xs text-slate-200 hover:text-white transition-colors"
                          >
                            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{t.navbar.registeredUser}</span>
                          </Link>
                          <Link
                            to="/sahyog/faq"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg hover:bg-blue-800/50 text-xs text-slate-200 hover:text-white transition-colors"
                          >
                            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                            <span>{t.navbar.faq}</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-blue-800/80 pt-3" />

                  {/* Section 2: Action Buttons (Citizen Login, Officer Login, CCE Login) */}
                  <div className="space-y-2.5 pt-1">
                    {/* Citizen Login Button */}
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs shadow-md transition-all active:scale-98"
                    >
                      <User className="w-4 h-4" />
                      <span>{t.header.citizenLogin}</span>
                    </Link>

                    {/* Department / Officer Login Button */}
                    <a
                      href={OFFICER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-[#1C4D8D] to-[#163c6f] hover:from-[#163c6f] hover:to-[#0F2A52] border border-blue-400/30 text-white font-bold text-xs shadow-md transition-all active:scale-98"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>{t.header.officerLogin}</span>
                    </a>

                    {/* Office / CCE Login Button */}
                    <a
                      href={cceLoginUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-md transition-all active:scale-98"
                    >
                      <Headphones className="w-4 h-4" />
                      <span>{t.header.cceLogin}</span>
                    </a>
                  </div>
                </div>

                {/* Footer Info inside Drawer */}
                <div className="p-4 bg-[#102d54] border-t border-blue-800 text-slate-300 text-xs text-center">
                  <p className="font-semibold text-white">📞 Helpline: 1100 (Toll-Free)</p>
                  <p className="text-xs text-slate-400 mt-0.5">24×7 / 365 Days Available</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
