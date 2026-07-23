import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from '@/api/auth.api'
import { useProfile } from '@/context/ProfileContext'
import { getErrorToast, getSuccessToast } from '@/utils/helpers'

const LangSelector = () => {
  const { lang, setLang, t } = useLanguage();
  const { profile } = useProfile();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (newLang: string) =>
      updateProfile({
        fullName: profile?.fullName || "",
        email: profile?.email || null,
        preferredLanguage: newLang === "hi" ? "Hindi" : "English",
      }),
    onSuccess: () => {
      getSuccessToast(t("Language updated successfully", "भाषा सफलतापूर्वक अपडेट की गई"));
      queryClient.invalidateQueries({ queryKey: ["auth-profile"] });
    },
    onError: (err: any) => {
      getErrorToast(err);
    },
  });

  const handleLanguageChange = (v: string) => {
    setLang(v);
    if (profile) {
      updateProfileMutation.mutate(v);
    }
  };

  const isPending = updateProfileMutation.isPending;

  return (
    <div className={`flex items-center gap-1.5 text-xs font-semibold ${isPending ? "pointer-events-none opacity-60" : ""}`}>
      <button
        type="button"
        onClick={() => handleLanguageChange("en")}
        disabled={isPending}
        className={`px-2 py-1 rounded transition-all cursor-pointer border ${
          lang === "en"
            ? "bg-primary text-primary-foreground border-primary font-bold"
            : "text-foreground/80 hover:text-foreground hover:bg-muted border-transparent font-medium"
        }`}
      >
        English
      </button>
      <span className="text-muted-foreground/35 select-none font-normal">|</span>
      <button
        type="button"
        onClick={() => handleLanguageChange("hi")}
        disabled={isPending}
        className={`px-2 py-1 rounded transition-all cursor-pointer border ${
          lang === "hi"
            ? "bg-primary text-primary-foreground border-primary font-bold"
            : "text-foreground/80 hover:text-foreground hover:bg-muted border-transparent font-medium"
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
}

export default LangSelector