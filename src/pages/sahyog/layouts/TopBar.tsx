import React from "react";
import { Mail } from "lucide-react";
import { useSahyogTranslation } from "../translations";
import LangSelector from "@/components/LangSelector";

export default function TopBar() {
  const { t } = useSahyogTranslation();

  return (
    <div className="bg-[#f8fafc] text-slate-700 text-xs py-2 px-4 sm:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Helpline Details */}
        <div className="flex flex-wrap items-center gap-3 font-medium">
          <a
            href="tel:1100"
            className="flex items-center gap-1.5 text-[#1C4D8D] font-bold hover:text-blue-800 transition-colors"
          >
            <span>{t.topBar.helpline}</span>
          </a>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-slate-600 font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200">
            {t.topBar.available247}
          </span>
        </div>

        {/* Right Side: Email placeholder & Language Select */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-1 text-slate-600 hidden sm:flex">
            <Mail className="w-3.5 h-3.5 text-[#0066B3]" />
            <span className="font-semibold text-[#0066B3]">{t.topBar.email}</span>
            <span className="italic text-slate-500">{t.topBar.emailPlaceholder}</span>
          </div>

          <span className="text-slate-300">|</span>

          {/* LangSelector Component */}
          <LangSelector />
        </div>
      </div>
    </div>
  );
}
