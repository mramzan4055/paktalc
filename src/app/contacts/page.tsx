import Link from "next/link";
import { company, sites } from "@content/company";
import { seo } from "@content/seo";
import { JsonLd } from "@/components/ui";
import { PageHeader } from "@/components/sections";
import { RfqForm } from "@/components/RfqForm";
import { Icon } from "@/components/Icon";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/contacts/");

const path = "/contacts/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact & quote", path },
];

export default function ContactsPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, type: "ContactPage", hasBreadcrumb: true }), breadcrumb(path, crumbs))} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Contact"
        title="Request a quotation"
        intro={
          <p>
            Tell us the talc you need: lumps or powder, colour grade or mesh, quantity and destination. The more detail you send, the more accurate our proposal can be.
          </p>
        }
      />

      <section className="section" aria-label="Enquiry form and contact details">
        <div className="container container--wide contact-layout">
          <div className="contact-layout__form" id="rfq">
            <h2 className="sr-only">Enquiry form</h2>
            <RfqForm />
            <noscript>
              <p className="note">
                This form needs JavaScript. You can also email your enquiry to <a href={`mailto:${company.email}`}>{company.email}</a>.
              </p>
            </noscript>
          </div>

          <aside className="contact-layout__aside" aria-labelledby="direct">
            <div className="contact-card">
              <h2 id="direct" className="contact-card__title">
                Contact directly
              </h2>
              <ul className="contact-card__list">
                <li>
                  <Icon name="mail" size={20} />
                  <div>
                    <span className="contact-card__label">Email</span>
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  </div>
                </li>
                <li>
                  <Icon name="phone" size={20} />
                  <div>
                    <span className="contact-card__label">Phone</span>
                    <a href={company.phone.href}>{company.phone.display}</a>
                  </div>
                </li>
                <li>
                  <Icon name="pin" size={20} />
                  <div>
                    <span className="contact-card__label">Head office</span>
                    <span>
                      {company.headOffice.locality}, {company.headOffice.country}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="contact-card">
              <h2 className="contact-card__title">Operations</h2>
              <ul className="contact-card__sites">
                {sites.map((st) => (
                  <li key={st.id}>
                    <strong>{st.name}</strong>
                    <span className="muted">{st.place}</span>
                  </li>
                ))}
              </ul>
              <Link prefetch={false} href="/facilities/" className="text-link">
                <span>About our facilities</span>
                <Icon name="arrow" size={16} className="text-link__icon" />
              </Link>
            </div>

            <div className="contact-card contact-card--muted">
              <h2 className="contact-card__title">What happens next</h2>
              <ol className="next-steps">
                <li>We review your specification and check it against available grades.</li>
                <li>We reply by email with questions or a proposal covering grade, packing and shipment.</li>
                <li>Samples and lot analysis are arranged where needed before an order.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
