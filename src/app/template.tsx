/**
 * A template remounts on every navigation, so this fade runs once per page
 * without turning the page into a client component (JSON-LD scripts stay intact).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-swap">{children}</div>;
}
