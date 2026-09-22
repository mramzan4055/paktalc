import Link from "next/link";
import { labDisclaimer, labReports } from "@content/talc";
import { qualityIntro, qualityStages, testParameters } from "@content/quality";
import { seo } from "@content/seo";
import { Figure, Picture, SideFigure } from "@/components/Picture";
import { Button, JsonLd, SectionHead } from "@/components/ui";
import { CtaBand, RelatedLinks, SplitHero } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";
import { absolute } from "@/lib/seo";
import { breadcrumb, graph, slotImageUrl, webPage } from "@/lib/schema";
import { getSlot } from "@/lib/images";

export const metadata = pageMetadata("/quality-control/");

const path = "/quality-control/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Quality control", path },
];

export default function QualityPage() {
  const s = seo[path];
  const reportImages = labReports.map((r) => ({
    "@type": "ImageObject",
    contentUrl: slotImageUrl(r.imageSlot),
    caption: `SKZ Laboratory Peshawar analysis report — ${r.title}`,
    creator: { "@type": "Organization", name: "SKZ Laboratory Peshawar" },
    isPartOf: { "@id": `${absolute(path)}#webpage` },
  }));
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, imageSlot: "lab-1", hasBreadcrumb: true }), breadcrumb(path, crumbs), ...reportImages)} />
      <SplitHero
        crumbs={crumbs}
        eyebrow="Quality"
        title="Quality control and laboratory testing"
        slot="lab-1"
        intro={<p>{qualityIntro}</p>}
        actions={
          <Button href="#reports" variant="secondary" icon="arrowDown">
            See the lab reports
          </Button>
        }
      />

      {/* Stages */}
      <section className="section" aria-labelledby="stages">
        <div className="container container--wide">
          <SectionHead eyebrow="Checkpoints" title="Where talc is checked" id="stages" row>
            <p>Quality comes from selection as much as from testing. These are the checkpoints between the face and the container.</p>
          </SectionHead>
          <ol className="qc-stages" data-stagger>
            {qualityStages.map((q, i) => (
              <li key={q.title} className="qc-stage">
                <div className="media-cover qc-stage__media">
                  <Picture slot={q.image} sizes="(min-width: 64em) 18vw, (min-width: 40em) 45vw, 100vw" />
                </div>
                <div className="qc-stage__body">
                  <p className="qc-stage__where">
                    <span>{String(i + 1).padStart(2, "0")}</span> {q.where}
                  </p>
                  <h3>{q.title}</h3>
                  <ul>
                    {q.checks.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Parameters */}
      <section className="section theme-alt" aria-labelledby="params">
        <div className="container container--wide split split--top">
          <div className="side-col">
            <SectionHead eyebrow="What we measure" title="Test parameters and why they matter" id="params">
              <p>These are the parameters on SKZ Laboratory Peshawar&apos;s analysis reports, with what each one tells a buyer.</p>
            </SectionHead>
            <SideFigure slot="lab-3" caption="Analytical instrument and data capture in the laboratory." />
          </div>
          <dl className="glossary glossary--single" data-stagger>
            {testParameters.map((t) => (
              <div key={t.name}>
                <dt>{t.name}</dt>
                <dd>{t.why}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Reports */}
      <section className="section" aria-labelledby="reports-title" id="reports">
        <div className="container container--wide">
          <SectionHead eyebrow="Published results" title="Sample analysis reports" id="reports-title" row>
            <p>{labDisclaimer}</p>
          </SectionHead>
          <div className="reports">
            {labReports.map((r) => {
              const slot = getSlot(r.imageSlot);
              return (
                <article key={r.id} className="report" aria-labelledby={`report-${r.id}`}>
                  <div className="report__data">
                    <h3 id={`report-${r.id}`}>{r.title}</h3>
                    <dl className="report__meta">
                      <div>
                        <dt>Commodity</dt>
                        <dd>{r.commodity}</dd>
                      </div>
                      <div>
                        <dt>Sampling place</dt>
                        <dd>{r.sampledAt}</dd>
                      </div>
                      <div>
                        <dt>Fineness</dt>
                        <dd>{r.mesh}</dd>
                      </div>
                      {r.packing ? (
                        <div>
                          <dt>Packing</dt>
                          <dd>{r.packing}</dd>
                        </div>
                      ) : null}
                    </dl>
                    {[
                      { title: "Chemical analysis", rows: r.chemical },
                      { title: "Physical analysis", rows: r.physical },
                    ].map((tbl) => (
                      <div key={tbl.title} className="table-wrap" role="region" aria-label={`${r.title}: ${tbl.title}`} tabIndex={0}>
                        <table className="data-table">
                          <caption>{tbl.title}</caption>
                          <thead>
                            <tr>
                              <th scope="col">Parameter</th>
                              <th scope="col">Method</th>
                              <th scope="col">Unit</th>
                              <th scope="col">Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tbl.rows.map((row) => (
                              <tr key={row.parameter}>
                                <th scope="row">{row.parameter}</th>
                                <td>{row.method}</td>
                                <td>{row.unit}</td>
                                <td className="num">{row.result}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                  <div className="report__scan">
                    <a href={slot.variants.original.webp.at(-1)?.split(" ")[0]} className="doc-frame report__link" aria-label={`Open full-size scan: ${r.title}`}>
                      <Picture slot={r.imageSlot} sizes="(min-width: 56em) 30vw, 100vw" />
                    </a>
                    <p className="small muted">Scan of the original report. The table on the left is a transcription of it.</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lab images */}
      <section className="section theme-alt" aria-labelledby="lab">
        <div className="container container--wide">
          <SectionHead eyebrow="SKZ Laboratory Peshawar" title="In the laboratory" id="lab" row>
            <p>
              Technicians prepare and dry samples, then run particle-size, colour and chemical analyses. If you need independent third-party inspection, mention it when you{" "}
              <Link prefetch={false} href="/contacts/#rfq">send your enquiry</Link>.
            </p>
          </SectionHead>
          <div className="grid grid-3" data-stagger>
            <Figure slot="lab-2" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" />
            <Figure slot="sorting-2" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" caption="Inspectors checking lumps during hand sorting." />
            <Figure slot="lab-4" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" caption="Laboratory bench with drying ovens." />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <RelatedLinks
            links={[
              { label: "Talc powder", href: "/talc/powder/", description: "Fineness and packing" },
              { label: "Processing", href: "/processing/", description: "Where samples come from" },
              { label: "Mesh & particle size", href: "/insights/talc-mesh-and-particle-size/", description: "Reading the numbers" },
            ]}
          />
        </div>
      </section>

      <CtaBand title="Need a lot-specific analysis?" body="Ask for a sample and analysis with your quotation. Tell us which parameters and limits matter for your application." />
    </>
  );
}
