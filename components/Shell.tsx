import Link from "next/link";

const nav = [
  ["/", "课程仪表盘"],
  ["/library", "资料库"],
  ["/search", "全文搜索"],
  ["/mistakes", "错题本"],
  ["/tasks", "作业项目"],
  ["/stats", "学习统计"],
  ["/settings", "设置备份"]
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <aside className="sidebar" aria-label="主导航">
        <div className="brand">
          <Link href="/" aria-label="返回课程仪表盘">
            AI学习网站
          </Link>
        </div>
        <nav className="nav" aria-label="学习系统导航">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} prefetch>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main id="main-content" className="main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
