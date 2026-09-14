import { useLanguage } from "@/context/LanguageContext";

export type Language = "hi" | "en";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Translations {
  topBar: {
    helpline: string;
    available247: string;
    email: string;
    emailPlaceholder: string;
    langSelect: string;
  };
  header: {
    title: string;
    govt: string;
    citizenLogin: string;
    officerLogin: string;
  };
  navbar: {
    home: string;
    citizenServices: string;
    newComplaint: string;
    registeredUser: string;
    importantLinks: string;
    faq: string;
    rti: string;
    privacy: string;
    accessibility: string;
    contact: string;
    sssPortal: string;
    stateLevelProgram: string;
    vidyarthiProgram: string;
  };
  stats: {
    receivedToday: string;
    promptlyRegistered: string;
    resolvedToday: string;
    actionCompleted: string;
    underInvestigation: string;
    officerAssigned: string;
    overdueIssues: string;
    withinDeadline: string;
  };
  actionCards: {
    portalBadge: string;
    heading: string;
    card1Title: string;
    card1Desc: string;
    card1Btn: string;
    card2Title: string;
    card2Desc: string;
    card2Btn: string;
    card3Title: string;
    card3Desc: string;
    card3Btn: string;
    card4Title: string;
    card4Desc: string;
    card4Btn: string;
  };
  trackWidget: {
    heading: string;
    subheading: string;
    trackingIdLabel: string;
    trackingIdPlaceholder: string;
    trackingIdFormat: string;
    securityCodeLabel: string;
    securityCodePlaceholder: string;
    btn: string;
    smsQuery?: string;
    downloadAtr?: string;
  };
  featuresAndFlow: {
    featuresTitle: string;
    featuresSubtitle: string;
    flowTitle: string;
    flowSubtitle: string;
    secureBadge: string;
    slaNote: string;
    featuresList: string[];
    steps: {
      step: number;
      title: string;
      desc: string;
    }[];
  };
  faqs: {
    title: string;
    subtitle: string;
    items: FAQItem[];
  };
  footer: {
    portalDesc: string;
    keyLinks: string;
    importantLinks: string;
    contactUs: string;
    addressTitle: string;
    tollFree: string;
    stateCallCenter: string;
    addressText: string[];
    copyright: string;
    developedBy: string;
    disclaimer: string;
  };
}

