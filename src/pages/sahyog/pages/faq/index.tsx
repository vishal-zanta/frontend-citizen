import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";
import { faqsData } from "./faqs";

export default function Faq() {
  const { t, lang } = useLanguage();

  return (
    <div className="w-full bg-[#f8fafc] min-h-[calc(100vh-200px)] py-8 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-10">
          {/* Header */}
          <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
            <div className="w-1.5 h-7 bg-red-600 rounded-full"></div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1C4D8D] tracking-tight">
              {t(
                "Frequently Asked Questions (FAQ)",
                "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
              )}
            </h1>
          </div>

          {/* Accordion list */}
          <Accordion type="multiple" className="w-full divide-y divide-slate-100">
            {faqsData.map((faq) => {
              const questionText = t(faq.question, faq.questionHindi);
              const answerText = t(faq.answer, faq.answerHindi);
              const pointsList =
                lang === "hi" && faq.pointsHindi
                  ? faq.pointsHindi
                  : faq.points || [];

              return (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-b border-slate-100 py-1"
                >
                  <AccordionTrigger className="hover:no-underline py-4 text-left group">
                    <div className="flex items-start gap-2.5 text-left pr-4">
                      <span className="text-red-600 font-bold text-sm sm:text-base shrink-0">
                        {faq.number}.
                      </span>
                      <span className="text-slate-800 group-hover:text-[#1C4D8D] font-semibold text-xs sm:text-sm transition-colors leading-relaxed">
                        {questionText}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pt-1 pb-4 pl-7 sm:pl-9 pr-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
                    <p>{answerText}</p>
                    {pointsList.length > 0 && (
                      <ul className="mt-2.5 space-y-1.5 list-disc pl-5 text-slate-600">
                        {pointsList.map((pt, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
}