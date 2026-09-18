import { z } from "zod";

const schema = z
  .object({
    dateOfIncident: z.string().min(1, "Please select date of incident"),
    locationOfIncident: z
      .string()
      .min(1, "Please enter location of incident")
      .max(100, "Max length allowed = 100"),
    complainantType: z.string().min(1, "Please select complainant type"),
    citizen: z.object({
      name: z
        .string()
        .min(2, "Please enter valid name")
        .max(100, "Max length allowed = 100"),
      mobileNumber: z
        .string()
        .length(10, "Please enter valid mobile number")
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number starting with 6-9"),
      gender: z.string().optional(),
    }),
    grievanceType: z.string().min(1, "Please select grievance type"),
    address: z.object({
      district: z.string().min(1, "Please select district"),
      block: z.string().min(1, "Please select block"),
      village: z.string().optional(),
    }),
    institutionType: z.string().min(1, "Please select institution type"),
    institutionName: z.string().optional(),
    grievanceAgainstWhom: z
      .string()
      .max(100, "Max length allowed = 100")
      .optional(),
    description: z
      .string()
      .min(1, "Please enter brief of grievance")
      .max(1000, "Max length allowed = 1000"),
    uploadRelatedDocument: z.any().optional().nullable(),
  })
  .passthrough();

export default schema;
