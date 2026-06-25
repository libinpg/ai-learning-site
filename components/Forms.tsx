"use client";

import { useState } from "react";

type Option = { id: string; title: string };

async function post(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error((await res.json()).error || "操作失败");
  location.reload();
}

export function CourseForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        post("/api/courses", { title, description }).catch(alert);
      }}
    >
      <div className="field">
        <label>课程标题</label>
        <input className="input" value={title} onChange={(event) => setTitle(event.target.value)} required />
      </div>
      <div className="field">
        <label>课程描述</label>
        <textarea className="textarea" value={description} onChange={(event) => setDescription(event.target.value)} />
      </div>
      <button className="btn">新建课程</button>
    </form>
  );
}

export function ChapterForm({ courseId }: { courseId: string }) {
  const [title, setTitle] = useState("");
  return (
    <form
      className="row"
      onSubmit={(event) => {
        event.preventDefault();
        post("/api/chapters", { courseId, title }).catch(alert);
      }}
    >
      <input className="input" value={title} placeholder="新章节" onChange={(event) => setTitle(event.target.value)} required />
      <button className="btn">添加章节</button>
    </form>
  );
}

export function LessonForm({ chapterId }: { chapterId: string }) {
  const [title, setTitle] = useState("");
  return (
    <form
      className="row"
      onSubmit={(event) => {
        event.preventDefault();
        post("/api/lessons", { chapterId, title }).catch(alert);
      }}
    >
      <input className="input" value={title} placeholder="新课时" onChange={(event) => setTitle(event.target.value)} required />
      <button className="btn">添加课时</button>
    </form>
  );
}

export function TaskForm({ courses, lessons }: { courses: Option[]; lessons: Option[] }) {
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [lessonId, setLessonId] = useState("");
  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        post("/api/tasks", { title, courseId: courseId || undefined, lessonId: lessonId || undefined }).catch(alert);
      }}
    >
      <input className="input" value={title} placeholder="作业或项目标题" onChange={(event) => setTitle(event.target.value)} required />
      <select className="select" value={courseId} onChange={(event) => setCourseId(event.target.value)}>
        <option value="">不绑定课程</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>
      <select className="select" value={lessonId} onChange={(event) => setLessonId(event.target.value)}>
        <option value="">不绑定课时</option>
        {lessons.map((lesson) => (
          <option key={lesson.id} value={lesson.id}>
            {lesson.title}
          </option>
        ))}
      </select>
      <button className="btn">添加任务</button>
    </form>
  );
}
