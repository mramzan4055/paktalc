import type { Faq as FaqItem } from "@content/faq";

/**
 * Buyer FAQ. Uses <details>/<summary> so every answer is in the HTML and readable without JS
 * (search engines and AI answer engines see the full text; the first one is open).
 */
export function Faq({ items, id = "faq" }: { items: FaqItem[]; id?: string }) {
  return (
    <div className="faq" data-stagger>
      {items.map((f, i) => (
        <details key={f.q} className="faq__item" name={id} open={i === 0}>
          <summary className="faq__q">
            <span>{f.q}</span>
            <span className="faq__icon" aria-hidden="true" />
          </summary>
          <div className="faq__a">
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
