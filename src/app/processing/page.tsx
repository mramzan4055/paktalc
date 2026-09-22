import { processingIntro, processingSteps } from "@content/operations";
import { seo } from "@content/seo";
import { Button, JsonLd, SectionHead } from "@/components/ui";
import { CtaBand, RelatedLinks, SplitHero } from "@/components/sections";
import { StepTimeline } from "@/components/StepTimeline";
import { Explorer } from "@/components/Explorer";
import { Picture } from "@/components/Picture";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/processing/");

const path = "/processing/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Processing", path },
];

export default function ProcessingPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, imageSlot: "grinding-1", hasBreadcrumb: true }), breadcrumb(path, crumbs))} />
      <SplitHero
        crumbs={crumbs}
        eyebrow="Operations"
        title="Talc processing"
        slot="grinding-1"
        intro={<p>{processingIntro}</p>}
        actions={
          <Button href="/contacts/?form=powder#rfq">Ask about talc powder</Button>
        }
      />

      {/* Interactive overview (desktop) / vertical sequence (mobile) */}
      <section className="section theme-dark" aria-labelledby="flow">
        <div className="container container--wide">
          <SectionHead eyebrow="Process flow" title="Eight stages from lump to loaded bag" id="flow" row>
            <p>Choose a stage to see it on site. Full detail for each stage follows below.</p>
          </SectionHead>
          <Explorer className="explorer explorer--compact">
            <ol className="explorer__list" style={{ "--steps": processingSteps.length } as React.CSSProperties}>
              {processingSteps.map((st, i) => (
                <li key={st.id} className="explorer__step" data-step data-active={i === 0 ? "" : undefined}>
                  <div className="explorer__text">
                    <h3 className="explorer__heading">
                      <button type="button" className="explorer__trigger" data-step-trigger aria-pressed={i === 0}>
                        <span className="explorer__title">{st.title}</span>
                      </button>
                    </h3>
                    <p className="explorer__summary">{st.summary}</p>
                    <a href={`#${st.id}`} className="text-link explorer__more">
                      <span>
                        Learn more<span className="sr-only"> about {st.title.toLowerCase()}</span>
                      </span>
                    </a>
                  </div>
                  <div className="explorer__media">
                    <Picture slot={st.images[0]} sizes="(min-width: 64em) 55vw, 100vw" />
                  </div>
                </li>
              ))}
            </ol>
          </Explorer>
        </div>
      </section>

      <section className="section" aria-label="Processing stages in detail">
        <div className="container container--wide">
          <StepTimeline steps={processingSteps} />
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container container--wide">
          <RelatedLinks
            links={[
              { label: "Talc powder", href: "/talc/powder/", description: "Fineness and packing options" },
              { label: "Quality control", href: "/quality-control/", description: "Lab methods and results" },
              { label: "Facilities", href: "/facilities/", description: "Where processing happens" },
              { label: "How talc is processed", href: "/insights/how-talc-is-processed/", description: "Photo walk-through" },
            ]}
          />
        </div>
      </section>

      <CtaBand title="Need a specific fineness?" body="Tell us the mesh or D50 you work to, your whiteness and chemistry limits, and your packing. We will confirm what the plants can produce." />
    </>
  );
}
