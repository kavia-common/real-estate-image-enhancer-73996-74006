import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-primary)" }}>
          Welcome to Real Estate Image Enhancer
        </h1>
        <p style={{ color: "#4b5563" }}>
          Upload listing photos, request edits with natural language, and compare results side-by-side.
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <Link className="btn btn-primary" href="/dashboard">Go to Dashboard</Link>
          <Link className="btn" href="/upload">Upload Images</Link>
        </div>
      </div>
    </div>
  );
}
