import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { title, courseId } = await request.json();
  const chapter = await prisma.chapter.create({ data: { title, courseId } });
  return NextResponse.json(chapter);
}
