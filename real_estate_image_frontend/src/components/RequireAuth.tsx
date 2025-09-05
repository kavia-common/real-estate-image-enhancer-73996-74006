"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading) return <div className="container"><div className="card">Loading…</div></div>;
  if (!user) return null;
  return <>{children}</>;
}
