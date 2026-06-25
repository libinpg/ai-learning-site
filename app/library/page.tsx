import Link from "next/link";
import { Shell } from "@/components/Shell";
import { prisma } from "@/lib/prisma";

export default async function LibraryPage() {
  const [lessons, attachments, tags] = await Promise.all([
    prisma.lesson.findMany({ include: { chapter: { include: { course: true } }, note: true, tags: { include: { tag: true } } } }),
    prisma.attachment.findMany({ include: { lesson: true }, orderBy: { createdAt: "desc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } })
  ]);

  return (
    <Shell>
      <div className="title">
        <h1>资料库</h1>
        <p>集中浏览视频、笔记、附件和标签。</p>
      </div>
      <section className="grid cols-2" style={{ marginTop: 20 }}>
        <div className="panel">
          <h2>课时与笔记</h2>
          <div className="list">
            {lessons.map((lesson) => (
              <Link className="item" key={lesson.id} href={`/lessons/${lesson.id}`}>
                <strong>{lesson.title}</strong>
                <p className="muted">
                  {lesson.chapter.course.title} / {lesson.chapter.title}
                </p>
                <div className="row">
                  {lesson.tags.map(({ tag }) => (
                    <span className="tag" key={tag.id} style={{ background: tag.color }}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid">
          <div className="panel">
            <h2>附件</h2>
            <div className="list">
              {attachments.map((attachment) => (
                <a className="item" key={attachment.id} href={`/api/files/${attachment.filePath}`} target="_blank">
                  {attachment.title}
                  <div className="muted">{attachment.lesson.title}</div>
                </a>
              ))}
            </div>
          </div>
          <div className="panel">
            <h2>标签</h2>
            <div className="row">
              {tags.map((tag) => (
                <span className="tag" key={tag.id} style={{ background: tag.color }}>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
