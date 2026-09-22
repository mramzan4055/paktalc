import Link from "next/link";
import { company } from "@content/company";
import { applications } from "@content/applications";
import { articles } from "@content/insights";
import { labReports, packing } from "@content/talc";
import { seo } from "@content/seo";
import { Picture } from "@/components/Picture";
import { Button, JsonLd, SectionHead, TextLink } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { Explorer } from "@/components/Explorer";
import { HeroSlider } from "@/components/HeroSlider";
import { Card, CardGrid } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { pageMetadata } from "@/lib/seo";
import { graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/");

const chain = [
  { title: "Exploration", summary: "Geologists map talc-bearing rock and sample the faces before any work starts.", slot: "exploration-1", href: "/mining-operations/#exploration" },
  { title: "Extraction", summary: "Talc is broken selectively in adits and underground chambers, and kept apart from waste rock.", slot: "mining-teaser", variant: "banner-16x9", href: "/mining-operations/#extraction" },
  { title: "Hand sorting", summary: "Lumps are picked by hand and graded by colour — white, grey, green, coffee — and by size.", slot: "sorting-banner", variant: "banner-16x9", href: "/mining-operations/#sorting" },
  { title: "Crushing & screening", summary: "In Peshawar, lumps are crushed and screened to an even feed size for the mills.", slot: "crushing-1", href: "/processing/#crushing" },
  { title: "Grinding & classifying", summary: "Hammer and Raymond mill lines grind the talc, and classifiers cut it to the order's mesh.", slot: "grinding-1", href: "/processing/#grinding" },
  { title: "Laboratory testing", summary: "SKZ Laboratory Peshawar measures particle size, whiteness, LOI, SiO₂ and MgO.", slot: "lab-1", href: "/quality-control/" },
  { title: "Packing", summary: "Powder is filled into 25 kg bags or jumbo bags under dust collection.", slot: "packaging-1", href: "/processing/#packing" },
  { title: "Loading & export", summary: "Bags are loaded into containers at the warehouse for shipment.", slot: "export-teaser", href: "/talc/lumps/#packing" },
];

/** Homepage gallery preview — one authentic photo per operational stage. */
const galleryPreview = ["gallery-01", "gallery-11", "gallery-06", "gallery-09", "lab-4", "gallery-17"];

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export default function HomePage() {
  const sample = labReports[0];
  const s = seo["/"];
  return (
    <>
      <JsonLd data={graph(webPage({ path: "/", name: s.title, description: s.description, imageSlot: "talc-hero" }))} />

      {/* 1 — Hero slider (3 synchronised slides) */}
      <HeroSlider />

      {/* Verified facts strip — no invented metrics */}
      <section className="fact-strip" aria-label="Key facts">
        <div className="container container--wide">
          <ul className="fact-strip__list">
            <li>
              <span className="fact-strip__k">2 meshing plants</span>
              <span className="fact-strip__v">Hammer &amp; Raymond mills, Peshawar</span>
            </li>
            <li>
              <span className="fact-strip__k">4 colour grades</span>
              <span className="fact-strip__v">White, grey, green, coffee</span>
            </li>
            <li>
              <span className="fact-strip__k">Lab-tested</span>
              <span className="fact-strip__v">SKZ Laboratory Peshawar</span>
            </li>
            <li>
              <span className="fact-strip__k">Export packing</span>
              <span className="fact-strip__v">25 kg bags · jumbo bags · containers</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2 — Who we are */}
      <section className="section" aria-labelledby="about-title">
        <div className="container container--wide split split--top">
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="Who we are" title="One company from the talc face to the container" id="about-title">
              <p className="lead">
                PakTalc is the talc division of <strong>SKZ Mining Company Pvt. Ltd.</strong> SKZ teams select the talc at the mine, sort it by hand, grind and test it in
                Peshawar, and pack it for export in Karachi. Because one company handles every step, each shipment can be traced back through the same hands.
              </p>
            </SectionHead>
            <ul className="features" data-stagger>
              <li>
                <div>
                  <h3>Graded by hand</h3>
                  <p>Lumps are sorted by colour and size at the mine yard and checked by inspectors before bagging.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Milled to specification</h3>
                  <p>Hammer and Raymond mill lines, with air classification, produce mesh powder to the fineness you specify.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Tested before it ships</h3>
                  <p>Samples are analysed for particle size, whiteness, sieve residue, bulk density, LOI, SiO₂ and MgO.</p>
                </div>
              </li>
              <li>
                <div>
                  <h3>Packed for export</h3>
                  <p>25 kg bags or jumbo bags, stacked and loaded into containers to your packing plan.</p>
                </div>
              </li>
            </ul>
            <div className="btn-row">
              <Button href="/about/" variant="secondary" icon={null}>
                About PakTalc
              </Button>
            </div>
          </div>
          <div className="about-visual" data-reveal>
            <Picture slot="why-card-quality" variant="card-1x1" sizes="(min-width: 56em) 40vw, 100vw" imgClassName="about-visual__img" noUpscale={false} />
          </div>
        </div>
      </section>

      {/* 3 — Products */}
      <section className="section theme-alt" aria-labelledby="products-title">
        <div className="container container--wide">
          <SectionHead eyebrow="Products" title="Two forms of talc, one standard of selection" id="products-title" row>
            <p>Buy talc lumps if you run your own mills, or talc powder if you want a ready mesh grade. Both come from the same hand-sorted material.</p>
          </SectionHead>
          <CardGrid cols={3}>
            <Card
              slot="product-card-talc-lumps"
              variant="card-4x3"
              eyebrow="Raw · hand-sorted"
              title="Talc lumps"
              description="Run-of-mine talc broken and hand-picked into four colour grades and size classes, supplied un-ground in jumbo bags for in-house milling."
              href="/talc/lumps/"
              cta="Explore talc lumps"
            />
            <Card
              slot="product-card-talc-powder"
              eyebrow="Ground · classified"
              title="Talc powder"
              description="Mesh powder ground on hammer and Raymond mill lines in Peshawar, classified to your fineness and packed in 25 kg or jumbo bags."
              href="/talc/powder/"
              cta="Explore talc powder"
            />
            <Card
              slot="talc-lumps-alt-4"
              eyebrow="Buyer's guide"
              title="Lumps or powder?"
              description="How the two forms differ in packing, specification and quality evidence — and which one suits your process."
              href="/insights/talc-lumps-vs-talc-powder/"
              cta="Read the guide"
            />
          </CardGrid>
        </div>
      </section>

      {/* 4 — Mine to market */}
      <section className="section theme-dark chain" aria-labelledby="chain-title">
        <div className="container container--wide">
          <SectionHead eyebrow="Mine to market" title="Every step between the mine and your shipment" id="chain-title" row>
            <p>SKZ teams carry out each stage. The photographs are from our own sites.</p>
          </SectionHead>
          <Explorer className="explorer">
            <ol className="explorer__list" style={{ "--steps": chain.length } as React.CSSProperties}>
              {chain.map((c, i) => (
                <li key={c.title} className="explorer__step" data-step data-active={i === 0 ? "" : undefined}>
                  <div className="explorer__text">
                    <h3 className="explorer__heading">
                      <button type="button" className="explorer__trigger" data-step-trigger aria-pressed={i === 0}>
                        <span className="explorer__title">{c.title}</span>
                      </button>
                    </h3>
                    <p className="explorer__summary">{c.summary}</p>
                    <Link prefetch={false} href={c.href} className="text-link explorer__more">
                      <span>
                        Learn more<span className="sr-only"> about {c.title.toLowerCase()}</span>
                      </span>
                      <Icon name="arrow" size={16} className="text-link__icon" />
                    </Link>
                  </div>
                  <div className="explorer__media">
                    <Picture slot={c.slot} variant={c.variant} sizes="(min-width: 64em) 55vw, 30vw" noUpscale={false} />
                  </div>
                </li>
              ))}
            </ol>
          </Explorer>
          <div className="section-foot btn-row">
            <Button href="/mining-operations/">View process</Button>
            <Button href="/processing/" variant="secondary" icon={null}>
              Talc processing
            </Button>
          </div>
        </div>
      </section>

      {/* 5 — Applications */}
      <section className="section" aria-labelledby="apps-title">
        <div className="container container--wide">
          <SectionHead eyebrow="Applications" title="Where our talc is used" id="apps-title" row>
            <p>Talc&apos;s platy, soft and inert particles do different jobs in different industries. The grade you need depends on the job.</p>
          </SectionHead>
          <ul className="app-list" data-stagger>
            {applications.map((a) => (
              <li key={a.id}>
                <Link prefetch={false} href={`/applications/#${a.id}`} className="app-list__link">
                  <span className="app-list__name">{a.name}</span>
                  <span className="app-list__why">{a.why}</span>
                  <Icon name="arrow" size={18} className="app-list__icon" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="section-foot">
            <Button href="/applications/" variant="secondary">
              All applications
            </Button>
          </div>
        </div>
      </section>

      {/* 6 — Quality */}
      <section className="section theme-alt" aria-labelledby="quality-title">
        <div className="container container--wide split split--media-wide">
          <div className="quality-media" data-reveal>
            <Picture slot="lab-3" sizes="(min-width: 56em) 50vw, 100vw" imgClassName="quality-media__img" noUpscale={false} />
          </div>
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="Quality" title="Measured, not just described" id="quality-title">
              <p>
                Powder samples are analysed at SKZ Laboratory Peshawar. Here is one published result, for a sample labelled “{sample.material}”,{" "}
                {sample.mesh.split(" (")[0].toLowerCase()}.
              </p>
            </SectionHead>
            <dl className="mini-results" data-stagger>
              {[...sample.physical.slice(0, 1), ...sample.chemical].map((r) => (
                <div key={r.parameter}>
                  <dt>{r.parameter}</dt>
                  <dd>
                    {r.result}
                    {r.unit === "%" ? " %" : ""}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="small muted">Single-sample result. It is not a guaranteed specification; ask for a lot analysis with your quotation.</p>
            <div className="btn-row">
              <Button href="/quality-control/" variant="secondary">
                Lab reports &amp; methods
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Operations */}
      <section className="section" aria-labelledby="facilities-title">
        <div className="container container--wide">
          <div className="wide-feature">
            <div className="wide-feature__media" data-reveal>
              <Picture slot="mining-teaser" variant="banner-16x9" mobileVariant="mobile-4x5" sizes="100vw" noUpscale={false} />
            </div>
            <div className="wide-feature__panel">
              <p className="eyebrow">Operations</p>
              <h2 id="facilities-title">Underground workings to meshing plants</h2>
              <p>
                Talc comes from surface and underground workings. It goes to SKZ&apos;s processing and storage yard and two meshing plants in Peshawar, then to the sorting
                and packing warehouse in Karachi.
              </p>
              <div className="btn-row">
                <Button href="/mining-operations/" variant="secondary">
                  Mining operations
                </Button>
                <Button href="/facilities/" variant="ghost">
                  Our facilities
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Supply */}
      <section className="section section--flush-top" aria-labelledby="export-title">
        <div className="container container--wide split split--reverse split--media-wide">
          <div className="export-media" data-reveal>
            <Picture slot="export-teaser" sizes="(min-width: 56em) 40vw, 100vw" />
          </div>
          <div className="stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
            <SectionHead eyebrow="Supply" title="Packed and loaded for export" id="export-title">
              <p>Packing is agreed per order, from bag type and labelling to the container loading plan.</p>
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
            <div className="btn-row">
              <Button href="/contacts/#rfq">Request a quote</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9 — Gallery preview */}
      <section className="section theme-alt" aria-labelledby="gallery-title">
        <div className="container container--wide">
          <SectionHead eyebrow="Gallery" title="Inside our operations" id="gallery-title" row>
            <p>Original photographs of talc stockpiles, underground workings, sorting yards, grinding plants, the laboratory and container loading.</p>
          </SectionHead>
          <ul className="gallery-preview" data-stagger>
            {galleryPreview.map((slot) => (
              <li key={slot}>
                <Link prefetch={false} href="/gallery/" className="gallery-preview__link" tabIndex={-1} aria-hidden="true">
                  <Picture slot={slot} sizes="(min-width: 64em) 30vw, 50vw" noUpscale={false} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="section-foot">
            <Button href="/gallery/">View gallery</Button>
          </div>
        </div>
      </section>

      {/* 10 — Sustainability + SKZ affiliation */}
      <section className="section" aria-label="Responsibility and company">
        <div className="container container--wide card-grid card-grid--2">
          <Card
            slot="sustainability-teaser"
            ratio="3 / 2"
            eyebrow="Sustainability"
            title="Responsible practice around our sites"
            description="Selective mining and dust collection on site; fruit-tree plantation, farming support and geology training in the communities around the mines."
            href="/sustainability/"
            cta="Learn more"
            headingLevel="h2"
            sizes="(min-width: 40em) 45vw, 100vw"
          />
          <article className="card card--skz">
            <div className="card__body">
              <div className="duo__logo">
                <Picture slot="skz-logo" alt="SKZ Mining Company logo" sizes="220px" />
              </div>
              <p className="card__eyebrow">
                <span>Affiliation</span>
              </p>
              <h2 className="card__title">Part of SKZ Mining Company Pvt. Ltd.</h2>
              <p className="card__desc">
                SKZ Mining handles several minerals; PakTalc is its talc division. SKZ runs the plants, laboratory and warehouses behind every PakTalc shipment, and works
                with Japanese technical partners.
              </p>
              <div className="btn-row card__actions">
                <TextLink href="/affiliation/">Company structure</TextLink>
                <a className="text-link" href={company.parent.url} rel="noopener">
                  <span>skzminingcompany.com</span>
                  <Icon name="external" size={16} />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 11 — Insights */}
      <section className="section theme-alt" aria-labelledby="insights-title">
        <div className="container container--wide">
          <SectionHead eyebrow="Insights" title="Guides for talc buyers" id="insights-title" row>
            <p>Practical articles based on our own operations: specifying, processing and using talc.</p>
          </SectionHead>
          <CardGrid cols={3}>
            {articles.slice(0, 3).map((a) => (
              <Card
                key={a.slug}
                slot={a.heroSlot}
                ratio="16 / 9"
                eyebrow={a.category}
                meta={<time dateTime={a.datePublished}>{fmt(a.datePublished)}</time>}
                title={a.title}
                description={a.excerpt}
                href={`/insights/${a.slug}/`}
                cta="Read the guide"
              />
            ))}
          </CardGrid>
          <div className="section-foot">
            <Button href="/insights/" variant="secondary">
              All insights
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
