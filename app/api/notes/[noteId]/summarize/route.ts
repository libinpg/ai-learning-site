import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "AI 总结和复习题功能已预留，但尚未配置模型 API。后续可接入 OpenAI 兼容接口。"
  });
}
