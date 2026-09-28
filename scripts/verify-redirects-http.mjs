// Local HTTP verification of the generated Apache rules. The server below reads out/.htaccess;
// it does not use content/redirects.ts to decide where an incoming legacy URL goes.
// Apache itself is still the final production check on Hostinger.
import http from "node:http";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { redirects } from "../content/redirects.ts";

const origin = "https://paktalc.com";
const out = "out";
const htaccess = readFileSync(join(out, ".htaccess"), "utf8");
const pageBlock = htaccess.split("# --- 1. Legacy WordPress pages")[1]?.split("# WordPress query-string URLs")[0];
if (!pageBlock) throw new Error("No page migration rules in out/.htaccess");
const rules = [...pageBlock.matchAll(/^RewriteRule (\S+) (https:\/\/\S+) \[R=301,L,QSD\]$/gm)]
  .map(([, pattern, destination]) => ({ re: new RegExp(`^${pattern}$`), destination }));
if (rules.length !== redirects.length) throw new Error(`Expected ${redirects.length} page rules, got ${rules.length}`);
const imageBlock = htaccess.split("# --- 2. Legacy WordPress image URLs")[1]?.split("# --- 3. Trailing slash")[0];
if (!imageBlock) throw new Error("No image migration rules in out/.htaccess");
const imageRules = [...imageBlock.matchAll(/^RewriteRule (\S+) (https:\/\/\S+) \[R=301,L,QSD\]$/gm)]
  .map(([, pattern, destination]) => ({ re: new RegExp(`^${pattern}$`), destination }));
const firstPrefix = redirects.filter((r) => !r.prefix).length;
if (rules.slice(0, firstPrefix).some(({ re }) => re.test("services/unlisted/"))) throw new Error("Prefix rule before exact rules");
if (!htaccess.includes("RewriteRule ^wp-(admin|login\\.php|json|includes)(/.*)?$ - [R=410,L]")) {
  throw new Error("WordPress system URL protection missing");
}
if (!htaccess.includes("RewriteCond %{HTTPS} off [OR]") || !htaccess.includes("https://paktalc.com/$1 [R=301,L]")) {
  throw new Error("Canonical host/HTTPS rewrite missing");
}
const published = JSON.parse(readFileSync(join(out, "redirects.json"), "utf8"));
if (JSON.stringify(published.pages) !== JSON.stringify(redirects)) throw new Error("redirects.json differs from the source mapping");
if (imageRules.length !== published.images.length) throw new Error(`Expected ${published.images.length} image rules, got ${imageRules.length}`);

