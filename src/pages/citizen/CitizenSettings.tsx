import React, { useState, useEffect } from "react";
import { ArrowLeft, User, LogOut, Type, Contrast, Globe, Save, MapPin } from "lucide-react";
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
import { useGetDemographics } from "@/hooks/useGetQuery";
import subDivisionsData from "@/utils/sub-divisions.json";

interface CitizenAddress {
  addressLine: string;
  district: string;
  subdivision: string;
  panchayat: string;
  thana: string;
  pincode: string;
}

interface CitizenProfile {
  fullName: string;
  mobile: string;
  email: string;
  preferredLanguage: string;
  address: CitizenAddress;
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
    address: {
      addressLine: "",
      district: "",
      subdivision: "",
      panchayat: "",
      thana: "",
      pincode: "",
    },
  });
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [fontScale, setFontScale] = useState("1");
  const [highContrast, setHighContrast] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const API_PARAMS = {
    page: 1,
    limit: 500,
    select: "title,titleHindi,name,nameHindi",
  };

  const { data: demographyData, isLoading: demographyLoading } =
    useGetDemographics([], API_PARAMS);

  const allDemography = (demographyData?.data?.data?.docs ?? []).map(
    (d: any) => ({
      label: lang === "hi" && d.nameHindi ? d.nameHindi : d.name,
      value: d._id,
      name: d.name,
    })
  );

  const selectedDistrict = React.useMemo(() => {
    return allDemography?.find(
      (d: any) => d.value === profile.address?.district
    );
  }, [allDemography, profile.address?.district]);

  const districtName = selectedDistrict?.name;

  const subdivisionOptions = React.useMemo(() => {
    if (!districtName) return [];
    const subdivisions = (subDivisionsData as Record<string, string[]>)[
      districtName
    ];
    if (!subdivisions) return [];
    return subdivisions.map((sub: string) => ({
      label: sub,
      value: sub,
    }));
  }, [districtName]);

  useEffect(() => {
    if (profileApiData) {
      setProfile({
        fullName: profileApiData.fullName || profileApiData.name || "",
        mobile: profileApiData.mobile || "",
        email: profileApiData.email || "",
        preferredLanguage: profileApiData.preferredLanguage || "English",
        address: {
          addressLine: profileApiData.address?.addressLine || "",
          district: profileApiData.address?.district || "",
          subdivision: profileApiData.address?.subdivision || "",
          panchayat: profileApiData.address?.panchayat || "",
          thana: profileApiData.address?.thana || "",
          pincode: profileApiData.address?.pincode || "",
        },
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
        address: profile.address,
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
      <div className="p-4 sm:p-6 mx-auto space-y-4 sm:space-y-6">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title={t("Back", "पीछे जाएं")}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("Settings", "सेटिंग्स")}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t(
                "Manage your profile, accessibility, and preferences.",
                "अपनी प्रोफ़ाइल, पहुंच और प्राथमिकताएँ प्रबंधित करें।"
              )}
            </p>
          </div>
        </div>

        {/* Profile */}
        <Card className="">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-4 h-4" /> {t("Profile", "प्रोफ़ाइल")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div>
                <Label className="mb-1.5 block flex items-center gap-2">
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
                        ? "bg-primary text-primary-foreground dark:text-white border-primary font-medium"
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
                        ? "bg-primary text-primary-foreground dark:text-white border-primary font-medium"
                        : "bg-card text-foreground border-border hover:bg-muted font-normal"
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{t("Address Details", "पता विवरण")}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label className="mb-1.5 block">
                    {t("Address Line", "पता विवरण")}
                  </Label>
                  <Input
                    value={profile.address?.addressLine || ""}
                    placeholder={t(
                      "House no., Street, Area",
                      "मकान संख्या, सड़क, क्षेत्र"
                    )}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: {
                          ...profile.address,
                          addressLine: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <Label className="mb-1.5 block">{t("District", "ज़िला")}</Label>
                  <select
                    value={profile.address?.district || ""}
                    disabled={demographyLoading}
                    onChange={(e) => {
                      setProfile({
                        ...profile,
                        address: {
                          ...profile.address,
                          district: e.target.value,
                          subdivision: "",
                        },
                      });
                    }}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" className="bg-popover text-popover-foreground">
                      {demographyLoading
                        ? t("Loading districts...", "जिले लोड हो रहे हैं...")
                        : t("Select District", "जिला चुनें")}
                    </option>
                    {allDemography.map((d: any) => (
                      <option
                        key={d.value}
                        value={d.value}
                        className="bg-popover text-popover-foreground"
                      >
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="mb-1.5 block">
                    {t("Block / Subdivision", "प्रखंड / अनुमंडल")}
                  </Label>
                  <select
                    value={profile.address?.subdivision || ""}
                    disabled={!profile.address?.district}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: {
                          ...profile.address,
                          subdivision: e.target.value,
                        },
                      })
                    }
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" className="bg-popover text-popover-foreground">
                      {t("Select Block / Subdivision", "प्रखंड / अनुमंडल चुनें")}
                    </option>
                    {subdivisionOptions.map((sub: any) => (
                      <option
                        key={sub.value}
                        value={sub.value}
                        className="bg-popover text-popover-foreground"
                      >
                        {sub.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="mb-1.5 block">{t("Panchayat", "पंचायत")}</Label>
                  <Input
                    value={profile.address?.panchayat || ""}
                    placeholder={t("Panchayat name", "पंचायत का नाम")}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: {
                          ...profile.address,
                          panchayat: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <Label className="mb-1.5 block">{t("Thana", "थाना")}</Label>
                  <Input
                    value={profile.address?.thana || ""}
                    placeholder={t("Police Station / Thana", "थाना का नाम")}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: {
                          ...profile.address,
                          thana: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <Label className="mb-1.5 block">{t("Pin Code", "पिन कोड")}</Label>
                  <Input
                    value={profile.address?.pincode || ""}
                    placeholder="e.g. 800001"
                    maxLength={6}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setProfile({
                        ...profile,
                        address: {
                          ...profile.address,
                          pincode: val,
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
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