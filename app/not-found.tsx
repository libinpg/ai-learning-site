import Link from "next/link";

export default function NotFound() {
  return (
    <main className="main error-screen">
      <section className="panel">
        <p className="eyebrow">404</p>
        <h1>页面不存在</h1>
        <p className="muted">你访问的学习内容可能已经移动、删除，或者还没有创建。</p>
        <Link className="btn" href="/">
          回到课程仪表盘
        </Link>
      </section>
    </main>
  );
}
