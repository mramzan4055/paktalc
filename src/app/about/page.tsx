import { aboutIntro, mission, principles, teamRoles } from "@content/about";
import { company } from "@content/company";
import { seo } from "@content/seo";
import { Figure, SideFigure } from "@/components/Picture";
import { Button, JsonLd, SectionHead, TextLink } from "@/components/ui";
import { CtaBand, RelatedLinks, SplitHero } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/about/");

const path = "/about/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path },
];

export default function AboutPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, type: "AboutPage", imageSlot: "about-hero", hasBreadcrumb: true }), breadcrumb(path, crumbs))} />
      <SplitHero
        crumbs={crumbs}
        eyebrow="Company"
        title="About PakTalc"
        slot="about-hero"
        variant="portrait-4x5"
        intro={
          <>
            {aboutIntro.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </>
        }
        actions={
          <>
            <Button href="/affiliation/" variant="secondary" icon={null}>
              Company structure
            </Button>
          </>
        }
      />

      {/* Mission & principles */}
      <section className="section" aria-labelledby="mission">
        <div className="container container--wide split split--top">
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="Mission" title="Why we work the way we do" id="mission">
              <p className="lead">{mission}</p>
            </SectionHead>
            <SideFigure slot="gallery-15" caption="Team members at a white rock outcrop during a site visit." />
          </div>
          <ul className="features" data-stagger>
            {principles.map((p) => (
              <li key={p.title}>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Offices & facilities */}
      <section className="section theme-alt" aria-labelledby="offices">
        <div className="container container--wide split split--media-wide">
          <div className="photo-grid photo-grid--pair" data-stagger>
            <Figure slot="overview-office" sizes="(min-width: 56em) 25vw, 50vw" />
            <Figure slot="facility-mesh-plant" sizes="(min-width: 56em) 25vw, 50vw" />
          </div>
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="Where we are" title="Offices, plants and warehouses" id="offices">
              <p>
                The head office is in {company.headOffice.locality}. Operations are in Peshawar, where SKZ runs its office, the meshing plants, the processing and storage yard
                and the laboratory, and in Karachi, where export orders are sorted and packed.
              </p>
            </SectionHead>
            <TextLink href="/facilities/">Our facilities</TextLink>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" aria-labelledby="team">
        <div className="container container--wide">
          <SectionHead eyebrow="People" title="The team behind the talc" id="team" row>
            <p>
              SKZ Mining Company is led by directors {company.directors.join(" and ")}. Geologists, plant, laboratory and logistics teams work across the sites.
            </p>
          </SectionHead>
          <div className="grid grid-4 team-grid" data-stagger>
            <Figure slot="team-director-1" sizes="(min-width: 64em) 22vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 5" caption="A company director examining a white rock face at a mine site." />
            <Figure slot="team-peshawar-manager" sizes="(min-width: 64em) 22vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 5" caption="At the SKZ Mining Company Peshawar office." />
            <Figure slot="team-karachi-manager" sizes="(min-width: 64em) 22vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 5" caption="On a white mineral stockyard in front of processing sheds." />
            <Figure slot="team-lab" sizes="(min-width: 64em) 22vw, (min-width: 40em) 45vw, 100vw" ratio="4 / 5" caption="SKZ Laboratory Peshawar." />
          </div>
          <ul className="role-list" data-stagger>
            {teamRoles.map((r) => (
              <li key={r.title}>
                <h3>{r.title}</h3>
                <p className="muted">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technical partners */}
      <section className="section theme-dark" aria-labelledby="partners">
        <div className="container container--wide split split--top">
          <SectionHead eyebrow="Technical partnership" title="Working with Japanese experts" id="partners">
            <p>
              Japanese technical experts visit SKZ mine sites and plants. They survey talc bodies with the team, review processing, and take part in the geology training
              programme for young Pakistani geologists.
            </p>
            <TextLink href="/affiliation/">Company structure and Japanese affiliation</TextLink>
          </SectionHead>
          <div className="photo-grid" data-stagger>
            <Figure slot="partners-1" sizes="(min-width: 56em) 40vw, 100vw" caption={false} />
            <Figure slot="partners-2" sizes="(min-width: 56em) 20vw, 50vw" caption={false} />
            <Figure slot="partners-3" sizes="(min-width: 56em) 20vw, 50vw" caption={false} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <RelatedLinks
            links={[
              { label: "SKZ Mining affiliation", href: "/affiliation/", description: "Structure and supply chain" },
              { label: "Sustainability", href: "/sustainability/", description: "Communities and site practice" },
              { label: "Mining operations", href: "/mining-operations/", description: "From survey to sorting" },
              { label: "Gallery", href: "/gallery/", description: "Photos from our sites" },
            ]}
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
