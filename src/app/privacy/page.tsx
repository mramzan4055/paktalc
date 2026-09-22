import { company } from "@content/company";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui";
import { PageHeader } from "@/components/sections";
import { breadcrumb, graph, webPage } from "@/lib/schema";
import { seo } from "@content/seo";

export const metadata = pageMetadata("/privacy/");

const path = "/privacy/";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy policy", path },
];
const updated = "2026-09-22";

/** Conservative draft — must be reviewed by the company before launch (CONTENT-VERIFICATION E2). */
export default function PrivacyPage() {
  const s = seo[path];
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: s.title, description: s.description, hasBreadcrumb: true }), breadcrumb(path, crumbs))} />
      <PageHeader crumbs={crumbs} title="Privacy policy" intro={<p>How PakTalc handles information you send through this website.</p>} />
      <section className="section">
        <div className="container container--text prose">
          <p className="small muted">
            Last updated <time dateTime={updated}>22 September 2026</time>
          </p>
          <h2>Who we are</h2>
          <p>
            This website is operated by PakTalc, {company.relationship} You can contact us at <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
          <h2>What we collect</h2>
          <p>
            We collect only what you choose to send us through the enquiry form or by email: your name, company, email address, country, optional phone number, and the
            details of your requirement. We also keep basic technical data the web server records for security, such as IP address and time of request.
          </p>
          <h2>Why we use it</h2>
          <ul>
            <li>To reply to your enquiry and prepare a quotation.</li>
            <li>To keep a record of business correspondence.</li>
            <li>To protect the website from spam and abuse. For example, we limit repeated submissions from the same address.</li>
          </ul>
          <p>We do not sell your information, and we do not use it for unrelated marketing without your permission.</p>
          <h2>Cookies and analytics</h2>
          <p>
            This website does not set advertising or tracking cookies. If we add analytics in future, this policy will be updated to say which service is used and how you
            can opt out.
          </p>
          <h2>Spam protection</h2>
          <p>
            If spam protection by a third party (such as Cloudflare Turnstile) is enabled on the form, that provider processes technical information about your browser to
            tell people from automated submissions.
          </p>
          <h2>How long we keep it</h2>
          <p>Enquiries are kept for as long as needed to handle your request and any resulting business relationship, and then deleted.</p>
          <h2>Your choices</h2>
          <p>
            You can ask us to show, correct or delete the information you sent by emailing <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
