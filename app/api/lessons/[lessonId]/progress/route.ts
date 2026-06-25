import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const { playbackSeconds = 0, completed = false, durationSeconds = 0 } = await request.json();
  const lesson = await prisma.lesson.update({
    where: { id: lessonId },
    data: { playbackSeconds, completed, durationSeconds }
  });
  await prisma.studySession.create({
    data: {
      lessonId,
      completed,
      minutes: Math.max(1, Math.round(Number(playbackSeconds || 60) / 60))
    }
  });
  return NextResponse.json(lesson);
}
