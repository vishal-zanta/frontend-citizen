import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Star } from "lucide-react";

interface StarRatingInputProps {
  onSubmit: (rating: number) => void;
}

/**
 * StarRatingInput — rendered as the input bar override during the feedback flow.
 * Renders 5 interactive stars; clicking one submits the rating.
 */
export function StarRatingInput({ onSubmit }: StarRatingInputProps) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleSelect = (n: number) => {
    setSelected(n);
    setTimeout(() => onSubmit(n), 300);
  };

  return (
    <div className="p-3 border-t border-border bg-card flex flex-col items-center gap-2 shrink-0">
      <p className="text-xs text-muted-foreground">
        {t("Tap a star to rate your experience", "अनुभव को रेट करने के लिए स्टार टैप करें")}
      </p>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleSelect(n)}
            className="cursor-pointer transition-transform hover:scale-125 active:scale-95"
            title={`${n} ${t("star", "स्टार")}`}
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                n <= (hovered || selected)
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/40"
              }`}
            />
          </button>
        ))}
      </div>
      {selected > 0 && (
        <p className="text-xs text-amber-500 font-semibold">
          {selected === 5
            ? t("Excellent! 🎉", "शानदार! 🎉")
            : selected >= 4
            ? t("Great! 👍", "बहुत बढ़िया! 👍")
            : selected >= 3
            ? t("Good 🙂", "ठीक है 🙂")
            : t("We'll improve 🙏", "हम सुधार करेंगे 🙏")}
        </p>
      )}
    </div>
  );
}