// Exercises the ordered rewrite expressions actually emitted for Apache over real local HTTP.
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, origin).pathname;
  const relativePath = pathname.slice(1);
  for (const rule of [...rules, ...imageRules]) {
    if (rule.re.test(relativePath)) {
      res.writeHead(301, { Location: rule.destination });
      res.end();
      return;
    }
  }
  if (/^wp-(admin|login\.php|json|includes)(\/|$)/.test(relativePath) || relativePath === "xmlrpc.php") {
    res.writeHead(410); res.end(); return;
  }
  const file = join(out, pathname, "index.html");
  if (existsSync(file) && statSync(file).isFile()) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(readFileSync(file));
  } else if (existsSync(join(out, pathname)) && statSync(join(out, pathname)).isFile()) {
    res.writeHead(200);
    res.end(readFileSync(join(out, pathname)));
  } else {
    res.writeHead(404); res.end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
const failures = [];
let checks = 0;
let sitemapCount = 0;
async function get(path, host = "paktalc.com", scheme = "https") {
  return new Promise((resolve, reject) => {
    const request = http.get({ hostname: "127.0.0.1", port, path, headers: { Host: host, "X-Test-Scheme": scheme } }, (response) => {
      const chunks = [];
      response.on("data", (part) => chunks.push(part));
      response.on("end", () => resolve({ status: response.statusCode, location: response.headers.location, body: Buffer.concat(chunks).toString() }));
    });
    request.on("error", reject);
  });
}
const wildcardSamples = {
  "/industrium_services_category/": ["sample"],
  "/category/": ["blog", "news"],
  "/case-studies/": ["case-study", "interactive-technologies-in-factories-and-plants", "creation-of-industrial-projects-around-the-world", "manufacturing-research-in-kiev-and-other-regions-of-the-country"],
  "/industrium_case_study_category/": ["sample"],
  "/industrium_case_study_tag/": ["sample"],
  "/projects/": ["sample"],
  "/portfolio/": ["extending-your-views", "tools-for-the-right-industry", "a-broader-perspective", "simon-oswald-project"],
  "/industrium_portfolio_category/": ["sample"],
  "/team/": ["chief-operating-officer", "environmental-sustainability-lead"],
  "/industrium_team_department/": ["sample"],
  "/careers/": ["global-sales-marketing", "chief-financial-officer"],
};
const examples = redirects.flatMap((r) => [r.from, ...(r.prefix ? (wildcardSamples[r.from] || ["sample"]).map((part) => `${r.from}${part}/`) : [])]);
function expectedFor(path) {
  const exact = redirects.find((r) => !r.prefix && r.from === path);
  const prefix = redirects.filter((r) => r.prefix && (path === r.from || path.startsWith(r.from))).sort((a, b) => b.from.length - a.from.length)[0];
  return origin + (exact || prefix)?.to;
}
try {
  for (const original of examples) {
    const expected = expectedFor(original);
    for (const path of [original, original.slice(0, -1)]) {
      for (const [host, scheme, suffix] of [
        ["paktalc.com", "https", ""],
        ["www.paktalc.com", "http", "?p=12&utm_source=google"],
      ]) {
        const response = await get(path + suffix, host, scheme);
        checks++;
        if (response.status !== 301 || response.location !== expected) {
          failures.push(`${scheme}://${host}${path + suffix}: ${response.status} ${response.location}, expected 301 ${expected}`);
        }
      }
    }
    const destination = await get(new URL(expected).pathname);
    checks++;
    if (destination.status !== 200 || destination.location) failures.push(`${expected}: expected final 200, got ${destination.status} ${destination.location}`);
  }
  for (const { from, to } of published.images) {
    const response = await get(`${from}?utm_source=google`, "www.paktalc.com", "http");
    checks++;
    if (response.status !== 301 || response.location !== origin + to) failures.push(`Image ${from}: expected 301 ${origin + to}, got ${response.status} ${response.location}`);
    const destination = await get(to);
    checks++;
    if (destination.status !== 200) failures.push(`Image ${to}: expected final 200, got ${destination.status}`);
  }
  for (const path of ["/", "/about/", "/talc/", "/talc/lumps/", "/talc/powder/", "/applications/", "/mining-operations/", "/processing/", "/quality-control/", "/facilities/", "/sustainability/", "/affiliation/", "/gallery/", "/insights/", "/contacts/"]) {
    const response = await get(path);
    checks++;
    if (response.status !== 200) failures.push(`Current URL ${path}: expected 200, got ${response.status}`);
  }
  for (const path of ["/wp-admin/", "/wp-login.php", "/wp-json/", "/wp-includes/", "/xmlrpc.php"]) {
    const response = await get(path);
    checks++;
    if (response.status !== 410) failures.push(`${path}: expected 410, got ${response.status}`);
  }
  const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  sitemapCount = sitemapUrls.length;
  for (const url of sitemapUrls) {
    const path = new URL(url).pathname;
    const response = await get(path);
    checks++;
    if (!url.startsWith(origin + "/") || response.status !== 200 || redirects.some((r) => path === r.from || (r.prefix && path.startsWith(r.from)))) {
      failures.push(`Noncanonical sitemap URL ${url}`);
    }
  }
  function walk(dir) {
    return readdirSync(dir).flatMap((entry) => {
      const file = join(dir, entry);
      return statSync(file).isDirectory() ? walk(file) : [file];
    });
  }
  for (const file of walk(out).filter((f) => f.endsWith(".html"))) {
    const path = "/" + relative(out, file).replaceAll("\\", "/").replace(/index\.html$/, "");
    const html = readFileSync(file, "utf8");
    if (path !== "/404.html" && !path.endsWith("/_not-found.html")) {
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
      if (canonical && canonical[1] !== origin + path) failures.push(`${path}: canonical ${canonical[1]}`);
    }
    for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
      if (!href.startsWith("/") && !href.startsWith(origin + "/")) continue;
      const link = new URL(href.replaceAll("&amp;", "&"), origin).pathname;
      if (redirects.some((r) => link === r.from || (r.prefix && link.startsWith(r.from)))) failures.push(`${path}: link to legacy ${href}`);
    }
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
}
if (failures.length) {
  console.error(`${failures.length} migration checks failed:\n${failures.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Passed ${checks} HTTP migration checks; ${sitemapCount} canonical sitemap URLs; no old internal links.`);
}
