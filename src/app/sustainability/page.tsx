import { sustainability } from "@content/about";
import { seo } from "@content/seo";
import { Figure } from "@/components/Picture";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/ui";
import { CtaBand, RelatedLinks, SplitHero } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/sustainability/");

const path = "/sustainability/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Sustainability", path },
];

/** Evidence photos per area — only where an authentic, relevant photo exists. */
const evidence: Record<string, string[]> = {
  "site-practice": ["gallery-13", "sorting-3"], // hillside mine site + selective hand sorting (no processing machinery here)
  plantation: ["gallery-14"], // temporary: hilltop mine site among green hills — IMAGE_MISSING (plantation photos)
  training: ["exploration-2", "partners-1"],
  employment: ["gallery-06"],
};

export default function SustainabilityPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, imageSlot: "sustainability-hero", hasBreadcrumb: true }), breadcrumb(path, crumbs))} />
      <SplitHero crumbs={crumbs} eyebrow="Responsibility" title="Responsibility in practice" slot="sustainability-hero" intro={<p>{sustainability.intro}</p>} />

      <section className="section" aria-label="Sustainability areas">
        <div className="container container--wide">
          <nav aria-label="On this page">
            <ul className="chip-list chip-list--row" data-stagger>
              {sustainability.areas.map((a) => (
                <li key={a.id}>
                  <a href={`#${a.id}`}>{a.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="areas">
            {sustainability.areas.map((a) => (
              <article key={a.id} id={a.id} className={`area${evidence[a.id] ? "" : " area--text"}`} aria-labelledby={`${a.id}-title`}>
                <div className="area__text" data-reveal>
                  <h2 id={`${a.id}-title`}>{a.title}</h2>
                  {a.body.map((p) => (
                    <p key={p.slice(0, 20)} className="muted">
                      {p}
                    </p>
                  ))}
                </div>
                {evidence[a.id] ? (
                  <div className={`photo-grid${evidence[a.id].length === 1 ? " photo-grid--single" : " photo-grid--pair"}`} data-stagger>
                    {evidence[a.id].map((slot) => (
                      <Figure key={slot} slot={slot} sizes="(min-width: 56em) 25vw, 50vw" ratio="4 / 3" caption={false} />
                    ))}
                  </div>
                ) : "points" in a && a.points ? (
                  <ul className="area__panel" data-reveal aria-label={`${a.title}: key points`}>
                    {a.points.map((pt) => (
                      <li key={pt}>
                        <Icon name="check" size={20} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
          <p className="note">{sustainability.evidenceNote}</p>
        </div>
      </section>

      <section className="section theme-alt">
        <div className="container container--wide">
          <RelatedLinks
            title="Related pages"
            links={[
              { label: "Mining operations", href: "/mining-operations/", description: "Selective extraction and sorting" },
              { label: "Processing", href: "/processing/", description: "Dust collection in the plants" },
              { label: "About PakTalc", href: "/about/", description: "Team and partners" },
            ]}
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
