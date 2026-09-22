import Link from "next/link";
import { miningIntro, miningSteps } from "@content/operations";
import { seo } from "@content/seo";
import { Button, JsonLd, SectionHead } from "@/components/ui";
import { CtaBand, PageHero, RelatedLinks } from "@/components/sections";
import { StepTimeline } from "@/components/StepTimeline";
import { Figure, SideFigure } from "@/components/Picture";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/mining-operations/");

const path = "/mining-operations/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Mining operations", path },
];

export default function MiningPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, imageSlot: "mining-hero", hasBreadcrumb: true }), breadcrumb(path, crumbs))} />
      <PageHero
        slot="mining-hero"
        crumbs={crumbs}
        eyebrow="Operations"
        title="Talc mining operations"
        intro={<p>{miningIntro}</p>}
        actions={
          <Button href="#exploration" variant="secondary" icon="arrowDown">
            View process
          </Button>
        }
      />

      <section className="section" aria-labelledby="overview">
        <div className="container container--wide split split--top">
          <div className="side-col">
            <SectionHead eyebrow="Overview" title="From survey to stock area in five stages" id="overview" />
            <SideFigure slot="gallery-10" caption="Excavation site with workers and trucks." />
          </div>
          <nav aria-label="Stages on this page">
            <ol className="stage-index" data-stagger>
              {miningSteps.map((st, i) => (
                <li key={st.id}>
                  <a href={`#${st.id}`}>
                    <span className="stage-index__n">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <strong>{st.title}</strong>
                      <span className="muted"> — {st.summary}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      <section className="section section--flush-top" aria-label="Mining stages">
        <div className="container container--wide">
          <StepTimeline steps={miningSteps} />
        </div>
      </section>

      <section className="section theme-alt" aria-labelledby="next">
        <div className="container container--wide split">
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="What happens next" title="From the stock area to the mill" id="next">
              <p>
                In Peshawar the talc is stocked by grade. It is either ground into powder at the meshing plants or sent to Karachi as lumps. The{" "}
                <Link prefetch={false} href="/processing/">processing page</Link> covers the rest of the journey.
              </p>
            </SectionHead>
            <div className="btn-row">
              <Button href="/processing/">Talc processing</Button>
              <Button href="/facilities/" variant="secondary" icon={null}>
                Our facilities
              </Button>
            </div>
          </div>
          <div data-reveal="mask">
            <Figure slot="export-4" sizes="(min-width: 56em) 40vw, 100vw" caption="Talc stockpiles and a loaded truck at the Peshawar warehouse yard." />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <RelatedLinks
            links={[
              { label: "Talc lumps", href: "/talc/lumps/", description: "The sorted product" },
              { label: "Quality control", href: "/quality-control/", description: "Checks from face to lab" },
              { label: "Sustainability", href: "/sustainability/", description: "Site practice and communities" },
              { label: "Supply chain", href: "/affiliation/#supply-chain", description: "Mine to Karachi" },
            ]}
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
