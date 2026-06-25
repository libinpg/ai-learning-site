import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

const COOKIE_NAME = "ai_learning_admin";

function passwordHash() {
  return createHash("sha256")
    .update(process.env.ADMIN_PASSWORD || "admin123")
    .digest("hex");
}

export async function isAdmin() {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === passwordHash();
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "需要管理员密码" }, { status: 401 });
  }
  return null;
}

export async function setAdminCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, passwordHash(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  });
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
}
