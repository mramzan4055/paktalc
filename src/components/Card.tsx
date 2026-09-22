import Link from "next/link";
import { Picture } from "./Picture";
import { Icon } from "./Icon";

export type CardProps = {
  title: string;
  description: string;
  href?: string;
  cta?: string;
  slot?: string;
  variant?: string;
  /** One ratio per card family: product 4/3, editorial 3/2, article 16/9. */
  ratio?: "4 / 3" | "3 / 2" | "16 / 9";
  eyebrow?: string;
  meta?: React.ReactNode;
  headingLevel?: "h2" | "h3";
  sizes?: string;
  className?: string;
  alt?: string;
};

/**
 * The single card used across the site. Equal heights come from the grid (items stretch) + a flex column body
 * whose CTA is pushed to the bottom. The whole card is clickable through a stretched title link (one tab stop).
 */
export function Card({
  title,
  description,
  href,
  cta = "Learn more",
  slot,
  variant,
  ratio = "4 / 3",
  eyebrow,
  meta,
  headingLevel: H = "h3",
  sizes = "(min-width: 64em) 30vw, (min-width: 40em) 45vw, 100vw",
  className,
  alt,
}: CardProps) {
  return (
    <article className={["card", href ? "card--link" : "", slot ? "" : "card--text", className].filter(Boolean).join(" ")}>
      {slot ? (
        <div className="card__media" style={{ "--card-ratio": ratio } as React.CSSProperties}>
          <Picture slot={slot} variant={variant} sizes={sizes} noUpscale={false} alt={alt} />
        </div>
      ) : null}
      <div className="card__body">
        {eyebrow || meta ? (
          <p className="card__eyebrow">
            {eyebrow ? <span>{eyebrow}</span> : null}
            {meta ? <span className="card__meta">{meta}</span> : null}
          </p>
        ) : null}
        <H className="card__title">
          {href ? (
            <Link prefetch={false} href={href} className="card__link">
              {title}
            </Link>
          ) : (
            title
          )}
        </H>
        <p className="card__desc">{description}</p>
        {href ? (
          <span className="card__more" aria-hidden="true">
            {cta} <Icon name="arrow" size={18} />
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function CardGrid({ children, cols = 3, className }: { children: React.ReactNode; cols?: 2 | 3 | 4; className?: string }) {
  return (
    <div className={["card-grid", `card-grid--${cols}`, className].filter(Boolean).join(" ")} data-stagger>
      {children}
    </div>
  );
}
