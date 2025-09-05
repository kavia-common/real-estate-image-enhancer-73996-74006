"use client";

import React from "react";
import type { EditHistoryOut } from "@/lib/api";

export default function HistoryList({ items }: { items: EditHistoryOut[] }) {
  if (!items?.length) {
    return <div className="card">No edit history yet.</div>;
  }
  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
      {items.map((h) => (
        <div key={h.id} className="card" style={{ display: "grid", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="badge">#{h.id}</div>
            <div className="badge" style={{ background: "#fff" }}>{new Date(h.created_at).toLocaleString()}</div>
          </div>
          <div style={{ fontSize: 14, color: "#4b5563" }}>{h.prompt}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="badge" style={{ background: h.status === "completed" ? "#ecfdf5" : "#f3f4f6", borderColor: h.status === "completed" ? "#d1fae5" : undefined, color: h.status === "completed" ? "#065f46" : undefined }}>
              {h.status}
            </span>
            {h.error_message && <span className="badge" style={{ background: "#fff0f0", borderColor: "#fecaca", color: "#991b1b" }}>Error: {h.error_message}</span>}
            {h.result_url && (
              <a href={h.result_url} target="_blank" rel="noreferrer" className="link">View result</a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
