/**
 * Legacy WordPress / theme URL → new URL (301).
 * Compiled into out/.htaccess by scripts/postbuild.mjs.
 * Exact rules are emitted before prefix rules, so a specific page wins over its folder.
 * `prefix: true` also matches the folder itself, with or without a trailing slash.
 */
export type Redirect = { from: string; to: string; prefix?: boolean };

export const redirects: Redirect[] = [
  // Specific pages. These must stay exact so a later folder rule cannot steal them.
  { from: "/services/talc/", to: "/talc/" },
  { from: "/services-products-page/", to: "/talc/" },
  { from: "/services/industrial-cleaning-and-degreasing/", to: "/sustainability/" },
  { from: "/services/himalayan-pink-salt/", to: "/affiliation/" },
  { from: "/services/salt-dolomite/", to: "/affiliation/" },
  { from: "/services/salt-sheets-for-steaks/", to: "/affiliation/" },
  // Not talc. The parent-company page is the relevant destination; the /services/ folder rule would otherwise send it to /talc/.
  { from: "/services/calcium-carbonate/", to: "/affiliation/" },
  { from: "/projects/dace-pacific-hake-sailbearer-butterflyfish/", to: "/talc/" },

  { from: "/why-talc-is-essential-for-modern-industries/", to: "/insights/talc-in-industry/" },
  { from: "/2025/03/20/why-talc-is-essential-for-modern-industries/", to: "/insights/talc-in-industry/" },
  { from: "/empowering-future-geologists-skzs-training-development-programs/", to: "/sustainability/" },
  { from: "/2025/03/20/empowering-future-geologists-skzs-training-development-programs/", to: "/sustainability/" },
  { from: "/the-future-of-sustainable-mining-how-skz-mining-leads-the-way/", to: "/sustainability/" },
  { from: "/2025/03/20/the-future-of-sustainable-mining-how-skz-mining-leads-the-way/", to: "/sustainability/" },
  { from: "/creation-of-industrial-projects-around-the-world/", to: "/insights/" },
  { from: "/2022/08/02/creation-of-industrial-projects-around-the-world/", to: "/insights/" },

  { from: "/blog-classic/", to: "/insights/" },
  { from: "/news-updates/", to: "/insights/" },
  { from: "/about-us/", to: "/about/" },
  { from: "/contact-us/", to: "/contact/" },
  { from: "/blog/", to: "/insights/" },
  { from: "/feed/", to: "/insights/" },
  { from: "/comments/feed/", to: "/insights/" },

  // Folders and everything under them, including the folder URL with or without a slash.
  { from: "/services/", to: "/talc/", prefix: true },
  { from: "/industrium_services_category/", to: "/talc/", prefix: true },
  { from: "/2025/03/20/", to: "/insights/", prefix: true },
  { from: "/category/", to: "/insights/", prefix: true },
  { from: "/tag/", to: "/insights/", prefix: true },
  { from: "/author/", to: "/insights/", prefix: true },
  { from: "/case-studies/", to: "/insights/", prefix: true },
  { from: "/industrium_case_study_category/", to: "/insights/", prefix: true },
  { from: "/industrium_case_study_tag/", to: "/insights/", prefix: true },
  { from: "/projects/", to: "/gallery/", prefix: true },
  { from: "/portfolio/", to: "/gallery/", prefix: true },
  { from: "/industrium_portfolio_category/", to: "/gallery/", prefix: true },
  { from: "/industrium_project_category/", to: "/gallery/", prefix: true },
  { from: "/team/", to: "/about/", prefix: true },
  { from: "/industrium_team_department/", to: "/about/", prefix: true },
  { from: "/careers/", to: "/contacts/", prefix: true },
];
