import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse (via pdfjs-dist) sets up a Node "fake worker" at require-time
  // that Turbopack's server bundling breaks (it can't resolve the emitted
  // pdf.worker.mjs chunk). Excluding it from bundling and using native
  // Node `require` instead avoids that.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist"],

  // Baseline security headers (Phase 7 security review) — this app has no
  // reason to be framed by another site, sniffed as a different content
  // type, or leak the referrer path to third parties.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;
