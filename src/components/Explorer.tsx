"use client";

import { useEffect, useRef } from "react";

/**
 * Enhances a server-rendered process list: hovering, focusing or clicking a step's button
 * marks that step active (desktop shows its image in the sticky media column).
 * Without JS the first step stays active and every step's text is fully visible.
 */
export function Explorer({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    const activate = (el: HTMLElement) => {
      steps.forEach((s) => {
        const on = s === el;
        s.toggleAttribute("data-active", on);
        s.querySelector("[data-step-trigger]")?.setAttribute("aria-pressed", String(on));
      });
    };
    const cleanups = steps.map((step) => {
      const trigger = step.querySelector<HTMLElement>("[data-step-trigger]");
      const handler = () => activate(step);
      trigger?.addEventListener("click", handler);
      trigger?.addEventListener("focus", handler);
      step.addEventListener("mouseenter", handler);
      return () => {
        trigger?.removeEventListener("click", handler);
        trigger?.removeEventListener("focus", handler);
        step.removeEventListener("mouseenter", handler);
      };
    });
    root.classList.add("is-enhanced");
    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
