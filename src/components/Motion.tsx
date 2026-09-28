"use client";

import { footerNav, mainNav, rfqHref } from "@content/navigation";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/** Every page a visitor can open from the menu, loaded before they click. */
function routesToPrefetch(): string[] {
  const hrefs = new Set<string>([rfqHref.split("#")[0]]);
  for (const item of mainNav) {
    hrefs.add(item.href);
    for (const child of item.children ?? []) hrefs.add(child.href.split("#")[0]);
  }
  for (const col of footerNav) {
    for (const link of col.links) hrefs.add(link.href.split("#")[0]);
  }
  return [...hrefs];
}

/**
 * Keeps page changes fast:
 *  - menu routes are fetched as soon as the browser is idle, so a click does not wait on the network
 *  - the new page is shown immediately (reveal animations no longer hide it until JavaScript measures it)
 *  - a short fade runs only after the first click, not on the opening load
 */
export function Motion() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      document.documentElement.dataset.nav = "1";
    };
    document.addEventListener("click", onClick, true);

    const prefetch = () => {
      for (const href of routesToPrefetch()) {
        if (href !== window.location.pathname) router.prefetch(href);
      }
    };
    const idle = window.requestIdleCallback?.(prefetch);
    const timer = idle === undefined ? window.setTimeout(prefetch, 400) : 0;

    return () => {
      document.removeEventListener("click", onClick, true);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
    };
  }, [router]);

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
