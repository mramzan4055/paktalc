import { company, sites } from "@content/company";
import { seo } from "@content/seo";
import { JsonLd } from "@/components/ui";
import { PageHeader } from "@/components/sections";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/contact/");

const path = "/contact/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path },
];

export default function ContactPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, type: "ContactPage", hasBreadcrumb: true }), breadcrumb(path, crumbs))} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Contact"
        title="Get in Touch"
        intro={
          <p>
            Have a question about a specific mineral or specimen? Send us a message and our team will respond.
          </p>
        }
      />

      <section className="section" aria-label="Contact form and details">
        <div className="container container--wide contact-layout">
          <div className="contact-layout__form" id="contact">
            <h2 className="sr-only">Contact form</h2>
            <ContactForm />
            <noscript>
              <p className="note">
                This form needs JavaScript. You can also email us at{" "}
                <a href={`mailto:${company.email}`}>{company.email}</a>.
              </p>
            </noscript>
          </div>

          <aside className="contact-layout__aside" aria-labelledby="contact-direct">
            <div className="contact-card">
              <h2 id="contact-direct" className="contact-card__title">
                Direct contact
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

            <div className="contact-card contact-card--muted">
              <h2 className="contact-card__title">Looking to buy talc?</h2>
              <p className="small">
                For product specifications, pricing and export enquiries, please use our{" "}
                <a href="/contacts/#rfq" className="text-link">Request a quote</a> form — it gives us
                the information we need to respond with a proposal.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
