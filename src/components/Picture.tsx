import { getSlot, getVariant, largest, srcsetOf } from "@/lib/images";

type Props = {
  slot: string;
  /** Desktop / default variant name (e.g. "banner-16x9"). Defaults to the first variant in images.json. */
  variant?: string;
  /** Art-directed variant used below 768px (e.g. "mobile-4x5"). */
  mobileVariant?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Override alt. Pass "" for decorative use. */
  alt?: string;
  /** Cap display width at the intrinsic width (never upscale). Full-bleed cover heroes pass false. */
  noUpscale?: boolean;
};

/**
 * Renders a prepared images.json slot as <picture> with AVIF first, WebP fallback,
 * intrinsic width/height (no CLS) and optional mobile art direction.
 * Only page heroes should pass `priority` (eager + fetchpriority=high).
 */
export function Picture({ slot: slotId, variant, mobileVariant, sizes = "100vw", priority = false, className, imgClassName, alt, noUpscale = true }: Props) {
  const slot = getSlot(slotId);
  const main = getVariant(slot, variant);
  const mobile = mobileVariant && slot.variants[mobileVariant] ? slot.variants[mobileVariant] : null;
  const v = main.v;
  const hasAvif = v.avif && v.avif.length > 0;
  const src = v.webp.length ? largest(v.webp) : v.png ?? "";

  return (
    <picture className={className}>
      {mobile && mobile.avif?.length > 0 && (
        <source media="(max-width: 767px)" type="image/avif" srcSet={srcsetOf(mobile.avif)} sizes="100vw" width={mobile.width} height={mobile.height} />
      )}
      {mobile && (
        <source media="(max-width: 767px)" type="image/webp" srcSet={srcsetOf(mobile.webp)} sizes="100vw" width={mobile.width} height={mobile.height} />
      )}
      {hasAvif && <source type="image/avif" srcSet={srcsetOf(v.avif)} sizes={sizes} />}
      {v.webp.length > 1 && <source type="image/webp" srcSet={srcsetOf(v.webp)} sizes={sizes} />}
      <img
        src={src}
        width={v.width}
        height={v.height}
        alt={alt ?? slot.alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={imgClassName}
        style={noUpscale ? { maxWidth: v.width } : undefined}
      />
    </picture>
  );
}

type FigureProps = Props & { caption?: string | false; figureClassName?: string; ratio?: string };

/** <figure> wrapper that uses the manifest caption when one exists (pass caption={false} to hide). */
export function Figure({ caption, figureClassName, ratio, ...props }: FigureProps) {
  const slot = getSlot(props.slot);
  const text = caption === false ? "" : caption ?? slot.caption;
  return (
    <figure className={["figure", figureClassName].filter(Boolean).join(" ")} style={ratio ? ({ "--ratio": ratio } as React.CSSProperties) : undefined}>
      <div className="figure__media">
        <Picture {...props} />
      </div>
      {text ? <figcaption className="figure__caption">{text}</figcaption> : null}
    </figure>
  );
}

/** Supporting photo placed under a section heading in split layouts (fills otherwise empty left columns). */
export function SideFigure({ slot, caption, variant }: { slot: string; caption?: string | false; variant?: string }) {
  return (
    <div className="side-figure" data-reveal>
      <Figure slot={slot} variant={variant} sizes="(min-width: 56em) 40vw, 100vw" ratio="4 / 3" caption={caption} noUpscale={false} />
    </div>
  );
}
