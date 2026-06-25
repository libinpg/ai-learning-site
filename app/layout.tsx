import type { Metadata, Viewport } from "next";
import { env } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: env.appName,
    template: `%s | ${env.appName}`
  },
  description: "个人 AI 学习资料、视频、笔记、复习和项目管理系统",
  applicationName: env.appName,
  metadataBase: new URL("http://localhost:3000"),
  robots: {
    index: false,
    follow: false
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <a className="skip-link" href="#main-content">
          跳到主要内容
        </a>
        {children}
      </body>
    </html>
  );
}
