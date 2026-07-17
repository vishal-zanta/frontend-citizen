import { useProfile } from "@/context/ProfileContext";
import React from "react";

interface WelcomeBannerProps {
  t: (en: string, hi: string) => string;
  lang: string;
  toggle: () => void;
}

export default function WelcomeBanner({ t, lang, toggle }: WelcomeBannerProps) {
  const {profile} = useProfile();
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl p-4 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold mb-1">
          {t(`Namaste, ${profile?.fullName ?? "Citizen"}!`, "नमस्ते")}
        </h1>
        <p className="text-white/80 text-sm">
          {t(
            "Welcome to your citizen dashboard. File complaints, track status, and get assistance — all in one place.",
            "अपने नागरिक डैशबोर्ड में आपका स्वागत है। शिकायत दर्ज करें, स्थिति ट्रैक करें, और सहायता प्राप्त करें।"
          )}
        </p>
      </div>
      <button
        onClick={toggle}
        className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm text-white font-medium whitespace-nowrap cursor-pointer self-start sm:self-auto"
      >
        {lang === "en" ? "हिन्दी" : "English"}
      </button>
    </div>
  );
}
