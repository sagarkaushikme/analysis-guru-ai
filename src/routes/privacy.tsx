import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — TradeAI" },
      { name: "description", content: "TradeAI privacy policy — how we handle your data." },
      { property: "og:title", content: "Privacy Policy — TradeAI" },
      { property: "og:description", content: "How TradeAI collects, uses and protects your data." },
    ],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    h: "1. Information We Collect",
    p: "We collect your name, email, payment info and trade screenshots when you upload them. Screenshots are processed only for analysis.",
  },
  {
    h: "2. How We Use Your Data",
    p: "Your data is used solely to deliver the service, process payments and improve the product. We do not sell your data.",
  },
  {
    h: "3. Screenshot Storage",
    p: "Uploaded screenshots are automatically deleted after 30 days. You can also delete them manually at any time from your dashboard.",
  },
  {
    h: "4. Third-Party Services",
    p: "We use Razorpay (payments), cloud hosting providers, and AI processing APIs. All are GDPR / Indian DPDP compliant.",
  },
  {
    h: "5. Cookies",
    p: "Essential cookies are used for session management. Analytics cookies are anonymous.",
  },
  {
    h: "6. Your Rights",
    p: "You can export, delete or correct your data at any time. Email support@tradeai.in.",
  },
  { h: "7. Contact", p: "For privacy questions: privacy@tradeai.in" },
];

function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: May 13, 2026</p>
        <div className="mt-8 space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
          {SECTIONS.map((s) => (
            <div key={s.h}>
              <h2 className="text-lg font-semibold text-foreground">{s.h}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
