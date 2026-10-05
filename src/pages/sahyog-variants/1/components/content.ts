export interface LocalizedString {
  hi: string;
  en: string;
}

export const content = {
  utility: {
    stateService: {
      hi: "बिहार सरकार · नागरिक सेवाएं",
      en: "Government of Bihar · Citizen services",
    },
    helplineNumber: "1100",
    hours: {
      hi: "24×7 / 365 दिन उपलब्ध",
      en: "24×7 / 365 days available",
    },
  },
  header: {
    brandTitle: {
      hi: "बिहार सहयोग हेल्पलाइन",
      en: "Bihar Sahyog Helpline",
    },
    brandSubtitle: {
      hi: "बिहार सरकार",
      en: "Government of Bihar",
    },
    nav: {
      services: {
        hi: "नागरिक सेवाएं",
        en: "Citizen services",
      },
      deptLogin: {
        hi: "विभागीय लॉगिन",
        en: "Department login",
      },
      officeLogin: {
        hi: "कार्यालय लॉगिन",
        en: "Office login",
      },
      citizenLogin: {
        hi: "नागरिक लॉगिन",
        en: "Citizen login",
      },
    },
  },
  hero: {
    eyebrow: {
      hi: "बिहार सहयोग हेल्पलाइन",
      en: "BIHAR SAHYOG HELPLINE",
    },
    titleLine1: {
      hi: "हर नागरिक के लिए।",
      en: "For every citizen.",
    },
    titleLine2: {
      hi: "सिर्फ एक कॉल पर",
      en: "A helping hand,",
    },
    titleLine3Highlight: {
      hi: "सहायता और सहयोग।",
      en: "just one call away.",
    },
    description: {
      hi: "शिकायत दर्ज करें, समाधान की स्थिति जानें।",
      en: "Register your complaint. Know the status of its resolution.",
    },
    registerBtn: {
      hi: "शिकायत दर्ज करें",
      en: "Register a complaint",
    },
    tollFreeLabel: {
      hi: "टोल-फ्री हेल्पलाइन",
      en: "TOLL-FREE HELPLINE",
    },
    helplineNumber: "1100",
    assurance: {
      hi: "आपकी सेवा में। 24 घंटे, हर दिन।",
      en: "At your service. 24 hours, every day.",
    },
    commitment: {
      hi: "जनसेवा। हमारा संकल्प।",
      en: "PUBLIC SERVICE. OUR COMMITMENT.",
    },
    supportBadge: {
      hi: "नागरिक सहायता",
      en: "Citizen support",
    },
  },
  notice: {
    label: {
      hi: "सूचना",
      en: "NOTICE",
    },
    text: {
      hi: "बिहार सहयोग पोर्टल एवं हेल्पलाइन 1100 (टोल-फ्री) नागरिकों की सेवा में 24×7 उपलब्ध है। अपनी शिकायत ऑनलाइन दर्ज करें अथवा स्थिति ट्रैक करें।",
      en: "Bihar Sahyog Portal and toll-free helpline 1100 are available 24×7. Register your complaint online or track its status.",
    },
  },
  impact: {
    kicker: {
      hi: "एक नज़र में सहयोग",
      en: "SAHYOG AT A GLANCE",
    },
    heading: {
      hi: "हर आवाज़ महत्वपूर्ण है।",
      en: "Every voice matters.",
    },
    registeredCount: "1,126",
    registeredLabel: {
      hi: "कुल पंजीकृत शिकायतें",
      en: "Total registered complaints",
    },
    resolvedCount: "516",
    resolvedLabel: {
      hi: "कुल निराकृत शिकायतें",
      en: "Total resolved complaints",
    },
    chartNote: {
      hi: "संदर्भ पृष्ठ के अनुसार आंकड़े",
      en: "Figures from the reference page",
    },
  },
  services: {
    kicker: {
      hi: "नागरिक सेवाएं",
      en: "CITIZEN SERVICES",
    },
    heading: {
      hi: "हम आपकी क्या मदद कर सकते हैं?",
      en: "How can we help you?",
    },
    subheading: {
      hi: "आपकी शिकायत। आपकी स्थिति। आपकी प्रतिक्रिया।",
      en: "Your complaint. Your status. Your feedback.",
    },
    items: [
      {
        id: "register",
        no: "01",
        theme: "orange" as const,
        title: {
          hi: "शिकायत पंजीकरण",
          en: "Register a complaint",
        },
        description: {
          hi: "ऑनलाइन पोर्टल के माध्यम से अपनी नई शिकायत दर्ज करें",
          en: "Register your new complaint through the online portal.",
        },
        buttonText: {
          hi: "शिकायत दर्ज करें",
          en: "Register complaint",
        },
        link: "/login",
      },
      {
        id: "track",
        no: "02",
        theme: "blue" as const,
        title: {
          hi: "शिकायत की स्थिति",
          en: "Track your complaint",
        },
        description: {
          hi: "अपनी शिकायत संख्या दर्ज कर वर्तमान शिकायत की स्थिति देखें",
          en: "Enter your complaint number to view its current status.",
        },
        buttonText: {
          hi: "स्थिति देखें",
          en: "Check status",
        },
        link: "/complaint",
      },
      {
        id: "feedback",
        no: "03",
        theme: "green" as const,
        title: {
          hi: "नागरिक प्रतिक्रिया",
          en: "Citizen feedback",
        },
        description: {
          hi: "शिकायत समाधान के संबंध में अपनी शिकायत की प्रतिक्रिया और रेटिंग दें",
          en: "Share your feedback and rating about the resolution of your complaint.",
        },
        buttonText: {
          hi: "प्रतिक्रिया दें",
          en: "Give feedback",
        },
        link: "/login",
      },
    ],
  },
  process: {
    kicker: {
      hi: "प्रक्रिया प्रवाह",
      en: "THE COMPLAINT JOURNEY",
    },
    heading: {
      hi: "आपकी कॉल से समाधान तक।",
      en: "From your call to a resolution.",
    },
    faqLink: {
      hi: "अक्सर पूछे जाने वाले प्रश्न",
      en: "Frequently asked questions",
    },
    steps: [
      {
        step: "01",
        offset: "-282px -114px",
        alt: {
          hi: "हेल्पलाइन पर कॉल करती नागरिक",
          en: "Citizen calling helpline",
        },
        title: {
          hi: "डायल 1100",
          en: "Dial 1100",
        },
        description: {
          hi: "टोल-फ्री हेल्पलाइन पर कॉल करें।",
          en: "Call the toll-free helpline.",
        },
      },
      {
        step: "02",
        offset: "-450px -114px",
        alt: {
          hi: "शिकायत पंजीकरण करता ऑपरेटर",
          en: "Operator registering complaint",
        },
        title: {
          hi: "शिकायत पंजीकरण",
          en: "Complaint registered",
        },
        description: {
          hi: "ऑपरेटर शिकायत का पंजीकरण करेंगे और विभाग के अधिकारी को शिकायत प्रेषित करेंगे।",
          en: "The operator registers the complaint and sends it to the departmental officer.",
        },
      },
      {
        step: "03",
        offset: "-619px -114px",
        alt: {
          hi: "समाधान करता विभागीय अधिकारी",
          en: "Department officer resolving complaint",
        },
        title: {
          hi: "विभागीय समाधान",
          en: "Departmental action",
        },
        description: {
          hi: "विभाग के अधिकारी द्वारा शिकायत का समाधान किया जाएगा।",
          en: "The departmental officer resolves the complaint.",
        },
      },
      {
        step: "04",
        offset: "-780px -114px",
        alt: {
          hi: "नागरिक को जानकारी देता ऑपरेटर",
          en: "Operator updating citizen",
        },
        title: {
          hi: "समाधान की जानकारी",
          en: "Resolution update",
        },
        description: {
          hi: "ऑपरेटर नागरिक को शिकायत संबंधी निराकरण की जानकारी देंगे।",
          en: "The operator informs the citizen about the resolution.",
        },
      },
      {
        step: "05",
        offset: "-950px -114px",
        alt: {
          hi: "संतुष्ट नागरिक",
          en: "Satisfied citizen",
        },
        title: {
          hi: "नागरिक की संतुष्टि",
          en: "Citizen satisfaction",
        },
        description: {
          hi: "यदि नागरिक संतुष्ट है तो शिकायत बंद कर दी जाएगी।",
          en: "The complaint is closed if the citizen is satisfied.",
        },
      },
    ],
  },
  support: {
    kicker: {
      hi: "बिहार सहयोग हेल्पलाइन",
      en: "BIHAR SAHYOG HELPLINE",
    },
    heading: {
      hi: "सिर्फ एक कॉल पर सहायता।",
      en: "One call. A helping hand.",
    },
    subtext: {
      hi: "24×7 / 365 दिन · राज्य कॉल सेंटर",
      en: "24×7 / 365 days · State Call Centre",
    },
    tollFreeBadge: {
      hi: "टोल-फ्री",
      en: "TOLL-FREE",
    },
    callNow: {
      hi: "अभी कॉल करें",
      en: "Call now",
    },
    number: "1100",
  },
  about: {
    kicker: {
      hi: "हर नागरिक से जुड़ा सहयोग",
      en: "CONNECTED TO EVERY CITIZEN",
    },
    text: {
      hi: "बिहार सहयोग हेल्पलाइन बिहार सरकार का एक पारदर्शी एवं समयबद्ध डिजिटल माध्यम है, जो नागरिकों को उनकी समस्याओं के समाधान हेतु सीधे संबंधित विभागों से जोड़ता है।",
      en: "Bihar Sahyog Helpline is a transparent and time-bound digital medium of the Government of Bihar, connecting citizens directly with the relevant departments to resolve their problems.",
    },
  },
  footer: {
    brandTitleLine1: {
      hi: "बिहार सहयोग",
      en: "Bihar Sahyog",
    },
    brandTitleLine2: {
      hi: "हेल्पलाइन",
      en: "Helpline",
    },
    brandSubtitle: {
      hi: "बिहार सरकार",
      en: "Government of Bihar",
    },
    contactTitle: {
      hi: "संपर्क करें",
      en: "Contact us",
    },
    tollFreeLabel: {
      hi: "टोल-फ्री: 1100",
      en: "Toll-free: 1100",
    },
    email: "sahyoghelpline@bihar.gov.in",
    workingHours: {
      hi: "24×7 / 365 दिन राज्य कॉल सेंटर",
      en: "24×7 / 365 days State Call Centre",
    },
    addressTitle: {
      hi: "आधिकारिक पता",
      en: "Official address",
    },
    addressLines: {
      hi: ["सहयोग हेल्पलाइन", "11वीं मंजिल, बिस्कोमान टॉवर", "पश्चिम गांधी मैदान", "पटना, बिहार - 800001"],
      en: ["Sahyog Helpline", "11th Floor, Biscomaun Tower", "West Gandhi Maidan", "Patna, Bihar – 800001"],
    },
    copyright: {
      hi: "© बिहार सरकार | सर्वाधिकार सुरक्षित",
      en: "© Government of Bihar | All rights reserved",
    },
    beltronCredit: {
      hi: "मूल पोर्टल द्वारा डिज़ाइन एवं विकसित",
      en: "Original portal designed & developed by",
    },
    beltronOrg: "BSEDC (BELTRON)",
  },
  disclaimer: {
    title: {
      hi: "अस्वीकरण :",
      en: "Disclaimer:",
    },
    text: {
      hi: "इस वेबसाइट पर उपलब्ध अंग्रेजी सामग्री को आधिकारिक और प्रामाणिक संस्करण माना जाएगा। हिंदी सामग्री केवल अनुवाद और उपयोगकर्ता की सुविधा के लिए प्रदान की गई है। किसी भी विसंगति या व्याख्या में अंतर की स्थिति में अंग्रेजी संस्करण मान्य होगा।",
      en: "The English content available on this website shall be considered the official and authentic version. Hindi content is provided only as a translation for user convenience. In case of any discrepancy or difference in interpretation, the English version shall prevail.",
    },
  },
  assistant: {
    toggleBtn: {
      hi: "सहयोग सहायक",
      en: "Sahyog assistant",
    },
    title: {
      hi: "बिहार हेल्पलाइन सहायक",
      en: "Bihar Helpline Assistant",
    },
    subtitle: {
      hi: "मूल पोर्टल पर आगे बढ़ने के लिए सेवा चुनें।",
      en: "Choose a service to continue on the original portal.",
    },
    register: {
      hi: "शिकायत दर्ज करें",
      en: "Register a complaint",
    },
    track: {
      hi: "शिकायत की स्थिति देखें",
      en: "Track complaint status",
    },
    aiPortal: {
      hi: "एआई सहायक के लिए पोर्टल खोलें",
      en: "Open portal for the AI assistant",
    },
    callNow: {
      hi: "1100 पर कॉल करें",
      en: "Call 1100",
    },
  },
};
