import React, { useState, useEffect } from "react";
import { User, LogOut, Type, Contrast, Globe, Save } from "lucide-react";
import { base44 } from "@/api/base44Client";
import PortalLayout from "@/components/PortalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/auth.api";
import { getErrorToast, getSuccessToast } from "@/utils/helpers";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

interface CitizenProfile {
  fullName: string;
  mobile: string;
  email: string;
  preferredLanguage: string;
}

const profileSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
  email: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Invalid email address",
    }),
});

export default function CitizenSettings() {
  const { t, lang, setLang } = useLanguage();
  const { profile: profileApiData } = useProfile();
  const [profile, setProfile] = useState<CitizenProfile>({
    fullName: "",
    mobile: "",
    email: "",
    preferredLanguage: "English",
  });
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [fontScale, setFontScale] = useState("1");
  const [highContrast, setHighContrast] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (profileApiData) {
      setProfile({
        fullName: profileApiData.fullName || "",
        mobile: profileApiData.mobile || "",
        email: profileApiData.email || "",
        preferredLanguage: profileApiData.preferredLanguage || "English",
      });
      if (profileApiData.preferredLanguage) {
        setLang(profileApiData.preferredLanguage === "Hindi" ? "hi" : "en");
      }
    }
  }, [profileApiData, setLang]);

  useEffect(() => {
    try {
      setFontScale(localStorage.getItem("bucgp_font_scale") || "1");
      setHighContrast(localStorage.getItem("bucgp_high_contrast") === "true");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", fontScale);
    try {
      localStorage.setItem("bucgp_font_scale", fontScale);
    } catch {}
  }, [fontScale]);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
    try {
      localStorage.setItem("bucgp_high_contrast", String(highContrast));
    } catch {}
  }, [highContrast]);

  const updateProfileMutation = useMutation({
    mutationFn: () => {
      const payload: any = {
        fullName: profile.fullName,
        preferredLanguage: profile.preferredLanguage,
      };
      if (profile.email && profile.email.trim() !== "") {
        payload.email = profile.email.trim();
      }
      return updateProfile(payload);
    },
    onSuccess: (data) => {
      getSuccessToast(t("Profile updated successfully", "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई"));
      queryClient.invalidateQueries({ queryKey: ["auth-profile"] });
      console.log({ data: data?.data?.data });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
    onError: (err: any) => {
      getErrorToast(err);
    },
  });

  const saveProfile = () => {
    const result = profileSchema.safeParse({
      fullName: profile.fullName,
      email: profile.email,
    });

    if (!result.success) {
      const fieldErrors: { fullName?: string; email?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "fullName") fieldErrors.fullName = err.message;
        if (err.path[0] === "email") fieldErrors.email = err.message;
      });
      setErrors(fieldErrors);
      getErrorToast(result.error.errors[0].message);
      return;
    }

    setErrors({});
    updateProfileMutation.mutate();
  };

  const handleLogout = async () => {
     localStorage.removeItem("usertoken");
      sessionStorage.removeItem("usertoken");
      navigate("/");
  };

  return (
    <PortalLayout role="citizen">
      <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("Settings", "सेटिंग्स")}</h1>
          <p className="text-sm text-muted-foreground">
            {t(
              "Manage your profile, accessibility, and preferences.",
              "अपनी प्रोफ़ाइल, पहुंच और प्राथमिकताएँ प्रबंधित करें।"
            )}
          </p>
        </div>

        {/* Profile */}
        <Card className="">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-4 h-4" /> {t("Profile", "प्रोफ़ाइल")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div>
              <Label className="mb-1.5 block">
                {t("Full Name", "पूरा नाम")}
                <span className="text-destructive ml-0.5">*</span>
              </Label>
              <Input
                value={profile.fullName}
                onChange={(e) => {
                  setProfile({ ...profile, fullName: e.target.value });
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
              />
              {errors.fullName && (
                <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
              )}
            </div>
            <div>
              <Label className="mb-1.5 block">{t("Mobile", "मोबाइल")}</Label>
              <Input value={profile.mobile} disabled={true} />
            </div>
            <div>
              <Label className="mb-1.5 block">{t("Email", "ईमेल")}</Label>
              <Input
                value={profile.email}
                onChange={(e) => {
                  setProfile({ ...profile, email: e.target.value });
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email}</p>
              )}
            </div>
            <div className="pb-2 ">
              <Label className="mb-2 block flex items-center gap-2">
                <Globe className="w-4 h-4" /> {t("Language / भाषा", "भाषा")}
              </Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLang("en");
                    setProfile((p) => ({ ...p, preferredLanguage: "English" }));
                  }}
                  className={`px-4 py-2 rounded-lg text-sm border transition-all cursor-pointer ${
                    lang === "en"
                      ? "bg-primary text-primary-foreground border-primary font-medium"
                      : "bg-card text-foreground border-border hover:bg-muted font-normal"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLang("hi");
                    setProfile((p) => ({ ...p, preferredLanguage: "Hindi" }));
                  }}
                  className={`px-4 py-2 rounded-lg text-sm border transition-all cursor-pointer ${
                    lang === "hi"
                      ? "bg-primary text-primary-foreground border-primary font-medium"
                      : "bg-card text-foreground border-border hover:bg-muted font-normal"
                  }`}
                >
                  हिन्दी
                </button>
              </div>
            </div>
           <div className="flex justify-end">

            <Button
              onClick={saveProfile}
              disabled={updateProfileMutation.isPending}
              className="bg-primary hover:bg-primary/95 transition-colors w-full sm:w-auto"
            >
              {updateProfileMutation.isPending ? (
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-1" />
              ) : (
                <Save className="w-4 h-4 mr-1" />
              )}
              {saved
                ? t("Saved!", "सहेजा गया!")
                : t("Save Profile", "प्रोफ़ाइल सहेजें")}
            </Button>
                </div>
          </CardContent>
        </Card>

        {/* Accessibility */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base flex items-center gap-2">
              <Type className="w-4 h-4" /> {t("Accessibility", "पहुंच")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="mb-2 block">{t("Font Size", "फ़ॉन्ट आकार")}</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { v: "1", label: t("Normal", "सामान्य") },
                  { v: "1.15", label: t("Large", "बड़ा") },
                  { v: "1.3", label: t("Extra Large", "बहुत बड़ा") },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => setFontScale(opt.v)}
                    className={`px-4 py-2 rounded-lg text-sm border transition-colors cursor-pointer ${
                      fontScale === opt.v
                        ? "bg-primary text-white border-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="flex items-center gap-2">
                  <Contrast className="w-4 h-4" />{" "}
                  {t("High Contrast Mode", "उच्च कंट्रास्ट मोड")}
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t(
                    "Increases visual contrast for better readability",
                    "बेहतर पठनीयता के लिए दृश्य कंट्रास्ट बढ़ाता है"
                  )}
                </p>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  highContrast ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    highContrast ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <Button onClick={handleLogout} variant="destructive" className="w-full">
              <LogOut className="w-4 h-4 mr-1" /> {t("Logout", "लॉग आउट")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}