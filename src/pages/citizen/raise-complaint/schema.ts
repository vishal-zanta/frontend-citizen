import { z } from "zod";

export const PREFERRED_LANGUAGE_OPTIONS = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "हिन्दी (Hindi)" },
];

const addressSchema = z.object({
  addressLine: z.string().min(1, "Address details are required"),
  district: z.string().min(1, "District is required"),
  subdivision: z.string().min(1, "Block is required"),
  panchayat: z.string().min(1, "Panchayat is required"),
  thana: z.string().min(1, "Thana is required"),
  pincode: z.string().min(1, "Pincode is required"),
});

const correspondenceAddressSchema = z
  .object({
    addressLine: z.string().min(1, "Address details are required"),
    state: z.string().min(1, "State is required"),
    city: z.string().optional().or(z.literal("")),
    district: z.string().optional().or(z.literal("")),
    subdivision: z.string().optional().or(z.literal("")),
    panchayat: z.string().optional().or(z.literal("")),
    thana: z.string().optional().or(z.literal("")),
    pincode: z.string().min(1, "Pincode is required"),
  })
  .superRefine((data, ctx) => {
    if (data.state === "Bihar") {
      if (!data.district || data.district.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "District is required",
          path: ["district"],
        });
      }
      if (!data.subdivision || data.subdivision.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Block is required",
          path: ["subdivision"],
        });
      }
      if (!data.panchayat || data.panchayat.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Panchayat is required",
          path: ["panchayat"],
        });
      }
      if (!data.thana || data.thana.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Thana is required",
          path: ["thana"],
        });
      }
    } else {
      if (!data.city || data.city.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City is required",
          path: ["city"],
        });
      }
    }
  });

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
    address: addressSchema,
  }),
  classification: z.object({
    subService: z.string().min(1, "Sub-service is required"),
    nature: z.string().min(1, "Grievance type is required"),
    service: z.any(),
    department: z.any(),

    // subject: z.string().min(3, "Subject must be at least 3 characters"),
  }),
  evidence: z.object({
    details: z.string().optional(),
    // occurrenceDate: z.string().optional(),
    // frequency: z.string().min(1, "Frequency is required"),
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
  isCrpEqualPerAdd: z.boolean().optional(),
  address: correspondenceAddressSchema,

  //  z.object({
  //   // state: z.string().min(1, "State is required"),
  //   // district: z.string().min(1, "District is required"),
  //   // subdivision: z.string().min(1, "Subdivision is required"),
  //   // villageOrWard: z.string().optional(),
  //   // pinCode: z
  //   //   .string()
  //   //   .min(1, "Pincode is required")
  //   //   .regex(/^8\d{5}$/, "Enter a valid pin code of Bihar"),
  //   // landmark: z.string().optional(),

  // }),
  location: z.object({
    division: z.string().min(1, "Division is required"),
    district: z.string().min(1, "District is required"),
    subdivision: z.string().min(1, "Block is required"),
    block: z.string().min(1, "Block is required"),
    panchayat: z.string().min(1, "Panchayat is required"),
    // villageOrWard: z.string().min(1, "Village or ward is required"),
    pincode: z
      .string()
      .min(1, "Pincode is required")
      .regex(/^8\d{5}$/, "Enter a valid pin code of Bihar"),
    // landmark: z.string().min(1, "Landmark is required"),
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
    address: {
      addressLine: "",
      district: "",
      panchayat: "",
      pincode: "",
      subdivision: "",
      thana: "",
    },
  },
  classification: { subService: "", nature: "", service: "", department: "" },
  evidence: { details: "" },

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
  isCrpEqualPerAdd: false,

  address: {
    // state: "Bihar",
    // district: "",
    // subdivision: "",
    // villageOrWard: "",
    // pinCode: "",
    // landmark: "",
    addressLine: "",
    district: "",
    panchayat: "",
    pincode: "",
    subdivision: "",
    thana: "",
    state: "Bihar",
    city: "",
  },
  location: {
    block: "",
    district: "",
    division: "",
    panchayat: "",
    pincode: "",
    subdivision: "",
  },
};
