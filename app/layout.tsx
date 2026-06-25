import type { Metadata, Viewport } from "next";
import "./globals.css";

const appName = process.env.NEXT_PUBLIC_APP_NAME || "AI学习网站";

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s | ${appName}`
  },
  description: "个人 AI 学习资料、视频、笔记、复习和项目管理系统",
  applicationName: appName,
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
