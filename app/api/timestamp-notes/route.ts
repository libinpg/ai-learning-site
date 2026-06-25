import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { lessonId, seconds, title, content = "", important = true } = await request.json();
  const note = await prisma.timestampNote.create({
    data: { lessonId, seconds: Number(seconds), title, content, important }
  });
  return NextResponse.json(note);
}
