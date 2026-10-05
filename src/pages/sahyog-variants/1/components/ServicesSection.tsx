import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { FileIcon, SearchIcon, MessageIcon } from "./Icons";
import { content } from "./content";
import serviceRegister from "@/assets/sahyog-variants/1/service-register.png";
import serviceTrack from "@/assets/sahyog-variants/1/service-track.png";
import serviceFeedback from "@/assets/sahyog-variants/1/service-feedback.png";

const serviceImages = {
  register: serviceRegister,
  track: serviceTrack,
  feedback: serviceFeedback,
};

const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-[#f0f5fa] py-16 md:py-20">
      <div className="max-w-[1240px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-80px)]">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#204e83] uppercase block mb-1">
              {t(content.services.kicker.en, content.services.kicker.hi)}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#162f47] tracking-tight">
              {t(content.services.heading.en, content.services.heading.hi)}
            </h2>
          </div>
          <p className="text-sm text-[#647587] font-medium max-w-[280px]">
            {t(content.services.subheading.en, content.services.subheading.hi)}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {content.services.items.map((item) => {
            const isOrange = item.theme === "orange";
            const isBlue = item.theme === "blue";

            const borderBottomClass = isOrange
              ? "border-b-4 border-b-[#f57b18]"
              : isBlue
              ? "border-b-4 border-b-[#204e83]"
              : "border-b-4 border-b-[#078374]";

            const iconBgClass = isOrange
              ? "bg-[#fff1e5] text-[#d85f07]"
              : isBlue
              ? "bg-[#edf3fa] text-[#204e83]"
              : "bg-[#eaf7f2] text-[#078374]";

            const btnBgClass = isOrange
              ? "bg-[#f57b18] hover:bg-[#e06d12] text-white"
              : isBlue
              ? "bg-[#204e83] hover:bg-[#16395e] text-white"
              : "bg-[#078374] hover:bg-[#05655a] text-white";

            return (
              <article
                key={item.id}
                className={`bg-white rounded-xl overflow-hidden border border-[#dbe5ee] shadow-[0_6px_22px_rgba(17,53,94,0.05)] flex flex-col group ${borderBottomClass}`}
              >
                {/* Image */}
                <div className="aspect-[4/3] w-full bg-[#e4edf5] overflow-hidden border-b border-[#dce5ed] relative">
                  <img
                    src={serviceImages[item.id as keyof typeof serviceImages]}
                    alt={t(item.title.en, item.title.hi)}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Top Badge & Number */}
                <div className="flex items-center justify-between px-6 sm:px-7 -mt-6 mb-4 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center ${iconBgClass}`}
                  >
                    {isOrange && <FileIcon className="w-5 h-5" />}
                    {isBlue && <SearchIcon className="w-5 h-5" />}
                    {!isOrange && !isBlue && <MessageIcon className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-bold text-[#204e83] tracking-widest px-3 py-1.5 bg-white border border-[#dce5ed] rounded-md shadow-2xs">
                    {item.no}
                  </span>
                </div>

                {/* Content */}
                <div className="px-6 sm:px-7 flex-1 flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#162f47] mb-2 leading-tight">
                    {t(item.title.en, item.title.hi)}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#52697f] leading-relaxed mb-6 flex-1">
                    {t(item.description.en, item.description.hi)}
                  </p>
                </div>

                {/* Button */}
                <div className="px-6 sm:px-7 pb-6 sm:pb-7">
                  <Link
                    to={item.link}
                    className={`w-full inline-flex items-center justify-center min-h-[48px] px-6 py-2.5 rounded-md font-bold text-sm sm:text-[15px] shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 ${btnBgClass}`}
                  >
                    {t(item.buttonText.en, item.buttonText.hi)}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
