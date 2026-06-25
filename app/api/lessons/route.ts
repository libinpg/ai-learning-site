import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { title, chapterId } = await request.json();
  const lesson = await prisma.lesson.create({
    data: {
      title,
      chapterId,
      note: { create: { content: "" } }
    }
  });
  return NextResponse.json(lesson);
}
