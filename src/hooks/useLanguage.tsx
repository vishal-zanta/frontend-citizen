import { useProfile } from "@/context/ProfileContext";
import { useState, useEffect, useCallback } from "react";

export function useLanguage() {
  const { profile } = useProfile();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (profile?.preferredLanguage === "Hindi") {
      setLang("hi");
    }
  }, [profile]);

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  }, []);

  const t = useCallback((en : any, hi: any) => (lang === "hi" ? hi : en), [lang]);

  return { lang, setLang, toggle, t };
}
