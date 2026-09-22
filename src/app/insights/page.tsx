import Link from "next/link";
import { articles } from "@content/insights";
import { seo } from "@content/seo";
import { Picture } from "@/components/Picture";
import { JsonLd } from "@/components/ui";
import { CtaBand, PageHeader } from "@/components/sections";
import { Card, CardGrid } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { pageMetadata, absolute } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/insights/");

const path = "/insights/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Insights", path },
];

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function InsightsPage() {
  const s = seo[path];
  const list = {
    "@type": "ItemList",
    itemListElement: articles.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: absolute(`/insights/${a.slug}/`), name: a.title })),
  };
  const [lead, ...rest] = articles;
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, type: "CollectionPage", hasBreadcrumb: true }), breadcrumb(path, crumbs), list)} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Insights"
        title="Guides for talc buyers"
        intro={<p>Practical articles on specifying, processing and using talc. They are written from our own operations and illustrated with photographs from our sites.</p>}
      />
      <section className="section">
        <div className="container container--wide">
          <article className="card card--link card--feature" data-reveal>
            <div className="card__media" style={{ "--card-ratio": "16 / 9" } as React.CSSProperties}>
              <Picture slot={lead.heroSlot} sizes="(min-width: 56em) 55vw, 100vw" noUpscale={false} />
            </div>
            <div className="card__body">
              <p className="card__eyebrow">
                <span>{lead.category}</span>
                <span className="card__meta">
                  <time dateTime={lead.datePublished}>{fmt(lead.datePublished)}</time>
                </span>
              </p>
              <h2 className="card__title">
                <Link prefetch={false} href={`/insights/${lead.slug}/`} className="card__link">
                  {lead.title}
                </Link>
              </h2>
              <p className="card__desc">{lead.description}</p>
              <span className="card__more" aria-hidden="true">
                Read the guide <Icon name="arrow" size={18} />
              </span>
            </div>
          </article>
          <CardGrid cols={3}>
            {rest.map((a) => (
              <Card
                key={a.slug}
                slot={a.heroSlot}
                ratio="16 / 9"
                eyebrow={a.category}
                meta={<time dateTime={a.datePublished}>{fmt(a.datePublished)}</time>}
                title={a.title}
                description={a.description}
                href={`/insights/${a.slug}/`}
                cta="Read the guide"
                headingLevel="h2"
              />
            ))}
          </CardGrid>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
