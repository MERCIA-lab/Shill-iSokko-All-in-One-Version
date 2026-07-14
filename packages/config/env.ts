import { z } from "zod";

/**
 * Shared environment schema. Each app/service imports this and calls
 * `envSchema.parse(process.env)` (or picks a subset with `.pick`) at boot
 * so misconfiguration fails fast instead of surfacing as a runtime bug.
 */
export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  DATABASE_URL: z.string().url(),

  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  REDIS_URL: z.string().url().optional(),

  API_PORT: z.coerce.number().default(4000),
  API_CORS_ORIGIN: z.string().default("http://localhost:3000"),

  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_ADMIN_API_URL: z.string().url().optional()
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
}
