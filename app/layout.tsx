import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI学习网站",
  description: "个人 AI 学习资料、视频、笔记和复习管理系统"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
