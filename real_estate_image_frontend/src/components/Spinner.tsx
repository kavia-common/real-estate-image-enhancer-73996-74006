"use client";

import React from "react";

export default function Spinner({ size = 16 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: "2px solid #e5e7eb",
        borderTopColor: "var(--color-accent)",
        borderRadius: "50%",
        animation: "spin 0.6s linear infinite",
      }}
    />
  );
}
