import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ mistakeId: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { mistakeId } = await params;
  const { resolved } = await request.json();
  const mistake = await prisma.mistake.update({ where: { id: mistakeId }, data: { resolved } });
  return NextResponse.json(mistake);
}
