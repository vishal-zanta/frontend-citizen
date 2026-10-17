import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import golgharTricolorImg from "@/assets/sahyog-variants/2/variation-2/golghar-tricolor-watercolor.png";

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="about culture-banner" id="bihar-culture">
      <img
        className="culture-photo"
        src={golgharTricolorImg}
        alt={t(
          "Golghar, Patna — representation of Bihar's historic heritage",
          "गोलघर, पटना — बिहार की ऐतिहासिक धरोहर का चित्रण"
        )}
        loading="lazy"
        width="1536"
        height="1024"
      />
      <div className="about-copy">
        <span className="kicker" data-en="CONNECTED TO EVERY CITIZEN">
          {t("CONNECTED TO EVERY CITIZEN", "हर नागरिक से जुड़ा सहयोग")}
        </span>
        <p data-en="Bihar Sahyog Helpline is a transparent and time-bound digital medium of the Government of Bihar, connecting citizens directly with the relevant departments to resolve their problems.">
          {t(
            "Bihar Sahyog Helpline is a transparent and time-bound digital medium of the Government of Bihar, connecting citizens directly with the relevant departments to resolve their problems.",
            "बिहार सहयोग हेल्पलाइन बिहार सरकार का एक पारदर्शी एवं समयबद्ध डिजिटल माध्यम है, जो नागरिकों को उनकी समस्याओं के समाधान हेतु सीधे संबंधित विभागों से जोड़ता है।"
          )}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
