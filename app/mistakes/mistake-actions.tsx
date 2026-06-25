"use client";

export function MistakeActions({ mistake }: { mistake: { id: string; resolved: boolean } }) {
  async function toggle() {
    const res = await fetch(`/api/mistakes/${mistake.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resolved: !mistake.resolved })
    });
    if (res.ok) location.reload();
    else alert("保存失败，请先登录管理员");
  }

  return (
    <button className="btn secondary" onClick={toggle}>
      {mistake.resolved ? "标记未掌握" : "标记已掌握"}
    </button>
  );
}
