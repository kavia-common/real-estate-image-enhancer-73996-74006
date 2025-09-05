"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { apiDashboard, type DashboardSummary } from "@/lib/api";
import { useApiError } from "@/lib/auth";
import Link from "next/link";
import SubscriptionModal from "@/components/SubscriptionModal";
import RequireAuth from "@/components/RequireAuth";
import Image from "next/image";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const { error, wrap } = useApiError();
  const [showPlans, setShowPlans] = useState(false);

  useEffect(() => {
    wrap(async () => {
      const d = await apiDashboard();
      setData(d);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequireAuth>
      <div>
        <Header
          title="Dashboard"
          actions={<button className="btn btn-secondary" onClick={() => setShowPlans(true)}>Manage Plan</button>}
        />
        <div className="container" style={{ paddingTop: 0, display: "grid", gap: 16 }}>
          {error && <div className="card" style={{ background: "#fff7ed", borderColor: "#fed7aa", color: "#9a3412" }}>{error}</div>}
          <div className="grid grid-3">
            <div className="card">
              <div className="badge">Usage</div>
              <div style={{ fontSize: 14, color: "#4b5563", marginTop: 8 }}>
                <div>Total uploaded: {data?.usage.total_uploaded ?? "-"}</div>
                <div>Total edited: {data?.usage.total_edited ?? "-"}</div>
                <div>Trial remaining: <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>{data?.usage.trial_remaining ?? "-"}</span></div>
              </div>
            </div>
            <div className="card">
              <div className="badge">Your account</div>
              <div style={{ fontSize: 14, color: "#4b5563", marginTop: 8 }}>
                <div>Email: {data?.user.email ?? "-"}</div>
                <div>Status: {data?.user.is_active ? "Active" : "Inactive"}</div>
              </div>
            </div>
            <div className="card">
              <div className="badge">Subscription</div>
              <div style={{ fontSize: 14, color: "#4b5563", marginTop: 8 }}>
                {data?.subscriptions?.length ? (
                  <>
                    <div>Plan: {data.subscriptions[0].plan}</div>
                    <div>Status: {data.subscriptions[0].status}</div>
                  </>
                ) : (
                  <div>No subscription yet.</div>
                )}
              </div>
            </div>
          </div>
          <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700 }}>Ready to enhance your listings?</div>
              <div style={{ fontSize: 14, color: "#4b5563" }}>Upload images and request edits with natural language prompts.</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link className="btn" href="/upload">Upload</Link>
              <Link className="btn btn-primary" href="/images">Manage Images</Link>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Recent Images</h3>
            {data?.images?.length ? (
              <div className="grid grid-3">
                {data.images.slice(0, 6).map((img) => (
                  <Link key={img.id} href={`/images/${img.id}`}>
                    <div className="card" style={{ overflow: "hidden" }}>
                      <div style={{ position: "relative", width: "100%", height: 160, borderRadius: 12, overflow: "hidden" }}>
                        <Image src={img.original_url} alt={img.filename} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div style={{ marginTop: 8, fontSize: 14 }}>{img.filename}</div>
                      <div className="badge" style={{ marginTop: 6 }}>{img.status}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="card">No images yet. <Link className="link" href="/upload">Upload some</Link>.</div>
            )}
          </div>
        </div>
        <SubscriptionModal open={showPlans} onClose={() => setShowPlans(false)} onUpdated={() => { /* no-op, dashboard reads fresh on reload */ }} />
      </div>
    </RequireAuth>
  );
}
