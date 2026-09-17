import { z } from "zod";

export const PREFERRED_LANGUAGE_OPTIONS = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "हिन्दी (Hindi)" },
];

const locationOrPermanentAddress = z.object({
  isUrban: z.boolean().default(false),
  addressLine: z
    .string()
    .min(1, "Field is required")
    .max(50, "Address details cannot exceed 50 characters"),

  district: z
    .string()
    .min(1, "Field is required")
    .max(50, "District cannot exceed 50 characters"),
  // .optional()
  // .or(z.literal("")),

  //rural
  block: z
    .string()
      .min(1, "Field is required")
    .max(50, "District cannot exceed 50 characters"),

  panchayat: z
    .string()
    .max(50, "Panchayat cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),

  thana: z
    .string()
    .max(50, "Thana cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),

  village: z
    .string()
    .max(50, "Village cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),

  pincode: z.string().min(1, "Pincode is required").regex(/^$|^8\d{5}$/, "Enter a valid pin code of Bihar"),

  // urban
  urbanPanchayat: z
    .string()
    .max(
      50,
      "Municipal corporation/municipal council/nagar panchayat cannot exceed 50 characters",
    )
    .optional()
    .or(z.literal("")),

  ward: z
    .string()
    .max(50, "Ward cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  // common

  landmark: z
    .string()
    .max(50, "Landmark cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
});
const finalAddressSchema = z.object({
  isUrban: z.boolean().default(false),
  addressLine: z
    .string()
    .max(50, "Address details cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  // .min(1, "Address details are required")
  district: z
    .string()
    .max(50, "District cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  // .min(1, "District is required")
  block: z
    .string()
    .max(50, "Block cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  panchayat: z
    .string()
    .max(50, "Panchayat cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  thana: z
    .string()
    .max(50, "Thana cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  village: z
    .string()
    .max(50, "Village cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  pincode: z
    .string()
    .min(1, "Pincode is required")
    .max(6, "Pincode cannot exceed 6 characters"),

  // urban
  urbanPanchayat: z
    .string()
    .max(
      50,
      "Municipal corporation/municipal council/nagar panchayat cannot exceed 50 characters",
    )
    .optional()
    .or(z.literal("")),
  ward: z
    .string()
    .max(50, "Ward cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  // correspondance
  state: z
    .string()
    .max(50, "State cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .max(50, "City cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  addressLine2: z
    .string()
    .max(50, "Address details cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
});
const addressSchema = locationOrPermanentAddress.superRefine((data, ctx) => {
  if (!data.thana || data.thana.trim() === "") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Field is required",
      path: ["thana"],
    });
  }

  if (!!data.isUrban) {
    const requiredKeys = ["urbanPanchayat", "ward"];
    requiredKeys.forEach((key) => {
      if (!data[key] || data[key].trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Field is required",
          path: [key],
        });
      }
    });
  } else {
    const requiredKeys = ["panchayat", "village"];
    requiredKeys.forEach((key) => {
      if (!data[key] || data[key].trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Field is required",
          path: [key],
        });
      }
    });
  }
});

const correspondenceAddressSchema = finalAddressSchema.superRefine(
  (data, ctx) => {
    if (!data.state || data.state.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Field is required",
        path: ["state"],
      });
    }

    if (data.state === "Bihar") {
      const requiredFields = [
        "addressLine",
        "district",
        "block",
        "pincode",
        "thana",
      ];
      requiredFields.forEach((key) => {
        if (!data[key] || data[key].trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Field is required",
            path: [key],
          });
        }
      });

      if (!!data.isUrban) {
        const requiredKeys = ["urbanPanchayat", "ward"];
        requiredKeys.forEach((key) => {
          if (!data[key] || data[key].trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Field is required",
              path: [key],
            });
          }
        });
      } else {
        const requiredKeys = ["panchayat", "village"];
        requiredKeys.forEach((key) => {
          if (!data[key] || data[key].trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Field is required",
              path: [key],
            });
          }
        });
      }
    } else {
      const requiredKeys = ["addressLine", "city"];
      requiredKeys.forEach((key) => {
        if (!data[key] || data[key].trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Field is required",
            path: [key],
          });
        }
      });
    }
  },
);

export const grievanceSchema = z.object({
  citizenInfo: z.object({
    fullName: z
      .string()
      .min(1, "Name is required")
      .max(50, "Full name cannot exceed 50 characters"),
    // .optional()
    // .or(z.literal("")),
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
    email: z
      .string()
      .email("Enter a valid email")
      .max(50, "Email cannot exceed 50 characters")
      .optional()
      .or(z.literal("")),
    // preferredLanguage: z.string().min(1, "Preferred language is required"),
    address: addressSchema,
  }),
  classification: z.object({
    // subService: z.string().min(1, "Sub-service is required"),

    nature: z.string().min(1, "Grievance type is required"),
    service: z.string().min(1, "Service is required"),
    department: z.string().min(1, "Department is required"),

    // subject: z.string().min(3, "Subject must be at least 3 characters"),
  }),
  evidence: z.object({
    details: z
      .string()
      .min(1, "Brief description is required")
      .max(1000, "Brief description cannot exceed 1000 characters"),
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
      general: z.boolean().optional(),

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
  //   // block: z.string().min(1, "Block is required"),
  //   // villageOrWard: z.string().optional(),
  //   // pinCode: z
  //   //   .string()
  //   //   .min(1, "Pincode is required")
  //   //   .regex(/^8\d{5}$/, "Enter a valid pin code of Bihar"),
  //   // landmark: z.string().optional(),

  // }),
  location: addressSchema,
});

export type GrievanceFormValues = z.infer<typeof grievanceSchema>;

export const defaultValues: GrievanceFormValues = {
  citizenInfo: {
    fullName: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    // preferredLanguage: "",
    address: {
      isUrban: false,
      addressLine: "",
      district: "",
      panchayat: "",
      pincode: "",
      block: "",
      thana: "",
      village: "",
      urbanPanchayat: "",
      ward: "",
      landmark: "",
    },
  },
  classification: { nature: "", service: "", department: "" },
  evidence: { details: "" },

  impact: {
    affectedBeneficiary: "",
    vulnerability: {
      seniorCitizen: false,
      woman: false,
      personWithDisability: false,
      economicallyWeakerSection: false,
      general: false
    },
  },
  communication: {
    // preferredMode: "",
    feedbackConsent: false,
  },
  isCrpEqualPerAdd: false,

  address: {
    isUrban: false,
    state: "Bihar",
    city: "",
    addressLine: "",
    district: "",
    panchayat: "",
    pincode: "",
    block: "",
    thana: "",
    village: "",
    urbanPanchayat: "",
    ward: "",
    addressLine2: "",
  },
  location: {
    isUrban: false,
    addressLine: "",
    district: "",
    panchayat: "",
    pincode: "",
    block: "",
    thana: "",
    village: "",
    urbanPanchayat: "",
    ward: "",
    landmark: "",
  },
};
