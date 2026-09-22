import Link from "next/link";
import { Icon, type IconName } from "./Icon";

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: IconName | null;
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "primary", icon = "arrow", className, external }: BtnProps) {
  const cls = ["btn", `btn--${variant}`, className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span>{children}</span>
      {icon ? <Icon name={icon} size={18} className="btn__icon" /> : null}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link prefetch={false} href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link prefetch={false} href={href} className={["text-link", className].filter(Boolean).join(" ")}>
      <span>{children}</span>
      <Icon name="arrow" size={16} className="text-link__icon" />
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  children,
  as: H = "h2",
  row = false,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  row?: boolean;
  id?: string;
}) {
  return (
    <div className={row ? "section-head section-head--row" : "section-head"} data-reveal>
      <div className="stack" style={{ "--stack": "var(--s-3)" } as React.CSSProperties}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <H id={id}>{title}</H>
      </div>
      {children ? <div className="stack">{children}</div> : null}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Content is built from our own typed data — no user input. Escape "<" to keep the script tag unbreakable.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((c, i) => (
          <li key={c.path}>
            {i < items.length - 1 ? <Link prefetch={false} href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}
