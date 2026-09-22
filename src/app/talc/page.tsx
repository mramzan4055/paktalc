import Link from "next/link";
import { colourGrades, labReports, origins, talcDefinition, talcProperties, talcTerms } from "@content/talc";
import { applications } from "@content/applications";
import { seo } from "@content/seo";
import { Figure } from "@/components/Picture";
import { JsonLd, SectionHead, TextLink } from "@/components/ui";
import { CtaBand, PageHero, RelatedLinks } from "@/components/sections";
import { Card, CardGrid } from "@/components/Card";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";
import { rfqHref } from "@content/navigation";
import { Button } from "@/components/ui";

export const metadata = pageMetadata("/talc/");

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Talc", path: "/talc/" },
];

export default function TalcPage() {
  const s = seo["/talc/"];
  return (
    <>
      <JsonLd data={graph(webPage({ path: "/talc/", name: s.title, description: s.description, imageSlot: "talc-hero", hasBreadcrumb: true }), breadcrumb("/talc/", crumbs))} />
      <PageHero
        slot="talc-hero"
        crumbs={crumbs}
        eyebrow="Talc · soapstone"
        title="Talc from PakTalc"
        intro={
          <p>
            We supply talc in two forms. <strong>Talc lumps</strong> are hand-sorted and graded by colour. <strong>Talc powder</strong> is ground and classified to a mesh
            size. Both are selected at the mine and tested at SKZ Laboratory Peshawar.
          </p>
        }
        actions={
          <>
            <Button href={rfqHref}>Request a quote</Button>
            <Button href="#forms" variant="secondary" icon="arrowDown">
              Explore product forms
            </Button>
          </>
        }
      />

      {/* What is talc */}
      <section className="section" aria-labelledby="what">
        <div className="container container--wide split split--top">
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="The mineral" title="What is talc?" id="what">
              <p className="lead">{talcDefinition}</p>
            </SectionHead>
            <p className="prose">
              Industry uses talc for three things: its softness, its thin plate-like particles, and a surface that repels water but mixes readily with oils and resins.
              Those properties make it a functional ingredient in plastics, paints, paper, ceramics and rubber, not just a filler. The{" "}
              <Link prefetch={false} href="/applications/">applications page</Link> explains what talc does in each industry.
            </p>
          </div>
          <dl className="spec-list spec-list--compact" data-stagger>
            {talcProperties.map((p) => (
              <div key={p.term}>
                <dt>{p.term}</dt>
                <dd className="spec-list__value">{p.value}</dd>
                <dd>{p.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Terminology */}
      <section className="section theme-alt" aria-labelledby="terms">
        <div className="container container--wide">
          <SectionHead eyebrow="Terminology" title="Talc, soapstone, lumps and mesh: the terms buyers use" id="terms" />
          <dl className="glossary" data-stagger>
            {talcTerms.map((t) => (
              <div key={t.term}>
                <dt>{t.term}</dt>
                <dd>{t.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Forms */}
      <section className="section" aria-labelledby="forms-title" id="forms">
        <div className="container container--wide">
          <SectionHead eyebrow="Product forms" title="Talc lumps and talc powder" id="forms-title" row>
            <p>
              Lumps suit buyers who grind in-house. Powder suits buyers who need a ready particle size. Our{" "}
              <Link prefetch={false} href="/insights/talc-lumps-vs-talc-powder/">comparison guide</Link> covers the choice in detail.
            </p>
          </SectionHead>
          <CardGrid cols={2}>
            <Card
              slot="talc-lumps-main"
              variant="card-4x3"
              eyebrow="Raw · hand-sorted"
              title="Talc lumps"
              description="Talc broken at the mine and hand-sorted by colour grade and size, supplied un-ground in jumbo bags. How much comes out as lumps depends on the source deposit."
              href="/talc/lumps/"
              cta="Explore talc lumps"
              sizes="(min-width: 40em) 45vw, 100vw"
            />
            <Card
              slot="talc-powder-bags-stacked"
              eyebrow="Ground · classified"
              title="Talc powder"
              description="Lumps crushed, ground in hammer or Raymond mills and classified to your fineness. Published sample reports show above 325 and above 400 mesh. Packed in 25 kg or jumbo bags."
              href="/talc/powder/"
              cta="Explore talc powder"
              sizes="(min-width: 40em) 45vw, 100vw"
            />
          </CardGrid>
        </div>
      </section>

      {/* Colour grades */}
      <section className="section theme-alt" aria-labelledby="colour-grades-title" id="colour-grades">
        <div className="container container--wide split split--media-wide">
          <div className="doc-frame" data-reveal>
            <Figure slot="talc-colour-grades" sizes="(min-width: 56em) 55vw, 100vw" caption="Talc lump samples by colour: coffee, white, grey and green." />
          </div>
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="Colour grades" title="Four colour grades" id="colour-grades-title">
              <p>
                Talc lumps are graded by colour during hand sorting. Colour comes from minerals associated with the talc in the deposit, and it carries through to the
                powder. Choose the grade to suit your end product.
              </p>
            </SectionHead>
            <ul className="grade-list" data-stagger>
              {colourGrades.map((g) => (
                <li key={g.name}>
                  <span className={`grade-swatch grade-swatch--${g.name.toLowerCase()}`} aria-hidden="true" />
                  <div>
                    <strong>{g.name}</strong>
                    <p className="muted">{g.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Origins */}
      <section className="section" aria-labelledby="origins-title" id="origins">
        <div className="container container--wide split">
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="Origins" title="Where our talc comes from" id="origins-title">
              <p>Company records describe two groups of talc sources. Lump yield, colour and processing route vary by source.</p>
            </SectionHead>
            <div className="origin-cols" data-stagger>
              {[origins.afghan, origins.pakistani].map((o) => (
                <div key={o.label} className="origin-col">
                  <h3>{o.label}</h3>
                  <ul>
                    {o.sources.map((src) => (
                      <li key={src}>{src}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="small muted">
              Afghan talc is handled through Afghan Talc Ltd.&apos;s processing plant in Jalalabad before it reaches Peshawar. Pakistani talc goes from mine stock areas
              direct to Peshawar. See the <Link prefetch={false} href="/affiliation/#supply-chain">supply chain</Link>.
            </p>
          </div>
          <div className="doc-frame" data-reveal>
            <Figure slot="talc-origins" sizes="(min-width: 56em) 40vw, 100vw" caption="Types of talc by origin, from company records." />
          </div>
        </div>
      </section>

      {/* Quality + processing summary */}
      <section className="section theme-alt" aria-labelledby="quality">
        <div className="container container--wide">
          <SectionHead eyebrow="From lump to lab" title="Processing and quality" id="quality" row>
            <p>How the talc is prepared and checked. Each topic has its own page.</p>
          </SectionHead>
          <CardGrid cols={3}>
            <Card slot="sorting-1" eyebrow="Mine" title="Mining & sorting" description="Selective extraction in surface and underground workings, then hand sorting by colour and size in the mine yard." href="/mining-operations/" cta="View process" />
            <Card slot="grinding-2" eyebrow="Peshawar" title="Grinding & packing" description="Crushing, hammer and Raymond mill grinding, air classification and bagging at the two Peshawar meshing plants." href="/processing/" cta="View process" />
            <Card slot="lab-2" eyebrow="Laboratory" title="Quality testing" description={`Particle size, whiteness, sieve residue, LOI, SiO₂ and MgO — with ${labReports.length} sample analysis reports published in full.`} href="/quality-control/" cta="Lab reports & methods" />
          </CardGrid>
        </div>
      </section>

      {/* Applications */}
      <section className="section" aria-labelledby="apps">
        <div className="container container--wide split split--top">
          <SectionHead eyebrow="Applications" title="Industries that specify talc" id="apps">
            <p>Each industry weighs different properties, so each needs a different grade.</p>
            <TextLink href="/applications/">All applications</TextLink>
          </SectionHead>
          <ul className="chip-list" data-stagger>
            {applications.map((a) => (
              <li key={a.id}>
                <Link prefetch={false} href={`/applications/#${a.id}`}>{a.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container container--wide">
          <RelatedLinks
            title="Explore further"
            links={[
              { label: "Talc lumps", href: "/talc/lumps/", description: "Sorting, sizes, yield and packing" },
              { label: "Talc powder", href: "/talc/powder/", description: "Mesh, grinding and packing" },
              { label: "Mesh & particle size", href: "/insights/talc-mesh-and-particle-size/", description: "How to specify fineness" },
            ]}
          />
        </div>
      </section>

      <CtaBand title="Ask about talc for your application" />
    </>
  );
}
