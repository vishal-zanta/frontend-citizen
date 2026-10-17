import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ImpactSection from "./components/ImpactSection";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import AboutSection from "./components/AboutSection";
import SupportSection from "./components/SupportSection";
import Footer from "./components/Footer";
import Disclaimer from "./components/Disclaimer";
import AssistantPanel from "./components/AssistantPanel";
import { useLanguage } from "@/context/LanguageContext";
import biharWideDoodle from "@/assets/sahyog-variants/2/variation-2/bihar-wide-doodle.png";
import biharContinuousDoodle from "@/assets/sahyog-variants/2/variation-2/bihar-continuous-doodle.png";
import "./sahyog-variation-2.css";
import Chatbot from "@/pages/chatbot";


const SahyogVariant2: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div
      className="sahyog-variant-2 min-h-screen flex flex-col selection:bg-[#f77b10]/20 selection:text-[#113859]"
      style={{
        ["--wide-doodle" as string]: `url(${biharWideDoodle})`,
        ["--continuous-doodle" as string]: `url(${biharContinuousDoodle})`,
      }}
    >
      {/* SVG Icon Definitions */}
      <svg className="symbols" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <symbol id="phone" viewBox="0 0 24 24">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
          </symbol>
          <symbol id="file" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6M8 13h8M8 17h5" />
          </symbol>
          <symbol id="check" viewBox="0 0 24 24">
            <path d="m9 11 3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </symbol>
          <symbol id="search" viewBox="0 0 24 24">
            <circle cx="10.5" cy="10.5" r="7.5" />
            <path d="m16 16 5 5" />
          </symbol>
          <symbol id="message" viewBox="0 0 24 24">
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
            <path d="M8 10h8M8 14h5" />
          </symbol>
          <symbol id="headset" viewBox="0 0 24 24">
            <path d="M3 14v-3a9 9 0 0 1 18 0v3M21 17v1a4 4 0 0 1-4 4h-3" />
            <rect x="2" y="11" width="4" height="7" rx="2" />
            <rect x="18" y="11" width="4" height="7" rx="2" />
          </symbol>
          <symbol id="building" viewBox="0 0 24 24">
            <path d="m3 9 9-7 9 7H3ZM4 22h16M6 9v10M12 9v10M18 9v10M2 19h20" />
          </symbol>
          <symbol id="smile" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 3 4 3 4-3 4-3M8 8h.01M16 8h.01" />
          </symbol>
          <symbol id="mail" viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 6 10 7 10-7" />
          </symbol>
        </defs>
      </svg>

      {/* Skip to Main Content (Accessibility) */}
      <a className="skip" href="#services">
        {t("Skip to main content", "मुख्य सामग्री पर जाएं")}
      </a>

      {/* Main Header / Navigation */}
      <Header />

      {/* Main Page Content */}
      <main>
        {/* Leadership Hero Carousel (Crossfading 2 leadership views) */}
        <HeroSection />

        {/* Statistics / Impact Section */}
        <ImpactSection />

        {/* Citizen Services 3-Lane Grid */}
        <ServicesSection />

        {/* 5-Step Complaint Journey Flow */}
        <ProcessSection />

        {/* Connected Heritage Culture Banner & Helpline Support Section */}
        <section
          className="citizen-connect wrap"
          aria-label={t("Bihar Sahyog Helpline", "बिहार सहयोग हेल्पलाइन")}
        >
          <AboutSection />
          <SupportSection />
        </section>
      </main>

      {/* Civic Footer */}
      <Footer />

      {/* Language / Legal Disclaimer */}
      <Disclaimer />

      {/* Floating Sahyog Assistant Panel & Trigger */}
      {/* <AssistantPanel onOpenChatbot={() => setShowChatbot(true)} /> */}

      {/* Chatbot modal */}
      {/* {showChatbot && ( */}
        <div className="relative z-50">
          <Chatbot />
        </div>
      {/* )} */}
    </div>
  );
};

export default SahyogVariant2;