"use client";

import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import BeforeAfterViewer from "@/components/BeforeAfterViewer";
import PromptInput from "@/components/PromptInput";
import HistoryList from "@/components/HistoryList";
import { apiEditHistory, apiGetImage, apiRequestEdit, type EditHistoryOut, type ImageOut } from "@/lib/api";
import { useApiError } from "@/lib/auth";
import { useParams } from "next/navigation";
import RequireAuth from "@/components/RequireAuth";

export default function ImageDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { error, wrap } = useApiError();
  const [image, setImage] = useState<ImageOut | null>(null);
  const [history, setHistory] = useState<EditHistoryOut[]>([]);
  const [loading, setLoading] = useState(true);

  const latestAfter = useMemo(() => {
    const done = history.find((h) => h.status === "completed" && h.result_url);
    return done?.result_url || image?.processed_url || null;
  }, [history, image]);

  const load = async () => {
    await wrap(async () => {
      const [img, hist] = await Promise.all([apiGetImage(id), apiEditHistory(id)]);
      setImage(img);
      setHistory(hist);
    });
    setLoading(false);
  };

  useEffect(() => {
    load();
    // poll for progress every 8s while pending items exist
    const t = setInterval(() => {
      setHistory((h) => {
        const pending = h.some((i) => i.status !== "completed");
        if (pending) load();
        return h;
      });
    }, 8000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitPrompt = async (prompt: string) => {
    await wrap(async () => {
      await apiRequestEdit(id, prompt);
      await load();
    });
  };

  return (
    <RequireAuth>
      <>
        <Header title={`Image #${id}`} />
        <div className="container" style={{ paddingTop: 0, display: "grid", gap: 16 }}>
          {error && <div className="card" style={{ background: "#fff7ed", borderColor: "#fed7aa", color: "#9a3412" }}>{error}</div>}
          {!loading && image && (
            <>
              <BeforeAfterViewer beforeUrl={image.original_url} afterUrl={latestAfter} />
              <PromptInput onSubmit={submitPrompt} />
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Edit History</h3>
                <HistoryList items={history} />
              </div>
            </>
          )}
          {loading && <div className="card">Loading…</div>}
        </div>
      </>
    </RequireAuth>
  );
}
