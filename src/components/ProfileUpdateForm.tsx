import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/auth.api";
import { getErrorToast, getSuccessToast } from "@/utils/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Globe } from "lucide-react";

interface ProfileUpdateFormProps {
  onSuccess: (data :any) => void;
  initialData?: any;
}

const profileSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
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
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; preferredLanguage?: string }>({});

  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName || "");
      setEmail(initialData.email || "");
      setPreferredLanguage(initialData.preferredLanguage || "English");
    }
  }, [initialData]);

  const updateProfileMutation = useMutation({
    mutationFn: () => {
      const payload: any = {
        fullName,
        preferredLanguage,
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
      <div>
        <Label className="mb-1.5 block">
          {t("Full Name", "पूरा नाम")}
          <span className="text-destructive ml-0.5">*</span>
        </Label>
        <Input
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
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
            className={`px-4 py-2 rounded-lg text-sm border transition-colors cursor-pointer ${
              preferredLanguage === "English"
                ? "bg-primary text-white border-primary"
                : "border-border hover:bg-muted"
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
            className={`px-4 py-2 rounded-lg text-sm border transition-colors cursor-pointer ${
              preferredLanguage === "Hindi"
                ? "bg-primary text-white border-primary"
                : "border-border hover:bg-muted"
            }`}
          >
            हिन्दी
          </button>
        </div>
        {errors.preferredLanguage && (
          <p className="text-xs text-destructive mt-1">{errors.preferredLanguage}</p>
        )}
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
