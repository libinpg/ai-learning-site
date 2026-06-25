import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { LessonWorkspace } from "@/components/LessonWorkspace";
import { prisma } from "@/lib/prisma";

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      note: true,
      timestampNotes: { orderBy: { seconds: "asc" } },
      attachments: { orderBy: { createdAt: "desc" } },
      quizzes: { include: { questions: true } }
    }
  });

  if (!lesson) notFound();

  return (
    <Shell>
      <LessonWorkspace lesson={lesson} />
    </Shell>
  );
}
