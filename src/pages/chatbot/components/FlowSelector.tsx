import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export interface QuickAction {
  label: string;
  labelHindi?: string;
  key: string;
}

interface FlowSelectorProps {
  onClick: (val: string) => void;
  quickActions: QuickAction[];
}

const FlowSelector: React.FC<FlowSelectorProps> = ({ onClick, quickActions }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {quickActions?.map((act) => (
        <button
          key={act.key}
          type="button"
          onClick={() => onClick(act.key)}
          className="px-3 py-1.5 text-xs font-medium rounded-xl border border-border bg-card hover:bg-muted text-foreground hover:border-primary/50 transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          {t(act.label, act.labelHindi || act.label)}
        </button>
      ))}
    </div>
  );
};

export default FlowSelector;