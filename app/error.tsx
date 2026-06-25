"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <main className="main error-screen">
          <section className="panel">
            <p className="eyebrow">Application Error</p>
            <h1>页面暂时无法加载</h1>
            <p className="muted">
              系统遇到了一个未预期错误。开发者可以根据终端日志或 request id 继续排查。
            </p>
            {error.digest && <p className="muted">错误编号：{error.digest}</p>}
            <button className="btn" type="button" onClick={reset}>
              重试
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
