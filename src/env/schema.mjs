// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production"
      ? z.string().min(1)
      : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    (str) => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? z.string() : z.string().url(),
  ),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string()
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_BAR: z.string(),
  NEXT_PUBLIC_GOOGLEMAPS_API_KEY: z.string()
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_BAR: process.env.NEXT_PUBLIC_BAR,
  NEXT_PUBLIC_GOOGLEMAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY
};



export const signUpSchema = z.object({
  firstName : z.string().min(1,"First Name is required"),
  lastName: z.string().min(1,"Last Name is required"),
  dob: z.string().min(1,"Date of Birth is required"),
  contactNumber: z.string().min(1,"Contact Number is required"),
  address: z.string().min(1,"Address is required"),
  profession: z.string().min(1,"Profession is required"),
  company: z.string().optional(),
  specialization: z.string().optional(),
  licenseNumber: z.string().optional(),
  insuranceInformation: z.string().optional(),
  gender: z.enum(["Male", "Female"]),
  medicalHistory: z.string().optional(),
  educationalBackground: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  comments: z.string().optional(),
})

export const personalSchema = z.object({
  firstName : z.string().min(1,"First Name is required"),
  lastName: z.string().min(1,"Last Name is required"),
  dob: z.string().min(1,"Date of Birth is required"),
  contactNumber: z.string().min(1,"Contact Number is required"),
  address: z.string().min(1,"Address is required"),
  profession: z.string().min(1,"Profession is required"),
  gender: z.enum(["Male", "Female"]),
})

export const professionalInfo = z.object({
  company: z.string().optional(),
  specialization: z.string().optional(),
  licenseNumber: z.string().optional(),
  insuranceInformation: z.string().optional(),
  
})

export const addionalInfoSchema = z.object({
  medicalHistory: z.string().optional(),
  educationalBackground: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  comments: z.string().optional(),
})