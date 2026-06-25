"use client";

import { useRef, useState } from "react";
import { secondsLabel } from "@/lib/format";

type TimestampNote = { id: string; seconds: number; title: string; content: string; important: boolean };
type Attachment = { id: string; title: string; filePath: string; fileName: string; fileType: string };
type Quiz = { id: string; title: string; questions: { id: string; prompt: string; options: string; correctAnswer: string }[] };

export function LessonWorkspace({
  lesson
}: {
  lesson: {
    id: string;
    title: string;
    videoPath: string | null;
    videoType: string | null;
    playbackSeconds: number;
    completed: boolean;
    favorite: boolean;
    note: { id: string; content: string } | null;
    timestampNotes: TimestampNote[];
    attachments: Attachment[];
    quizzes: Quiz[];
  };
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [content, setContent] = useState(lesson.note?.content || "");
  const [stampTitle, setStampTitle] = useState("");
  const [message, setMessage] = useState("");

  async function saveNote() {
    const res = await fetch(`/api/notes/${lesson.note?.id || "new"}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: lesson.id, content })
    });
    setMessage(res.ok ? "笔记已保存" : "保存失败，请先登录管理员");
  }

  async function saveProgress(completed = false) {
    const seconds = Math.floor(videoRef.current?.currentTime || 0);
    await fetch(`/api/lessons/${lesson.id}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playbackSeconds: seconds, completed })
    });
  }

  async function addTimestamp() {
    const seconds = Math.floor(videoRef.current?.currentTime || 0);
    const res = await fetch("/api/timestamp-notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: lesson.id, seconds, title: stampTitle || `重点 ${secondsLabel(seconds)}` })
    });
    if (res.ok) location.reload();
    else setMessage("添加失败，请先登录管理员");
  }

  async function upload(kind: "video" | "attachment", file: File) {
    const form = new FormData();
    form.set("file", file);
    form.set("lessonId", lesson.id);
    const res = await fetch(kind === "video" ? "/api/uploads/video" : "/api/uploads/attachment", {
      method: "POST",
      body: form
    });
    if (res.ok) location.reload();
    else setMessage("上传失败，请先登录管理员");
  }

  async function summarize() {
    const res = await fetch(`/api/notes/${lesson.note?.id || "new"}/summarize`, { method: "POST" });
    const json = await res.json();
    setMessage(json.message || json.error);
  }

  return (
    <div className="workspace">
      <section className="grid">
        <div className="panel">
          <h2>{lesson.title}</h2>
          {lesson.videoPath ? (
            <video
              ref={videoRef}
              className="video"
              controls
              src={`/api/files/${lesson.videoPath}`}
              onLoadedMetadata={() => {
                if (videoRef.current && lesson.playbackSeconds) videoRef.current.currentTime = lesson.playbackSeconds;
              }}
              onPause={() => saveProgress(false)}
            />
          ) : (
            <div className="video row" style={{ color: "white", justifyContent: "center" }}>
              尚未上传视频
            </div>
          )}
          <div className="row" style={{ marginTop: 12 }}>
            <label className="btn secondary">
              上传视频
              <input hidden type="file" accept="video/*" onChange={(event) => event.target.files?.[0] && upload("video", event.target.files[0])} />
            </label>
            <button className="btn ghost" onClick={() => saveProgress(true)}>
              标记完成
            </button>
            <button className="btn ghost" onClick={() => saveProgress(false)}>
              保存进度
            </button>
          </div>
        </div>

        <div className="panel">
          <h3>时间戳重点</h3>
          <div className="row">
            <input className="input" value={stampTitle} placeholder="当前时间点标题" onChange={(event) => setStampTitle(event.target.value)} />
            <button className="btn" onClick={addTimestamp}>
              添加
            </button>
          </div>
          <div className="list" style={{ marginTop: 12 }}>
            {lesson.timestampNotes.map((stamp) => (
              <button
                className="item"
                key={stamp.id}
                onClick={() => {
                  if (videoRef.current) videoRef.current.currentTime = stamp.seconds;
                }}
              >
                <strong>{secondsLabel(stamp.seconds)}</strong> {stamp.title}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>附件</h3>
          <label className="btn secondary">
            上传附件
            <input hidden type="file" onChange={(event) => event.target.files?.[0] && upload("attachment", event.target.files[0])} />
          </label>
          <div className="list" style={{ marginTop: 12 }}>
            {lesson.attachments.map((attachment) => (
              <a className="item" key={attachment.id} href={`/api/files/${attachment.filePath}`} target="_blank">
                {attachment.title}
                <div className="muted">{attachment.fileType}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <aside className="grid">
        <div className="panel">
          <h3>Markdown 笔记</h3>
          <textarea className="textarea" value={content} onChange={(event) => setContent(event.target.value)} />
          <div className="row" style={{ marginTop: 10 }}>
            <button className="btn" onClick={saveNote}>
              保存笔记
            </button>
            <button className="btn secondary" onClick={summarize}>
              AI总结/复习题
            </button>
          </div>
          {message && <p className="muted">{message}</p>}
        </div>
        <div className="panel">
          <h3>预览</h3>
          <div className="markdown-preview">{content || "暂无笔记内容"}</div>
        </div>
        <div className="panel">
          <h3>测验</h3>
          {lesson.quizzes.length === 0 ? <p className="muted">暂无测验</p> : null}
          {lesson.quizzes.map((quiz) => (
            <div className="item" key={quiz.id}>
              <strong>{quiz.title}</strong>
              <p className="muted">{quiz.questions.length} 道题</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
