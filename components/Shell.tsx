import Link from "next/link";

const nav = [
  ["/", "课程仪表盘"],
  ["/library", "资料库"],
  ["/search", "全文搜索"],
  ["/mistakes", "错题本"],
  ["/tasks", "作业项目"],
  ["/stats", "学习统计"],
  ["/settings", "设置备份"]
];

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">AI学习网站</div>
        <nav className="nav">
          {nav.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
