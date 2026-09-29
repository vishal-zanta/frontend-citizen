import React from "react";
import { RotateCw, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ChatCaptchaPromptProps {
  svgContent: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const ChatCaptchaPrompt: React.FC<ChatCaptchaPromptProps> = ({
  svgContent,
  onRefresh,
  isLoading = false,
}) => {
  const { t } = useLanguage();

  return (
    <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-border shadow-xs space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>{t("Security Verification", "सुरक्षा सत्यापन")}</span>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          title={t("Refresh security code", "सुरक्षा कोड रिफ्रेश करें")}
          className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 font-medium px-2 py-0.5 rounded-md hover:bg-primary/10 transition-colors cursor-pointer disabled:opacity-50"
        >
          <RotateCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
          <span>{t("Reload", "रिफ्रेश")}</span>
        </button>
      </div>

      <div className="flex items-center justify-center p-2 bg-white rounded-lg border border-slate-200 overflow-hidden shadow-inner select-none h-14">
        {isLoading ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
            <span>{t("Loading captcha...", "कैप्चा लोड हो रहा है...")}</span>
          </div>
        ) : svgContent ? (
          <div
            className="w-full h-full flex items-center justify-center [&_svg]:h-full [&_svg]:w-auto"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <span className="text-xs text-muted-foreground">
            {t("Click reload to load captcha", "कैप्चा लोड करने के लिए रिफ्रेश करें")}
          </span>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground leading-tight">
        {t(
          "Type the characters shown in the image into the chat input below and press Enter.",
          "नीचे चैट इनपुट में चित्र में दिखाए गए अक्षर टाइप करें और Enter दबाएं।"
        )}
      </p>
    </div>
  );
};

export default ChatCaptchaPrompt;
