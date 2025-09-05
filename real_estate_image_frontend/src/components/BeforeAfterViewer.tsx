"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  beforeUrl: string;
  afterUrl?: string | null;
};

export default function BeforeAfterViewer({ beforeUrl, afterUrl }: Props) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onMove = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setPos(Math.round((x / rect.width) * 100));
  };

  return (
    <div
      ref={containerRef}
      className="card"
      style={{ position: "relative", overflow: "hidden", height: 360 }}
      onMouseMove={(e) => onMove(e.clientX)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
    >
      <Image src={beforeUrl} alt="Before" fill style={{ objectFit: "cover" }} />
      {afterUrl ? (
        <>
          <div style={{ position: "absolute", inset: 0, width: `${pos}%`, overflow: "hidden" }}>
            <Image src={afterUrl} alt="After" fill style={{ objectFit: "cover" }} />
          </div>
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: `calc(${pos}% - 1px)`,
            width: 2, background: "rgba(255,255,255,0.9)", boxShadow: "0 0 0 1px rgba(0,0,0,0.1)"
          }} />
        </>
      ) : (
        <div className="badge" style={{ position: "absolute", top: 12, right: 12, background: "#fff" }}>
          Processing…
        </div>
      )}
      <div style={{ position: "absolute", bottom: 10, left: 10 }} className="badge">Before</div>
      <div style={{ position: "absolute", bottom: 10, right: 10 }} className="badge">After</div>
    </div>
  );
}
