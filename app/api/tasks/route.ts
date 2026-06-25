import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { title, courseId, chapterId, lessonId } = await request.json();
  const task = await prisma.task.create({
    data: { title, courseId, chapterId, lessonId }
  });
  return NextResponse.json(task);
}
