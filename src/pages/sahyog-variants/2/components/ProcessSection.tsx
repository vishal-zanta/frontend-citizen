import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import journeyCallImg from "@/assets/sahyog-variants/2/variation-2/journey-call.png";
import journeyRegistrationImg from "@/assets/sahyog-variants/2/variation-2/journey-registration.png";
import journeyResolutionImg from "@/assets/sahyog-variants/2/variation-2/journey-resolution.png";
import journeyUpdateImg from "@/assets/sahyog-variants/2/variation-2/journey-update.png";
import journeySatisfactionImg from "@/assets/sahyog-variants/2/variation-2/journey-satisfaction.png";

const steps = [
  {
    step: "01",
    img: journeyCallImg,
    artClass: "art-1",
    title: { hi: "डायल 1100", en: "Dial 1100" },
    desc: {
      hi: "टोल-फ्री हेल्पलाइन पर कॉल करें।",
      en: "Call the toll-free helpline.",
    },
  },
  {
    step: "02",
    img: journeyRegistrationImg,
    artClass: "art-2",
    title: { hi: "शिकायत पंजीकरण", en: "Complaint registered" },
    desc: {
      hi: "ऑपरेटर शिकायत का पंजीकरण करेंगे और विभाग के अधिकारी को शिकायत प्रेषित करेंगे।",
      en: "The operator registers the complaint and sends it to the departmental officer.",
    },
  },
  {
    step: "03",
    img: journeyResolutionImg,
    artClass: "art-3",
    title: { hi: "विभागीय समाधान", en: "Departmental action" },
    desc: {
      hi: "विभाग के अधिकारी द्वारा शिकायत का समाधान किया जाएगा।",
      en: "The departmental officer resolves the complaint.",
    },
  },
  {
    step: "04",
    img: journeyUpdateImg,
    artClass: "art-4",
    title: { hi: "समाधान की जानकारी", en: "Resolution update" },
    desc: {
      hi: "ऑपरेटर नागरिक को शिकायत संबंधी निराकरण की जानकारी देंगे।",
      en: "The operator informs the citizen about the resolution.",
    },
  },
  {
    step: "05",
    img: journeySatisfactionImg,
    artClass: "art-5",
    title: { hi: "नागरिक की संतुष्टि", en: "Citizen satisfaction" },
    desc: {
      hi: "यदि नागरिक संतुष्ट है तो शिकायत बंद कर दी जाएगी।",
      en: "The complaint is closed if the citizen is satisfied.",
    },
  },
];

const ProcessSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="process wrap" id="process">
      <div className="section-heading">
        <div>
          <span className="kicker" data-en="Service Flow">
            {t("Service Flow", "सेवा प्रवाह")}
          </span>
          <h2 data-en="From call to resolution.">
            {t("From call to resolution.", "कॉल से समाधान तक।")}
          </h2>
        </div>
      </div>

      <div className="journey-layout">
        <ol className="journey">
          {steps.map((item) => (
            <li key={item.step}>
              <div className="step-visual">
                <div className={`process-art ${item.artClass}`} aria-hidden="true">
                  <img
                    src={item.img}
                    alt=""
                    loading="lazy"
                    width="1024"
                    height="1024"
                  />
                </div>
                <span>{item.step}</span>
              </div>
              <h3 data-en={item.title.en}>
                {t(item.title.en, item.title.hi)}
              </h3>
              <p data-en={item.desc.en}>
                {t(item.desc.en, item.desc.hi)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
