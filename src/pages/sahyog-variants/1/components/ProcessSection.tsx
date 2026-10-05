import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "./content";
import processSprite from "@/assets/sahyog-variants/1/process.png";

const ProcessSection = () => {
  const { t } = useLanguage();

  return (
    <section id="process" className="py-16 md:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-80px)]">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#204e83] uppercase block mb-1">
              {t(content.process.kicker.en, content.process.kicker.hi)}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#162f47] tracking-tight">
              {t(content.process.heading.en, content.process.heading.hi)}
            </h2>
          </div>
          <Link
            to="/sahyog/faq"
            className="text-sm font-semibold text-[#204e83] hover:text-[#f57b18] underline underline-offset-4 transition-colors"
          >
            {t(content.process.faqLink.en, content.process.faqLink.hi)}
          </Link>
        </div>

        {/* Journey Timeline */}
        <div className="relative mt-8">
          {/* Dashed line on desktop */}
          <div className="hidden lg:block absolute top-[64px] left-[10%] right-[10%] border-t-2 border-dashed border-[#bdd0e1] z-0" />

          {/* Dashed line on mobile */}
          <div className="lg:hidden absolute top-[45px] bottom-[50px] left-[64px] border-l-2 border-dashed border-[#bdd0e1] z-0" />

          <ol className="list-none p-0 m-0 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {content.process.steps.map((stepItem, idx) => {
              const isLast = idx === content.process.steps.length - 1;

              return (
                <li
                  key={stepItem.step}
                  className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-5 lg:gap-0"
                >
                  {/* Step Visual Art */}
                  <div className="w-[130px] h-[140px] relative shrink-0 mx-auto mb-2 lg:mb-5">
                    <div
                      role="img"
                      aria-label={t(stepItem.alt.en, stepItem.alt.hi)}
                      className="w-[124px] h-[124px] rounded-full border-4 border-white shadow-[0_0_0_1px_#dce5ed] mx-auto bg-no-repeat"
                      style={{
                        backgroundImage: `url(${processSprite})`,
                        backgroundSize: "1160px auto",
                        backgroundPosition: stepItem.offset,
                      }}
                    />
                    {/* Badge Number */}
                    <span
                      className={`absolute bottom-0 left-[49px] w-8 h-8 rounded-full border-4 border-white text-white font-bold text-xs flex items-center justify-center shadow-xs ${
                        isLast ? "bg-[#078374]" : "bg-[#204e83]"
                      }`}
                    >
                      {stepItem.step}
                    </span>
                  </div>

                  {/* Copy */}
                  <div className="pt-2 lg:pt-0">
                    <h3 className="text-base sm:text-[17px] font-bold text-[#162f47] mb-1.5 leading-snug">
                      {t(stepItem.title.en, stepItem.title.hi)}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#647587] leading-relaxed m-0 font-normal">
                      {t(stepItem.description.en, stepItem.description.hi)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
