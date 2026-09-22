import Link from "next/link";
import { colourGrades, packing, yieldRatios } from "@content/talc";
import { seo } from "@content/seo";
import { faqs } from "@content/faq";
import { Figure, Picture, SideFigure } from "@/components/Picture";
import { Button, JsonLd, SectionHead, TextLink } from "@/components/ui";
import { CtaBand, RelatedLinks, SplitHero } from "@/components/sections";
import { Faq } from "@/components/Faq";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, faqPage, graph, product, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/talc/lumps/");

const path = "/talc/lumps/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Talc", path: "/talc/" },
  { name: "Talc lumps", path },
];

export default function TalcLumpsPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ path, name: s.title, description: s.description, imageSlot: "talc-lumps-main", hasBreadcrumb: true }),
          breadcrumb(path, crumbs),
          faqPage(path, faqs["/talc/lumps/"]),
          product({
            path,
            name: "Talc lumps",
            description:
              "Hand-sorted raw talc (soapstone) lumps graded by colour and size, supplied un-ground in jumbo bags by PakTalc, a division of SKZ Mining Company Pvt. Ltd.",
            imageSlots: ["talc-lumps-main", "talc-lumps-alt-1", "talc-lumps-alt-4"],
            category: "Industrial minerals > Talc",
            properties: [
              { name: "Form", value: "Lumps (un-ground)" },
              { name: "Colour grades", value: colourGrades.map((g) => g.name).join(", ") },
              { name: "Packing", value: "Jumbo (ton) bags; container loading" },
            ],
          }),
        )}
      />

      <SplitHero
        crumbs={crumbs}
        eyebrow="Product · raw talc"
        title="Talc lumps"
        slot="talc-lumps-main"
        variant="card-1x1"
        intro={
          <p>
            <strong>Talc lumps are pieces of raw talc (soapstone) broken at the mine and sorted by hand.</strong> We grade them by colour and size and supply them
            un-ground in jumbo bags. Buyers mill them in-house or process them for resale.
          </p>
        }
        actions={
          <>
            <Button href="/contacts/?form=lumps#rfq">Ask about talc lumps</Button>
            <Button href="#specify" variant="secondary" icon="arrowDown">
              What to specify
            </Button>
          </>
        }
      />

      {/* Appearance */}
      <section className="section" aria-labelledby="appearance">
        <div className="container container--wide split split--top">
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="Physical form" title="What our talc lumps look like" id="appearance">
              <p>
                Our talc lumps are foliated. They split into flat, layered plates and feel smooth, even soapy. The rock is soft enough to scratch with a fingernail (Mohs 1).
                White lumps are bright and flaky; some pieces are slightly translucent at the edges.
              </p>
              <p>
                They are supplied as broken, hand-picked pieces rather than crushed product. Size classes are agreed per order. Company records split material from Afghan
                sources into <strong>big lumps (over 20 mm)</strong> and <strong>small lumps (over 5 mm)</strong>.
              </p>
            </SectionHead>
          </div>
          <div className="photo-grid" data-stagger>
            <Picture slot="talc-lumps-alt-1" variant="card-4x3" sizes="(min-width: 56em) 40vw, 100vw" />
            <Picture slot="talc-lumps-alt-2" variant="card-4x3" sizes="(min-width: 56em) 20vw, 50vw" />
            <Picture slot="talc-lumps-alt-3" variant="card-4x3" sizes="(min-width: 56em) 20vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Colour */}
      <section className="section theme-alt" aria-labelledby="grades">
        <div className="container container--wide split split--media-wide">
          <div className="doc-frame" data-reveal>
            <Figure slot="talc-colour-grades" sizes="(min-width: 56em) 55vw, 100vw" caption="Colour grades: coffee, white, grey and green lumps." />
          </div>
          <div className="stack" style={{ "--stack": "var(--s-4)" } as React.CSSProperties}>
            <SectionHead eyebrow="Colour grades" title="Sorted into four colours" id="grades">
              <p>
                Colour is the first thing buyers specify for lumps. It is set during hand sorting and carries through to the powder. Grades are{" "}
                {colourGrades.map((g) => g.name.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " and $1")}.
              </p>
            </SectionHead>
            <TextLink href="/talc/#colour-grades">Colour grades explained</TextLink>
          </div>
        </div>
      </section>

      {/* Sorting */}
      <section className="section" aria-labelledby="sorting">
        <div className="container container--wide">
          <SectionHead eyebrow="Selection" title="How talc lumps are sorted" id="sorting" row>
            <p>
              Sorting happens in walled yards at the mine. Workers remove foreign rock by hand and split the lumps by colour and size. Inspectors check the piles before
              bagging.
            </p>
          </SectionHead>
          <div className="grid grid-3" data-stagger>
            <Figure slot="sorting-1" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" />
            <Figure slot="sorting-2" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" />
            <Figure slot="talc-lumps-alt-4" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" caption="Checking lump texture by hand at the stockpile." />
          </div>
          <p className="section-foot">
            <TextLink href="/mining-operations/#sorting">Sorting at the mine</TextLink>
          </p>
        </div>
      </section>

      {/* Yield */}
      <section className="section theme-alt" aria-labelledby="yield">
        <div className="container container--wide split split--top">
          <SectionHead eyebrow="Supply" title="Lump yield depends on the deposit" id="yield">
            <p>
              Not every tonne mined comes out as lumps: some breaks down into fines. Company records give these typical splits by source. They explain why lump
              availability and size classes differ between origins.
            </p>
            <p className="small muted">Typical values from company records, not a guarantee for a particular shipment.</p>
          </SectionHead>
          <div className="yield" data-stagger>
            {yieldRatios.map((y) => (
              <figure key={y.source} className="yield__row">
                <figcaption className="yield__source">{y.source}</figcaption>
                <div className="yield__bar" role="img" aria-label={y.split.map((p) => `${p.label} ${p.pct}%`).join(", ")}>
                  {y.split.map((p, i) => (
                    <span key={p.label} className={`yield__seg yield__seg--${i}`} style={{ flexBasis: `${p.pct}%` }}>
                      {p.pct >= 12 ? `${p.pct}%` : ""}
                    </span>
                  ))}
                </div>
                <ul className="yield__legend">
                  {y.split.map((p, i) => (
                    <li key={p.label}>
                      <span className={`yield__dot yield__seg--${i}`} aria-hidden="true" />
                      {p.label}: {p.pct}%
                    </li>
                  ))}
                </ul>
                {y.note ? <p className="small muted">{y.note}</p> : null}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Packing */}
      <section className="section" aria-labelledby="packing-title" id="packing">
        <div className="container container--wide">
          <SectionHead eyebrow="Packing & loading" title="Jumbo bags, trucks and containers" id="packing-title" row>
            <p>{packing.note} Lumps travel from the mine to the Peshawar yard, then on to Karachi for packing and container loading.</p>
          </SectionHead>
          <div className="grid grid-3" data-stagger>
            <Figure slot="export-3" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" caption="Loading talc lumps onto a truck at the stock area." />
            <Figure slot="export-6" variant="banner-16x9" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" />
            <Figure slot="export-2" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" />
          </div>
        </div>
      </section>

      {/* Specify */}
      <section className="section theme-alt" aria-labelledby="specify-title" id="specify">
        <div className="container container--wide split split--top">
          <div className="side-col">
            <SectionHead eyebrow="Enquiring" title="What to include when you ask about lumps" id="specify-title">
              <p>These details let us check availability and quote accurately.</p>
            </SectionHead>
            <SideFigure slot="gallery-04" caption="Checking a large talc lump on the stockpile." />
          </div>
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <ol className="features" data-stagger>
              <li>
                <div>
                  <h3>Colour grade</h3>
                  <p>White, grey, green or coffee — or send a photo or sample of what you use now.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Size range</h3>
                  <p>Minimum and maximum lump size, and whether fines are acceptable.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Quantity &amp; frequency</h3>
                  <p>Tonnes or containers per shipment, and how often.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Destination &amp; packing</h3>
                  <p>Destination port, bag type and any labelling needs.</p>
                </div>
              </li>
            </ol>
            <div className="btn-row">
              <Button href="/contacts/?form=lumps#rfq">Ask about talc lumps</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <RelatedLinks
            links={[
              { label: "Talc powder", href: "/talc/powder/", description: "If you need a ready mesh grade" },
              { label: "Lumps vs powder", href: "/insights/talc-lumps-vs-talc-powder/", description: "Buyer's comparison" },
              { label: "Processing", href: "/processing/", description: "How lumps become powder" },
              { label: "Quality control", href: "/quality-control/", description: "Sorting checks and lab tests" },
            ]}
          />
          <p className="small muted section-foot">
            Grinding in-house? See the <Link prefetch={false} href="/applications/">applications page</Link> for what end users in each industry look for.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section theme-alt" aria-labelledby="faq-title" id="faq">
        <div className="container container--wide split split--top">
          <SectionHead eyebrow="Questions" title="Talc lumps: common questions" id="faq-title">
            <p>Short answers to what buyers ask most. Anything else, just ask.</p>
          </SectionHead>
          <Faq items={faqs["/talc/lumps/"]} />
        </div>
      </section>
      <CtaBand title="Ask about talc lumps" primary={{ label: "Ask about talc lumps", href: "/contacts/?form=lumps#rfq" }} />
    </>
  );
}
