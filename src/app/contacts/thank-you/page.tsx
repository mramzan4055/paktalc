import { pageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui";

export const metadata = pageMetadata("/contacts/thank-you/");

/** Landing page for the no-JS form path (rfq.php redirects here on success). Not indexed, not in the sitemap. */
export default function ThankYouPage() {
  return (
    <section className="section">
      <div className="container container--text stack" style={{ "--stack": "var(--s-5)" } as React.CSSProperties}>
        <p className="eyebrow">Enquiry received</p>
        <h1>Thank you</h1>
        <p className="lead">Your enquiry has been sent to PakTalc. Our sales team will reply to the email address you gave.</p>
        <div className="btn-row">
          <Button href="/talc/">Back to talc products</Button>
          <Button href="/" variant="secondary" icon={null}>
            Home
          </Button>
        </div>
      </div>
    </section>
  );
}
