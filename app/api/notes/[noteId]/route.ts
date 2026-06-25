import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ noteId: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { noteId } = await params;
  const { lessonId, content } = await request.json();
  const note =
    noteId === "new"
      ? await prisma.note.upsert({
          where: { lessonId },
          update: { content },
          create: { lessonId, content }
        })
      : await prisma.note.update({ where: { id: noteId }, data: { content } });
  return NextResponse.json(note);
}
