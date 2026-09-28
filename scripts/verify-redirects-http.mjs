import http from "node:http";
import { readFileSync } from "node:fs";

const host = "127.0.0.1";
const port = 8099;

function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.get({ host, port, path, headers: { Accept: "text/html" } }, (res) => {
      res.resume();
      resolve({ code: res.statusCode, loc: res.headers.location || "" });
    });
    req.on("error", reject);
  });
}

const cases = [
  ["/services/talc/", "https://paktalc.com/talc/"],
  ["/services/talc", "https://paktalc.com/talc/"],
  ["/services/talc/?p=12&utm_source=google", "https://paktalc.com/talc/"],
  ["/services-products-page/", "https://paktalc.com/talc/"],
  ["/services/", "https://paktalc.com/talc/"],
  ["/services", "https://paktalc.com/talc/"],
  ["/projects/dace-pacific-hake-sailbearer-butterflyfish/", "https://paktalc.com/talc/"],
  ["/projects/dace-pacific-hake-sailbearer-butterflyfish", "https://paktalc.com/talc/"],
  ["/services/industrial-cleaning-and-degreasing/", "https://paktalc.com/sustainability/"],
  ["/services/himalayan-pink-salt/", "https://paktalc.com/affiliation/"],
  ["/services/salt-dolomite/", "https://paktalc.com/affiliation/"],
  ["/services/salt-sheets-for-steaks/", "https://paktalc.com/affiliation/"],
  ["/industrium_services_category/demo/", "https://paktalc.com/talc/"],
  ["/why-talc-is-essential-for-modern-industries/", "https://paktalc.com/insights/talc-in-industry/"],
  ["/2025/03/20/why-talc-is-essential-for-modern-industries/", "https://paktalc.com/insights/talc-in-industry/"],
  ["/empowering-future-geologists-skzs-training-development-programs/", "https://paktalc.com/sustainability/"],
  ["/2025/03/20/empowering-future-geologists-skzs-training-development-programs/", "https://paktalc.com/sustainability/"],
  ["/the-future-of-sustainable-mining-how-skz-mining-leads-the-way/", "https://paktalc.com/sustainability/"],
  ["/2025/03/20/the-future-of-sustainable-mining-how-skz-mining-leads-the-way/", "https://paktalc.com/sustainability/"],
  ["/creation-of-industrial-projects-around-the-world/", "https://paktalc.com/insights/"],
  ["/2022/08/02/creation-of-industrial-projects-around-the-world/", "https://paktalc.com/insights/"],
  ["/2025/03/20/", "https://paktalc.com/insights/"],
  ["/2025/03/20", "https://paktalc.com/insights/"],
  ["/blog-classic/", "https://paktalc.com/insights/"],
  ["/category/blog/", "https://paktalc.com/insights/"],
  ["/category/news/", "https://paktalc.com/insights/"],
  ["/author/administrator/", "https://paktalc.com/insights/"],
  ["/news-updates/", "https://paktalc.com/insights/"],
  ["/case-studies/", "https://paktalc.com/insights/"],
  ["/case-studies/case-study/", "https://paktalc.com/insights/"],
  ["/case-studies/interactive-technologies-in-factories-and-plants/", "https://paktalc.com/insights/"],
  ["/case-studies/creation-of-industrial-projects-around-the-world/", "https://paktalc.com/insights/"],
  ["/case-studies/manufacturing-research-in-kiev-and-other-regions-of-the-country/", "https://paktalc.com/insights/"],
  ["/industrium_case_study_category/demo/", "https://paktalc.com/insights/"],
  ["/industrium_case_study_tag/demo/", "https://paktalc.com/insights/"],
  ["/projects/", "https://paktalc.com/gallery/"],
  ["/projects", "https://paktalc.com/gallery/"],
  ["/projects/extending-your-views/", "https://paktalc.com/gallery/"],
  ["/portfolio/", "https://paktalc.com/gallery/"],
  ["/portfolio/extending-your-views/", "https://paktalc.com/gallery/"],
  ["/portfolio/tools-for-the-right-industry/", "https://paktalc.com/gallery/"],
  ["/portfolio/a-broader-perspective/", "https://paktalc.com/gallery/"],
  ["/portfolio/simon-oswald-project/", "https://paktalc.com/gallery/"],
  ["/industrium_portfolio_category/demo/", "https://paktalc.com/gallery/"],
  ["/team/", "https://paktalc.com/about/"],
  ["/team/chief-operating-officer/", "https://paktalc.com/about/"],
  ["/team/environmental-sustainability-lead/", "https://paktalc.com/about/"],
  ["/industrium_team_department/demo/", "https://paktalc.com/about/"],
  ["/careers/", "https://paktalc.com/contacts/"],
  ["/careers/global-sales-marketing/", "https://paktalc.com/contacts/"],
  ["/careers/chief-financial-officer/", "https://paktalc.com/contacts/"],
];

const live = ["/", "/about/", "/talc/", "/talc/lumps/", "/talc/powder/", "/applications/", "/mining-operations/", "/processing/", "/quality-control/", "/facilities/", "/sustainability/", "/affiliation/", "/gallery/", "/insights/", "/contacts/", "/insights/talc-in-industry/"];

let failed = 0;
for (const [path, loc] of cases) {
  const res = await request(path);
  const ok = res.code === 301 && res.loc === loc;
  if (!ok) {
    failed++;
    console.log(`FAIL ${path} -> ${res.code} ${res.loc} (expected 301 ${loc})`);
  }
}
for (const path of live) {
  const res = await request(path);
  if (res.code !== 200) {
    failed++;
    console.log(`FAIL live ${path} -> ${res.code} ${res.loc}`);
  }
}
const gone = await request("/wp-admin/");
if (gone.code !== 410) {
  failed++;
  console.log(`FAIL wp-admin -> ${gone.code}`);
}
const sitemap = readFileSync("out/sitemap.xml", "utf8");
for (const old of ["/services/talc/", "/blog-classic/", "/case-studies/", "/portfolio/", "/team/", "/news-updates/"]) {
  if (sitemap.includes(`https://paktalc.com${old}`)) {
    failed++;
    console.log(`FAIL sitemap contains ${old}`);
  }
}
const home = readFileSync("out/index.html", "utf8");
const canonical = home.match(/rel="canonical" href="([^"]+)"/);
if (!canonical || canonical[1] !== "https://paktalc.com/") {
  failed++;
  console.log(`FAIL home canonical ${canonical?.[1]}`);
}
console.log(failed === 0 ? `ok ${cases.length} redirects, ${live.length} live pages` : `${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
