import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import registrationImg from "@/assets/sahyog-variants/2/registration.png";
import trackingImg from "@/assets/sahyog-variants/2/tracking.png";
import feedbackImg from "@/assets/sahyog-variants/2/feedback.png";
import { FileIcon, SearchIcon, MessageIcon } from "./Icons";

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#255784] uppercase block mb-2">
              {t("CITIZEN SERVICES", "नागरिक सेवाएं")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14344c] tracking-tight">
              {t("How can we help you?", "हम आपकी क्या मदद कर सकते हैं?")}
            </h2>
          </div>
          <p className="text-sm text-[#647684] leading-relaxed max-w-xs">
            {t(
              "Your complaint. Your status. Your feedback.",
              "आपकी शिकायत। आपकी स्थिति। आपकी प्रतिक्रिया।",
            )}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="flex flex-col gap-8">
          {/* Service 01: Register */}
          <article className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[360px] bg-[#faf7ee] rounded-md overflow-hidden group">
            <div className="relative min-h-[260px] md:min-h-[360px] overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:bg-[#f77b10]">
              <img
                src={registrationImg}
                alt={t(
                  "Citizen registering complaint via smartphone",
                  "स्मार्टफोन से शिकायत दर्ज करती नागरिक",
                )}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:p-10 flex flex-col justify-center items-start">
              <div className="w-full flex items-center justify-between mb-3">
                <span className="w-11 h-11 rounded-full border border-[#e3c7a9] text-[#cd670d] flex items-center justify-center shrink-0">
                  <FileIcon className="w-5 h-5" />
                </span>
                <span className="text-4xl sm:text-[46px] font-normal text-[#bfb8a9] leading-none">
                  01
                </span>
              </div>
              <h3 className="text-2xl sm:text-[31px] font-bold text-[#14344c] mb-3 tracking-tight">
                {t("Register a complaint", "शिकायत पंजीकरण")}
              </h3>
              <p className="text-sm sm:text-base text-[#647684] leading-relaxed mb-6">
                {t(
                  "Register your new complaint through the online portal.",
                  "ऑनलाइन पोर्टल के माध्यम से अपनी नई शिकायत दर्ज करें",
                )}
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-3 bg-[#df6807] hover:bg-[#d96000] text-white px-5 sm:px-6 py-3 rounded font-bold text-sm shadow transition-all hover:-translate-y-0.5"
              >
                <span>{t("Register complaint", "शिकायत दर्ज करें")}</span>
                <span className="text-lg leading-none">↗</span>
              </Link>
            </div>
          </article>

          {/* Service 02: Track */}
          <article className="grid grid-cols-1 md:grid-cols-[45%_55%] min-h-[360px] bg-[#edf3f8] rounded-md overflow-hidden group">
            <div className="order-1 md:order-2 relative min-h-[260px] md:min-h-[360px] overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:bg-[#255784]">
              <img
                src={trackingImg}
                alt={t(
                  "Citizen checking complaint status at shop",
                  "अपनी दुकान पर शिकायत की स्थिति देखता नागरिक",
                )}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="order-2 md:order-1 p-6 sm:p-10 flex flex-col justify-center items-start">
              <div className="w-full flex items-center justify-between mb-3">
                <span className="w-11 h-11 rounded-full border border-[#b9cbd9] text-[#255784] flex items-center justify-center shrink-0">
                  <SearchIcon className="w-5 h-5" />
                </span>
                <span className="text-4xl sm:text-[46px] font-normal text-[#b4c3ce] leading-none">
                  02
                </span>
              </div>
              <h3 className="text-2xl sm:text-[31px] font-bold text-[#14344c] mb-3 tracking-tight">
                {t("Track your complaint", "शिकायत की स्थिति")}
              </h3>
              <p className="text-sm sm:text-base text-[#647684] leading-relaxed mb-6">
                {t(
                  "Enter your complaint number to view its current status.",
                  "अपनी शिकायत संख्या दर्ज कर वर्तमान शिकायत की स्थिति देखें",
                )}
              </p>
              <Link
                to="/citizen/track"
                className="inline-flex items-center gap-3 bg-[#255784] hover:bg-[#113859] text-white px-5 sm:px-6 py-3 rounded font-bold text-sm shadow transition-all hover:-translate-y-0.5"
              >
                <span>{t("Check status", "स्थिति देखें")}</span>
                <span className="text-lg leading-none">↗</span>
              </Link>
            </div>
          </article>

          {/* Service 03: Feedback */}
          <article className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[360px] bg-[#edf5f0] rounded-md overflow-hidden group">
            <div className="relative min-h-[260px] md:min-h-[360px] overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:bg-[#008878]">
              <img
                src={feedbackImg}
                alt={t(
                  "Citizens giving feedback on resolution",
                  "समाधान पर प्रतिक्रिया देते नागरिक",
                )}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:p-10 flex flex-col justify-center items-start">
              <div className="w-full flex items-center justify-between mb-3">
                <span className="w-11 h-11 rounded-full border border-[#bbd7cd] text-[#008878] flex items-center justify-center shrink-0">
                  <MessageIcon className="w-5 h-5" />
                </span>
                <span className="text-4xl sm:text-[46px] font-normal text-[#b0c9bf] leading-none">
                  03
                </span>
              </div>
              <h3 className="text-2xl sm:text-[31px] font-bold text-[#14344c] mb-3 tracking-tight">
                {t("Citizen feedback", "नागरिक प्रतिक्रिया")}
              </h3>
              <p className="text-sm sm:text-base text-[#647684] leading-relaxed mb-6">
                {t(
                  "Share your feedback and rating about the resolution of your complaint.",
                  "शिकायत समाधान के संबंध में अपनी शिकायत की प्रतिक्रिया और रेटिंग दें",
                )}
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-3 bg-[#008878] hover:bg-[#007466] text-white px-5 sm:px-6 py-3 rounded font-bold text-sm shadow transition-all hover:-translate-y-0.5"
              >
                <span>{t("Give feedback", "प्रतिक्रिया दें")}</span>
                <span className="text-lg leading-none">↗</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
