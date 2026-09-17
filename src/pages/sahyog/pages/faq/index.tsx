import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Phone,
  Home as HomeIcon,
  ExternalLink,
} from "lucide-react";
import { useSahyogTranslation } from "../../translations";

export default function Faq() {
  const { t, lang } = useSahyogTranslation();
  const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });

  const toggleFaq = (index: number) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<number, boolean> = {};
    t.faqs.items.forEach((_, idx) => {
      allOpen[idx] = true;
    });
    setExpandedFaqs(allOpen);
  };

  const handleCollapseAll = () => {
    setExpandedFaqs({});
  };

  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100 border-b border-slate-200 py-3 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link
            to="/sahyog"
            className="hover:text-[#1C4D8D] flex items-center gap-1"
          >
            <HomeIcon className="w-3.5 h-3.5" />
            <span>{t.navbar.home}</span>
          </Link>
          <span>/</span>
          <span className="text-[#1C4D8D] font-bold">{t.navbar.faq}</span>
        </div>
      </div>

      {/* Page Hero Header */}
      <section className="bg-gradient-to-b from-[#1C4D8D] to-[#12335f] text-white py-10 px-4 sm:px-8 shadow-inner">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.faqs.title}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-2 max-w-2xl mx-auto font-normal">
            {t.faqs.subtitle}
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-10 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Top Controls: Question Counter & Expand / Collapse Buttons */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">
              {lang === "hi"
                ? `कुल प्रश्न: ${t.faqs.items.length}`
                : `Total Questions: ${t.faqs.items.length}`}
            </span>

            {/* Expand / Collapse Controls */}
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={handleExpandAll}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold transition-colors cursor-pointer"
              >
                {lang === "hi" ? "सभी खोलें" : "Expand All"}
              </button>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold transition-colors cursor-pointer"
              >
                {lang === "hi" ? "सभी बंद करें" : "Collapse All"}
              </button>
            </div>
          </div>

          {/* 8 Questions List Accordion */}
          <div className="space-y-3.5">
            {t.faqs.items.map((item, idx) => {
              const isOpen = !!expandedFaqs[idx];

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
                    isOpen
                      ? "border-blue-300 shadow-md ring-1 ring-blue-100"
                      : "border-slate-200 hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  {/* Question Header */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      {/* Number Badge */}
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isOpen
                            ? "bg-[#1C4D8D] text-white"
                            : "bg-blue-50 text-[#1C4D8D] border border-blue-200"
                        }`}
                      >
                        {idx + 1}
                      </span>

                      {/* Question Text */}
                      <div className="flex-1">
                        <h2
                          className={`text-sm sm:text-base font-bold leading-snug transition-colors ${
                            isOpen ? "text-[#1C4D8D]" : "text-slate-900"
                          }`}
                        >
                          {item.question.replace(/^\d+\.\s*/, "")}
                        </h2>
                      </div>
                    </div>

                    {/* Animated Chevron */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-blue-100 text-[#1C4D8D] rotate-180"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Dropdown Answer Content */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/40 text-xs sm:text-sm text-slate-700 leading-relaxed animate-in fade-in-50 duration-200">
                      <div className="pl-10 space-y-2">
                        {item.answer.split("\n").map((line, lIdx) => {
                          if (line.startsWith("•") || line.startsWith("..")) {
                            return (
                              <div
                                key={lIdx}
                                className="flex items-start gap-2.5 py-0.5 text-slate-800 font-medium pl-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1C4D8D] mt-2 shrink-0"></span>
                                <span>{line.replace(/^[•.]+\s*/, "")}</span>
                              </div>
                            );
                          }
                          if (line.startsWith("*(")) {
                            return (
                              <div
                                key={lIdx}
                                className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium"
                              >
                                {line.replace(/\*/g, "")}
                              </div>
                            );
                          }
                          return (
                            <p
                              key={lIdx}
                              className="text-slate-700 leading-relaxed font-normal"
                            >
                              {line}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Assistance Banner */}
          <div className="mt-12 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-[#C35504] font-bold text-xs uppercase tracking-wider mb-1">
                <Phone className="w-4 h-4" />
                <span>
                  {lang === "hi"
                    ? "24×7 / 365 दिन नागरिक सहायता उपलब्ध"
                    : "24×7 / 365 Days Citizen Helpline Available"}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {lang === "hi"
                  ? "क्या आपको अतिरिक्त सहायता चाहिए?"
                  : "Still Have Questions Or Need Help?"}
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-md leading-relaxed">
                {lang === "hi"
                  ? "टोल-फ्री 1100 पर कॉल करें अथवा सीधे नागरिक पोर्टल पर अपनी शिकायत दर्ज करें।"
                  : "Call toll-free 1100 anytime to speak directly with an executive, or file a complaint online."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:1100"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1C4D8D] hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>{lang === "hi" ? "कॉल 1100" : "Call 1100"}</span>
              </a>
              <Link
                to="/login"
                state={{ to: "/citizen/raise" }}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <span>
                  {lang === "hi" ? "शिकायत दर्ज करें" : "File Complaint"}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}