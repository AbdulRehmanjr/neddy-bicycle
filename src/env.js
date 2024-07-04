import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string() : z.string().url()
    ),
    PAYPAL_CLIENT: z.string(),
    PAYPAL_SECERT: z.string(),
    PAYPAL_ID: z.string(),
    PAYPAL_API: z.string(),
    BN_CODE: z.string(),
    PAYPAL_SELLER_CUSTOM_ID: z.string(),
    ZOHO_SENDER: z.string(),
    ZOHO_MAIL: z.string(),
    ZOHO_PASSWORD: z.string(),
    GOOGLE_CLIENT:z.string(),
    GOOGLE_SECERT:z.string(),
  },
  client: {
    NEXT_PUBLIC_PAYPAL: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    PAYPAL_CLIENT: process.env.PAYPAL_CLIENT,
    PAYPAL_SECERT: process.env.PAYPAL_SECERT,
    PAYPAL_ID: process.env.PAYPAL_ID,
    PAYPAL_API: process.env.PAYPAL_API,
    BN_CODE: process.env.BN_CODE,
    NEXT_PUBLIC_PAYPAL: process.env.NEXT_PUBLIC_PAYPAL,
    PAYPAL_SELLER_CUSTOM_ID:process.env.PAYPAL_SELLER_CUSTOM_ID,
    ZOHO_SENDER: process.env.ZOHO_SENDER,
    ZOHO_MAIL: process.env.ZOHO_MAIL,
    ZOHO_PASSWORD: process.env.ZOHO_PASSWORD,
    GOOGLE_CLIENT:process.env.GOOGLE_CLIENT,
    GOOGLE_SECERT:process.env.GOOGLE_SECERT,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
