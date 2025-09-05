"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { useAuth, useApiError } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { error, setError, wrap } = useApiError();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await wrap(async () => {
      await login(email, password);
      router.push("/dashboard");
    });
    setBusy(false);
  };

  return (
    <>
      <Header title="Login" />
      <div className="container" style={{ paddingTop: 0 }}>
        <form className="card" onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 420 }}>
          {error && <div className="card" style={{ background: "#fff7ed", borderColor: "#fed7aa", color: "#9a3412" }}>{error}</div>}
          <label>Email</label>
          <input className="input" type="email" value={email} onChange={(e) => { setError(null); setEmail(e.target.value); }} required />
          <label>Password</label>
          <input className="input" type="password" value={password} onChange={(e) => { setError(null); setPassword(e.target.value); }} required />
          <button className="btn btn-primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>
      </div>
    </>
  );
}
