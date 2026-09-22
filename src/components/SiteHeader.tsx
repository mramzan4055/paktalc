"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { isNavActive, mainNav, rfqHref, type NavItem } from "@content/navigation";
import { company } from "@content/company";
import { Icon } from "./Icon";

function Logo({ className = "logo" }: { className?: string }) {
  const base = "/images/brand/paktalc-logo-horizontal-01";
  return (
    <img
      src={`${base}-360w.webp`}
      srcSet={`${base}-240w.webp 240w, ${base}-360w.webp 360w, ${base}-480w.webp 480w`}
      sizes="(min-width: 75em) 190px, 160px"
      width={4213}
      height={905}
      alt="PakTalc — Talc Extraction, Processing, Export & Import"
      className={className}
      decoding="async"
    />
  );
}

const CLOSE_DELAY = 160;

/**
 * Header, desktop dropdowns and the mobile drawer.
 * NOTE: the drawer + overlay are rendered as SIBLINGS of <header>. The header uses backdrop-filter, which
 * creates a containing block for position:fixed descendants — a drawer inside it collapses to the header's box.
 */
export function SiteHeader() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change (state-during-render pattern).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(null);
  }

  const closeDrawer = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  // Drawer: scroll lock, inert page, focus trap, Esc.
  useEffect(() => {
    const root = document.documentElement;
    const main = document.getElementById("main");
    const footer = document.querySelector<HTMLElement>("footer.site-footer");
    if (!open) {
      root.classList.remove("nav-open");
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      return;
    }
    root.classList.add("nav-open");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    const drawer = drawerRef.current;
    const focusables = () => Array.from(drawer?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []).filter((el) => el.offsetParent !== null);
    requestAnimationFrame(() => focusables()[0]?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
      }
      if (e.key === "Tab") {
        const els = focusables();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    // Close if the viewport grows into desktop layout.
    const mq = window.matchMedia("(min-width: 75em)");
    const onMq = () => mq.matches && closeDrawer(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, closeDrawer]);

  // Desktop dropdowns: Esc + outside click.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.getElementById(`trigger-${menu}`)?.focus();
        setMenu(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".nav__item")) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menu]);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openMenu = (id: string) => {
    cancelClose();
    setMenu(id);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setMenu(null), CLOSE_DELAY);
  };

  const slug = (item: NavItem) => item.label.toLowerCase().replace(/[^a-z]+/g, "-");

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container container--wide site-header__bar">
          <Link prefetch={false} href="/" className="site-header__brand" aria-label="PakTalc — home">
            <Logo />
          </Link>

          <nav className="nav" aria-label="Main">
            <ul className="nav__list">
              {mainNav.map((item) => {
                const id = slug(item);
                const active = isNavActive(pathname, item);
                if (!item.children) {
                  return (
                    <li key={id} className="nav__item">
                      <Link
                        prefetch={false}
                        href={item.href}
                        className={`nav__link${active ? " is-active" : ""}`}
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const isOpen = menu === id;
                return (
                  <li
                    key={id}
                    className="nav__item"
                    onPointerEnter={(e) => e.pointerType === "mouse" && openMenu(id)}
                    onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
                  >
                    <button
                      id={`trigger-${id}`}
                      type="button"
                      className={`nav__link${active ? " is-active" : ""}`}
                      aria-expanded={isOpen}
                      aria-controls={`menu-${id}`}
                      onClick={() => (isOpen ? setMenu(null) : openMenu(id))}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          openMenu(id);
                          requestAnimationFrame(() => document.querySelector<HTMLElement>(`#menu-${id} a`)?.focus());
                        }
                      }}
                    >
                      {item.label}
                      <Icon name="chevron" size={14} />
                    </button>
                    <div id={`menu-${id}`} className="nav__menu" data-open={isOpen} onFocus={cancelClose}>
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              prefetch={false}
                              href={c.href}
                              className="nav__menu-link"
                              aria-current={pathname === c.href ? "page" : undefined}
                              onClick={() => setMenu(null)}
                            >
                              <span className="nav__menu-title">{c.label}</span>
                              {c.description ? <span className="nav__menu-desc">{c.description}</span> : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="site-header__actions">
            <Link prefetch={false} href={rfqHref} className="btn btn--primary btn--sm site-header__cta">
              <span>Request a quote</span>
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="nav-toggle__bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay + drawer live outside <header> (see note above). */}
      <div className="drawer-overlay" data-open={open} onClick={() => closeDrawer()} aria-hidden="true" />
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className="drawer"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
      >
        <div className="drawer__top">
          <Link prefetch={false} href="/" aria-label="PakTalc — home" onClick={() => closeDrawer(false)}>
            <Logo className="drawer__logo" />
          </Link>
          <button type="button" className="drawer__close" aria-label="Close menu" onClick={() => closeDrawer()}>
            <Icon name="close" size={24} />
          </button>
        </div>

        <nav aria-label="Mobile" className="drawer__nav">
          <ul className="drawer__list">
            {mainNav.map((item) => {
              const id = slug(item);
              const active = isNavActive(pathname, item);
              if (!item.children) {
                return (
                  <li key={id}>
                    <Link
                      prefetch={false}
                      href={item.href}
                      className={`drawer__link${active ? " is-active" : ""}`}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => closeDrawer(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const isExp = expanded === id || (expanded === null && active);
              return (
                <li key={id}>
                  <button
                    type="button"
                    className={`drawer__link drawer__link--toggle${active ? " is-active" : ""}`}
                    aria-expanded={isExp}
                    aria-controls={`drawer-${id}`}
                    onClick={() => setExpanded(isExp ? "" : id)}
                  >
                    <span>{item.label}</span>
                    <Icon name="chevron" size={20} className="drawer__chev" />
                  </button>
                  <ul id={`drawer-${id}`} className="drawer__sub" data-open={isExp}>
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          prefetch={false}
                          href={c.href}
                          className="drawer__sublink"
                          aria-current={pathname === c.href ? "page" : undefined}
                          onClick={() => closeDrawer(false)}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="drawer__foot">
          <Link prefetch={false} href={rfqHref} className="btn btn--primary btn--block" onClick={() => closeDrawer(false)}>
            <span>Request a quote</span>
            <Icon name="arrow" size={18} className="btn__icon" />
          </Link>
          <a href={`mailto:${company.email}`} className="drawer__contact">
            <Icon name="mail" size={18} /> {company.email}
          </a>
          <a href={company.phone.href} className="drawer__contact">
            <Icon name="phone" size={18} /> {company.phone.display}
          </a>
        </div>
      </div>
    </>
  );
}
