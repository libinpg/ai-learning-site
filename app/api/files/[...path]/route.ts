import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { uploadRoot } from "@/lib/files";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await params;
  const safePath = path.normalize(parts.join(path.sep));
  if (safePath.includes("..")) return NextResponse.json({ error: "非法路径" }, { status: 400 });
  const fullPath = path.join(uploadRoot, safePath);
  const data = await readFile(fullPath);
  return new NextResponse(data);
}
