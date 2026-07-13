import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework to would-be attackers scanning for
  // framework-specific CVEs.
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";

    // Next.js dev mode needs 'unsafe-eval' for its HMR/React Refresh runtime;
    // production doesn't, so keep dev-only leniency out of the shipped build.
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://lh3.googleusercontent.com https://*.googleusercontent.com https://*.supabase.co",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://accounts.google.com",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
