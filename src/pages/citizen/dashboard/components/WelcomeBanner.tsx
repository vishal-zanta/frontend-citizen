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
    <div className="bg-gradient-to-r from-blue-900 to-blue-600 dark:from-blue-950 dark:to-slate-900 rounded-2xl p-4 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-transparent dark:border-slate-800">
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
    </div>
  );
}

