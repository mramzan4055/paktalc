import { seo } from "@content/seo";
import { Picture } from "@/components/Picture";
import { JsonLd } from "@/components/ui";
import { CtaBand, PageHeader } from "@/components/sections";
import { Lightbox } from "@/components/Lightbox";
import { GalleryFilter } from "@/components/GalleryFilter";
import { Icon } from "@/components/Icon";
import { getSlot, getVariant, largest } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/gallery/");

const path = "/gallery/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Gallery", path },
];

/** Authentic images only (images.json gallery slots + selected page slots), grouped by operational stage. */
const categories: { id: string; title: string; slots: string[] }[] = [
  { id: "talc", title: "Talc", slots: ["gallery-01", "gallery-04", "gallery-03", "gallery-02", "talc-lumps-alt-3", "talc-lumps-alt-2"] },
  { id: "mines", title: "Mining", slots: ["gallery-10", "gallery-11", "gallery-12", "gallery-13", "gallery-14", "extraction-6", "extraction-3", "extraction-7"] },
  { id: "sorting", title: "Sorting", slots: ["gallery-05", "gallery-06", "gallery-07", "sorting-3"] },
  { id: "processing", title: "Processing", slots: ["gallery-08", "gallery-09", "gallery-20", "gallery-21", "gallery-22", "gallery-23", "gallery-24", "gallery-25"] },
  { id: "logistics", title: "Storage & logistics", slots: ["gallery-16", "gallery-17", "gallery-18", "gallery-19", "export-1", "export-6"] },
  { id: "quality", title: "Quality & laboratory", slots: ["lab-4", "lab-2", "lab-3"] },
  { id: "team", title: "Team & field work", slots: ["gallery-15", "gallery-26", "gallery-27", "exploration-4", "partners-1"] },
];

function GalleryItem({ slotId }: { slotId: string }) {
  const slot = getSlot(slotId);
  const { v } = getVariant(slot);
  return (
    <li className="gallery-grid__item">
      <a
        href={largest(v.webp)}
        className="gallery-grid__link"
        data-lightbox-item
        data-alt={slot.alt}
        data-caption={slot.caption}
        data-w={v.width}
        data-h={v.height}
        aria-label={`Enlarge photo: ${slot.alt}`}
      >
        <Picture slot={slotId} sizes="(min-width: 64em) 24vw, (min-width: 40em) 32vw, 50vw" noUpscale={false} />
        <span className="gallery-grid__zoom" aria-hidden="true">
          <Icon name="expand" size={18} />
        </span>
      </a>
    </li>
  );
}

export default function GalleryPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, type: "CollectionPage", imageSlot: "gallery-01", hasBreadcrumb: true }), breadcrumb(path, crumbs))} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Gallery"
        title="Photographs from our sites"
        intro={
          <p>
            Original photographs from PakTalc and SKZ Mining Company operations: talc stockpiles, mines, sorting yards, processing plants, the laboratory and logistics. No
            stock photography.
          </p>
        }
      />
      <section className="section section--tight">
        <div className="container container--wide">
          <GalleryFilter targetId="gallery-root" categories={categories.map((c) => ({ id: c.id, title: c.title, count: c.slots.length }))} />
          <div id="gallery-root" data-filter="all">
            <Lightbox className="gallery">
              {categories.map((c) => (
                <section key={c.id} id={c.id} data-cat={c.id} aria-labelledby={`${c.id}-title`} className="gallery__section">
                  <h2 id={`${c.id}-title`} className="gallery__title">
                    {c.title} <span className="gallery__count">{c.slots.length} photos</span>
                  </h2>
                  <ul className="gallery-grid" role="list">
                    {c.slots.map((id) => (
                      <GalleryItem key={id} slotId={id} />
                    ))}
                  </ul>
                </section>
              ))}
            </Lightbox>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
