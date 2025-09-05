"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAuth } from "@/lib/auth";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/upload", label: "Upload" },
  { href: "/images", label: "Images" },
  { href: "/subscriptions", label: "Subscriptions" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="logo">
        <div style={{ width: 10, height: 10, background: "var(--color-accent)", borderRadius: 4 }} />
        <span>Real Estate Enhancer</span>
      </div>
      <nav>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={pathname.startsWith(l.href) ? "active" : ""}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div style={{ marginTop: "auto", padding: 12 }}>
        {user ? (
          <div className="card" style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 14, color: "#6b7280" }}>Signed in</div>
            <div style={{ fontWeight: 600 }}>{user.email}</div>
            <button className="btn btn-ghost" onClick={logout}>Log out</button>
          </div>
        ) : (
          <div className="card" style={{ display: "grid", gap: 8 }}>
            <Link className="btn btn-primary" href="/login">Login</Link>
            <Link className="btn" href="/register">Create account</Link>
          </div>
        )}
      </div>
    </aside>
  );
}
