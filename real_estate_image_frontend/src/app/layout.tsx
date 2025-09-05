import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Real Estate Image Enhancer",
  description: "Upload, edit, and manage real estate images with before/after comparisons and subscriptions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <div className="app-shell">
            <Sidebar />
            <main className="main">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
