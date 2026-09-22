import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts", "public/**"] },
  {
    rules: {
      // Prepared AVIF/WebP package is rendered via <picture>; next/image optimisation is unavailable in static export.
      "@next/next/no-img-element": "off",
    },
  },
];
export default config;
