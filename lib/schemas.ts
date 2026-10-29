import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .refine((val) => !val.endsWith("@tempmail.com") && !val.endsWith("@mailinator.com"), {
      message: "Please provide a valid work or personal business email address.",
    }),
  company: z.string().max(100).optional(),
  inquiryType: z.enum([
    "demo",
    "custom_software",
    "partnership",
    "general",
  ], {
    message: "Please select an inquiry type.",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message cannot exceed 2,000 characters."),
  // Anti-bot honeypot field
  botTrap: z.string().max(0, "Invalid submission detected.").optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
