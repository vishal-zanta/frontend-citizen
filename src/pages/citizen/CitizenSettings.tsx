import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  LogOut,
  Save,
} from "lucide-react";
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

interface CitizenAddress {
  addressLine: string;
  district: string;
  block: string;
  panchayat: string;
  thana: string;
  village: string;
  ps: string;
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
  const { t } = useLanguage();
  const { profile: profileApiData } = useProfile();
  const [profile, setProfile] = useState<CitizenProfile>({
    fullName: "",
    mobile: "",
    email: "",
    preferredLanguage: "English",
    address: {
      addressLine: "",
      district: "",
      block: "",
      panchayat: "",
      thana: "",
      village: "",
      ps: "",
      pincode: "",
    },
  });
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>(
    {},
  );
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
          block: profileApiData.address?.block || "",
          panchayat: profileApiData.address?.panchayat || "",
          thana: profileApiData.address?.thana || "",
          village: profileApiData.address?.village || "",
          ps: profileApiData.address?.ps || "",
          pincode: profileApiData.address?.pincode || "",
        },
      });
    }
  }, [profileApiData]);

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
    onSuccess: () => {
      getSuccessToast(
        t("Profile updated successfully", "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई"),
      );
      queryClient.invalidateQueries({ queryKey: ["auth-profile"] });
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
            <h1 className="text-2xl font-bold text-foreground">
              {t("Profile", "प्रोफ़ाइल")}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t(
                "Manage your profile and personal details.",
                "अपनी प्रोफ़ाइल और व्यक्तिगत विवरण प्रबंधित करें।",
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
                    if (errors.fullName)
                      setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                />
                {errors.fullName && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-1.5 block">{t("Mobile", "मोबाइल")}</Label>
                <Input value={profile.mobile} disabled={true} />
              </div>
              <div className="md:col-span-2">
                <Label className="mb-1.5 block">{t("Email", "ईमेल")}</Label>
                <Input
                  value={profile.email}
                  onChange={(e) => {
                    setProfile({ ...profile, email: e.target.value });
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.email}
                  </p>
                )}
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

        {/* Logout */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-1" /> {t("Logout", "लॉग आउट")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
