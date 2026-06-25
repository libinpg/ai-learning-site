const DEFAULT_APP_NAME = "AI学习网站";
const DEFAULT_UPLOAD_SIZE_MB = 50;

function readNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || DEFAULT_APP_NAME,
  databaseUrl: process.env.DATABASE_URL,
  adminPassword: process.env.ADMIN_PASSWORD,
  maxUploadSizeMb: readNumber(process.env.MAX_UPLOAD_SIZE_MB, DEFAULT_UPLOAD_SIZE_MB),
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
};

export function assertServerEnv() {
  const missing: string[] = [];

  if (!env.databaseUrl) missing.push("DATABASE_URL");
  if (!env.adminPassword) missing.push("ADMIN_PASSWORD");

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}
