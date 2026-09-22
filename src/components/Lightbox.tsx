"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

type Item = { src: string; alt: string; caption: string; width: number; height: number };

/**
 * Keyboard-accessible lightbox for a server-rendered gallery.
 * Each `a[data-lightbox-item]` inside the wrapper links to the full image, so the gallery works without JS.
 */
export function Lightbox({ children, className }: { children: React.ReactNode; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-lightbox-item]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      // Only images currently visible (respects the gallery category filter).
      const links = Array.from(wrap.querySelectorAll<HTMLAnchorElement>("a[data-lightbox-item]")).filter((l) => l.offsetParent !== null);
      openerRef.current = a;
      setItems(
        links.map((l) => ({
          src: l.getAttribute("href") ?? "",
          alt: l.dataset.alt ?? "",
          caption: l.dataset.caption ?? "",
          width: Number(l.dataset.w) || 1200,
          height: Number(l.dataset.h) || 900,
        })),
      );
      setIndex(links.indexOf(a));
    };
    wrap.addEventListener("click", onClick);
    return () => wrap.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  const onClose = () => {
    setIndex(null);
    openerRef.current?.focus();
  };

  const item = index !== null ? items[index] : null;

  return (
    <div ref={wrapRef} className={className}>
      {children}
      <dialog ref={dialogRef} className="lightbox" aria-label="Image viewer" onClose={onClose} onKeyDown={onKeyDown} onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}>
        {item ? (
          <figure className="lightbox__figure">
            <img src={item.src} alt={item.alt} width={item.width} height={item.height} className="lightbox__img" />
            <figcaption className="lightbox__caption">
              <span>{item.caption || item.alt}</span>
              <span className="lightbox__count">
                {index! + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        ) : null}
        <button type="button" className="lightbox__btn lightbox__close" onClick={() => dialogRef.current?.close()} aria-label="Close image viewer" autoFocus>
          <Icon name="close" size={22} />
        </button>
        <button type="button" className="lightbox__btn lightbox__prev" onClick={() => step(-1)} aria-label="Previous image">
          <Icon name="prev" size={22} />
        </button>
        <button type="button" className="lightbox__btn lightbox__next" onClick={() => step(1)} aria-label="Next image">
          <Icon name="next" size={22} />
        </button>
      </dialog>
    </div>
  );
}
