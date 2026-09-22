import Link from "next/link";
import type { Section } from "@content/insights";
import { Figure } from "./Picture";
import { Icon } from "./Icon";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function ArticleBody({ sections }: { sections: Section[] }) {
  return (
    <div className="prose article-body">
      {sections.map((sec) => (
        <section key={sec.heading} aria-labelledby={slug(sec.heading)}>
          <h2 id={slug(sec.heading)}>{sec.heading}</h2>
          {sec.blocks.map((b, i) => {
            switch (b.type) {
              case "p":
                return <p key={i}>{b.text}</p>;
              case "list":
                return b.ordered ? (
                  <ol key={i}>
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ol>
                ) : (
                  <ul key={i}>
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              case "table":
                return (
                  <div key={i} className="table-wrap" role="region" aria-label={b.caption ?? sec.heading} tabIndex={0}>
                    <table className="data-table">
                      {b.caption ? <caption>{b.caption}</caption> : null}
                      <thead>
                        <tr>
                          {b.head.map((h, j) => (
                            <th key={j} scope="col">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {b.rows.map((r, j) => (
                          <tr key={j}>
                            {r.map((c, k) =>
                              k === 0 ? (
                                <th key={k} scope="row">
                                  {c}
                                </th>
                              ) : (
                                <td key={k}>{c}</td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              case "figure":
                return <Figure key={i} slot={b.slot} variant={b.variant} sizes="(min-width: 48em) 44rem, 100vw" figureClassName="article-figure" />;
              case "callout":
                return (
                  <aside key={i} className="callout">
                    <p>{b.text}</p>
                    {b.href ? (
                      <Link prefetch={false} href={b.href} className="text-link">
                        <span>{b.label ?? "Read more"}</span>
                        <Icon name="arrow" size={16} className="text-link__icon" />
                      </Link>
                    ) : null}
                  </aside>
                );
            }
          })}
        </section>
      ))}
    </div>
  );
}
