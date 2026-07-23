import React from "react";
import { Link } from "react-router-dom";
import { FileText, Search, Bot, MessageSquare } from "lucide-react";

interface QuickActionsProps {
  t: (en: string, hi: string) => string;
}

export default function QuickActions({ t }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Link
        to="/citizen/raise"
        className="group bg-card rounded-xl border-2 border-blue-100 dark:border-slate-800 hover:border-primary p-4 sm:p-6 transition-all hover:shadow-lg"
      >
        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-foreground">
          {t("Raise a Complaint", "शिकायत दर्ज करें")}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t("3-step form — quick & easy", "3-चरण फॉर्म — त्वरित और आसान")}
        </p>
      </Link>

      <Link
        to="/citizen/track"
        className="group bg-card rounded-xl border-2 border-emerald-100 dark:border-slate-800 hover:border-emerald-400 p-4 sm:p-6 transition-all hover:shadow-lg"
      >
        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-foreground">
          {t("Track a Complaint", "शिकायत ट्रैक करें")}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t("View status & timeline", "स्थिति और समयरेखा देखें")}
        </p>
      </Link>

      <div
        className="group bg-card rounded-xl border-2 border-purple-100 dark:border-slate-800 hover:border-purple-400 p-4 sm:p-6 transition-all hover:shadow-lg cursor-pointer"
        onClick={() =>
          (document.querySelector(
            "[class*='fixed bottom-6 right-6']"
          ) as HTMLElement)?.click()
        }
      >
        <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Bot className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-foreground">
          {t("AI Assistant", "सहायक")}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t(
            "Chat & file complaints via chat",
            "चैट के माध्यम से शिकायत दर्ज करें"
          )}
        </p>
      </div>

      <Link
        to="/citizen/feedback"
        className="group bg-card rounded-xl border-2 border-amber-100 dark:border-slate-800 hover:border-amber-400 p-4 sm:p-6 transition-all hover:shadow-lg"
      >
        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-foreground">
          {t("Feedback", "प्रतिक्रिया")}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t("Share your experience", "अपना अनुभव साझा करें")}
        </p>
      </Link>
    </div>
  );
}
