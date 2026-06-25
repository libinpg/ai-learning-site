import { NextRequest, NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  if (password !== (process.env.ADMIN_PASSWORD || "admin123")) {
    return NextResponse.json({ error: "密码不正确" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  await setAdminCookie(response);
  return response;
}
