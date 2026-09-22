import Link from "next/link";
import { Picture } from "./Picture";
import { Breadcrumbs, Button } from "./ui";
import { rfqHref } from "@content/navigation";
import { company } from "@content/company";
import { articles } from "@content/insights";
import { Icon } from "./Icon";

type Crumb = { name: string; path: string };

/** Full-bleed photographic page hero with art direction. Only this image is priority-loaded. */
export function PageHero({
  eyebrow,
  title,
  intro,
  slot,
  variant = "banner-16x9",
  mobileVariant = "mobile-4x5",
  crumbs,
  actions,
  compact = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  slot: string;
  variant?: string;
  mobileVariant?: string;
  crumbs?: Crumb[];
  actions?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={`page-hero theme-dark${compact ? " page-hero--compact" : ""}`}>
      <div className="page-hero__media" aria-hidden="false">
        <Picture slot={slot} variant={variant} mobileVariant={mobileVariant} priority sizes="100vw" imgClassName="page-hero__img" noUpscale={false} />
      </div>
      <div className="page-hero__scrim" aria-hidden="true" />
      <div className="container container--wide page-hero__inner">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <div className="page-hero__text" data-hero>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          {intro ? <div className="page-hero__intro">{intro}</div> : null}
          {actions ? <div className="page-hero__actions">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}

/** Split hero (text + photo) for pages whose best images are card/portrait crops rather than banners. */
export function SplitHero({
  eyebrow,
  title,
  intro,
  slot,
  variant,
  crumbs,
  actions,
  aside,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  slot: string;
  variant?: string;
  crumbs: Crumb[];
  actions?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="split-hero">
      <div className="container container--wide">
        <Breadcrumbs items={crumbs} />
        <div className="split-hero__grid">
          <div className="split-hero__text" data-hero>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1>{title}</h1>
            {intro ? <div className="lead">{intro}</div> : null}
            {actions ? <div className="page-hero__actions">{actions}</div> : null}
            {aside}
          </div>
          <div className="split-hero__media">
            <Picture slot={slot} variant={variant} priority sizes="(min-width: 56em) 42vw, 100vw" imgClassName="split-hero__img" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Text-only page header for pages without a strong hero photo. */
export function PageHeader({ eyebrow, title, intro, crumbs }: { eyebrow?: string; title: React.ReactNode; intro?: React.ReactNode; crumbs: Crumb[] }) {
  return (
    <section className="page-header">
      <div className="container container--wide">
        <Breadcrumbs items={crumbs} />
        <div className="page-header__text" data-hero>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          {intro ? <div className="lead">{intro}</div> : null}
        </div>
      </div>
    </section>
  );
}

/** End-of-page conversion band. */
export function CtaBand({
  title = "Discuss your talc requirements",
  body = "Send your talc specification (form, mesh or lump size, colour grade, quantity and destination) and we will reply with a proposal.",
  primary = { label: "Request a quote", href: rfqHref },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
}) {
  return (
    <section className="cta-band theme-dark" aria-labelledby="cta-title">
      <div className="container container--wide cta-band__inner">
        <div className="stack" data-reveal>
          <p className="eyebrow">Enquiries</p>
          <h2 id="cta-title">{title}</h2>
          <p className="cta-band__body">{body}</p>
        </div>
        <div className="cta-band__actions" data-reveal>
          <Button href={primary.href}>{primary.label}</Button>
          <a className="cta-band__contact" href={`mailto:${company.email}`}>
            <Icon name="mail" size={18} /> {company.email}
          </a>
          <a className="cta-band__contact" href={company.phone.href}>
            <Icon name="phone" size={18} /> {company.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}

/** Best-fit authentic thumbnail for each internal destination (used by RelatedLinks small cards). */
const routeThumbs: Record<string, string> = {
  "/talc/": "talc-lumps-alt-1",
  "/talc/#origins": "gallery-03",
  "/talc/lumps/": "talc-lumps-main",
  "/talc/powder/": "talc-powder-bags-stacked",
  "/mining-operations/": "extraction-3",
  "/processing/": "grinding-1",
  "/quality-control/": "lab-1",
  "/applications/": "talc-lumps-alt-3",
  "/facilities/": "mesh-plant-peshawar",
  "/sustainability/": "sustainability-teaser",
  "/about/": "about-hero",
  "/affiliation/": "overview-office",
  "/affiliation/#supply-chain": "export-3",
  "/gallery/": "gallery-01",
  "/contacts/": "export-teaser",
};
const thumbFor = (href: string) => routeThumbs[href] ?? routeThumbs[href.split("#")[0]] ?? articles.find((a) => href === `/insights/${a.slug}/`)?.heroSlot;

/** "Related pages" row: small cards with a thumbnail, label and one-line description. */
export function RelatedLinks({ title = "Continue reading", links }: { title?: string; links: { label: string; href: string; description?: string }[] }) {
  return (
    <nav className="related" aria-label={title}>
      <p className="eyebrow">{title}</p>
      <ul className="related__list" data-stagger>
        {links.map((l) => {
          const thumb = thumbFor(l.href);
          return (
            <li key={l.href}>
              <Link prefetch={false} href={l.href} className={`related__link${thumb ? " has-thumb" : ""}`}>
                {thumb ? (
                  <span className="related__thumb">
                    <Picture slot={thumb} sizes="96px" alt="" noUpscale={false} />
                  </span>
                ) : null}
                <span className="related__text">
                  <span className="related__label">{l.label}</span>
                  {l.description ? <span className="related__desc">{l.description}</span> : null}
                </span>
                <Icon name="arrow" size={18} className="related__icon" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
