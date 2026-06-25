import { mkdir, writeFile, readdir, stat } from "fs/promises";
import path from "path";

export const uploadRoot = path.join(process.cwd(), "uploads");

export async function saveUpload(file: File, folder: "videos" | "attachments") {
  const bytes = Buffer.from(await file.arrayBuffer());
  const dir = path.join(uploadRoot, folder);
  await mkdir(dir, { recursive: true });
  const safeName = `${Date.now()}-${file.name.replace(/[^\w.\-\u4e00-\u9fa5]/g, "_")}`;
  const fullPath = path.join(dir, safeName);
  await writeFile(fullPath, bytes);
  return {
    path: `${folder}/${safeName}`,
    name: file.name,
    type: file.type || "application/octet-stream",
    size: bytes.length
  };
}

export async function listUploadedFiles() {
  async function walk(dir: string, prefix = ""): Promise<string[]> {
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      const files = await Promise.all(
        entries.map(async (entry) => {
          const rel = path.join(prefix, entry.name);
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) return walk(full, rel);
          const info = await stat(full);
          return [`${rel} (${info.size} bytes)`];
        })
      );
      return files.flat();
    } catch {
      return [];
    }
  }

  return walk(uploadRoot);
}
