import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import registrationImg from "@/assets/sahyog-variants/2/variation-2/registration.png";
import trackingImg from "@/assets/sahyog-variants/2/variation-2/tracking.png";
import feedbackImg from "@/assets/sahyog-variants/2/variation-2/feedback.png";
import biharOutlinePattern from "@/assets/sahyog-variants/2/variation-2/bihar-outline-pattern.png";
import { FileIcon, SearchIcon, MessageIcon } from "./Icons";

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="relative py-12 sm:py-20 lg:py-24 border-t border-b border-[#d9e1df] overflow-hidden isolate"
      style={{
        background:
          "radial-gradient(ellipse at 0% 8%, rgba(246, 216, 182, 0.55), transparent 50%), radial-gradient(ellipse at 100% 80%, rgba(169, 213, 203, 0.33), transparent 48%), linear-gradient(155deg, #f3e9da 0%, #e3edf4 52%, #e5eee7 100%)",
      }}
    >
      {/* Bihar Outline Pattern Repeating Overlay */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage: `url(${biharOutlinePattern})`,
          backgroundRepeat: "repeat",
          backgroundSize: "1150px auto",
          backgroundPosition: "center 15px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#255784] uppercase block mb-1.5 sm:mb-2">
              {t("CITIZEN SERVICES", "नागरिक सेवाएं")}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#14344c] tracking-tight">
              {t("How can we help you?", "हम आपकी क्या मदद कर सकते हैं?")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#647684] leading-relaxed max-w-[280px]">
            {t(
              "Your complaint. Your status. Your feedback.",
              "आपकी शिकायत। आपकी स्थिति। आपकी प्रतिक्रिया।",
            )}
          </p>
        </div>

        {/* Service Cards */}
        <div className="flex flex-col gap-8 sm:gap-11">
          {/* Card 01: Register a complaint */}
          <article className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[360px] bg-[#faf7ee] rounded-[6px] overflow-hidden shadow-[0_10px_28px_rgba(18,53,75,0.06)] border border-white/70 group">
            <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[360px] overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:bg-[#f77b10]">
              <img
                src={registrationImg}
                alt={t(
                  "Citizen registering complaint via smartphone",
                  "स्मार्टफोन से शिकायत दर्ज करती नागरिक",
                )}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-[1.025]"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:p-9 lg:p-11 flex flex-col justify-center items-start">
              <div className="w-full flex items-center justify-between mb-3">
                <span className="w-11 h-11 rounded-full border border-[#e3c7a9] text-[#cd670d] flex items-center justify-center shrink-0">
                  <FileIcon className="w-5 h-5" />
                </span>
                <span className="text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#bfb8a9] leading-none">
                  01
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[31px] font-bold text-[#14344c] mb-3 tracking-tight">
                {t("Register a complaint", "शिकायत पंजीकरण")}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-[#647684] leading-relaxed mb-6">
                {t(
                  "Register your new complaint through the online portal.",
                  "ऑनलाइन पोर्टल के माध्यम से अपनी नई शिकायत दर्ज करें",
                )}
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2.5 bg-[#f77b10] hover:bg-[#d96000] text-white px-5 sm:px-6 py-3 min-h-[50px] sm:min-h-[54px] rounded-[3px] font-bold text-xs sm:text-sm transition-all hover:-translate-y-0.5"
              >
                <span>{t("Register complaint", "शिकायत दर्ज करें")}</span>
                <span className="text-lg leading-none font-normal">↗</span>
              </Link>
            </div>
          </article>

          {/* Card 02: Track complaint */}
          <article className="grid grid-cols-1 md:grid-cols-[45%_55%] min-h-[360px] bg-[#edf3f8] rounded-[6px] overflow-hidden shadow-[0_10px_28px_rgba(18,53,75,0.06)] border border-white/70 group">
            <div className="order-1 md:order-2 relative min-h-[220px] sm:min-h-[280px] md:min-h-[360px] overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:bg-[#255784]">
              <img
                src={trackingImg}
                alt={t(
                  "Citizen tracking complaint at shop",
                  "अपनी दुकान पर शिकायत की स्थिति देखता नागरिक",
                )}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-[1.025]"
                loading="lazy"
              />
            </div>
            <div className="order-2 md:order-1 p-6 sm:p-9 lg:p-11 flex flex-col justify-center items-start">
              <div className="w-full flex items-center justify-between mb-3">
                <span className="w-11 h-11 rounded-full border border-[#b9cbd9] text-[#255784] flex items-center justify-center shrink-0">
                  <SearchIcon className="w-5 h-5" />
                </span>
                <span className="text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#b4c3ce] leading-none">
                  02
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[31px] font-bold text-[#14344c] mb-3 tracking-tight">
                {t("Track your complaint", "शिकायत की स्थिति")}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-[#647684] leading-relaxed mb-6">
                {t(
                  "Enter your complaint number to view its current status.",
                  "अपनी शिकायत संख्या दर्ज कर वर्तमान शिकायत की स्थिति देखें",
                )}
              </p>
              <Link
                to="/complaint"
                className="inline-flex items-center justify-center gap-2.5 bg-[#255784] hover:bg-[#113859] text-white px-5 sm:px-6 py-3 min-h-[50px] sm:min-h-[54px] rounded-[3px] font-bold text-xs sm:text-sm transition-all hover:-translate-y-0.5"
              >
                <span>{t("Check status", "स्थिति देखें")}</span>
                <span className="text-lg leading-none font-normal">↗</span>
              </Link>
            </div>
          </article>

          {/* Card 03: Citizen feedback */}
          <article className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[360px] bg-[#edf5f0] rounded-[6px] overflow-hidden shadow-[0_10px_28px_rgba(18,53,75,0.06)] border border-white/70 group">
            <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[360px] overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:bg-[#008878]">
              <img
                src={feedbackImg}
                alt={t(
                  "Citizens giving feedback on resolution",
                  "समाधान पर प्रतिक्रिया देते नागरिक",
                )}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-[1.025]"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:p-9 lg:p-11 flex flex-col justify-center items-start">
              <div className="w-full flex items-center justify-between mb-3">
                <span className="w-11 h-11 rounded-full border border-[#bbd7cd] text-[#008878] flex items-center justify-center shrink-0">
                  <MessageIcon className="w-5 h-5" />
                </span>
                <span className="text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#b0c9bf] leading-none">
                  03
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[31px] font-bold text-[#14344c] mb-3 tracking-tight">
                {t("Citizen feedback", "नागरिक प्रतिक्रिया")}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-[#647684] leading-relaxed mb-6">
                {t(
                  "Share your feedback and rating about the resolution of your complaint.",
                  "शिकायत समाधान के संबंध में अपनी शिकायत की प्रतिक्रिया और रेटिंग दें",
                )}
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2.5 bg-[#008878] hover:bg-[#006f62] text-white px-5 sm:px-6 py-3 min-h-[50px] sm:min-h-[54px] rounded-[3px] font-bold text-xs sm:text-sm transition-all hover:-translate-y-0.5"
              >
                <span>{t("Give feedback", "प्रतिक्रिया दें")}</span>
                <span className="text-lg leading-none font-normal">↗</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
