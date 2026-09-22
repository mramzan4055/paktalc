/**
 * Legacy WordPress URL → new URL (301). Compiled into out/.htaccess by scripts/postbuild.mjs.
 * `prefix: true` redirects the path and everything below it.
 * See REDIRECT-PLAN.md for reasoning. Image redirects come from paktalc-image-redirects.csv.
 */
export type Redirect = { from: string; to: string; prefix?: boolean };

export const redirects: Redirect[] = [
  // Products / services
  { from: "/services/talc/", to: "/talc/" },
  { from: "/services-products-page/", to: "/talc/" },
  { from: "/services/calcium-carbonate/", to: "/affiliation/" },
  { from: "/services/himalayan-pink-salt/", to: "/affiliation/" },
  { from: "/services/salt-dolomite/", to: "/affiliation/" },
  { from: "/services/salt-sheets-for-steaks/", to: "/affiliation/" },
  { from: "/services/", to: "/talc/", prefix: true }, // remaining demo services + archive
  { from: "/industrium_services_category/", to: "/talc/", prefix: true },

  // Blog / news
  { from: "/2025/03/20/why-talc-is-essential-for-modern-industries/", to: "/insights/talc-in-industry/" },
  { from: "/2025/03/20/the-future-of-sustainable-mining-how-skz-mining-leads-the-way/", to: "/sustainability/" },
  { from: "/2025/03/20/empowering-future-geologists-skzs-training-development-programs/", to: "/sustainability/" },
  { from: "/2022/08/02/creation-of-industrial-projects-around-the-world/", to: "/insights/" },
  { from: "/news-updates/", to: "/insights/" },
  { from: "/blog-classic/", to: "/insights/" },
  { from: "/category/", to: "/insights/", prefix: true },
  { from: "/tag/", to: "/insights/", prefix: true },
  { from: "/feed/", to: "/insights/" },
  { from: "/comments/feed/", to: "/insights/" },

  // Theme demo content
  { from: "/case-studies/", to: "/insights/", prefix: true },
  { from: "/industrium_case_study_category/", to: "/insights/", prefix: true },
  { from: "/industrium_case_study_tag/", to: "/insights/", prefix: true },
  { from: "/portfolio/", to: "/gallery/", prefix: true },
  { from: "/industrium_portfolio_category/", to: "/gallery/", prefix: true },
  { from: "/projects/", to: "/gallery/", prefix: true },
  { from: "/industrium_project_category/", to: "/gallery/", prefix: true },
  { from: "/team/", to: "/about/", prefix: true },
  { from: "/industrium_team_department/", to: "/about/", prefix: true },
  { from: "/careers/", to: "/contacts/", prefix: true },

  // Convenience
  { from: "/contact/", to: "/contacts/" },
];
