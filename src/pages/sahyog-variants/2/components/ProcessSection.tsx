import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import journeyImg from "@/assets/sahyog-variants/2/journey.png";
import processSprite from "@/assets/sahyog-variants/2/process.png";

const steps = [
  {
    step: "01",
    offset: "-282px -114px",
    title: { hi: "डायल 1100", en: "Dial 1100" },
    desc: {
      hi: "टोल-फ्री हेल्पलाइन पर कॉल करें।",
      en: "Call the toll-free helpline.",
    },
    alt: { hi: "हेल्पलाइन पर कॉल करती नागरिक", en: "Citizen calling helpline" },
  },
  {
    step: "02",
    offset: "-450px -114px",
    title: { hi: "शिकायत पंजीकरण", en: "Complaint registered" },
    desc: {
      hi: "ऑपरेटर शिकायत का पंजीकरण करेंगे और विभाग के अधिकारी को शिकायत प्रेषित करेंगे।",
      en: "The operator registers the complaint and sends it to the departmental officer.",
    },
    alt: {
      hi: "शिकायत पंजीकरण करता ऑपरेटर",
      en: "Operator registering complaint",
    },
  },
  {
    step: "03",
    offset: "-619px -114px",
    title: { hi: "विभागीय समाधान", en: "Departmental action" },
    desc: {
      hi: "विभाग के अधिकारी द्वारा शिकायत का समाधान किया जाएगा।",
      en: "The departmental officer resolves the complaint.",
    },
    alt: {
      hi: "समाधान करता विभागीय अधिकारी",
      en: "Departmental officer resolving complaint",
    },
  },
  {
    step: "04",
    offset: "-780px -114px",
    title: { hi: "समाधान की जानकारी", en: "Resolution update" },
    desc: {
      hi: "ऑपरेटर नागरिक को शिकायत संबंधी निराकरण की जानकारी देंगे।",
      en: "The operator informs the citizen about the resolution.",
    },
    alt: {
      hi: "नागरिक को जानकारी देता ऑपरेटर",
      en: "Operator informing citizen",
    },
  },
  {
    step: "05",
    offset: "-950px -114px",
    title: { hi: "नागरिक की संतुष्टि", en: "Citizen satisfaction" },
    desc: {
      hi: "यदि नागरिक संतुष्ट है तो शिकायत बंद कर दी जाएगी।",
      en: "The complaint is closed if the citizen is satisfied.",
    },
    alt: { hi: "संतुष्ट नागरिक", en: "Satisfied citizen" },
  },
];

const ProcessSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 lg:py-24" id="process">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#255784] uppercase block mb-1">
              {t("THE COMPLAINT JOURNEY", "प्रक्रिया प्रवाह")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14344c] tracking-tight">
              {t("From your call to a resolution.", "आपकी कॉल से समाधान तक।")}
            </h2>
          </div>
          <Link
            to="/sahyog/faq"
            className="text-xs sm:text-sm font-semibold text-[#255784] hover:text-[#f77b10] underline underline-offset-4 transition-colors"
          >
            {t("Frequently asked questions", "अक्सर पूछे जाने वाले प्रश्न")}
          </Link>
        </div>

        {/* 2-Column Journey Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[46%_54%] rounded-md overflow-hidden bg-white shadow-xs">
          {/* Left Picture */}
          <figure className="relative min-h-[300px] lg:min-h-[680px] m-0">
            <img
              src={journeyImg}
              alt={t(
                "Illustration of complaint from call to departmental resolution",
                "नागरिक की कॉल से विभागीय समाधान तक का चित्रण",
              )}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </figure>

          {/* Right 5-Step List */}
          <ol className="list-none m-0 p-6 sm:p-10 flex flex-col justify-center">
            {steps.map((item, idx) => {
              const isLast = idx === steps.length - 1;

              return (
                <li
                  key={item.step}
                  className={`relative grid grid-cols-[88px_1fr] gap-4 sm:gap-6 py-5 min-h-[130px] items-center ${
                    !isLast ? "border-b border-[#e6e8e8]" : ""
                  }`}
                >
                  {/* Dashed connector line */}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[43px] top-[95px] bottom-[-15px] border-l border-dashed border-[#adc6db] pointer-events-none"
                    />
                  )}

                  {/* Step Visual Icon Sprite */}
                  <div className="w-[88px] h-[90px] relative shrink-0">
                    <div
                      role="img"
                      aria-label={t(item.alt.en, item.alt.hi)}
                      className="w-[88px] h-[88px] rounded-full border-4 border-white shadow-[0_0_0_1px_#d5dfe9] bg-no-repeat overflow-hidden"
                      style={{
                        backgroundImage: `url(${processSprite})`,
                        backgroundSize: "1138px auto",
                        backgroundPosition: item.offset,
                        

                      }}
                    />
                    <span
                      className={`absolute -bottom-1 right-1 w-6 h-6 rounded-full border-2 border-white text-white font-bold text-[10px] flex items-center justify-center shadow-xs ${
                        isLast ? "bg-[#008878]" : "bg-[#113859]"
                      }`}
                    >
                      {item.step}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#14344c] mb-1.5 leading-snug">
                      {t(item.title.en, item.title.hi)}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#647684] leading-relaxed m-0 font-normal">
                      {t(item.desc.en, item.desc.hi)}
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
