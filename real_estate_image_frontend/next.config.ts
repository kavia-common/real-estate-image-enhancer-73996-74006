import type { NextConfig } from "next";

const allowedDomain = process.env.NEXT_PUBLIC_API_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL).hostname
  : "localhost";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      { protocol: "http", hostname: allowedDomain, pathname: "/**" },
      { protocol: "https", hostname: allowedDomain, pathname: "/**" },
      // Allow any common CDN or storage host patterns here as needed.
    ],
    // Allow data URLs for local previews created via URL.createObjectURL
    // Next.js 15 supports 'unoptimized' locally, but we keep remotePatterns above for backend
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
