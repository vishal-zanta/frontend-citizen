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
    question: "What is Bihar Sahyog Portal – Real-Time Monitoring System?",
    questionHindi: "बिहार सहयोग पोर्टल – रियल-टाइम मॉनिटरिंग सिस्टम क्या है?",
    answer:
      "Bihar Sahyog Portal – Real-Time Monitoring System is a centralized digital platform of the Government of Bihar for registration, monitoring, tracking, and time-bound resolution of public grievances.",
    answerHindi:
      "बिहार सहयोग पोर्टल – रियल-टाइम मॉनिटरिंग सिस्टम बिहार सरकार का एक केंद्रीकृत डिजिटल प्लेटफॉर्म है, जो जन शिकायतों के पंजीकरण, निगरानी, ट्रैकिंग और समयबद्ध समाधान के लिए बनाया गया है।",
  },
  {
    id: "faq-2",
    number: "02",
    question: "What is the objective of the Bihar Sahyog Portal?",
    questionHindi: "बिहार सहयोग पोर्टल का मुख्य उद्देश्य क्या है?",
    answer: "The key objectives are to:-",
    answerHindi: "इसके मुख्य उद्देश्य निम्नलिखित हैं:-",
    points: [
      "Ensure transparency and accountability",
      "Enable time-bound grievance resolution",
      "Facilitate monitoring at Department, District, and higher administrative levels",
      "Improve public service delivery",
    ],
    pointsHindi: [
      "पारदर्शिता और जवाबदेही सुनिश्चित करना",
      "समयबद्ध शिकायत निवारण को सक्षम बनाना",
      "विभाग, जिला और उच्च प्रशासनिक स्तरों पर निगरानी की सुविधा प्रदान करना",
      "सार्वजनिक सेवा वितरण में सुधार करना",
    ],
  },
  {
    id: "faq-3",
    number: "03",
    question: "Who can file a grievance?",
    questionHindi: "शिकायत कौन दर्ज कर सकता है?",
    answer: "Any citizen can file a grievance related to:-",
    answerHindi: "कोई भी नागरिक निम्नलिखित से संबंधित शिकायत दर्ज कर सकता है:-",
    points: [
      "Government schemes and services",
      "Delay in service delivery",
      "Non-receipt of entitled benefits",
      "Misconduct or negligence of officials",
      "Infrastructure and civic issues",
    ],
    pointsHindi: [
      "सरकारी योजनाएं और सेवाएं",
      "सेवा वितरण में देरी",
      "पात्र लाभों का न मिलना",
      "अधिकारियों का दुर्व्यवहार या लापरवाही",
      "बुनियादी ढांचा और नागरिक समस्याएं",
    ],
  },
  {
    id: "faq-4",
    number: "04",
    question: "Through which channels can grievances be filed?",
    questionHindi: "किन माध्यमों से शिकायतें दर्ज की जा सकती हैं?",
    answer:
      "Grievances can be registered through the available channels, including:",
    answerHindi:
      "शिकायतें उपलब्ध माध्यमों से दर्ज की जा सकती हैं, जिनमें शामिल हैं:",
    points: [
      "Online Portal",
      "Chatbot",
      "SMS",
      "Email",
      "Voice/Call",
      "CCE (Citizen/Call Centre Executive), as applicable",
    ],
    pointsHindi: [
      "ऑनलाइन पोर्टल",
      "चैटबॉट",
      "एसएमएस (SMS)",
      "ईमेल",
      "वॉइस / कॉल (टोल-फ्री 1100)",
      "सीसीई (नागरिक / कॉल सेंटर एग्जीक्यूटिव), जहां लागू हो",
    ],
  },
  {
    id: "faq-5",
    number: "05",
    question: "What information is required to file a grievance?",
    questionHindi: "शिकायत दर्ज करने के लिए क्या जानकारी आवश्यक है?",
    answer: "The complainant may be required to provide:",
    answerHindi: "शिकायतकर्ता को निम्नलिखित विवरण प्रदान करने की आवश्यकता हो सकती है:",
    points: [
      "Name and contact details",
      "Address/District/Block/panchyat",
      "Concerned Department",
      "Description of the grievance",
      "Supporting documents, if applicable",
    ],
    pointsHindi: [
      "नाम और संपर्क विवरण (मोबाइल नंबर)",
      "पता / जिला / प्रखंड (ब्लॉक) / पंचायत",
      "संबंधित विभाग",
      "शिकायत का विस्तृत विवरण",
      "सहायक दस्तावेज, यदि लागू हो",
    ],
  },
  {
    id: "faq-6",
    number: "06",
    question: "Will I receive an acknowledgement after submission?",
    questionHindi: "क्या शिकायत दर्ज करने के बाद पावती प्राप्त होगी?",
    answer:
      "Yes. After successful registration, a unique Grievance Registration Number is generated. An acknowledgement may also be sent through SMS/Email to the registered contact details.",
    answerHindi:
      "हाँ। सफल पंजीकरण के बाद एक विशिष्ट शिकायत पंजीकरण संख्या उत्पन्न होती है। पंजीकृत संपर्क विवरण पर एसएमएस/ईमेल के माध्यम से पावती भी भेजी जाती है।",
  },
  {
    id: "faq-7",
    number: "07",
    question: "How can I track my grievance?",
    questionHindi: "मैं अपनी शिकायत कैसे ट्रैक कर सकता हूँ?",
    answer:
      "Citizens can track their grievance by using the Grievance Registration Number through the Sahyog Portal and other available tracking mechanisms.",
    answerHindi:
      "नागरिक सहयोग पोर्टल और अन्य उपलब्ध ट्रैकिंग तंत्रों के माध्यम से शिकायत पंजीकरण संख्या दर्ज करके अपनी शिकायत को ट्रैक कर सकते हैं।",
  },
  {
    id: "faq-8",
    number: "08",
    question: "What is the time limit for grievance disposal?",
    questionHindi: "शिकायत निवारण के लिए समय सीमा क्या है?",
    answer:
      "The disposal timeline depends on the department and nature of the grievance. Where applicable, grievances may be processed through defined levels, with a prescribed timeline at each level.",
    answerHindi:
      "निपटारे की समय सीमा विभाग और शिकायत की प्रकृति पर निर्भर करती है। जहाँ लागू हो, शिकायतों को निर्धारित स्तरों के माध्यम से प्रत्येक स्तर पर तय समय सीमा के भीतर संसाधित किया जाता है।",
  },
  {
    id: "faq-9",
    number: "09",
    question: "What happens if my grievance is not resolved within the prescribed time?",
    questionHindi: "यदि मेरी शिकायत निर्धारित समय के भीतर हल नहीं होती है तो क्या होगा?",
    answer:
      "If a grievance is not resolved within the prescribed timeline, it may be escalated to the appropriate higher authority. Pending grievances are also monitored through the system dashboards.",
    answerHindi:
      "यदि शिकायत निर्धारित समय सीमा में हल नहीं होती है, तो इसे स्वतः उचित उच्च अधिकारी को अग्रेषित (Escalate) कर दिया जाता है। लंबित मामलों की निगरानी सिस्टम डैशबोर्ड के माध्यम से भी की जाती है।",
  },
  {
    id: "faq-10",
    number: "10",
    question: "Can I reopen a closed grievance?",
    questionHindi: "क्या मैं बंद की गई शिकायत को पुनः खोल सकता हूँ?",
    answer:
      "If the citizen is not satisfied with the resolution, they may use the available reopen/appeal mechanism, subject to the applicable rules and time limit.",
    answerHindi:
      "यदि नागरिक दिए गए समाधान से संतुष्ट नहीं हैं, तो वे लागू नियमों और समय सीमा के अधीन उपलब्ध री-ओपन / अपील तंत्र का उपयोग कर सकते हैं।",
  },
  {
    id: "faq-11",
    number: "11",
    question: "How is grievance monitoring done?",
    questionHindi: "शिकायतों की निगरानी कैसे की जाती है?",
    answer: "Grievances are monitored at multiple administrative levels, including:",
    answerHindi: "शिकायतों की निगरानी कई प्रशासनिक स्तरों पर की जाती है, जिनमें शामिल हैं:",
    points: [
      "Departmental level",
      "District level",
      "Senior Departmental/Secretariat level",
      "Higher-level monitoring dashboards, as applicable",
    ],
    pointsHindi: [
      "विभागीय स्तर",
      "जिला स्तर",
      "वरिष्ठ विभागीय / सचिवालय स्तर",
      "उच्च स्तरीय निगरानी डैशबोर्ड, जहां लागू हो",
    ],
  },
  {
    id: "faq-12",
    number: "12",
    question: "What is the escalation mechanism?",
    questionHindi: "एस्केलेशन (अग्रेषण) तंत्र क्या है?",
    answer:
      "The grievance may move through the defined escalation hierarchy, such as: Level 1 – Concerned Officer, Level 2 – District Authority, Level 3 – Departmental Authority, Higher-Level Monitoring*",
    answerHindi:
      "शिकायत निर्धारित एस्केलेशन पदानुक्रम के अनुसार आगे बढ़ती है, जैसे: स्तर 1 – संबंधित अधिकारी, स्तर 2 – जिला प्राधिकारी, स्तर 3 – विभागीय प्राधिकारी, उच्च-स्तरीय निगरानी*",
  },
  {
    id: "faq-13",
    number: "13",
    question: "Can supporting documents be uploaded?",
    questionHindi: "क्या सहायक दस्तावेज अपलोड किए जा सकते हैं?",
    answer:
      "Yes. Citizens may upload relevant supporting documents, such as PDFs and image files, subject to the portal's prescribed file-size and format limits.",
    answerHindi:
      "हाँ। नागरिक पोर्टल के निर्धारित फ़ाइल आकार और प्रारूप सीमा के अधीन पीडीएफ और छवि फ़ाइलों जैसे प्रासंगिक सहायक दस्तावेज अपलोड कर सकते हैं।",
  },
  {
    id: "faq-14",
    number: "14",
    question: "Whom can I contact for technical issues?",
    questionHindi: "तकनीकी समस्याओं के लिए मैं किससे संपर्क कर सकता हूँ?",
    answer:
      "For technical assistance, citizens may contact the designated Sahyog Portal Helpdesk/Technical Support, as provided on the portal.",
    answerHindi:
      "तकनीकी सहायता के लिए नागरिक पोर्टल पर दिए गए निर्दिष्ट सहयोग पोर्टल हेल्पलाइन / तकनीकी सहायता केंद्र से संपर्क कर सकते हैं।",
  },
  {
    id: "faq-15",
    number: "15",
    question: "How does the Bihar Sahyog Portal improve governance?",
    questionHindi: "बिहार सहयोग पोर्टल शासन व्यवस्था में कैसे सुधार लाता है?",
    answer: "The system supports better governance through:",
    answerHindi: "यह प्रणाली निम्नलिखित माध्यमों से सुशासन को बढ़ावा देती है:",
    points: [
      "Real-time grievance monitoring",
      "Data analytics and reporting",
      "District-wise pendency monitoring",
      "Department-wise performance analysis",
      "Identification of recurring issues for administrative improvement",
    ],
    pointsHindi: [
      "रियल-टाइम शिकायत निगरानी",
      "डेटा एनालिटिक्स और रिपोर्टिंग",
      "जिलावार लंबित मामलों की निगरानी",
      "विभागवार प्रदर्शन विश्लेषण",
      "प्रशासनिक सुधार हेतु बार-बार आने वाली समस्याओं की पहचान",
    ],
  },
];