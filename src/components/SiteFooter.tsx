import Link from "next/link";
import { company } from "@content/company";
import { footerNav, rfqHref } from "@content/navigation";
import { Icon } from "./Icon";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer theme-dark">
      <div className="container container--wide">
        <div className="site-footer__top">
          <div className="site-footer__brand stack">
            <Link prefetch={false} href="/" aria-label="PakTalc home" className="site-footer__logo">
              <img
                src="/images/brand/paktalc-logo-horizontal-01-light-360w.webp"
                srcSet="/images/brand/paktalc-logo-horizontal-01-light-240w.webp 240w, /images/brand/paktalc-logo-horizontal-01-light-360w.webp 360w, /images/brand/paktalc-logo-horizontal-01-light-480w.webp 480w"
                sizes="220px"
                width={4213}
                height={905}
                alt="PakTalc"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="muted">
              PakTalc is {company.relationship} We supply hand-sorted talc lumps and ground talc powder, processed in Peshawar and packed in
              Karachi for export.
            </p>
            <Link prefetch={false} href={rfqHref} className="btn btn--primary btn--sm">
              <span>Request a quote</span>
              <Icon name="arrow" size={16} className="btn__icon" />
            </Link>
          </div>

          {footerNav.map((col) => (
            <nav key={col.title} className="site-footer__col" aria-label={`${col.title} links`}>
              <h2 className="site-footer__title">{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link prefetch={false} href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="site-footer__col">
            <h2 className="site-footer__title">Contact</h2>
            <ul className="site-footer__contact">
              <li>
                <Icon name="mail" size={18} />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <Icon name="phone" size={18} />
                <a href={company.phone.href}>{company.phone.display}</a>
              </li>
              <li>
                <Icon name="pin" size={18} />
                <span>
                  Head office: {company.headOffice.locality}, {company.headOffice.country}
                  <br />
                  Plants: Peshawar · Warehouse: Karachi
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {year} PakTalc · {company.legalParent}
          </p>
          <ul>
            <li>
              <a href={company.parent.url} rel="noopener">
                SKZ Mining Company
              </a>
            </li>
            <li>
              <Link prefetch={false} href="/privacy/">Privacy</Link>
            </li>
            <li>
              <a href="/sitemap.xml">Sitemap</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
