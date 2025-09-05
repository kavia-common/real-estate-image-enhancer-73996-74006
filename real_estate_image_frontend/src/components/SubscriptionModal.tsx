"use client";

import React, { useState } from "react";
import { apiCreateCheckoutSession, apiCreateOrUpdateSubscription } from "@/lib/api";
import { useApiError } from "@/lib/auth";

type Props = {
  open: boolean;
  onClose: () => void;
  onUpdated?: () => void;
};

const PLANS = [
  { id: "trial", name: "Trial", desc: "Try with limited free edits", price: "$0" },
  { id: "basic", name: "Basic", desc: "Monthly package for small teams", price: "$29/mo" },
  { id: "pro", name: "Pro", desc: "Higher volume, pro features", price: "$79/mo" },
];

export default function SubscriptionModal({ open, onClose, onUpdated }: Props) {
  const { error, wrap } = useApiError();
  const [loading, setLoading] = useState<string | null>(null);

  if (!open) return null;

  const choose = async (plan: string) => {
    setLoading(plan);
    await wrap(async () => {
      // Create/update subscription in backend first
      await apiCreateOrUpdateSubscription(plan);
      onUpdated?.();
      // Create checkout session for paid plans
      if (plan !== "trial") {
        const { url } = await apiCreateCheckoutSession(plan);
        if (url) {
          window.location.href = url;
          return;
        }
      }
      onClose();
    });
    setLoading(null);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>Choose a plan</h3>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
        {error && <div className="card" style={{ background: "#fff7ed", borderColor: "#fed7aa", color: "#9a3412", marginBottom: 8 }}>{error}</div>}
        <div className="grid grid-3">
          {PLANS.map((p) => (
            <div key={p.id} className="card" style={{ display: "grid", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontWeight: 700 }}>{p.name}</div>
                <div style={{ color: "#374151" }}>{p.price}</div>
              </div>
              <div style={{ fontSize: 14, color: "#4b5563" }}>{p.desc}</div>
              <button className="btn btn-primary" onClick={() => choose(p.id)} disabled={loading === p.id}>
                {loading === p.id ? "Processing…" : p.id === "trial" ? "Start free trial" : "Select"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
