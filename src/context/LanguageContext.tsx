import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useProfile } from "./ProfileContext";

const langContext = createContext(null);

const LanguageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const { profile } = useProfile();
  const [lang, setLang] = useState(
    () => sessionStorage.getItem("citizen-lang") || "hi",
  );

  // useEffect(() => {
  //   if (profile?.preferredLanguage === "Hindi") {
  //     setLang("hi");
  //   }
  // }, [profile]);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const updatedLang = prev === "en" ? "hi" : "en";
      sessionStorage.setItem("citizen-lang", updatedLang);
      return updatedLang;
    });
  }, []);

  const t = useCallback(
    (en: any, hi: any) => (lang === "hi" ? hi : en),
    [lang],
  );

  return (
    <langContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </langContext.Provider>
  );
};

export const useLanguage = () => useContext(langContext);

export default LanguageContextProvider;
