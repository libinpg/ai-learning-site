import { Shell } from "@/components/Shell";
import { TaskForm } from "@/components/Forms";
import { prisma } from "@/lib/prisma";
import { TaskActions } from "./task-actions";

export default async function TasksPage() {
  const [tasks, courses, lessons] = await Promise.all([
    prisma.task.findMany({ include: { course: true, lesson: true }, orderBy: { updatedAt: "desc" } }),
    prisma.course.findMany({ select: { id: true, title: true } }),
    prisma.lesson.findMany({ select: { id: true, title: true } })
  ]);

  return (
    <Shell>
      <div className="title">
        <h1>作业项目</h1>
        <p>记录练习任务、提交链接和复盘笔记。</p>
      </div>
      <section className="grid cols-2" style={{ marginTop: 20 }}>
        <div className="panel">
          <h2>添加任务</h2>
          <TaskForm courses={courses} lessons={lessons} />
        </div>
        <div className="panel">
          <h2>任务列表</h2>
          <div className="list">
            {tasks.map((task) => (
              <div className="item" key={task.id}>
                <strong>{task.title}</strong>
                <p className="muted">
                  {task.course?.title || task.lesson?.title || "未绑定"} · {task.status}
                </p>
                <TaskActions task={task} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
