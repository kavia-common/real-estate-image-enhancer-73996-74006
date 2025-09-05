"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import DropzoneUploader from "@/components/DropzoneUploader";
import { apiUploadImages, type ImageOut } from "@/lib/api";
import { useApiError } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";

import RequireAuth from "@/components/RequireAuth";

export default function UploadPage() {
  const [localPreviews, setLocalPreviews] = useState<string[]>([]);
  const [uploaded, setUploaded] = useState<ImageOut[] | null>(null);
  const { error, wrap } = useApiError();
  const [loading, setLoading] = useState(false);

  const onFiles = async (files: File[]) => {
    setLocalPreviews(files.map((f) => URL.createObjectURL(f)));
    setLoading(true);
    await wrap(async () => {
      const res = await apiUploadImages(files);
      setUploaded(res);
    });
    setLoading(false);
  };

  return (
    <RequireAuth>
      <>
        <Header title="Upload Images" />
        <div className="container" style={{ paddingTop: 0, display: "grid", gap: 16 }}>
          <DropzoneUploader onFiles={onFiles} />
          {error && <div className="card" style={{ background: "#fff7ed", borderColor: "#fed7aa", color: "#9a3412" }}>{error}</div>}
          {localPreviews.length > 0 && (
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Selected</h3>
              <div className="grid grid-3">
                {localPreviews.map((src, i) => (
                  <div key={i} className="card" style={{ overflow: "hidden" }}>
                    <div style={{ position: "relative", width: "100%", height: 160, borderRadius: 12, overflow: "hidden" }}>
                    <Image src={src} alt={`Preview ${i}`} fill style={{ objectFit: "cover" }} />
                  </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {loading && <div className="card">Uploading…</div>}
          {uploaded && (
            <div className="card">
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Uploaded</div>
              <div className="grid grid-3">
                {uploaded.map((img) => (
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
              <div style={{ marginTop: 12 }}>
                <Link className="btn btn-primary" href="/images">Go to Images</Link>
              </div>
            </div>
          )}
        </div>
      </>
    </RequireAuth>
  );
}
