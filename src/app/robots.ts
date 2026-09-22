import type { MetadataRoute } from "next";
import { site } from "@content/company";
import { allowAITraining } from "@content/seo";

export const dynamic = "force-static";

/**
 * Search and answer engines (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot…) are always allowed.
 * Model-training crawlers are governed by `allowAITraining` in content/seo.ts (a business decision).
 */
const TRAINING_BOTS = ["GPTBot", "Google-Extended", "CCBot", "ClaudeBot", "anthropic-ai", "Applebot-Extended", "Bytespider"];

export default function robots(): MetadataRoute.Robots {
  const rules: MetadataRoute.Robots["rules"] = [
    { userAgent: "*", allow: "/", disallow: ["/api/", "/contacts/thank-you/"] },
    { userAgent: ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Googlebot", "Bingbot"], allow: "/", disallow: ["/api/"] },
  ];
  if (!allowAITraining) rules.push({ userAgent: TRAINING_BOTS, disallow: "/" });
  return { rules, sitemap: `${site.url}/sitemap.xml` };
}
