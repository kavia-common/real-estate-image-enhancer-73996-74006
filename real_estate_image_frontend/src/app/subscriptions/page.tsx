"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { apiListSubscriptions, type SubscriptionOut } from "@/lib/api";
import { useApiError } from "@/lib/auth";
import SubscriptionModal from "@/components/SubscriptionModal";

import RequireAuth from "@/components/RequireAuth";

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState<SubscriptionOut[]>([]);
  const { error, wrap } = useApiError();
  const [open, setOpen] = useState(false);

  const load = async () => {
    await wrap(async () => {
      const s = await apiListSubscriptions();
      setSubs(s);
    });
  };

  useEffect(() => {
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequireAuth>
      <>
        <Header title="Subscriptions" actions={<button className="btn btn-primary" onClick={() => setOpen(true)}>Change Plan</button>} />
        <div className="container" style={{ paddingTop: 0, display: "grid", gap: 12 }}>
          {error && <div className="card" style={{ background: "#fff7ed", borderColor: "#fed7aa", color: "#9a3412" }}>{error}</div>}
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Current Subscriptions</div>
            {subs.length ? (
              <div className="grid">
                {subs.map((s) => (
                  <div key={s.id} className="card" style={{ display: "grid", gap: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div className="badge">#{s.id}</div>
                      <div className="badge" style={{ background: "#fff" }}>{new Date(s.created_at).toLocaleString()}</div>
                    </div>
                    <div>Plan: <strong>{s.plan}</strong></div>
                    <div>Status: {s.status}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No active subscriptions. Click &quot;Change Plan&quot; to start a trial or subscribe.</div>
            )}
          </div>
        </div>
        <SubscriptionModal open={open} onClose={() => setOpen(false)} onUpdated={load} />
      </>
    </RequireAuth>
  );
}
