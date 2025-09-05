"use client";

import React from "react";

export default function Header({ title, actions }: { title: string; actions?: React.ReactNode }) {
  return (
    <div className="header">
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-primary)" }}>{title}</h1>
      <div>{actions}</div>
    </div>
  );
}
