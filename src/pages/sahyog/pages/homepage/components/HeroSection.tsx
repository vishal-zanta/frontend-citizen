import React from "react";
import banner from "@/assets/slider-2.jpeg";
import bannerEng from "@/assets/slider-2-eng.jpeg";
import bannerPotrait from "@/assets/slider-2-hin-potrait.jpeg";
import bannerEngPotrait from "@/assets/slider-2-eng-potrait.jpeg";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="w-full bg-[#f1f5f9] border-b border-slate-200/80">
      <div className="mx-auto">
        <div className="relative w-full overflow-hidden shadow-xs">
          {/* Small screens portrait banner (< sm) */}
          <img
            src={t(bannerEngPotrait, bannerPotrait)}
            alt="Bihar Sahyog Helpline - Government of Bihar"
            className="w-full h-auto object-cover block sm:hidden"
          />
          {/* sm+ and Desktop landscape banner */}
          <img
            src={t(bannerEng, banner)}
            alt="Bihar Sahyog Helpline - Government of Bihar"
            className="w-full h-full object-cover hidden sm:block"
          />
        </div>
      </div>
    </section>
  );
}