export const translations: Record<Language, Translations> = {
  hi: {
    topBar: {
      helpline: "📞 हेल्पलाइन: 1100",
      available247: "24×7 / 365 दिन उपलब्ध",
      email: "ईमेल आईडी:",
      emailPlaceholder: "(प्रस्तावित)",
      langSelect: "भाषा चुनें",
    },
    header: {
      title: "सहयोग हेल्पलाइन पोर्टल",
      govt: "बिहार सरकार",
      citizenLogin: "नागरिक लॉगिन",
      officerLogin: "अधिकारी लॉगिन",
    },
    navbar: {
      home: "मुख्य पृष्ठ",
      citizenServices: "नागरिक सेवाएं",
      newComplaint: "नई शिकायत दर्ज करें",
      registeredUser: "पंजीकृत उपयोगकर्ता",
      importantLinks: "महत्वपूर्ण लिंक",
      faq: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
      rti: "आरटीआई (जानकारी पोर्टल)",
      privacy: "गोपनीयता नीति",
      accessibility: "सुलभता विवरण",
      contact: "संपर्क करें",
      sssPortal: "एसएसएस पोर्टल",
      stateLevelProgram: "राज्य स्तरीय सहयोग कार्यक्रम",
      vidyarthiProgram: "विद्यार्थी सहयोग कार्यक्रम",
    },
    stats: {
      receivedToday: "आज प्राप्त शिकायतें",
      promptlyRegistered: "त्वरित पंजीकृत",
      resolvedToday: "आज निष्पादित शिकायतें",
      actionCompleted: "कार्य पूर्ण",
      underInvestigation: "जांच / प्रक्रियाधीन",
      officerAssigned: "अधिकारी नियुक्त",
      overdueIssues: "अतिदेय मामले",
      withinDeadline: "समय सीमा के भीतर",
    },
    actionCards: {
      portalBadge: "नागरिक सेवा पोर्टल",
      heading: "प्रमुख त्वरित सेवाएं",
      card1Title: "शिकायत पंजीकरण",
      card1Desc: "ऑनलाइन शिकायत। हमारे डिजिटल पोर्टल के माध्यम से अपनी शिकायत दर्ज करें।",
      card1Btn: "शिकायत दर्ज करें",
      card2Title: "शिकायत की स्थिति",
      card2Desc: "कार्यवाही का विवरण। मोबाइल के माध्यम से वर्तमान स्थिति जानें।",
      card2Btn: "स्थिति देखें",
      card3Title: "अनुस्मारक भेजें",
      card3Desc: "निर्धारित समय में कार्रवाई नहीं हुई? अनुस्मारक भेजें।",
      card3Btn: "अनुस्मारक भेजें",
      card4Title: "आपकी प्रतिक्रिया",
      card4Desc: "शिकायत के निपटारे के संबंध में अपनी प्रतिक्रिया / सुझाव दें।",
      card4Btn: "प्रतिक्रिया दें",
    },
    trackWidget: {
      heading: "शिकायत की स्थिति जाने",
      subheading: "स्थिति देखने के लिए अपनी शिकायत संख्य और सुरक्षा कोड दर्ज करें",
      trackingIdLabel: "शिकायत संख्य",
      trackingIdPlaceholder: "2026-000031",
      trackingIdFormat: "प्रारूप: BR-YYYY-XXXXXX (उदा. BR-2026-000031)",
      securityCodeLabel: "सुरक्षा कोड",
      securityCodePlaceholder: "सुरक्षा कोड दर्ज करें",
      btn: "स्थिति देखें",
      smsQuery: "त्वरित एसएमएस स्थिति जांच",
      downloadAtr: "कार्रवाई रिपोर्ट (ATR) डाउनलोड करें",
    },
    featuresAndFlow: {
      featuresTitle: "प्रमुख विशेषताएं",
      featuresSubtitle: "पोर्टल की मुख्य सुविधाएं एवं क्षमताएं",
      flowTitle: "यह कैसे कार्य करता है",
      flowSubtitle: "शिकायत निवारण की 5-चरणीय प्रक्रिया",
      secureBadge: "100% सुरक्षित एवं प्रमाणित रिकॉर्ड",
      slaNote: "औसत समाधान समय: 7-15 दिन",
      featuresList: [
        "शिकायतों का ऑनलाइन पंजीकरण",
        "विभागवार शिकायतों का त्वरित अग्रेषण",
        "समयबद्ध निवारण तंत्र (कानूनी समय सीमा)",
        "एसएमएस एवं ईमेल अलर्ट",
        "रियल-टाइम स्थिति ट्रैकिंग एवं ऑडिट ट्रेल",
        "नियम-आधारित बहुस्तरीय एस्केलेशन मैट्रिक्स",
        "नागरिक प्रतिक्रिया एवं संतुष्टि रेटिंग",
        "उच्चाधिकारियों द्वारा डैशबोर्ड निगरानी",
      ],
      steps: [
        {
          step: 1,
          title: "नागरिक ऑनलाइन या हेल्पलाइन 1100 पर शिकायत दर्ज करते हैं",
          desc: "वेब पोर्टल या टोल-फ्री नंबर 1100 के माध्यम से विवरण व प्रमाण के साथ शिकायत दर्ज करें।",
        },
        {
          step: 2,
          title: "शिकायत संबंधित विभाग को स्वतः अग्रेषित होती है",
          desc: "सिस्टम द्वारा संबंधित विभाग व जिले के अधिकृत नोडल अधिकारी को मामला सौंपा जाता है।",
        },
        {
          step: 3,
          title: "विभाग समस्या का निवारण कर स्थिति अपडेट करता है",
          desc: "क्षेत्रीय अधिकारी मौके पर समाधान कर अधिकृत कार्रवाई रिपोर्ट (ATR) अपलोड करते हैं।",
        },
        {
          step: 4,
          title: "नागरिक को समाधान की सूचना प्राप्त होती है",
          desc: "शिकायतकर्ता को समाधान की संपूर्ण जानकारी एसएमएस एवं पोर्टल के माध्यम से मिलती है।",
        },
        {
          step: 5,
          title: "समय सीमा में समाधान न होने पर स्वतः एस्केलेशन",
          desc: "निर्धारित समय में समाधान न मिलने पर मामला स्वतः उच्चाधिकारियों को स्थानांतरित हो जाता है।",
        },
      ],
    },
    faqs: {
      title: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
      subtitle: "बिहार सहयोग हेल्पलाइन पोर्टल (एकीकृत नागरिक हेल्पलाइन) से संबंधित आवश्यक जानकारियां",
      items: [
        {
          question: "1. बिहार सहयोग हेल्पलाइन पोर्टल (एकीकृत नागरिक हेल्पलाइन) क्या है?",
          answer: "बिहार सहयोग हेल्पलाइन पोर्टल बिहार सरकार का एक केंद्रीकृत नागरिक सहायता एवं शिकायत निवारण मंच है। यह 24×7 राज्य स्तरीय कॉल सेंटर (हेल्पलाइन 1100), वेब पोर्टल और एआई-सक्षम चैटबॉट को जोड़कर विभिन्न विभागों से संबंधित जन शिकायतों और सेवा अनुरोधों के पंजीकरण, ट्रैकिंग एवं समयबद्ध समाधान की सुविधा प्रदान करता है।",
        },
        {
          question: "2. बिहार सहयोग हेल्पलाइन पोर्टल का मुख्य उद्देश्य क्या है?",
          answer: "बिहार सरकार के आधिकारिक प्रस्ताव (RFP) के अनुसार इसके मुख्य उद्देश्य हैं:\n• सभी विभागों और जिलों के लिए एक एकीकृत, मानकीकृत सिंगल-विंडो शिकायत निवारण तंत्र स्थापित करना।\n• निर्धारित सेवा स्तर समझौतों (SLAs) के तहत शिकायतों का समयबद्ध समाधान सुनिश्चित करना।\n• प्रशासनिक जवाबदेही सुनिश्चित करने के लिए स्वचालित बहुस्तरीय एस्केलेशन व्यवस्था लागू करना।\n• उच्चाधिकारियों द्वारा केंद्रीय डैशबोर्ड के माध्यम से प्रगति और प्रदर्शन की निरंतर निगरानी करना।\n• पारदर्शी ट्रैकिंग, नागरिक प्रतिक्रिया और ऑडिट ट्रेल के माध्यम से लोक सेवा वितरण में सुधार करना।",
        },
        {
          question: "3. शिकायत कौन दर्ज करा सकता है?",
          answer: "बिहार का कोई भी नागरिक निम्नलिखित विषयों के संबंध में शिकायत या सेवा अनुरोध दर्ज करा सकता है:\n• राज्य सरकार की योजनाओं, सुविधाओं एवं नागरिक सेवाओं से संबंधित\n• सेवा वितरण में अनावश्यक विलंब या लापरवाही\n• अनुमेय लाभों या कल्याणकारी योजनाओं की राशि/सुविधा न मिलना\n• अधिकारियों या कर्मचारियों द्वारा कार्य में शिथिलता या कदाचार\n• संबंधित विभागों से जुड़े बुनियादी ढांचे एवं नागरिक समस्याएं",
        },
        {
          question: "4. शिकायत किन-किन माध्यमों से दर्ज कराई जा सकती है?",
          answer: "परियोजना के कार्यक्षेत्र के अनुसार नागरिक निम्नलिखित अधिकृत माध्यमों से शिकायत दर्ज करा सकते हैं:\n• 24×7 टोल-फ्री हेल्पलाइन (1100): कॉल सेंटर एग्जीक्यूटिव (CCE) से सीधे बात करके\n• ऑनलाइन वेब पोर्टल: मोबाइल ओटीपी सत्यापन के माध्यम से स्वयं शिकायत दर्ज करके\n• एआई-सक्षम चैटबॉट: पोर्टल पर उपलब्ध डिजिटल सहायक के माध्यम से\n• आधिकारिक ईमेल: निर्धारित सहायता ईमेल आईडी पर विवरण भेजकर\n• आईवीआरएस (IVRS - इंटरएक्टिव वॉयस रिस्पांस सिस्टम)\n\n*(विशेष ध्यान: एसएमएस (SMS) केवल ओटीपी, पंजीकरण पावती और स्थिति अलर्ट भेजने का माध्यम है—एसएमएस भेजकर शिकायत दर्ज नहीं होती। व्हाट्सएप बॉट और मोबाइल ऐप भविष्य के चरण में जोड़े जाएंगे)।*",
        },
        {
          question: "5. शिकायत दर्ज करने के लिए क्या जानकारी आवश्यक है?",
          answer: "त्वरित सत्यापन एवं प्रभावी कार्रवाई के लिए शिकायतकर्ता को निम्नलिखित विवरण देने होते हैं:\n• नागरिक विवरण: पूरा नाम और सक्रिय मोबाइल नंबर (ओटीपी सत्यापन एवं सूचनाओं के लिए अनिवार्य)\n• पता एवं क्षेत्राधिकार: जिला, प्रखंड/अनुमंडल, तथा पंचायत/वार्ड/मोहल्ला\n• शिकायत का विवरण: संबंधित विभाग, योजना/सेवा का नाम, विषय तथा समस्या का स्पष्ट विवरण\n• सहायक प्रमाण: समस्या से संबंधित फोटोग्राफ या आवश्यक दस्तावेज (पीडीएफ/इमेज प्रारूप में, यदि उपलब्ध हो)",
        },
        {
          question: "6. क्या शिकायत दर्ज करने के बाद पावती (Acknowledgement) प्राप्त होगी?",
          answer: "हाँ। किसी भी माध्यम (हेल्पलाइन 1100, पोर्टल या चैटबॉट) से शिकायत सफलतापूर्वक दर्ज होते ही सिस्टम द्वारा एक विशिष्ट Grievance Reference ID जनरेट होती है। यह संदर्भ संख्या नागरिक के पंजीकृत मोबाइल नंबर पर एसएमएस और ईमेल के माध्यम से तुरंत भेजी जाती है।",
        },
        {
          question: "7. मैं अपनी शिकायत की स्थिति कैसे ट्रैक कर सकता हूँ?",
          answer: "नागरिक किसी भी समय अपनी शिकायत की वास्तविक प्रगति निम्नलिखित तरीकों से जांच सकते हैं:\n• पोर्टल के 'स्थिति देखें' बॉक्स में अपनी शिकायत संदर्भ संख्या या पंजीकृत मोबाइल नंबर दर्ज करके।\n• 24×7 टोल-फ्री हेल्पलाइन 1100 पर कॉल करके एग्जीक्यूटिव को अपनी संदर्भ संख्या बताकर।\n• पोर्टल पर उपलब्ध एआई चैटबॉट के माध्यम से।",
        },
        {
          question: "8. शिकायत निवारण की समय सीमा क्या है?",
          answer: "शिकायतों का निवारण संबंधित विभागों के साथ निर्धारित सेवा स्तर समझौते (SLA) और टर्नअराउंड टाइम (TAT) के आधार पर किया जाता है। विभागीय नागरिक चार्टर (Citizen Charter) और मानक संचालन प्रक्रिया (SOP) के अनुसार प्रत्येक प्रकार की शिकायत के लिए निश्चित समय सीमा तय की गई है।",
        },
        {
          question: "9. यदि निर्धारित समय सीमा में शिकायत का समाधान न हो तो क्या होगा?",
          answer: "यदि निर्धारित समय सीमा (SLA) के भीतर समाधान नहीं होता है, तो सिस्टम स्वतः मामले को अगले उच्च प्रशासनिक स्तर पर एस्केलेट (अग्रेषित) कर देता है। इसके अलावा, लंबित मामलों की निगरानी उच्च स्तरीय डैशबोर्ड पर की जाती है और नागरिक पोर्टल या हेल्पलाइन 1100 के माध्यम से 'अनुस्मारक (Reminder)' भी भेज सकते हैं।",
        },
        {
          question: "10. क्या समाधान से असंतुष्ट होने पर बंद शिकायत को पुनः खोला जा सकता है?",
          answer: "हाँ। बिहार एकीकृत नागरिक हेल्पलाइन के विशेष प्रावधानों के तहत:\n• शिकायत को केवल तभी बंद माना जाता है जब नागरिक कॉल सेंटर एग्जीक्यूटिव के समक्ष समाधान से अपनी संतुष्टि की स्पष्ट पुष्टि करता है।\n• यदि नागरिक समाधान से संतुष्ट नहीं हैं, तो शिकायत को तुरंत पुनः खोलकर (Reopen) अग्रिम कार्रवाई हेतु भेजा जाता है।\n• समस्या का समाधान न होने पर नागरिक 7 दिनों के भीतर अपनी शिकायत पुनः खोलने के पात्र हैं।",
        },
        {
          question: "11. शिकायतों की निगरानी (Monitoring) किस प्रकार की जाती है?",
          answer: "शिकायतों की पारदर्शी निगरानी केंद्रीय रियल-टाइम डैशबोर्ड और एमआईएस (MIS) रिपोर्टों द्वारा विभिन्न प्रशासनिक स्तरों पर की जाती है:\n• विभागीय एवं नोडल अधिकारी स्तर (क्षेत्रीय कार्रवाई एवं एक्शन टेकन रिपोर्ट)\n• जिला प्रशासन स्तर (जिला पदाधिकारी एवं जिला नोडल अधिकारी)\n• सूचना प्रावैधिकी विभाग (IT Dept), संचालन एवं शीर्ष समितियां\n• राज्य सचिवालय एवं उच्च नेतृत्व स्तर (लंबित मामलों और निष्पादन गुणवत्ता की समीक्षा)",
        },
        {
          question: "12. एस्केलेशन पदानुक्रम (Escalation Hierarchy) क्या है?",
          answer: "समय सीमा उल्लंघन की स्थिति में शिकायतें स्वतः निम्नलिखित स्तरों पर आगे बढ़ती हैं:\n• स्तर 1: संबंधित विभाग के अधिकृत नोडल अधिकारी / क्षेत्रीय प्राधिकारी\n• स्तर 2: जिला स्तरीय प्राधिकारी / जिला नोडल अधिकारी\n• स्तर 3: विभागीय निदेशालय, सचिवालय स्तर के उच्चाधिकारी एवं राज्य नेतृत्व",
        },
        {
          question: "13. क्या शिकायत के साथ साक्ष्य या दस्तावेज अपलोड किए जा सकते हैं?",
          answer: "हाँ। वेब पोर्टल या चैटबॉट के माध्यम से शिकायत दर्ज करते समय नागरिक निर्धारित फाइल साइज के अनुसार फोटो, पीडीएफ (PDF) या दस्तावेज अपलोड कर सकते हैं, जिससे क्षेत्रीय अधिकारियों को समस्या की सत्यता समझने और शीघ्र निवारण में मदद मिलती है।",
        },
        {
          question: "14. तकनीकी सहायता अथवा पोर्टल समस्या के लिए किससे संपर्क करें?",
          answer: "पोर्टल उपयोग, ओटीपी प्राप्ति या दस्तावेज अपलोड से जुड़ी किसी भी तकनीकी समस्या के समाधान हेतु नागरिक 24×7 टोल-फ्री हेल्पलाइन 1100 पर संपर्क कर सकते हैं या पोर्टल पर उल्लिखित आधिकारिक तकनीकी सहायता ईमेल पर लिख सकते हैं।",
        },
        {
          question: "15. बिहार सहयोग हेल्पलाइन पोर्टल से सुशासन में क्या सुधार होगा?",
          answer: "यह एकीकृत प्रणाली बिहार में पारदर्शी एवं नागरिक-केंद्रित शासन को सशक्त बनाती है:\n• सभी विभागों के लिए एकल खिड़की प्रणाली (हेल्पलाइन 1100 एवं पोर्टल) से नागरिकों को अलग-अलग कार्यालयों के चक्कर नहीं लगाने पड़ते।\n• एसएलए-आधारित समयबद्ध निवारण और स्वतः एस्केलेशन से अधिकारियों की जवाबदेही तय होती है।\n• नागरिक की संतुष्टि पुष्टि के बिना शिकायत बंद न होने से गुणवत्तापूर्ण समाधान सुनिश्चित होता है।\n• डेटा एनालिटिक्स और हॉटस्पॉट पहचान से बार-बार होने वाली समस्याओं को चिन्हित कर प्रशासनिक सुधार संभव होते हैं।",
        },
      ],
    },
    footer: {
      portalDesc: "सहयोग हेल्पलाइन पोर्टल बिहार सरकार का एक पारदर्शी एवं समयबद्ध डिजिटल माध्यम है, जो नागरिकों को उनकी समस्याओं के समाधान हेतु सीधे संबंधित विभागों से जोड़ता है।",
      keyLinks: "मुख्य लिंक",
      importantLinks: "महत्वपूर्ण लिंक",
      contactUs: "संपर्क करें",
      addressTitle: "आधिकारिक पता",
      tollFree: "टोल-फ्री: 1100",
      stateCallCenter: "24×7 / 365 दिन राज्य कॉल सेंटर",
      addressText: [
        "सहयोग हेल्पलाइन",
        "11वीं मंजिल, बिस्कोमान टॉवर",
        "पश्चिम गांधी मैदान",
        "पटना, बिहार - 800001",
      ],
      copyright: "© बिहार सरकार | सर्वाधिकार सुरक्षित",
      developedBy: "BSEDC (BELTRON)",
      disclaimer: "अस्वीकरण (Disclaimer): इस वेबसाइट पर उपलब्ध अंग्रेजी सामग्री को आधिकारिक और प्रामाणिक संस्करण माना जाएगा। हिंदी सामग्री केवल अनुवाद और उपयोगकर्ता की सुविधा के लिए प्रदान की गई है। किसी भी विसंगति या व्याख्या में अंतर की स्थिति में अंग्रेजी संस्करण मान्य होगा।",
    },
  },
  en: {
    topBar: {
      helpline: "📞 Helpline: 1100",
      available247: "Available 24×7 / 365 Days",
      email: "Email ID:",
      emailPlaceholder: "(to be proposed)",
      langSelect: "Select Language",
    },
    header: {
      title: "Sahyog Helpline Portal",
      govt: "Government of Bihar",
      citizenLogin: "Citizen Login",
      officerLogin: "Officer Login",
    },
    navbar: {
      home: "Home Page",
      citizenServices: "Citizen Services",
      newComplaint: "New Complaint",
      registeredUser: "Registered User",
      importantLinks: "Important Links",
      faq: "FAQ",
      rti: "RTI (Jaankari Portal)",
      privacy: "Privacy Policy",
      accessibility: "Accessibility Statement",
      contact: "Contact Us",
      sssPortal: "SSS Portal",
      stateLevelProgram: "State Level Sahyog Program",
      vidyarthiProgram: "Vidyarthi Sahyog Karyakram",
    },
    stats: {
      receivedToday: "Complaints Received Today",
      promptlyRegistered: "Promptly Registered",
      resolvedToday: "Resolved Today",
      actionCompleted: "Action Completed",
      underInvestigation: "Under Investigation",
      officerAssigned: "Officer Assigned",
      overdueIssues: "Overdue Issues",
      withinDeadline: "Within Deadline",
    },
    actionCards: {
      portalBadge: "Citizen Services Portal",
      heading: "Key Quick Services",
      card1Title: "Complaint Registration",
      card1Desc: "Complaint Online. File your complaint through our digital portal.",
      card1Btn: "File complaint",
      card2Title: "Complaint Status",
      card2Desc: "Details of proceedings. Know the current status through mobile.",
      card2Btn: "View Status",
      card3Title: "Send Reminder",
      card3Desc: "Failure to take action within stipulated time? Send a reminder.",
      card3Btn: "Send Reminder",
      card4Title: "Your Feedback",
      card4Desc: "Regarding disposal of complaint. Give your feedback/suggestions.",
      card4Btn: "Give Feedback",
    },
    trackWidget: {
      heading: "Track Complaint Status",
      subheading: "Enter your Tracking ID and security code to view status",
      trackingIdLabel: "Tracking ID",
      trackingIdPlaceholder: "2026-000031",
      trackingIdFormat: "Format: BR-YYYY-XXXXXX (e.g. BR-2026-000031)",
      securityCodeLabel: "Security Code",
      securityCodePlaceholder: "Enter security code",
      btn: "Track Status",
      smsQuery: "Instant SMS Status Query",
      downloadAtr: "Download Action Taken Report (ATR)",
    },
    featuresAndFlow: {
      featuresTitle: "Key Features",
      featuresSubtitle: "Core platform capabilities & infrastructure",
      flowTitle: "How It Works",
      flowSubtitle: "End-to-end 5-step grievance disposal lifecycle",
      secureBadge: "100% Secure & Tamper-Proof Logs",
      slaNote: "Average SLA Resolution: 7-15 Days",
      featuresList: [
        "Online Registration of Grievances",
        "Department-wise Grievance Forwarding",
        "Time-bound Disposal Mechanism (SLA Driven)",
        "Instant SMS & Email Alerts",
        "Real-Time Status Tracking & Audit Trail",
        "Rule-based Multi-tier Escalation Matrix",
        "Citizen Feedback & Rating System",
        "Centralized Dashboard & Leadership Monitoring",
      ],
      steps: [
        {
          step: 1,
          title: "Citizen registers grievance online",
          desc: "Citizen submits complaint via web portal or toll-free helpline 1100 with location & evidence.",
        },
        {
          step: 2,
          title: "Grievance automatically forwarded to department",
          desc: "System routes ticket via intelligent workflow to the designated departmental Nodal Officer.",
        },
        {
          step: 3,
          title: "Department processes and updates status",
          desc: "Field office/department resolves issue and uploads official Action Taken Report (ATR).",
        },
        {
          step: 4,
          title: "Citizen receives notification",
          desc: "Automated SMS/Email notification sent to citizen with complete resolution remarks.",
        },
        {
          step: 5,
          title: "Escalation if not resolved within timeline",
          desc: "Automatic escalation to senior district/state authority if SLA turnaround time is breached.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions (FAQ)",
      subtitle: "Bihar Sahyog Helpline Portal (Unified Citizen Helpline) Guidelines & FAQs",
      items: [
        {
          question: "1. What is Bihar Sahyog Helpline Portal (Unified Citizen Helpline)?",
          answer: "Bihar Sahyog Helpline Portal is the centralized citizen assistance and grievance redressal platform of the Government of Bihar. It integrates a 24x7 state-level call center (Helpline 1100), an online web portal, and an AI-enabled chatbot to enable seamless registration, tracking, and time-bound resolution of public grievances and service requests across departments.",
        },
        {
          question: "2. What is the objective of the Bihar Sahyog Helpline Portal?",
          answer: "As outlined in the Government of Bihar RFP, the key objectives are to:\n• Establish a standardized, single-window grievance redressal mechanism across all line departments and districts.\n• Ensure time-bound grievance resolution driven by defined Service Level Agreements (SLAs).\n• Introduce automated multi-tier escalation mechanisms to enforce administrative accountability.\n• Enable centralized monitoring, executive dashboards, and performance review by senior leadership.\n• Improve public service delivery and citizen trust through transparent tracking, feedback, and audit trails.",
        },
        {
          question: "3. Who can file a grievance?",
          answer: "Any citizen of Bihar can file a grievance or service request concerning:\n• State government schemes, entitlements, and public services\n• Unreasonable delays in administrative service delivery\n• Non-receipt of entitled benefits or welfare subsidies\n• Misconduct, negligence, or lack of responsiveness by officials\n• Public infrastructure and civic issues across participating departments",
        },
        {
          question: "4. Through which channels can grievances be filed?",
          answer: "In accordance with the project scope, citizens can register grievances through the following official intake channels:\n• 24x7 Toll-Free Helpline (1100): Speak directly with a Call Center Executive (CCE)\n• Online Web Portal: Self-service registration with mobile OTP verification\n• AI-Enabled Chatbot: Interactive conversational assistant available on the portal\n• Dedicated Email: Submit grievance details to the official support email\n• Interactive Voice Response System (IVRS)\n\n*(Note: SMS is used strictly for sending automated OTPs, registration acknowledgements, and status alerts—not for submitting complaints. WhatsApp Bot and Mobile App integration are planned for future phases).* ",
        },
        {
          question: "5. What information is required to file a grievance?",
          answer: "To ensure prompt verification and action, citizens need to provide:\n• Citizen Information: Full name and mandatory mobile number (for OTP authentication and alerts)\n• Location & Jurisdiction: District, Block / Subdivision, and Panchayat / Ward / Locality\n• Grievance Details: Concerned department, scheme/service category, subject, and detailed description\n• Supporting Evidence: Photographs or relevant documents (PDF/images), where applicable",
        },
        {
          question: "6. Will I receive an acknowledgement after submission?",
          answer: "Yes. Upon successful registration through any channel (Call Center 1100, Web Portal, or Chatbot), a unique Grievance Reference ID is automatically generated. An instant confirmation is dispatched via SMS and Email to the citizen's registered mobile number for all future tracking and reference.",
        },
        {
          question: "7. How can I track my grievance status?",
          answer: "Citizens can track the live status and proceedings of their grievance at any time by:\n• Entering the unique Grievance Reference ID or registered mobile number in the 'Track Grievance Status' widget on this portal.\n• Calling the 24x7 Toll-Free Helpline 1100 and quoting the Grievance Reference ID to the executive.\n• Querying through the AI Chatbot on the portal.",
        },
        {
          question: "8. What is the time limit for grievance disposal?",
          answer: "Grievance disposal is governed by predefined Service Level Agreements (SLAs) and Turnaround Times (TAT) established in coordination with participating departments. Each category of complaint has a stipulated resolution timeline defined under the departmental Citizen Charter and SOP.",
        },
        {
          question: "9. What happens if my grievance is not resolved within the prescribed time?",
          answer: "If a grievance exceeds its stipulated SLA timeline, the system automatically triggers rule-based escalation to the next higher administrative level. In addition, pending and overdue cases are highlighted on leadership monitoring dashboards, and citizens can also submit an 'SLA Reminder' directly via the portal or Helpline 1100.",
        },
        {
          question: "10. Can I reopen a closed grievance if I am not satisfied?",
          answer: "Yes. Under the special provisions of the Bihar Unified Citizen Helpline framework:\n• A grievance is closed only after explicit confirmation of citizen satisfaction.\n• If the citizen is not satisfied with the resolution, the grievance is immediately reopened and re-assigned.\n• Citizens have the right to reopen the grievance within 7 days if the issue has not been satisfactorily rectified.",
        },
        {
          question: "11. How is grievance monitoring conducted?",
          answer: "Monitoring is carried out through centralized, real-time dashboards and MIS reporting across multiple administrative tiers:\n• Departmental & Nodal Officer Level (Field execution and Action Taken Reports)\n• District Administration Level (District Magistrate and District Nodal Officers)\n• IT Department, Steering Committee, and Apex Committee\n• State Leadership and Secretariat Level (Comprehensive trend, pendency, and performance analytics)",
        },
        {
          question: "12. What is the escalation hierarchy?",
          answer: "Unresolved grievances transition systematically through designated escalation tiers:\n• Level 1: Concerned Department Nodal Officer / Field Executive\n• Level 2: District Authority / District Nodal Officer\n• Level 3: Departmental Directorate, Secretariat Authority, and State Leadership Oversight",
        },
        {
          question: "13. Can supporting documents and photographs be uploaded?",
          answer: "Yes. When lodging a complaint via the web portal or chatbot, citizens can upload relevant supporting documents such as photographs, scan copies, and PDFs (within permissible file size and format limits) to provide visual or documentary evidence.",
        },
        {
          question: "14. Whom can I contact for technical assistance or portal issues?",
          answer: "For technical assistance, including difficulty with OTP verification, document upload, or navigation, citizens can dial the 24x7 Toll-Free Helpline 1100 to connect with a technical support executive, or send an inquiry to the designated support email address.",
        },
        {
          question: "15. How does the Bihar Sahyog Helpline Portal improve governance?",
          answer: "The Unified Citizen Helpline transforms governance in Bihar by:\n• Providing a single point of contact (Helpline 1100 & Portal) across all departments.\n• Enforcing strict SLA compliance and eliminating administrative delays.\n• Ensuring citizen-centric closure through mandatory satisfaction confirmation.\n• Utilizing data analytics, heatmaps, and hotspot detection to identify recurring systemic bottlenecks and inform policy reforms.",
        },
      ],
    },
    footer: {
      portalDesc: "Sahyog Helpline Portal provides a transparent and efficient platform for citizens to register and track complaints online. The system ensures timely resolution of grievances by connecting citizens directly with concerned departments through a structured digital workflow.",
      keyLinks: "Key Links",
      importantLinks: "Important Links",
      contactUs: "Contact Us",
      addressTitle: "Official Address",
      tollFree: "Toll Free: 1100",
      stateCallCenter: "24×7 / 365 Days State Call Center",
      addressText: [
        "Sahyog Helpline",
        "11th Floor, Biscomaun Tower",
        "West Gandhi Maidan",
        "Patna, Bihar - 800001",
      ],
      copyright: "© Government of Bihar | All Rights Reserved",
      developedBy: "BSEDC (BELTRON)",
      disclaimer: "Disclaimer: The English content available on this website shall be treated as the official and authentic version. The Hindi content is provided solely for translation and user convenience purposes. In case of any discrepancy, inconsistency, or difference in interpretation, the English version shall prevail.",
    },
  },
};

export function useSahyogTranslation() {
  const langContext = useLanguage();
  const lang = (langContext?.lang === "hi" ? "hi" : "en") as Language;
  const t = translations[lang] || translations.en;
  return { lang, t, setLang: langContext?.setLang, toggle: langContext?.toggle };
}
