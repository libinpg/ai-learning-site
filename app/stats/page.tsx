import { Shell } from "@/components/Shell";
import { prisma } from "@/lib/prisma";
import { minutesLabel } from "@/lib/format";

export default async function StatsPage() {
  const [sessions, lessons] = await Promise.all([
    prisma.studySession.findMany({ orderBy: { date: "desc" }, take: 60, include: { lesson: true } }),
    prisma.lesson.findMany()
  ]);
  const minutes = sessions.reduce((sum, session) => sum + session.minutes, 0);
  const completed = lessons.filter((lesson) => lesson.completed).length;
  const days = new Set(sessions.map((session) => session.date.toISOString().slice(0, 10))).size;

  return (
    <Shell>
      <div className="title">
        <h1>学习统计</h1>
        <p>查看学习时长、完成课时和学习日历。</p>
      </div>
      <section className="grid cols-3" style={{ marginTop: 20 }}>
        <div className="card">
          <div className="muted">总学习时长</div>
          <div className="metric">{minutesLabel(minutes)}</div>
        </div>
        <div className="card">
          <div className="muted">完成课时</div>
          <div className="metric">{completed}</div>
        </div>
        <div className="card">
          <div className="muted">学习天数</div>
          <div className="metric">{days}</div>
        </div>
      </section>
      <section className="panel" style={{ marginTop: 20 }}>
        <h2>最近记录</h2>
        <div className="list">
          {sessions.map((session) => (
            <div className="item" key={session.id}>
              {session.date.toLocaleDateString("zh-CN")} · {minutesLabel(session.minutes)} · {session.lesson?.title || "未绑定课时"}
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
