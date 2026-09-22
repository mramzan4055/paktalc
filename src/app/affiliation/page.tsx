import Link from "next/link";
import { company, sites } from "@content/company";
import { seo } from "@content/seo";
import { Figure, Picture } from "@/components/Picture";
import { Button, JsonLd, SectionHead } from "@/components/ui";
import { CtaBand, RelatedLinks, SplitHero } from "@/components/sections";
import { Icon } from "@/components/Icon";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/affiliation/");

const path = "/affiliation/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "SKZ Mining affiliation", path },
];

export default function AffiliationPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, imageSlot: "overview-office", hasBreadcrumb: true }), breadcrumb(path, crumbs))} />
      <SplitHero
        crumbs={crumbs}
        slot="overview-office"
        variant="portrait-4x5"
        eyebrow="Company"
        title="PakTalc and SKZ Mining Company"
        intro={
          <p>
            <strong>PakTalc is {company.relationship}</strong> SKZ is a Pakistani mining and mineral-processing company; PakTalc is its talc brand. SKZ&apos;s plants,
            laboratory and warehouses produce and ship PakTalc talc.
          </p>
        }
      />

      {/* Relationship in brief */}
      <section className="section" aria-labelledby="relationship">
        <div className="container container--wide split split--top">
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="Relationship" title="Who does what" id="relationship" />
            <dl className="rel-list" data-stagger>
              <div>
                <dt>PakTalc</dt>
                <dd>The talc division and brand. It handles talc enquiries, product information and customer contact for talc lumps and talc powder.</dd>
              </div>
              <div>
                <dt>SKZ Mining Company Pvt. Ltd.</dt>
                <dd>
                  The parent company. It runs the operations: mine selection and sorting, the Peshawar meshing plants and yard, SKZ Laboratory Peshawar and the Karachi
                  warehouse. SKZ also handles other minerals, which it presents on its own website.
                </dd>
              </div>
            </dl>
          </div>
          <div className="skz-card" data-reveal>
            <Picture slot="skz-logo" alt="SKZ Mining Company logo" sizes="260px" className="skz-card__logo" />
            <p className="muted">For SKZ&apos;s other minerals and corporate information, visit the SKZ Mining Company website.</p>
            <Button href={company.parent.url} external variant="secondary" icon="external">
              skzminingcompany.com
            </Button>
          </div>
        </div>
      </section>

      {/* Structure chart */}
      <section className="section theme-alt" aria-labelledby="structure">
        <div className="container container--wide split split--media-wide">
          <div className="doc-frame" data-reveal>
            <Figure slot="affiliation-chart" sizes="(min-width: 56em) 55vw, 100vw" caption="Company structure as shown in SKZ records." />
          </div>
          <div className="stack" style={{ "--stack": "var(--s-4)" } as React.CSSProperties}>
            <SectionHead eyebrow="Structure" title="The wider group" id="structure">
              <p>SKZ&apos;s own structure chart shows this arrangement:</p>
            </SectionHead>
            <ul className="tree" aria-label="Company structure (text version of the chart)">
              <li>
                <strong>Shokozan (Japan)</strong>
                <ul>
                  <li>
                    <strong>Afghan Talc</strong> — mining sites at Agam and Khogyani; processing plant in Jalalabad
                  </li>
                  <li>
                    <strong>SKZ Company</strong> — meshing and storage in Peshawar; sorting and packing in Karachi
                  </li>
                </ul>
              </li>
            </ul>
            <p className="small muted">
              Directors: {company.directors.join(" and ")}. The chart describes how the companies work together. It does not state their legal ownership.
            </p>
          </div>
        </div>
      </section>

      {/* Supply chain */}
      <section className="section" aria-labelledby="supply-chain-title" id="supply-chain">
        <div className="container container--wide">
          <SectionHead eyebrow="Supply chain" title="From the mines to Karachi" id="supply-chain-title" row>
            <p>
              Talc from both source groups meets in Peshawar. It is stocked and segregated there, then packed and exported from Karachi. See{" "}
              <Link prefetch={false} href="/facilities/">facilities</Link>.
            </p>
          </SectionHead>
          <div className="chain-docs">
            <div className="doc-frame" data-reveal>
              <Figure slot="supply-chain-1" sizes="(min-width: 56em) 45vw, 100vw" caption="Afghan and Pakistani talc routes to stock areas." />
            </div>
            <div className="doc-frame" data-reveal>
              <Figure slot="supply-chain-2" sizes="(min-width: 56em) 30vw, 100vw" caption="Peshawar warehouse to Karachi warehouse." />
            </div>
          </div>
          <ol className="route" data-stagger aria-label="Supply chain (text version of the diagrams)">
            <li>
              <strong>Afghan talc</strong>
              <span>Open mining → Morga stock area → Jalalabad factory (processing) → Torkham border</span>
            </li>
            <li>
              <strong>Pakistani talc</strong>
              <span>Open and tunnel mining → mine stock area</span>
            </li>
            <li>
              <strong>Peshawar warehouse</strong>
              <span>Stock and segregation; grinding at the meshing plants ({sites[0].place})</span>
            </li>
            <li>
              <strong>Karachi warehouse</strong>
              <span>Packing and export ({sites[2].place})</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="section theme-alt">
        <div className="container container--wide">
          <RelatedLinks
            links={[
              { label: "About PakTalc", href: "/about/", description: "Team and approach" },
              { label: "Facilities", href: "/facilities/", description: "Peshawar and Karachi" },
              { label: "Talc origins", href: "/talc/#origins", description: "Afghan and Pakistani sources" },
            ]}
          />
          <p className="section-foot small muted">
            <Icon name="external" size={14} /> SKZ Mining Company:{" "}
            <a href={company.parent.url} rel="noopener">
              skzminingcompany.com
            </a>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
