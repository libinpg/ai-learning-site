"use client";

import { useState } from "react";

export function AdminGate({ isAdmin }: { isAdmin: boolean }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(isAdmin ? "已登录管理员" : "管理操作需要密码");

  async function login() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (res.ok) {
      setMessage("已登录管理员");
      location.reload();
    } else {
      setMessage("密码不正确");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    location.reload();
  }

  return (
    <div className="panel">
      <h3>管理员</h3>
      <p className="muted">{message}</p>
      {isAdmin ? (
        <button className="btn secondary" onClick={logout}>
          退出登录
        </button>
      ) : (
        <div className="row">
          <input
            className="input"
            style={{ maxWidth: 260 }}
            type="password"
            placeholder="管理员密码"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="btn" onClick={login}>
            登录
          </button>
        </div>
      )}
    </div>
  );
}
