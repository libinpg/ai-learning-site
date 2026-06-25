import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { taskId } = await params;
  const { status, submitUrl, reviewNote } = await request.json();
  const task = await prisma.task.update({ where: { id: taskId }, data: { status, submitUrl, reviewNote } });
  return NextResponse.json(task);
}
