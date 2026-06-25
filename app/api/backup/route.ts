import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { listUploadedFiles } from "@/lib/files";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const [courses, notes, tasks, mistakes, files] = await Promise.all([
    prisma.course.findMany({ include: { chapters: { include: { lessons: true } }, tags: { include: { tag: true } } } }),
    prisma.note.findMany({ include: { lesson: true } }),
    prisma.task.findMany(),
    prisma.mistake.findMany(),
    listUploadedFiles()
  ]);
  const backup = {
    exportedAt: new Date().toISOString(),
    courses,
    notes,
    tasks,
    mistakes,
    uploadedFiles: files
  };
  return new NextResponse(JSON.stringify(backup, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "content-disposition": `attachment; filename="ai-learning-backup-${Date.now()}.json"`
    }
  });
}
