// Static QA over the exported site (out/). Exits non-zero on errors.
// Checks: title/description/canonical/og:image per page, exactly one H1, heading level skips,
// images (alt, width, height, lazy except hero), internal links + assets resolve, JSON-LD parses,
// duplicate titles/descriptions, sitemap URLs exist, robots references sitemap, 404 page exists.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = "out";
const HOST = "https://paktalc.com";
const errors = [];
const warnings = [];
const err = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warnings.push(`${f}: ${m}`);

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const htmlFiles = walk(OUT).filter((f) => f.endsWith(".html") && !f.includes(`${OUT}\\_next`) && !f.includes(`${OUT}/_next`));

function resolveInternal(href) {
  const url = new URL(href, HOST);
  if (url.origin !== HOST) return true;
  let p = decodeURIComponent(url.pathname);
  if (p.endsWith("/")) return existsSync(join(OUT, p, "index.html"));
  return existsSync(join(OUT, p));
}

const titles = new Map();
const descs = new Map();

for (const file of htmlFiles) {
  const rel = "/" + relative(OUT, file).replace(/\\/g, "/");
  const html = readFileSync(file, "utf8");
  const isUtility = /\/(404|_not-found)(\/index)?\.html$/.test(rel) || rel.includes("/thank-you/");
  const pick = (re) => (html.match(re) || [])[1];

  const title = pick(/<title>([^<]*)<\/title>/);
  const desc = pick(/<meta name="description" content="([^"]*)"/);
  const canonical = pick(/<link rel="canonical" href="([^"]*)"/);
  const ogImage = pick(/<meta property="og:image" content="([^"]*)"/);
  const robots = pick(/<meta name="robots" content="([^"]*)"/);

  if (!title) err(rel, "missing <title>");
  else if (title.length > 70) warn(rel, `title ${title.length} chars: "${title}"`);
  if (!isUtility) {
    if (!desc) err(rel, "missing meta description");
    else if (desc.length < 70 || desc.length > 170) warn(rel, `description ${desc.length} chars`);
    if (!canonical) err(rel, "missing canonical");
    else {
      const expected = rel.replace(/index\.html$/, "");
      if (new URL(canonical).pathname !== expected) err(rel, `canonical ${canonical} ≠ ${expected}`);
      if (!canonical.startsWith(HOST)) err(rel, `canonical not on ${HOST}`);
    }
    if (!ogImage) err(rel, "missing og:image");
    else if (!existsSync(join(OUT, new URL(ogImage, HOST).pathname))) err(rel, `og:image file missing: ${ogImage}`);
    if (robots && /noindex/.test(robots)) err(rel, "indexable page has noindex");
    if (title) titles.set(title, [...(titles.get(title) || []), rel]);
    if (desc) descs.set(desc, [...(descs.get(desc) || []), rel]);
  }

  // Headings (strip scripts first)
  const body = html.replace(/<script[\s\S]*?<\/script>/g, "");
  const h1s = body.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) err(rel, `${h1s.length} <h1> elements`);
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      warn(rel, `heading skip h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }

  // Images
  let eagerCount = 0;
  for (const m of body.matchAll(/<img\b([^>]*)>/g)) {
    const a = m[1];
    if (!/\salt="/.test(a)) err(rel, `img without alt: ${a.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(a) || !/\sheight="\d+"/.test(a)) err(rel, `img without width/height: ${a.slice(0, 80)}`);
    const src = (a.match(/\ssrc="([^"]+)"/) || [])[1];
    if (src && !src.startsWith("data:") && !resolveInternal(src)) err(rel, `img src missing: ${src}`);
    if (/loading="eager"/.test(a) || /fetchpriority="high"/i.test(a)) eagerCount++;
  }
  if (eagerCount > 1) warn(rel, `${eagerCount} priority images (expected ≤ 1)`);
  for (const m of body.matchAll(/srcset="([^"]+)"/gi)) {
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (u && !resolveInternal(u)) err(rel, `srcset file missing: ${u}`);
    }
  }

  // Links
  for (const m of body.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (/^(mailto:|tel:|#|https?:\/\/(?!paktalc\.com))/.test(href)) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (!clean) continue;
    if (!resolveInternal(clean)) err(rel, `broken link: ${href}`);
  }
  for (const m of body.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    if (!/rel="[^"]*noopener/.test(m[0])) err(rel, "target=_blank without rel=noopener");
  }

  // JSON-LD
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      const types = (data["@graph"] || [data]).map((n) => n["@type"]);
      for (const bad of ["AggregateRating", "Review", "Offer"]) if (JSON.stringify(data).includes(`"${bad}"`)) err(rel, `JSON-LD contains ${bad}`);
      if (!isUtility && !types.includes("Organization")) warn(rel, "JSON-LD without Organization");
    } catch (e) {
      err(rel, `invalid JSON-LD: ${e.message}`);
    }
  }
  if (!isUtility && !html.includes("application/ld+json")) err(rel, "no JSON-LD");
  if (!/<html lang="en"/.test(html)) err(rel, "missing <html lang>");
  if (!/<a href="#main" class="skip-link"/.test(html)) err(rel, "missing skip link");
}

for (const [t, files] of titles) if (files.length > 1) err("duplicate title", `"${t}" on ${files.join(", ")}`);
for (const [, files] of descs) if (files.length > 1) err("duplicate description", files.join(", "));

// Sitemap + robots
const sm = readFileSync(join(OUT, "sitemap.xml"), "utf8");
const smUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const u of smUrls) if (!resolveInternal(u)) err("sitemap.xml", `URL does not exist: ${u}`);
if (smUrls.some((u) => u.includes("thank-you"))) err("sitemap.xml", "contains thank-you page");
const robots = readFileSync(join(OUT, "robots.txt"), "utf8");
if (!robots.includes(`${HOST}/sitemap.xml`)) err("robots.txt", "does not reference sitemap");
if (/Disallow: \/\s*$/m.test(robots.split(/User-Agent: \*/i)[1]?.split(/User-Agent/i)[0] ?? "")) err("robots.txt", "blanket disallow for *");
if (!existsSync(join(OUT, "404.html"))) err("404", "out/404.html missing");
if (!existsSync(join(OUT, ".htaccess"))) err(".htaccess", "missing (run postbuild)");
if (!existsSync(join(OUT, "llms.txt"))) err("llms.txt", "missing");
for (const f of ["api/rfq.php", "api/rfq-token.php", "api/_lib/bootstrap.php", "api/_lib/.htaccess"]) if (!existsSync(join(OUT, f))) err("php", `${f} missing from out/`);

console.log(`Checked ${htmlFiles.length} HTML files, ${smUrls.length} sitemap URLs.`);
if (warnings.length) console.log(`\n${warnings.length} warning(s):\n  ` + warnings.join("\n  "));
if (errors.length) {
  console.log(`\n${errors.length} error(s):\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log("\nAll checks passed.");
