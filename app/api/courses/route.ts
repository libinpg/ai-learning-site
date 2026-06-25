import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { title, description } = await request.json();
  const course = await prisma.course.create({ data: { title, description: description || "" } });
  return NextResponse.json(course);
}
