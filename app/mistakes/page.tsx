import { Shell } from "@/components/Shell";
import { prisma } from "@/lib/prisma";
import { MistakeActions } from "./mistake-actions";

export default async function MistakesPage() {
  const mistakes = await prisma.mistake.findMany({ orderBy: { updatedAt: "desc" } });
  return (
    <Shell>
      <div className="title">
        <h1>错题本</h1>
        <p>集中复习测验中的错误题目。</p>
      </div>
      <section className="grid" style={{ marginTop: 20 }}>
        {mistakes.map((mistake) => (
          <div className="item" key={mistake.id}>
            <h3>{mistake.prompt}</h3>
            <p>你的答案：{mistake.answer}</p>
            <p>正确答案：{mistake.correctAnswer}</p>
            <MistakeActions mistake={mistake} />
          </div>
        ))}
        {mistakes.length === 0 && <p className="muted">暂无错题</p>}
      </section>
    </Shell>
  );
}
