import Link from "next/link";
import { Shell } from "@/components/Shell";
import { CourseForm } from "@/components/Forms";
import { prisma } from "@/lib/prisma";
import { minutesLabel } from "@/lib/format";

export default async function HomePage() {
  const [courses, tasks, mistakes, sessions] = await Promise.all([
    prisma.course.findMany({
      include: {
        chapters: { include: { lessons: true } },
        tags: { include: { tag: true } }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.task.findMany({ where: { status: { not: "done" } }, take: 6, orderBy: { updatedAt: "desc" } }),
    prisma.mistake.count({ where: { resolved: false } }),
    prisma.studySession.findMany({ orderBy: { date: "desc" }, take: 30 })
  ]);

  const lessonCount = courses.flatMap((course) => course.chapters.flatMap((chapter) => chapter.lessons)).length;
  const completedCount = courses
    .flatMap((course) => course.chapters.flatMap((chapter) => chapter.lessons))
    .filter((lesson) => lesson.completed).length;
  const minutes = sessions.reduce((sum, session) => sum + session.minutes, 0);

  return (
    <Shell>
      <div className="topbar">
        <div className="title">
          <h1>课程仪表盘</h1>
          <p>管理视频、笔记、测验、项目和学习进度。</p>
        </div>
        <Link className="btn" href="/settings">
          管理设置
        </Link>
      </div>

      <section className="grid cols-3">
        <div className="card">
          <div className="muted">课程</div>
          <div className="metric">{courses.length}</div>
        </div>
        <div className="card">
          <div className="muted">课时进度</div>
          <div className="metric">
            {completedCount}/{lessonCount}
          </div>
        </div>
        <div className="card">
          <div className="muted">学习时长</div>
          <div className="metric">{minutesLabel(minutes)}</div>
        </div>
      </section>

      <section className="grid cols-2" style={{ marginTop: 16 }}>
        <div className="panel">
          <h2>课程</h2>
          <div className="list">
            {courses.map((course) => {
              const lessons = course.chapters.flatMap((chapter) => chapter.lessons);
              const done = lessons.filter((lesson) => lesson.completed).length;
              const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
              return (
                <Link className="item" key={course.id} href={`/courses/${course.id}`}>
                  <h3>{course.title}</h3>
                  <p className="muted">{course.description || "暂无描述"}</p>
                  <div className="row">
                    {course.tags.map(({ tag }) => (
                      <span className="tag" key={tag.id} style={{ background: tag.color }}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="progress" style={{ marginTop: 10 }}>
                    <span style={{ width: `${pct}%` }} />
                  </div>
                  <p className="muted">{pct}% 完成</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="grid">
          <div className="panel">
            <h2>新建课程</h2>
            <CourseForm />
          </div>
          <div className="panel">
            <h2>待完成</h2>
            <div className="list">
              {tasks.map((task) => (
                <Link className="item" key={task.id} href="/tasks">
                  {task.title}
                  <div className="muted">{task.status}</div>
                </Link>
              ))}
              {tasks.length === 0 && <p className="muted">暂无待办任务</p>}
            </div>
          </div>
          <div className="panel">
            <h2>错题提醒</h2>
            <p className="metric">{mistakes}</p>
            <Link className="btn secondary" href="/mistakes">
              查看错题本
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
