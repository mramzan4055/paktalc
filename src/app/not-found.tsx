import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const hubs = [
  { label: "Talc overview", href: "/talc/" },
  { label: "Talc lumps", href: "/talc/lumps/" },
  { label: "Talc powder", href: "/talc/powder/" },
  { label: "Mining operations", href: "/mining-operations/" },
  { label: "Insights", href: "/insights/" },
  { label: "Contact & quote", href: "/contacts/" },
];

export default function NotFound() {
  return (
    <section className="section">
      <div className="container container--text stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
        <p className="eyebrow">Error 404</p>
        <h1>Page not found</h1>
        <p className="lead">This page doesn&apos;t exist or has moved. Our website was rebuilt in 2026, and older links may no longer work.</p>
        <ul className="chip-list chip-list--row">
          {hubs.map((h) => (
            <li key={h.href}>
              <Link prefetch={false} href={h.href}>{h.label}</Link>
            </li>
          ))}
        </ul>
        <div className="btn-row">
          <Button href="/">Go to the home page</Button>
        </div>
      </div>
    </section>
  );
}
