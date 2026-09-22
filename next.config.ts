import type { NextConfig } from "next";

// Static export: every route is prerendered to plain HTML in out/.
// Redirects + security headers are generated into out/.htaccess by scripts/postbuild.mjs
// because `redirects()`/`headers()` do not run in a static export.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
