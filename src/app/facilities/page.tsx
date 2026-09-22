import Link from "next/link";
import { sites } from "@content/company";
import { seo } from "@content/seo";
import { Figure, SideFigure } from "@/components/Picture";
import { Card, CardGrid } from "@/components/Card";
import { Button, JsonLd, SectionHead } from "@/components/ui";
import { CtaBand, RelatedLinks, SplitHero } from "@/components/sections";
import { pageMetadata, absolute } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/facilities/");

const path = "/facilities/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Facilities", path },
];

/** Only location-confirmed photos are attributed to a site; Karachi has none yet (IMAGE_MISSING in POST-DEVELOPMENT-AUDIT.md). */
const sitePhotos: Record<string, { slot: string; representative?: boolean }> = {
  "peshawar-mesh": { slot: "mesh-plant-peshawar" },
  "peshawar-store": { slot: "export-4" },
  karachi: { slot: "export-5", representative: true },
};

export default function FacilitiesPage() {
  const s = seo[path];
  const places = sites.map((st) => ({
    "@type": "Place",
    "@id": `${absolute(path)}#${st.id}`,
    name: `SKZ Mining Company — ${st.name}, ${st.place}`,
    description: st.role,
    address: { "@type": "PostalAddress", addressLocality: st.place.split(",").pop()?.trim(), addressRegion: st.region, addressCountry: "PK" },
    containedInPlace: { "@type": "Country", name: "Pakistan" },
  }));
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, imageSlot: "export-6", hasBreadcrumb: true }), breadcrumb(path, crumbs), ...places)} />
      <SplitHero
        crumbs={crumbs}
        eyebrow="Operations"
        title="Facilities"
        slot="export-6"
        variant="banner-16x9"
        intro={
          <p>
            PakTalc talc is processed and packed at SKZ Mining Company sites in Pakistan. There are two meshing plants and a processing and storage yard in Peshawar, and a
            sorting and packing warehouse in Karachi. Samples are tested at SKZ Laboratory Peshawar.
          </p>
        }
        actions={<Button href="/contacts/#rfq">Request a quote</Button>}
      />

      <section className="section" aria-labelledby="sites">
        <div className="container container--wide">
          <SectionHead eyebrow="Sites" title="Where the work is done" id="sites" row>
            <p>
              Each site has a distinct role in the chain. The <Link prefetch={false} href="/affiliation/#supply-chain">supply chain diagram</Link> shows how talc moves between them.
            </p>
          </SectionHead>
          <CardGrid cols={3}>
            {sites.map((st, i) => {
              const photo = sitePhotos[st.id];
              return (
                <Card
                  key={st.id}
                  slot={photo.slot}
                  eyebrow={`${String(i + 1).padStart(2, "0")} · ${st.place}`}
                  meta={photo.representative ? "Representative photo" : undefined}
                  title={st.name}
                  description={st.role}
                />
              );
            })}
          </CardGrid>
        </div>
      </section>

      <section className="section section--flush-top" aria-labelledby="inside">
        <div className="container container--wide">
          <SectionHead eyebrow="Inside" title="Plants, yards and warehouses" id="inside" row>
            <p>Photographs from SKZ processing and storage sites. Captions describe what is shown.</p>
          </SectionHead>
          <div className="grid grid-3" data-stagger>
            <Figure slot="gallery-09" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" caption="Screening plant with conveyors and white talc stockpiles." />
            <Figure slot="grinding-3" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" />
            <Figure slot="gallery-21" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" caption="Two teal cyclone separators in a processing shed." />
            <Figure slot="crushing-1" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" />
            <Figure slot="gallery-19" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" caption="Skid-steer loader handling jumbo bags." />
            <Figure slot="packaging-3" sizes="(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 3" />
          </div>
        </div>
      </section>

      <section className="section theme-alt" aria-labelledby="equipment">
        <div className="container container--wide split split--top">
          <div className="side-col">
            <SectionHead eyebrow="Equipment" title="What the plants run" id="equipment">
              <p>The equipment you can see in our own plant photographs.</p>
            </SectionHead>
            <SideFigure slot="gallery-22" caption="Inspecting a mill and cyclone assembly in a processing shed." />
          </div>
          <ul className="features" data-stagger>
            <li>
              <div>
                <h3>Crushing &amp; screening</h3>
                <p>Crushers, screens and conveyor stackers that prepare an even mill feed.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Hammer mill &amp; Raymond mill lines</h3>
                <p>Roller and hammer grinding with cyclone collection, in two meshing plants.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Micronizing classifier</h3>
                <p>Air classification for finer particle-size cuts.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Dust collection &amp; bagging</h3>
                <p>Dust collectors, hoppers for jumbo-bag filling, and a 25 kg bagging line.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Laboratory</h3>
                <p>Laser particle-size analysis, a colour reader, drying ovens and chemical analysis.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <RelatedLinks
            links={[
              { label: "Processing", href: "/processing/", description: "Stage by stage" },
              { label: "Quality control", href: "/quality-control/", description: "Laboratory methods" },
              { label: "SKZ Mining affiliation", href: "/affiliation/", description: "Company structure" },
              { label: "Gallery", href: "/gallery/", description: "More site photos" },
            ]}
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
