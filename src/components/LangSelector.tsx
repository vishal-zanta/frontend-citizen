import React from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const LangSelector = () => {
  const { lang, t, toggle } = useLanguage();



  return (
    <div className="relative inline-flex items-center">
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-md border border-border/80 bg-background/90 hover:bg-muted/60 text-foreground text-xs font-medium transition-all shadow-2xs
    
        `}
      >
        <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
        <select
          value={lang}
          onChange={() => toggle()}
          // disabled={isPending}
          aria-label={t("Select Language", "भाषा चुनें")}
          className="bg-transparent text-xs font-medium text-foreground cursor-pointer focus:outline-hidden pr-4 appearance-none"
        >
          <option
            value="en"
            className="bg-popover text-popover-foreground py-1"
          >
            English
          </option>
          <option
            value="hi"
            className="bg-popover text-popover-foreground py-1"
          >
            हिन्दी (Hindi)
          </option>
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground pointer-events-none absolute right-2" />
      </div>
    </div>
  );
};

export default LangSelector;
