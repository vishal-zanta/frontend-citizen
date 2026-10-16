import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const Disclaimer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="disclaimer wrap">
      <b data-en="Disclaimer:">{t("Disclaimer:", "अस्वीकरण :")}</b>{" "}
      <span data-en="The English content available on this website shall be considered the official and authentic version. Hindi content is provided only as a translation for user convenience. In case of any discrepancy or difference in interpretation, the English version shall prevail.">
        {t(
          "The English content available on this website shall be considered the official and authentic version. Hindi content is provided only as a translation for user convenience. In case of any discrepancy or difference in interpretation, the English version shall prevail.",
          "इस वेबसाइट पर उपलब्ध अंग्रेजी सामग्री को आधिकारिक और प्रामाणिक संस्करण माना जाएगा। हिंदी सामग्री केवल अनुवाद और उपयोगकर्ता की सुविधा के लिए प्रदान की गई है। किसी भी विसंगति या व्याख्या में अंतर की स्थिति में अंग्रेजी संस्करण मान्य होगा।"
        )}
      </span>
    </div>
  );
};

export default Disclaimer;
