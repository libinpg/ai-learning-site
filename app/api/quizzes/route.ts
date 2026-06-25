import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { title, lessonId, chapterId, questions = [] } = await request.json();
  const quiz = await prisma.quiz.create({
    data: {
      title,
      lessonId,
      chapterId,
      questions: {
        create: questions.map((question: { prompt: string; options?: string[]; correctAnswer: string; explanation?: string }) => ({
          prompt: question.prompt,
          options: JSON.stringify(question.options || []),
          correctAnswer: question.correctAnswer,
          explanation: question.explanation || ""
        }))
      }
    }
  });
  return NextResponse.json(quiz);
}
