import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const { answers } = await request.json();
  const questions = await prisma.question.findMany({ where: { quizId } });
  const results = await Promise.all(
    questions.map(async (question) => {
      const answer = String(answers?.[question.id] || "");
      const correct = answer.trim() === question.correctAnswer.trim();
      await prisma.answerAttempt.create({ data: { questionId: question.id, answer, correct } });
      if (!correct) {
        await prisma.mistake.create({
          data: { questionId: question.id, prompt: question.prompt, answer, correctAnswer: question.correctAnswer }
        });
      }
      return { questionId: question.id, correct };
    })
  );
  return NextResponse.json({ results });
}
