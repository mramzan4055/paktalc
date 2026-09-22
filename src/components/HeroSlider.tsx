import ReactDOM from "react-dom";
import { heroSlides } from "@content/hero";
import { getSlot, getVariant, largest, srcsetOf } from "@/lib/images";
import { Picture } from "./Picture";
import { Button } from "./ui";
import { HeroSliderController } from "./HeroSliderController";

/**
 * Server-rendered hero carousel. Every slide's text is real HTML (crawlable); slide 1 carries the page H1
 * and the only priority image. The client controller only toggles which slide is active.
 */
export function HeroSlider() {
  // Preload the first slide's AVIF (the LCP image) so it starts downloading with the HTML,
  // ahead of the framework JS. Art direction is preserved via media + imageSizes.
  const first = heroSlides[0];
  const slot = getSlot(first.image.slot);
  const desktop = getVariant(slot, first.image.variant).v;
  const mobile = slot.variants[first.image.mobileVariant];
  ReactDOM.preload(largest(desktop.avif), {
    as: "image",
    type: "image/avif",
    imageSrcSet: srcsetOf(desktop.avif),
    imageSizes: "100vw",
    media: "(min-width: 768px)",
    fetchPriority: "high",
  });
  if (mobile?.avif?.length) {
    ReactDOM.preload(largest(mobile.avif), {
      as: "image",
      type: "image/avif",
      imageSrcSet: srcsetOf(mobile.avif),
      imageSizes: "100vw",
      media: "(max-width: 767px)",
      fetchPriority: "high",
    });
  }

  return (
    <section className="hero-slider theme-dark" aria-roledescription="carousel" aria-label="PakTalc highlights">
      <HeroSliderController labels={heroSlides.map((s) => s.label)}>
        {heroSlides.map((s, i) => {
          const Title = i === 0 ? "h1" : "h2";
          return (
            <div
              key={s.id}
              className="hero-slide"
              data-slide={i}
              data-active={i === 0 ? "" : undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${heroSlides.length}: ${s.label}`}
              aria-hidden={i === 0 ? undefined : true}
            >
              <div className="hero-slide__media">
                <Picture
                  slot={s.image.slot}
                  variant={s.image.variant}
                  mobileVariant={s.image.mobileVariant}
                  priority={i === 0}
                  sizes="100vw"
                  imgClassName="hero-slide__img"
                  noUpscale={false}
                />
              </div>
              <div className="hero-slide__scrim" aria-hidden="true" />
              <div className="container container--wide hero-slide__inner">
                <div className="hero-slide__text">
                  <p className="eyebrow">{s.eyebrow}</p>
                  <Title className="hero-slide__title">{s.title}</Title>
                  <p className="hero-slide__intro">{s.description}</p>
                  <div className="hero-slide__actions">
                    <Button href={s.primary.href}>{s.primary.label}</Button>
                    <Button href={s.secondary.href} variant="secondary" icon={null}>
                      {s.secondary.label}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </HeroSliderController>
    </section>
  );
}
