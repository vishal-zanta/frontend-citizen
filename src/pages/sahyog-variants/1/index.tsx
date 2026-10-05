import React from "react";
import UtilityBar from "./components/UtilityBar";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import NoticeBanner from "./components/NoticeBanner";
import ImpactSection from "./components/ImpactSection";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import SupportSection from "./components/SupportSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import Disclaimer from "./components/Disclaimer";
import FloatingAssistant from "./components/FloatingAssistant";
import { useLanguage } from "@/context/LanguageContext";
import Chatbot from "@/pages/chatbot";

const SahyogPageVariant1: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#162f47] antialiased selection:bg-[#ffb757]/30 selection:text-[#10365e]">
      {/* Skip to Main Content (Accessibility) */}
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#204e83] focus:font-bold focus:shadow-lg focus:rounded-md focus:border focus:border-[#204e83]"
      >
        {t("Skip to main content", "मुख्य सामग्री पर जाएं")}
      </a>

      {/* Top Utility Bar with Language Selector */}
      <UtilityBar />

      {/* Main Header / Navigation */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Editorial Hero with Visual Crossfade & Hotline CTA */}
        <HeroSection />

        {/* 24x7 Notice Banner */}
        <NoticeBanner />

        {/* Statistics / Impact Section */}
        <ImpactSection />

        {/* Citizen Services Action Lanes */}
        <ServicesSection />

        {/* 5-Step Complaint Journey Infographic */}
        <ProcessSection />

        {/* Helpline 1100 Callout Banner */}
        <SupportSection />

        {/* About Sahyog Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Legal & Language Disclaimer */}
      {/* <Disclaimer /> */}

      {/* Floating Sahyog Assistant Widget */}
      {/* <FloatingAssistant /> */}
      <Chatbot/>
    </div>
  );
};

export default SahyogPageVariant1;