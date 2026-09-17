import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse (via pdfjs-dist) sets up a Node "fake worker" at require-time
  // that Turbopack's server bundling breaks (it can't resolve the emitted
  // pdf.worker.mjs chunk). Excluding it from bundling and using native
  // Node `require` instead avoids that.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist"],
};

export default nextConfig;
