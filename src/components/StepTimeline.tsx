import type { Step } from "@content/operations";
import { Figure } from "./Picture";

/**
 * Vertical, server-rendered process timeline. All text is in the HTML.
 * The connecting line "draws" with scroll via --progress (set by <Motion/>), transform-only.
 */
export function StepTimeline({ steps, headingLevel = "h2" }: { steps: Step[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ol className="timeline" data-progress>
      {steps.map((step) => {
        const [first, ...rest] = step.images;
        return (
          <li key={step.id} id={step.id} className="timeline__step">
            <div className="timeline__head" data-reveal>
              <H>{step.title}</H>
              <p className="timeline__summary">{step.summary}</p>
            </div>
            <div className="timeline__body">
              <div className="prose" data-reveal>
                {step.body.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <div className="stack" style={{ "--stack": "var(--s-3)" } as React.CSSProperties}>
                {first ? (
                  <div data-reveal="mask">
                    <Figure slot={first} sizes="(min-width: 56em) 50vw, 100vw" ratio="16 / 10" />
                  </div>
                ) : null}
                {rest.length ? (
                  <div className="thumb-row" data-stagger>
                    {rest.map((slot) => (
                      <Figure key={slot} slot={slot} sizes="(min-width: 56em) 16vw, 45vw" ratio="1 / 1" caption={false} />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
