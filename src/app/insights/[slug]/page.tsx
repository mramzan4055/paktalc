import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@content/insights";
import { Figure } from "@/components/Picture";
import { ArticleBody } from "@/components/ArticleBody";
import { Breadcrumbs, JsonLd } from "@/components/ui";
import { CtaBand, RelatedLinks } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";
import { ogFallbackFromSlot } from "@/lib/images";
import { article as articleLd, breadcrumb, graph, webPage } from "@/lib/schema";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata(`/insights/${a.slug}/`, {
    title: a.title,
    description: a.description,
    image: ogFallbackFromSlot(a.heroSlot),
    type: "article",
    publishedTime: a.datePublished,
    modifiedTime: a.dateModified,
  });
}

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const path = `/insights/${a.slug}/`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights/" },
    { name: a.title, path },
  ];
  const others = articles.filter((x) => x.slug !== a.slug);

  return (
    <>
      <JsonLd
        data={graph(
          webPage({ path, name: a.title, description: a.description, imageSlot: a.heroSlot, hasBreadcrumb: true }),
          breadcrumb(path, crumbs),
          articleLd({ path, headline: a.title, description: a.description, imageSlot: a.heroSlot, datePublished: a.datePublished, dateModified: a.dateModified, author: a.author }),
        )}
      />
      <article className="article">
        <header className="article__header">
          <div className="container container--text">
            <Breadcrumbs items={crumbs} />
            <div className="article__head" data-hero>
              <p className="eyebrow">Insight</p>
              <h1>{a.title}</h1>
              <p className="article__meta">
                By {a.author} · Published <time dateTime={a.datePublished}>{fmt(a.datePublished)}</time>
                {a.dateModified !== a.datePublished ? (
                  <>
                    {" "}
                    · Updated <time dateTime={a.dateModified}>{fmt(a.dateModified)}</time>
                  </>
                ) : null}
              </p>
            </div>
          </div>
        </header>
        <div className="container container--text">
          <Figure slot={a.heroSlot} variant={a.heroVariant} priority sizes="(min-width: 48em) 44rem, 100vw" figureClassName="article__hero" ratio="16 / 9" />
          <div className="article__answer">
            <p className="eyebrow">In short</p>
            <p>{a.answer}</p>
          </div>
          <ArticleBody sections={a.sections} />
          <div className="article__foot">
            <RelatedLinks title="Related pages" links={a.related} />
          </div>
        </div>
      </article>

      <section className="section theme-alt">
        <div className="container container--wide">
          <RelatedLinks title="More insights" links={others.map((o) => ({ label: o.title, href: `/insights/${o.slug}/` }))} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
