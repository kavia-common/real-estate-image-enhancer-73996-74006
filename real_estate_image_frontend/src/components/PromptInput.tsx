"use client";

import React, { useState } from "react";

export default function PromptInput({ onSubmit, disabled }: { onSubmit: (prompt: string) => Promise<void> | void; disabled?: boolean; }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      await onSubmit(prompt.trim());
      setPrompt("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card" style={{ display: "grid", gap: 10 }}>
      <label style={{ fontWeight: 600 }}>Describe the edits you want</label>
      <textarea
        className="textarea"
        placeholder="e.g., Remove clutter from the kitchen, brighten the room, and virtually stage with modern furniture."
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={disabled || loading}
      />
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button className="btn btn-primary" disabled={disabled || loading}>
          {loading ? "Submitting…" : "Submit Edit Request"}
        </button>
      </div>
    </form>
  );
}
