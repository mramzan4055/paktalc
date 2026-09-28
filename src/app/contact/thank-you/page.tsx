import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { graph, webPage } from "@/lib/schema";

export const metadata = pageMetadata("/contact/thank-you/");

const path = "/contact/thank-you/";

export default function ContactThankYouPage() {
  return (
    <>
      <JsonLd data={graph(webPage({ path, name: "Message received", description: "Your message has been sent.", type: "WebPage" }))} />
      <section className="section page-header" aria-labelledby="ty-title">
        <div className="container container--wide">
          <div className="page-header__text" style={{ textAlign: "center", padding: "var(--s-10) 0" }}>
            <p className="eyebrow">Thank you</p>
            <h1 id="ty-title">Message received</h1>
            <p className="lead" style={{ maxWidth: "36ch", margin: "0 auto" }}>
              Your message has been sent. Our team will reply to the email address you provided.
            </p>
            <div className="page-hero__actions" style={{ marginTop: "var(--s-6)" }}>
              <Link href="/" className="btn btn--primary">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
