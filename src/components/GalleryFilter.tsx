"use client";

import { useEffect, useState } from "react";

/**
 * Category filter for the gallery. All images stay in the HTML; filtering only toggles a data attribute
 * on the gallery root (CSS hides other sections). Without JS every category is shown.
 */
export function GalleryFilter({ targetId, categories }: { targetId: string; categories: { id: string; title: string; count: number }[] }) {
  const [active, setActive] = useState("all");

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (el) el.dataset.filter = active;
  }, [active, targetId]);

  const total = categories.reduce((n, c) => n + c.count, 0);
  const all = [{ id: "all", title: "All", count: total }, ...categories];

  return (
    <div className="filter-nav" role="toolbar" aria-label="Filter photographs by category">
      {all.map((c) => (
        <button key={c.id} type="button" className="filter-nav__btn" aria-pressed={active === c.id} onClick={() => setActive(c.id)}>
          {c.title} <span className="filter-nav__count">{c.count}</span>
        </button>
      ))}
    </div>
  );
}
