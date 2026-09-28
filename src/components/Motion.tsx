"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/**
 * Keeps page changes fast:
 *  - the new page is shown immediately (reveal animations no longer hide it until JavaScript measures it)
 *  - a short fade runs only after the first click, not on the opening load
 *
 * Visible links are prefetched by next/link, one at a time. Loading every menu
 * route here makes the dev server compile them all at once, so the page you
 * open waits behind that queue.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      document.documentElement.dataset.nav = "1";
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.scrollBehavior = "auto";
    if (!window.location.hash) window.scrollTo(0, 0);
    const restoreScroll = window.setTimeout(() => {
      root.style.scrollBehavior = "";
    }, 80);

    const progressEls = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of progressEls) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
        el.style.setProperty("--progress", p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    if (progressEls.length) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
    return () => {
      window.clearTimeout(restoreScroll);
      root.style.scrollBehavior = "";
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
