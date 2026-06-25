"use client";

import { useState } from "react";

export function TaskActions({ task }: { task: { id: string; status: string; submitUrl: string; reviewNote: string } }) {
  const [status, setStatus] = useState(task.status);
  const [submitUrl, setSubmitUrl] = useState(task.submitUrl);
  const [reviewNote, setReviewNote] = useState(task.reviewNote);

  async function save() {
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, submitUrl, reviewNote })
    });
    if (!res.ok) alert("保存失败，请先登录管理员");
  }

  return (
    <div className="form">
      <select className="select" value={status} onChange={(event) => setStatus(event.target.value)}>
        <option value="todo">待完成</option>
        <option value="doing">进行中</option>
        <option value="done">已完成</option>
      </select>
      <input className="input" value={submitUrl} placeholder="提交链接" onChange={(event) => setSubmitUrl(event.target.value)} />
      <textarea className="textarea" value={reviewNote} placeholder="复盘笔记" onChange={(event) => setReviewNote(event.target.value)} />
      <button className="btn secondary" onClick={save}>
        保存任务
      </button>
    </div>
  );
}
