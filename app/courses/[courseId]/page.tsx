import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { ChapterForm, LessonForm } from "@/components/Forms";
import { prisma } from "@/lib/prisma";

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        include: {
          lessons: { include: { note: true, attachments: true, tasks: true, quizzes: true } },
          quizzes: true,
          tasks: true
        },
        orderBy: { sortOrder: "asc" }
      },
      tasks: true
    }
  });

  if (!course) notFound();

  return (
    <Shell>
      <div className="topbar">
        <div className="title">
          <h1>{course.title}</h1>
          <p>{course.description || "管理章节、课时、作业和测验。"}</p>
        </div>
        <Link className="btn secondary" href="/">
          返回首页
        </Link>
      </div>

      <section className="panel">
        <h2>添加章节</h2>
        <ChapterForm courseId={course.id} />
      </section>

      <section className="grid" style={{ marginTop: 16 }}>
        {course.chapters.map((chapter) => (
          <div className="panel" key={chapter.id}>
            <h2>{chapter.title}</h2>
            <LessonForm chapterId={chapter.id} />
            <div className="list" style={{ marginTop: 12 }}>
              {chapter.lessons.map((lesson) => (
                <Link className="item" key={lesson.id} href={`/lessons/${lesson.id}`}>
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <strong>{lesson.title}</strong>
                    <span className="muted">{lesson.completed ? "已完成" : "学习中"}</span>
                  </div>
                  <p className="muted">
                    笔记 {lesson.note?.content ? "已记录" : "未记录"} · 附件 {lesson.attachments.length} · 测验 {lesson.quizzes.length} · 任务{" "}
                    {lesson.tasks.length}
                  </p>
                  <div className="progress">
                    <span style={{ width: lesson.completed ? "100%" : lesson.playbackSeconds ? "45%" : "0%" }} />
                  </div>
                </Link>
              ))}
              {chapter.lessons.length === 0 && <p className="muted">这个章节还没有课时</p>}
            </div>
          </div>
        ))}
      </section>
    </Shell>
  );
}
