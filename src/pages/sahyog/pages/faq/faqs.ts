export interface FAQItem {
  id: string;
  number: string;
  question: string;
  questionHindi: string;
  answer: string;
  answerHindi: string;
  points?: string[];
  pointsHindi?: string[];
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    number: "01",
    question: "What is Bihar Sahyog Portal?",
    questionHindi: "बिहार सहयोग पोर्टल क्या है?",
    answer:
      "Bihar Sahyog Portal is a centralized digital platform of the Government of Bihar for registration, monitoring, tracking, and time-bound resolution of public grievances.",
    answerHindi:
      "बिहार सहयोग पोर्टल बिहार सरकार का एक केंद्रीकृत डिजिटल मंच है, जो जन शिकायतों के पंजीकरण, निगरानी, ट्रैकिंग और समयबद्ध समाधान के लिए बनाया गया है।",
  },
  {
    id: "faq-2",
    number: "02",
    question: "Who can file a grievance?",
    questionHindi: "शिकायत कौन दर्ज करा सकता है?",
    answer: "Any citizen can file a grievance related to:-",
    answerHindi: "कोई भी नागरिक निम्नलिखित से संबंधित शिकायत दर्ज करा सकता है:-",
    points: [
      "Government schemes",
      "Public services delivery",
      "Delays in services",
      "Infrastructure or civic issues",
    ],
    pointsHindi: [
      "सरकारी योजनाएं",
      "लोक सेवा वितरण",
      "सेवाओं में अनावश्यक विलंब",
      "बुनियादी ढांचा या नागरिक समस्याएं",
    ],
  },
  {
    id: "faq-3",
    number: "03",
    question: "Through which channels can grievances be filed?",
    questionHindi: "शिकायत किन माध्यमों से दर्ज कराई जा सकती है?",
    answer:
      "Grievances can be registered through the available channels, including:",
    answerHindi:
      "शिकायतें उपलब्ध माध्यमों से दर्ज कराई जा सकती हैं, जिनमें शामिल हैं:",
    points: [
      "Toll free number",
      "Online Portal",
      "Chatbot",
      "IVRS",
      "Email",
      "Voice/Call",
      "CCE (Citizen/Call Centre Executive), as applicable",
    ],
    pointsHindi: [
      "टोल-फ्री नंबर",
      "ऑनलाइन पोर्टल",
      "चैटबॉट",
      "आईवीआरएस (IVRS)",
      "ईमेल",
      "वॉयस / कॉल",
      "सीसीई (कॉल सेंटर एग्जीक्यूटिव), यथोपयुक्त",
    ],
  },
  {
    id: "faq-4",
    number: "04",
    question: "What information is required to file a grievance?",
    questionHindi: "शिकायत दर्ज करने के लिए क्या जानकारी आवश्यक है?",
    answer: "The complainant may be required to provide:",
    answerHindi:
      "शिकायतकर्ता को निम्नलिखित विवरण प्रदान करने की आवश्यकता हो सकती है:",
    points: [
      "Name and contact details",
      "Address/District/Block/panchyat",
      "Concerned Department",
      "Description of the grievance",
      "Supporting documents, if applicable",
    ],
    pointsHindi: [
      "नाम और संपर्क विवरण",
      "पता / जिला / प्रखंड / पंचायत",
      "संबंधित विभाग",
      "शिकायत का विवरण",
      "सहायक दस्तावेज, यदि लागू हो",
    ],
  },
  {
    id: "faq-5",
    number: "05",
    question: "Will I receive an acknowledgement after submission?",
    questionHindi: "क्या शिकायत दर्ज करने के बाद पावती प्राप्त होगी?",
    answer:
      "Yes. After successful registration, a unique Grievance Registration Number is generated. An acknowledgement may also be sent through SMS/Email to the registered contact details.",
    answerHindi:
      "हाँ। सफल पंजीकरण के बाद एक विशिष्ट शिकायत पंजीकरण संख्या (Grievance Registration Number) उत्पन्न होती है। पंजीकृत संपर्क विवरण पर एसएमएस/ईमेल के माध्यम से पावती भी भेजी जा सकती है।",
  },
  {
    id: "faq-6",
    number: "06",
    question: "How can I track my grievance?",
    questionHindi: "मैं अपनी शिकायत कैसे ट्रैक कर सकता हूँ?",
    answer:
      "Citizens can track their grievance by using the Grievance Registration Number through the Sahyog Portal.",
    answerHindi:
      "नागरिक सहयोग पोर्टल के माध्यम से अपनी शिकायत पंजीकरण संख्या का उपयोग करके अपनी शिकायत को ट्रैक कर सकते हैं।",
  },
  {
    id: "faq-7",
    number: "07",
    question: "Can I reopen a closed grievance?",
    questionHindi: "क्या मैं बंद शिकायत को पुनः खोल सकता हूँ?",
    answer:
      "If the citizen is not satisfied with the resolution, they may use the available reopen/appeal mechanism.",
    answerHindi:
      "यदि नागरिक समाधान से संतुष्ट नहीं हैं, तो वे उपलब्ध रीओपन / अपील व्यवस्था का उपयोग कर सकते हैं।",
  },
  {
    id: "faq-8",
    number: "08",
    question: "What is the escalation mechanism?",
    questionHindi: "एस्केलेशन (अग्रेषण) व्यवस्था क्या है?",
    answer:
      "The grievance may move through the defined escalation hierarchy, such as: Level 1 – Concerned Officer, Level 2 – District Authority, Level 3 – Departmental Authority, Higher-Level Monitoring*",
    answerHindi:
      "शिकायत निर्धारित एस्केलेशन पदानुक्रम के अनुसार आगे बढ़ सकती है, जैसे: स्तर 1 – संबंधित अधिकारी, स्तर 2 – जिला प्राधिकारी, स्तर 3 – विभागीय प्राधिकारी / उच्च-स्तरीय निगरानी*",
  },
];
