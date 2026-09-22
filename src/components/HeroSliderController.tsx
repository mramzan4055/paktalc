"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "./Icon";

const INTERVAL = 7000;
/** Reduced motion: still advances (content rotation, not animation) but slower, with instant swaps and no drift. */
const INTERVAL_REDUCED = 9000;
const SWIPE_PX = 45;

const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One source of truth (`index`) drives image, heading, text and CTAs together — they are the same slide element.
 * Autoplay pauses on hover, keyboard focus, hidden tab or the pause button; manual navigation restarts the timer.
 * With prefers-reduced-motion the slides still rotate (slower, no zoom/drift/rise — CSS disables those) and can be paused.
 * Slides 2–3 are not fetched until the page has loaded (protects LCP).
 */
export function HeroSliderController({ labels, children }: { labels: string[]; children: React.ReactNode }) {
  const n = labels.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const [ready, setReady] = useState(false);
  const [cycle, setCycle] = useState(0); // bumps on manual navigation → restarts timer + progress bar
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, () => false);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const playing = !userPaused;
  const running = playing && !hover && !focusWithin && !docHidden && ready;

  // Reflect the active slide in the DOM (server-rendered slides).
  useEffect(() => {
    const slides = rootRef.current?.querySelectorAll<HTMLElement>("[data-slide]") ?? [];
    slides.forEach((el, i) => {
      const on = i === index;
      el.toggleAttribute("data-active", on);
      if (on) {
        el.removeAttribute("aria-hidden");
        el.removeAttribute("inert");
      } else {
        el.setAttribute("aria-hidden", "true");
        el.setAttribute("inert", "");
      }
    });
  }, [index]);

  // Defer loading of later slides until after the load event (+ a short idle).
  useEffect(() => {
    let t: number | undefined;
    const go = () => {
      t = window.setTimeout(() => setReady(true), 600);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    const onVis = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("load", go);
      document.removeEventListener("visibilitychange", onVis);
      if (t) window.clearTimeout(t);
    };
  }, []);

  // Single autoplay timer.
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % n), reduced ? INTERVAL_REDUCED : INTERVAL);
    return () => window.clearTimeout(t);
  }, [running, index, cycle, n, reduced]);

  const go = useCallback(
    (i: number) => {
      setIndex(((i % n) + n) % n);
      setCycle((c) => c + 1);
      setReady(true);
    },
    [n],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.2) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      ref={rootRef}
      className={`hero-slider__root${ready ? " is-ready" : ""}${running ? " is-running" : ""}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (drag.current = null)}
      onFocus={(e) => (e.target as HTMLElement).matches(":focus-visible") && setFocusWithin(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setFocusWithin(false)}
      onKeyDown={onKeyDown}
    >
      <div className="hero-slider__slides" aria-live={running ? "off" : "polite"}>
        {children}
      </div>

      <div className="hero-slider__controls">
        <div className="container container--wide hero-slider__bar">
          <div className="hero-slider__dots" role="group" aria-label="Choose slide">
            {labels.map((label, i) => (
              <button
                key={label}
                type="button"
                className="hero-slider__dot"
                aria-label={`Slide ${i + 1}: ${label}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
              >
                <span className="hero-slider__dot-label">{label}</span>
                <span className="hero-slider__dot-track" aria-hidden="true">
                  <span key={`${index}-${cycle}`} className="hero-slider__dot-fill" />
                </span>
              </button>
            ))}
          </div>
          <div className="hero-slider__buttons">
            <button type="button" className="hero-slider__btn" aria-label="Previous slide" onClick={() => go(index - 1)}>
              <Icon name="prev" size={20} />
            </button>
            {(
              <button
                type="button"
                className="hero-slider__btn"
                aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                aria-pressed={userPaused}
                onClick={() => setUserPaused((p) => !p)}
              >
                <Icon name={userPaused ? "play" : "pause"} size={18} />
              </button>
            )}
            <button type="button" className="hero-slider__btn" aria-label="Next slide" onClick={() => go(index + 1)}>
              <Icon name="next" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
