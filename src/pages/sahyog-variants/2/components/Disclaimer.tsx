import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const Disclaimer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-[1280px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 py-3 xs:py-3.5 sm:py-4 text-xs text-[#78858d] leading-relaxed">
      <b className="font-bold text-[#647684]">
        {t("Disclaimer:", "अस्वीकरण :")}
      </b>{" "}
      <span>
        {t(
          "The English content available on this website shall be considered the official and authentic version. Hindi content is provided only as a translation for user convenience. In case of any discrepancy or difference in interpretation, the English version shall prevail.",
          "इस वेबसाइट पर उपलब्ध अंग्रेजी सामग्री को आधिकारिक और प्रामाणिक संस्करण माना जाएगा। हिंदी सामग्री केवल अनुवाद और उपयोगकर्ता की सुविधा के लिए प्रदान की गई है। किसी भी विसंगति या व्याख्या में अंतर की स्थिति में अंग्रेजी संस्करण मान्य होगा।",
        )}
      </span>
    </div>
  );
};

export default Disclaimer;
