import Link from "next/link";
import { Shell } from "@/components/Shell";
import { prisma } from "@/lib/prisma";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const [courses, lessons, notes, attachments, tags] = query
    ? await Promise.all([
        prisma.course.findMany({ where: { OR: [{ title: { contains: query } }, { description: { contains: query } }] } }),
        prisma.lesson.findMany({ where: { title: { contains: query } }, include: { chapter: { include: { course: true } } } }),
        prisma.note.findMany({ where: { content: { contains: query } }, include: { lesson: true } }),
        prisma.attachment.findMany({ where: { title: { contains: query } }, include: { lesson: true } }),
        prisma.tag.findMany({ where: { name: { contains: query } } })
      ])
    : [[], [], [], [], []];

  return (
    <Shell>
      <div className="title">
        <h1>全文搜索</h1>
        <p>搜索课程、课时、笔记、附件和标签。</p>
      </div>
      <form className="row" style={{ marginTop: 20 }}>
        <input className="input" name="q" defaultValue={query} placeholder="输入关键词" />
        <button className="btn">搜索</button>
      </form>
      <section className="grid" style={{ marginTop: 20 }}>
        {[...courses.map((item) => ({ href: `/courses/${item.id}`, title: item.title, meta: "课程" })),
          ...lessons.map((item) => ({ href: `/lessons/${item.id}`, title: item.title, meta: `课时 · ${item.chapter.course.title}` })),
          ...notes.map((item) => ({ href: `/lessons/${item.lessonId}`, title: item.lesson.title, meta: "笔记内容命中" })),
          ...attachments.map((item) => ({ href: `/api/files/${item.filePath}`, title: item.title, meta: `附件 · ${item.lesson.title}` })),
          ...tags.map((item) => ({ href: `/search?q=${encodeURIComponent(item.name)}`, title: item.name, meta: "标签" }))].map((item, index) => (
          <Link className="item" key={`${item.href}-${index}`} href={item.href}>
            <strong>{item.title}</strong>
            <div className="muted">{item.meta}</div>
          </Link>
        ))}
        {query && courses.length + lessons.length + notes.length + attachments.length + tags.length === 0 && <p className="muted">没有找到结果</p>}
      </section>
    </Shell>
  );
}
