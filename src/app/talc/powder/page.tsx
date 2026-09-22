import Link from "next/link";
import { labReports, meshCapability, packing } from "@content/talc";
import { seo } from "@content/seo";
import { Figure, Picture, SideFigure } from "@/components/Picture";
import { Button, JsonLd, SectionHead, TextLink } from "@/components/ui";
import { CtaBand, RelatedLinks, SplitHero } from "@/components/sections";
import { Icon } from "@/components/Icon";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, graph, product, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/talc/powder/");

const path = "/talc/powder/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Talc", path: "/talc/" },
  { name: "Talc powder", path },
];

const fineness = [
  { use: "Ceramics, rubber", typical: "Coarser grades, around 200–325 mesh" },
  { use: "Paints & coatings, paper", typical: "325 mesh and finer" },
  { use: "Plastics reinforcement", typical: "Fine to micronized; specify D50 / top cut" },
  { use: "Cosmetics, pharmaceuticals", typical: "Micronized; qualified by the buyer's own testing" },
];

export default function TalcPowderPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ path, name: s.title, description: s.description, imageSlot: "talc-powder-bag", hasBreadcrumb: true }),
          breadcrumb(path, crumbs),
          product({
            path,
            name: "Talc powder",
            description:
              "Talc mesh powder ground in hammer and Raymond mills at SKZ's Peshawar meshing plants, classified to the buyer's fineness and packed in 25 kg or jumbo bags.",
            imageSlots: ["talc-powder-bag", "talc-powder-bags-stacked", "grinding-1"],
            category: "Industrial minerals > Talc",
            properties: [
              { name: "Form", value: "Powder (mesh / micronized)" },
              { name: "Packing", value: "25 kg bags; jumbo (ton) bags" },
              { name: "Lab-reported sample fineness", value: meshCapability.reportedSamples.join("; ") },
            ],
          }),
        )}
      />

      <SplitHero
        crumbs={crumbs}
        eyebrow="Product · ground talc"
        title="Talc powder"
        slot="talc-powder-bag"
        variant="portrait-4x5"
        intro={
          <p>
            <strong>Talc powder is talc lumps crushed, ground and classified to a set particle size.</strong> Ours is milled on hammer and Raymond mill lines at two meshing
            plants in Peshawar. It is tested at SKZ Laboratory Peshawar and packed in 25 kg bags or jumbo bags.
          </p>
        }
        actions={
          <>
            <Button href="/contacts/?form=powder#rfq">Ask about talc powder</Button>
            <Button href="#fineness" variant="secondary" icon="arrowDown">
              Fineness options
            </Button>
          </>
        }
      />

      {/* How it's made */}
      <section className="section" aria-labelledby="made">
        <div className="container container--wide">
          <SectionHead eyebrow="Production" title="How our talc powder is made" id="made" row>
            <p>
              Sorted lumps are crushed and screened to an even feed size. Mills then grind them, and an air classifier removes particles above the target size. Cyclones
              and dust collectors recover the powder.
            </p>
          </SectionHead>
          <ol className="mini-steps" data-stagger>
            {[
              { t: "Crush & screen", slot: "crushing-1" },
              { t: "Grind (hammer / Raymond mill)", slot: "grinding-2" },
              { t: "Classify / micronize", slot: "micronizing-1" },
              { t: "Collect & bag", slot: "packaging-2" },
            ].map((st) => (
              <li key={st.t} className="mini-steps__item">
                <div className="media-cover mini-steps__media">
                  <Picture slot={st.slot} sizes="(min-width: 64em) 22vw, (min-width: 40em) 45vw, 100vw" />
                </div>
                <p className="mini-steps__title">{st.t}</p>
              </li>
            ))}
          </ol>
          <p className="section-foot">
            <TextLink href="/processing/">The full processing chain</TextLink>
          </p>
        </div>
      </section>

      {/* Fineness */}
      <section className="section theme-alt" aria-labelledby="fineness-title" id="fineness">
        <div className="container container--wide split split--top">
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="Fineness" title="Mesh and particle size" id="fineness-title">
              <p>
                Fineness is set to your order. Company records rate the Peshawar meshing plants for <strong>{meshCapability.plantRange}</strong>. The published SKZ
                Laboratory reports cover samples at <strong>{meshCapability.reportedSamples.join(" and ")}</strong>, measured by laser particle analysis (Bettersizer ST).
              </p>
              <p>
                Above about 500 mesh, sieves stop being practical and fineness is better stated in microns (D50 and D97). Tell us the figure you work to and we will
                confirm what the plants can hold.
              </p>
            </SectionHead>
            <TextLink href="/insights/talc-mesh-and-particle-size/">Mesh and particle size explained</TextLink>
          </div>
          <div className="table-wrap" role="region" aria-label="Typical fineness by application" tabIndex={0}>
            <table className="data-table">
              <caption>Common starting points by application — your formulation decides</caption>
              <thead>
                <tr>
                  <th scope="col">Application</th>
                  <th scope="col">Typical fineness</th>
                </tr>
              </thead>
              <tbody>
                {fineness.map((f) => (
                  <tr key={f.use}>
                    <th scope="row">{f.use}</th>
                    <td>{f.typical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Lab results summary */}
      <section className="section" aria-labelledby="results">
        <div className="container container--wide">
          <SectionHead eyebrow="Laboratory" title="Published sample results" id="results" row>
            <p>
              Two powder samples tested at SKZ Laboratory Peshawar. These results show how we measure; they are not a fixed specification. The{" "}
              <Link prefetch={false} href="/quality-control/">quality control page</Link> shows the full reports and methods.
            </p>
          </SectionHead>
          <div className="table-wrap" role="region" aria-label="Sample results comparison" tabIndex={0}>
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Parameter</th>
                  {labReports.map((r) => (
                    <th key={r.id} scope="col">
                      Sample “{r.material}”
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Fineness</th>
                  {labReports.map((r) => (
                    <td key={r.id}>{r.mesh.split(" (")[0]}</td>
                  ))}
                </tr>
                {labReports[0].physical.concat(labReports[0].chemical).map((row) => (
                  <tr key={row.parameter}>
                    <th scope="row">
                      {row.parameter}
                      {row.unit !== "—" ? ` (${row.unit})` : ""}
                    </th>
                    {labReports.map((r) => {
                      const hit = [...r.physical, ...r.chemical].find((x) => x.parameter === row.parameter);
                      return (
                        <td key={r.id} className="num">
                          {hit?.result ?? "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Packing */}
      <section className="section theme-alt" aria-labelledby="packing-title" id="packing">
        <div className="container container--wide split split--reverse">
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="Packing" title="25 kg bags and jumbo bags" id="packing-title">
              <p>{packing.note}</p>
            </SectionHead>
            <ul className="pack-list" data-stagger>
              {packing.formats.map((f) => (
                <li key={f.name}>
                  <Icon name="box" size={22} />
                  <div>
                    <strong>{f.name}</strong>
                    <p className="muted">{f.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="photo-grid photo-grid--pair" data-stagger>
            <Figure slot="talc-powder-bags-stacked" sizes="(min-width: 56em) 20vw, 50vw" caption={false} />
            <Figure slot="packaging-1" sizes="(min-width: 56em) 20vw, 50vw" caption={false} />
          </div>
        </div>
      </section>

      {/* Specify */}
      <section className="section" aria-labelledby="specify">
        <div className="container container--wide split split--top">
          <div className="side-col">
            <SectionHead eyebrow="Enquiring" title="What to include when you ask about powder" id="specify">
              <p>If you have a current supplier&apos;s data sheet, send it. We will match it against what the plants produce.</p>
            </SectionHead>
            <SideFigure slot="packaging-4" caption="Bagged talc powder ready for dispatch." />
          </div>
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <ol className="features" data-stagger>
              <li>
                <div>
                  <h3>Fineness</h3>
                  <p>Mesh, or D50 / D97 in microns, plus the maximum sieve residue you accept.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Whiteness &amp; chemistry</h3>
                  <p>Minimum whiteness, and LOI, SiO₂ or MgO limits if you have them.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Application</h3>
                  <p>What the talc is for, so we can recommend a colour grade and fineness.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Quantity, packing &amp; destination</h3>
                  <p>Tonnes per shipment, 25 kg or jumbo bags, and destination port.</p>
                </div>
              </li>
            </ol>
            <div className="btn-row">
              <Button href="/contacts/?form=powder#rfq">Ask about talc powder</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container container--wide">
          <RelatedLinks
            links={[
              { label: "Talc lumps", href: "/talc/lumps/", description: "For in-house grinding" },
              { label: "Quality control", href: "/quality-control/", description: "Full lab reports and methods" },
              { label: "Applications", href: "/applications/", description: "What each industry evaluates" },
              { label: "Facilities", href: "/facilities/", description: "The Peshawar meshing plants" },
            ]}
          />
        </div>
      </section>

      <CtaBand title="Ask about talc powder" primary={{ label: "Ask about talc powder", href: "/contacts/?form=powder#rfq" }} />
    </>
  );
}
