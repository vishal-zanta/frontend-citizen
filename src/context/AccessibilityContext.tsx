import React, { createContext, useContext, useEffect, useState } from "react";

export interface AccessibilityContextType {
  fontScale: number;
  setFontScale: React.Dispatch<React.SetStateAction<number>>;
  increaseText: () => void;
  decreaseText: () => void;
  highContrast: boolean;
  setHighContrast: React.Dispatch<React.SetStateAction<boolean>>;
  toggleHighContrast: () => void;
  textSpacingLevel: number;
  setTextSpacingLevel: React.Dispatch<React.SetStateAction<number>>;
  toggleTextSpacing: () => void;
  lineHeightLevel: number;
  setLineHeightLevel: React.Dispatch<React.SetStateAction<number>>;
  toggleLineHeight: () => void;
  resetAccessibility: () => void;
  isCustomized: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

const SPACING_OPTIONS = ["normal", "0.05em", "0.1em"];
const LINE_HEIGHT_OPTIONS = ["normal", "1.75", "2"];

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fontScale, setFontScale] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("bucgp_font_scale");
      return saved ? parseFloat(saved) || 1 : 1;
    } catch {
      return 1;
    }
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    try {
      return localStorage.getItem("bucgp_high_contrast") === "true";
    } catch {
      return false;
    }
  });

  const [textSpacingLevel, setTextSpacingLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("bucgp_text_spacing_level");
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [lineHeightLevel, setLineHeightLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("bucgp_line_height_level");
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  // Apply Font Scale
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-scale",
      fontScale.toString(),
    );
    try {
      localStorage.setItem("bucgp_font_scale", fontScale.toString());
    } catch {}
  }, [fontScale]);

  // Apply High Contrast
  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
    try {
      localStorage.setItem("bucgp_high_contrast", String(highContrast));
    } catch {}
  }, [highContrast]);

  // Apply Text Spacing
  useEffect(() => {
    const spacing = SPACING_OPTIONS[textSpacingLevel] || "normal";
    document.documentElement.style.setProperty("--letter-spacing", spacing);
    try {
      localStorage.setItem(
        "bucgp_text_spacing_level",
        textSpacingLevel.toString(),
      );
    } catch {}
  }, [textSpacingLevel]);

  // Apply Line Height
  useEffect(() => {
    const lh = LINE_HEIGHT_OPTIONS[lineHeightLevel] || "normal";
    document.documentElement.style.setProperty("--line-height", lh);
    try {
      localStorage.setItem(
        "bucgp_line_height_level",
        lineHeightLevel.toString(),
      );
    } catch {}
  }, [lineHeightLevel]);

  const increaseText = () => {
    setFontScale((prev) => Math.min(+(prev + 0.1).toFixed(2), 1.4));
  };

  const decreaseText = () => {
    setFontScale((prev) => Math.max(+(prev - 0.1).toFixed(2), 0.8));
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  const toggleTextSpacing = () => {
    setTextSpacingLevel((prev) => (prev + 1) % SPACING_OPTIONS.length);
  };

  const toggleLineHeight = () => {
    setLineHeightLevel((prev) => (prev + 1) % LINE_HEIGHT_OPTIONS.length);
  };

  const resetAccessibility = () => {
    setFontScale(1);
    setHighContrast(false);
    setTextSpacingLevel(0);
    setLineHeightLevel(0);
  };

  const isCustomized =
    fontScale !== 1 || highContrast || textSpacingLevel > 0 || lineHeightLevel > 0;

  return (
    <AccessibilityContext.Provider
      value={{
        fontScale,
        setFontScale,
        increaseText,
        decreaseText,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        textSpacingLevel,
        setTextSpacingLevel,
        toggleTextSpacing,
        lineHeightLevel,
        setLineHeightLevel,
        toggleLineHeight,
        resetAccessibility,
        isCustomized,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider",
    );
  }
  return context;
};

export default AccessibilityProvider;
