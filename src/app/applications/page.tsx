import Link from "next/link";
import { applications, applicationsIntro, regulatedNote } from "@content/applications";
import { seo } from "@content/seo";
import { JsonLd, SectionHead } from "@/components/ui";
import { CtaBand, RelatedLinks, SplitHero } from "@/components/sections";
import { Button } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/applications/");

const path = "/applications/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Applications", path },
];

export default function ApplicationsPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, imageSlot: "talc-lumps-alt-1", hasBreadcrumb: true }), breadcrumb(path, crumbs))} />
      <SplitHero
        crumbs={crumbs}
        eyebrow="Applications"
        title="Where talc is used"
        slot="talc-lumps-alt-1"
        variant="card-4x3"
        intro={<p>{applicationsIntro}</p>}
        actions={<Button href="/contacts/#rfq">Discuss your application</Button>}
      />

      <section className="section" aria-labelledby="index">
        <div className="container container--wide">
          <SectionHead eyebrow="Industries" title="Seven industries, seven different jobs for talc" id="index" />
          <nav aria-label="Applications on this page">
            <ul className="chip-list chip-list--row" data-stagger>
              {applications.map((a) => (
                <li key={a.id}>
                  <a href={`#${a.id}`}>{a.name}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="section section--flush-top" aria-label="Applications in detail">
        <div className="container container--wide">
          <div className="apps">
            {applications.map((a, i) => (
              <article key={a.id} id={a.id} className="app" aria-labelledby={`${a.id}-title`} data-reveal>
                <header className="app__head">
                  <span className="app__n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`${a.id}-title`}>{a.name}</h2>
                </header>
                <div className="app__body">
                  <p className="app__why">{a.why}</p>
                  <div className="app__cols">
                    <div>
                      <h3 className="app__label">What talc does</h3>
                      <ul>
                        {a.properties.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="app__label">What buyers evaluate</h3>
                      <ul>
                        {a.buyersEvaluate.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="app__form">
                    <strong>Usual form:</strong> {a.form}.{" "}
                    <Link prefetch={false} href="/talc/powder/">Talc powder</Link>
                    {a.form.toLowerCase().includes("lump") ? (
                      <>
                        {" · "}
                        <Link prefetch={false} href="/talc/lumps/">Talc lumps</Link>
                      </>
                    ) : null}
                  </p>
                  {a.regulated ? <p className="note">{regulatedNote}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section theme-alt">
        <div className="container container--wide">
          <RelatedLinks
            links={[
              { label: "Talc powder", href: "/talc/powder/", description: "Fineness by application" },
              { label: "Talc lumps", href: "/talc/lumps/", description: "For in-house grinding" },
              { label: "Why talc matters in industry", href: "/insights/talc-in-industry/", description: "Properties explained" },
              { label: "Quality control", href: "/quality-control/", description: "What we measure" },
            ]}
          />
        </div>
      </section>

      <CtaBand title="Tell us about your application" body="Describe your product and process, plus your current talc specification if you have one. We will suggest a grade, fineness and packing." />
    </>
  );
}
