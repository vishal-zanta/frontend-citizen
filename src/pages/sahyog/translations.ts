import { useLanguage } from "@/context/LanguageContext";

export type Language = "hi" | "en";

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
    placeholder: string;
    btn: string;
    smsQuery: string;
    downloadAtr: string;
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
      available247: "24×7 उपलब्ध",
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
      heading: "शिकायत की वास्तविक स्थिति जानें",
      subheading: "अपनी 12 अंकों की शिकायत संदर्भ संख्या या पंजीकृत मोबाइल नंबर दर्ज करें",
      placeholder: "शिकायत संदर्भ संख्या (उदा. GOB-2026-89412) या मोबाइल नंबर दर्ज करें",
      btn: "स्थिति जांचें",
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
    footer: {
      portalDesc: "सहयोग हेल्पलाइन पोर्टल बिहार सरकार का एक पारदर्शी एवं समयबद्ध डिजिटल माध्यम है, जो नागरिकों को उनकी समस्याओं के समाधान हेतु सीधे संबंधित विभागों से जोड़ता है।",
      keyLinks: "मुख्य लिंक",
      importantLinks: "महत्वपूर्ण लिंक",
      contactUs: "संपर्क करें",
      addressTitle: "आधिकारिक पता",
      tollFree: "टोल-फ्री: 1100",
      stateCallCenter: "24×7 राज्य कॉल सेंटर",
      addressText: [
        "सहयोग हेल्पलाइन पोर्टल",
        "बिहार सरकार",
        "मुख्यमंत्री सचिवालय",
        "4, देशरत्न मार्ग, पटना – 800001,",
        "बिहार, भारत",
      ],
      copyright: "© बिहार सरकार | सर्वाधिकार सुरक्षित",
      developedBy: "BSEDC (BELTRON)",
      disclaimer: "अस्वीकरण (Disclaimer): इस वेबसाइट पर उपलब्ध अंग्रेजी सामग्री को आधिकारिक और प्रामाणिक संस्करण माना जाएगा। हिंदी सामग्री केवल अनुवाद और उपयोगकर्ता की सुविधा के लिए प्रदान की गई है। किसी भी विसंगति या व्याख्या में अंतर की स्थिति में अंग्रेजी संस्करण मान्य होगा।",
    },
  },
  en: {
    topBar: {
      helpline: "📞 Helpline: 1100",
      available247: "Available 24×7",
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
      heading: "Track Your Grievance Progress Real-Time",
      subheading: "Enter your 12-digit Grievance Reference ID or registered Mobile Number to get instant proceedings status",
      placeholder: "Enter Grievance Reference ID (e.g. GOB-2026-89412) or Mobile No.",
      btn: "Search Status",
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
    footer: {
      portalDesc: "Sahyog Helpline Portal provides a transparent and efficient platform for citizens to register and track complaints online. The system ensures timely resolution of grievances by connecting citizens directly with concerned departments through a structured digital workflow.",
      keyLinks: "Key Links",
      importantLinks: "Important Links",
      contactUs: "Contact Us",
      addressTitle: "Official Address",
      tollFree: "Toll Free: 1100",
      stateCallCenter: "24×7 State Call Center",
      addressText: [
        "Sahyog Helpline Portal",
        "Govt. of Bihar",
        "Chief Minister Secretariat",
        "4, Deshratna Marg, Patna – 800001,",
        "Bihar, India",
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
