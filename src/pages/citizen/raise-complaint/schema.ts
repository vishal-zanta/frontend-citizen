import { z } from "zod";

export const PREFERRED_LANGUAGE_OPTIONS = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "हिन्दी (Hindi)" },
];

export const grievanceSchema = z.object({
  citizenInfo: z.object({
    fullName: z.string().optional(),
    mobile: z
      .string()
      .min(13, "Mobile number must be at least 10 digits")
      .max(13, "Mobile number cannot exceed 10 digits"),
    alternateMobile: z
      .string()
      .min(13, "Mobile number must be at least 10 digits")
      .max(13, "Mobile number cannot exceed 10 digits")
      .optional()
      .or(z.literal("")),
    email: z.string().email("Enter a valid email").optional().or(z.literal("")),
    preferredLanguage: z.string().min(1, "Preferred language is required"),
  }),
  classification: z.object({
    subService: z.string().min(1, "Sub-service is required"),
    nature: z.string().min(1, "Grievance type is required"),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
  }),
  evidence: z.object({
    details: z.string().optional(),
    occurrenceDate: z.string().optional(),
    frequency: z.string().min(1, "Frequency is required"),
  }),
  impact: z.object({
    affectedBeneficiary: z.string().min(1, "Affected beneficiary is required"),
    vulnerability: z.object({
      seniorCitizen: z.boolean().optional(),
      woman: z.boolean().optional(),
      personWithDisability: z.boolean().optional(),
      economicallyWeakerSection: z.boolean().optional(),
    }),
  }),
  communication: z.object({
    // preferredMode: z.string().optional(),
    feedbackConsent: z.boolean().optional(),
  }),
  address: z.object({
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    subdivision: z.string().min(1, "Subdivision is required"),
    villageOrWard: z.string().optional(),
    pinCode: z
      .string()
      .min(1, "Pincode is required")
      .regex(/^8\d{5}$/, "Enter a valid pin code of Bihar"),
    landmark: z.string().optional(),
  }),
});

export type GrievanceFormValues = z.infer<typeof grievanceSchema>;

export const defaultValues: GrievanceFormValues = {
  citizenInfo: {
    fullName: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    preferredLanguage: "",
  },
  classification: { subService: "", nature: "", subject: "" },
  evidence: { details: "", occurrenceDate: "", frequency: "" },
  impact: {
    affectedBeneficiary: "",
    vulnerability: {
      seniorCitizen: false,
      woman: false,
      personWithDisability: false,
      economicallyWeakerSection: false,
    },
  },
  communication: {
    // preferredMode: "",
    feedbackConsent: false,
  },

  address: { state: "Bihar", district: "", subdivision: "", villageOrWard: "", pinCode: "", landmark: "" },
};
