import React, { useState } from "react";
import {
  Moon,
  Sun,
  ChevronsUp,
  ChevronsDown,
  RotateCcw,
  X,
  PersonStanding,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "@/context/LanguageContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { cn } from "@/lib/utils";

export default function AccessibilityTools() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const {
    highContrast,
    setHighContrast,
    increaseText,
    decreaseText,
    resetAccessibility,
    textSpacingLevel,
    toggleTextSpacing,
    lineHeightLevel,
    toggleLineHeight,
    isCustomized,
  } = useAccessibility();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={t("Accessibility Tools", "पहुंच उपकरण")}
          title={t("Accessibility Tools", "पहुंच उपकरण")}
          className={cn(
            "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer relative",
            isCustomized && "text-primary bg-primary/10",
          )}
        >
          <PersonStanding className="w-5 h-5" />
          {isCustomized && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[320px] sm:w-[350px] p-0 py-4 rounded-2xl bg-card border border-border shadow-2xl text-card-foreground relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-3.5 right-4 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-4">
          {/* Contrast Adjustment */}
          <div>
            <div className="px-5 pb-2.5 border-b border-border/80 pr-10">
              <h3 className="text-sm font-bold text-foreground">
                {t("Contrast Adjustment", "Contrast Adjustment")}
              </h3>
            </div>

            <div className="px-5 pt-3.5">
              <div className="grid grid-cols-2 gap-3">
                {/* High Contrast */}
                <button
                  type="button"
                  onClick={() => setHighContrast(true)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border-2 transition-all cursor-pointer",
                    highContrast
                      ? "border-red-500 bg-red-50/10 text-foreground font-semibold shadow-xs"
                      : "border-border bg-card hover:bg-muted/50 text-foreground/80 font-medium",
                  )}
                >
                  <Moon className="w-6 h-6 fill-current text-foreground" />
                  <span className="text-xs text-center leading-tight">
                    {t("High Contrast", "High Contrast")}
                  </span>
                </button>

                {/* Normal */}
                <button
                  type="button"
                  onClick={() => setHighContrast(false)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border-2 transition-all cursor-pointer",
                    !highContrast
                      ? "border-red-500 bg-red-50/10 text-foreground font-semibold shadow-xs"
                      : "border-border bg-card hover:bg-muted/50 text-foreground/80 font-medium",
                  )}
                >
                  <Sun className="w-6 h-6 text-foreground" />
                  <span className="text-xs text-center leading-tight">
                    {t("Normal", "Normal")}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Text Size & Formatting */}
          <div>
            <div className="px-5 pb-2.5 border-b border-border/80">
              <h3 className="text-sm font-bold text-foreground">
                {t("Text Size", "Text Size")}
              </h3>
            </div>

            <div className="px-5 pt-3.5 space-y-2.5">
              {/* Row 1: Increase, Decrease, Reset */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={increaseText}
                  className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-border bg-card hover:bg-muted/60 text-foreground transition-all cursor-pointer"
                >
                  <ChevronsUp className="w-5 h-5 text-foreground" />
                  <span className="text-[11px] font-semibold text-center leading-tight">
                    {t("Increase Text", "Increase Text")}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={decreaseText}
                  className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-border bg-card hover:bg-muted/60 text-foreground transition-all cursor-pointer"
                >
                  <ChevronsDown className="w-5 h-5 text-foreground" />
                  <span className="text-[11px] font-semibold text-center leading-tight">
                    {t("Decrease Text", "Decrease Text")}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={resetAccessibility}
                  className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-border bg-card hover:bg-muted/60 text-foreground transition-all cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5 text-foreground" />
                  <span className="text-[11px] font-semibold text-center leading-tight">
                    {t("Reset Text", "Reset Text")}
                  </span>
                </button>
              </div>

              {/* Row 2: Text Spacing & Line Height */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={toggleTextSpacing}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border transition-all cursor-pointer",
                    textSpacingLevel > 0
                      ? "border-red-500 bg-red-50/10 text-foreground font-semibold"
                      : "border-border bg-card hover:bg-muted/60 text-foreground",
                  )}
                >
                  {/* TT Icon */}
                  <div className="flex items-baseline font-serif font-bold text-foreground text-base leading-none">
                    <span>T</span>
                    <span className="text-xs">T</span>
                  </div>
                  <span className="text-[11px] font-semibold text-center leading-tight">
                    {t("Text Spacing", "Text Spacing")}
                    {textSpacingLevel > 0 && ` (${textSpacingLevel})`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={toggleLineHeight}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border transition-all cursor-pointer",
                    lineHeightLevel > 0
                      ? "border-red-500 bg-red-50/10 text-foreground font-semibold"
                      : "border-border bg-card hover:bg-muted/60 text-foreground",
                  )}
                >
                  {/* Line Height Icon */}
                  <svg
                    className="w-5 h-5 text-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="6" x2="15" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="15" y2="18" />
                    <polyline points="18 4 20 6 18 8" />
                    <polyline points="18 16 20 18 18 20" />
                  </svg>
                  <span className="text-[11px] font-semibold text-center leading-tight">
                    {t("Line Height", "Line Height")}
                    {lineHeightLevel > 0 && ` (${lineHeightLevel})`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
