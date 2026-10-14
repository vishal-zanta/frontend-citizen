import React from "react";
import UtilityBar from "./components/UtilityBar";
import NoticeBanner from "./components/NoticeBanner";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ImpactSection from "./components/ImpactSection";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import SupportSection from "./components/SupportSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import Disclaimer from "./components/Disclaimer";
import Chatbot from "@/pages/chatbot";
import { useLanguage } from "@/context/LanguageContext";

const SahyogVariant2: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7ee] text-[#14344c] antialiased selection:bg-[#f77b10]/20 selection:text-[#113859] overflow-x-hidden">
      {/* Skip to Main Content (Accessibility) */}
      {/* <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#113859] focus:font-bold focus:shadow-lg focus:rounded-sm focus:border focus:border-[#113859]"
      >
        {t("Skip to main content", "मुख्य सामग्री पर जाएं")}
      </a> */}

      {/* Top Utility Bar with Language Selector */}
      <UtilityBar />

      {/* 24x7 Notice Banner */}
      <NoticeBanner />

      {/* Main Header / Navigation */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Photographic Hero with Development Skyline & Leader */}
        <HeroSection />

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
      <Disclaimer />

      {/* Floating AI Chatbot Assistant */}
      <Chatbot />
    </div>
  );
};

export default SahyogVariant2;