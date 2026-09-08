import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/auth.api";
import { getErrorToast, getSuccessToast, isAlpha } from "@/utils/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Globe, MapPin } from "lucide-react";
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

interface ProfileUpdateFormProps {
  onSuccess: (data: any) => void;
  initialData?: any;
}

const profileSchema = z.object({
  fullName: z.string().min(3, { message: "Full Name is required and more than 2 chars" }),
  email: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Invalid email address",
    }),
  preferredLanguage: z.string().min(1, { message: "Language is required" }),
});

export default function ProfileUpdateForm({ onSuccess, initialData }: ProfileUpdateFormProps) {
  const { t, lang, setLang } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [address, setAddress] = useState<CitizenAddress>({
    addressLine: "",
    district: "",
    subdivision: "",
    panchayat: "",
    thana: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; preferredLanguage?: string }>({});

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
      (d: any) => d.value === address.district
    );
  }, [allDemography, address.district]);

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
    if (initialData) {
      setFullName(initialData.fullName || initialData.name || "");
      setEmail(initialData.email || "");
      setPreferredLanguage(initialData.preferredLanguage || "English");
      setAddress({
        addressLine: initialData.address?.addressLine || "",
        district: initialData.address?.district || "",
        subdivision: initialData.address?.subdivision || "",
        panchayat: initialData.address?.panchayat || "",
        thana: initialData.address?.thana || "",
        pincode: initialData.address?.pincode || "",
      });
    }
  }, [initialData]);

  const updateProfileMutation = useMutation({
    mutationFn: () => {
      const payload: any = {
        fullName,
        preferredLanguage,
        address,
      };
      if (email && email.trim() !== "") {
        payload.email = email.trim();
      }
      return updateProfile(payload);
    },
    onSuccess: (data) => {
      getSuccessToast(t("Profile updated successfully", "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई"));
      queryClient.invalidateQueries({ queryKey: ["auth-profile"] });
      onSuccess(data?.data?.data);
    },
    onError: (err: any) => {
      getErrorToast(err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = profileSchema.safeParse({
      fullName,
      email,
      preferredLanguage,
    });

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0] as keyof typeof errors;
        if (path) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      getErrorToast(result.error.errors[0].message);
      return;
    }

    setErrors({});
    updateProfileMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1.5 block">
            {t("Full Name", "पूरा नाम")}
            <span className="text-destructive ml-0.5">*</span>
          </Label>
          <Input
            value={fullName}
            onChange={(e) => {
              if (isAlpha(e.target.value)) {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
              }
            }}
            placeholder={t("Enter your full name", "अपना पूरा नाम दर्ज करें")}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Label className="mb-1.5 block">
            {t("Email", "ईमेल")}
          </Label>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder={t("Enter your email", "अपना ईमेल दर्ज करें")}
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <Label className="mb-2 block flex items-center gap-2">
          <Globe className="w-4 h-4" /> {t("Language / भाषा", "भाषा")}
          <span className="text-destructive ml-0.5">*</span>
        </Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setLang("en");
              setPreferredLanguage("English");
              if (errors.preferredLanguage) setErrors((prev) => ({ ...prev, preferredLanguage: undefined }));
            }}
            className={`px-4 py-2 rounded-lg text-sm border transition-all cursor-pointer ${
              preferredLanguage === "English"
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
              setPreferredLanguage("Hindi");
              if (errors.preferredLanguage) setErrors((prev) => ({ ...prev, preferredLanguage: undefined }));
            }}
            className={`px-4 py-2 rounded-lg text-sm border transition-all cursor-pointer ${
              preferredLanguage === "Hindi"
                ? "bg-primary text-primary-foreground border-primary font-medium"
                : "bg-card text-foreground border-border hover:bg-muted font-normal"
            }`}
          >
            हिन्दी
          </button>
        </div>
        {errors.preferredLanguage && (
          <p className="text-xs text-destructive mt-1">{errors.preferredLanguage}</p>
        )}
      </div>

      {/* Address Details */}
      <div className="pt-3 border-t border-border space-y-3">
        <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{t("Address Details", "पता विवरण")}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block text-xs">
              {t("Address Line", "पता विवरण")}
            </Label>
            <Input
              value={address.addressLine || ""}
              placeholder={t(
                "House no., Street, Area",
                "मकान संख्या, सड़क, क्षेत्र"
              )}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  addressLine: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <Label className="mb-1.5 block text-xs">{t("District", "ज़िला")}</Label>
            <select
              value={address.district || ""}
              disabled={demographyLoading}
              onChange={(e) => {
                setAddress((prev) => ({
                  ...prev,
                  district: e.target.value,
                  subdivision: "",
                }));
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
            <Label className="mb-1.5 block text-xs">
              {t("Block / Subdivision", "प्रखंड / अनुमंडल")}
            </Label>
            <select
              value={address.subdivision || ""}
              disabled={!address.district}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  subdivision: e.target.value,
                }))
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
            <Label className="mb-1.5 block text-xs">{t("Panchayat", "पंचायत")}</Label>
            <Input
              value={address.panchayat || ""}
              placeholder={t("Panchayat name", "पंचायत का नाम")}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  panchayat: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <Label className="mb-1.5 block text-xs">{t("Thana", "थाना")}</Label>
            <Input
              value={address.thana || ""}
              placeholder={t("Police Station / Thana", "थाना का नाम")}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  thana: e.target.value,
                }))
              }
            />
          </div>

          <div className="sm:col-span-2">
            <Label className="mb-1.5 block text-xs">{t("Pin Code", "पिन कोड")}</Label>
            <Input
              value={address.pincode || ""}
              placeholder="e.g. 800001"
              maxLength={6}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setAddress((prev) => ({
                  ...prev,
                  pincode: val,
                }));
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={updateProfileMutation.isPending}
          className="bg-primary hover:bg-primary/95 transition-colors w-full"
        >
          {updateProfileMutation.isPending && (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-1" />
          )}
          <Save className="w-4 h-4 mr-1" />
          {t("Save Profile", "प्रोफ़ाइल सहेजें")}
        </Button>
      </div>
    </form>
  );
}
