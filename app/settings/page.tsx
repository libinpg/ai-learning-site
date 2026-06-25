import { Shell } from "@/components/Shell";
import { AdminGate } from "@/components/AdminGate";
import { isAdmin } from "@/lib/auth";

export default async function SettingsPage() {
  const admin = await isAdmin();
  return (
    <Shell>
      <div className="title">
        <h1>设置备份</h1>
        <p>管理员密码、备份导出和 AI 配置占位。</p>
      </div>
      <section className="grid cols-2" style={{ marginTop: 20 }}>
        <AdminGate isAdmin={admin} />
        <div className="panel">
          <h3>一键导出备份</h3>
          <p className="muted">导出数据库摘要、笔记和上传文件清单。管理操作需要管理员登录。</p>
          <a className="btn" href="/api/backup">
            下载备份
          </a>
        </div>
        <div className="panel">
          <h3>AI配置</h3>
          <p className="muted">第一版保留 AI 总结和复习题接口，尚未接入真实模型。后续可配置 OpenAI 兼容接口。</p>
        </div>
      </section>
    </Shell>
  );
}
