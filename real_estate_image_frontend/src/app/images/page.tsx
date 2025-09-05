"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { apiListImages, type ImageOut } from "@/lib/api";
import { useApiError } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";

import RequireAuth from "@/components/RequireAuth";

export default function ImagesPage() {
  const [images, setImages] = useState<ImageOut[]>([]);
  const { error, wrap } = useApiError();

  useEffect(() => {
    wrap(async () => {
      const list = await apiListImages();
      setImages(list);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequireAuth>
      <>
        <Header title="Your Images" actions={<Link className="btn btn-primary" href="/upload">Upload</Link>} />
        <div className="container" style={{ paddingTop: 0 }}>
          {error && <div className="card" style={{ background: "#fff7ed", borderColor: "#fed7aa", color: "#9a3412" }}>{error}</div>}
          {images.length ? (
            <div className="grid grid-3">
              {images.map((img) => (
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
            <div className="card">
              No images found. <Link className="link" href="/upload">Upload images</Link>.
            </div>
          )}
        </div>
      </>
    </RequireAuth>
  );
}
