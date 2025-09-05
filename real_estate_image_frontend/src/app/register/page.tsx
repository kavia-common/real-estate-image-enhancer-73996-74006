"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { apiRegister } from "@/lib/api";
import { useApiError } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { error, setError, wrap } = useApiError();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const ok = await wrap(async () => {
      await apiRegister({ email, password, full_name: fullName || null });
    });
    setBusy(false);
    if (ok !== null) router.push("/login");
  };

  return (
    <>
      <Header title="Create account" />
      <div className="container" style={{ paddingTop: 0 }}>
        <form className="card" onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 480 }}>
          {error && <div className="card" style={{ background: "#fff7ed", borderColor: "#fed7aa", color: "#9a3412" }}>{error}</div>}
          <label>Full name (optional)</label>
          <input className="input" value={fullName} onChange={(e) => { setError(null); setFullName(e.target.value); }} />
          <label>Email</label>
          <input className="input" type="email" value={email} onChange={(e) => { setError(null); setEmail(e.target.value); }} required />
          <label>Password (min 8 chars)</label>
          <input className="input" type="password" minLength={8} value={password} onChange={(e) => { setError(null); setPassword(e.target.value); }} required />
          <button className="btn btn-primary" disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
        </form>
      </div>
    </>
  );
}
