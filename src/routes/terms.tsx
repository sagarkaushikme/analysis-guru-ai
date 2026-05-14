import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — TradeAI" },
      { name: "description", content: "TradeAI terms of service — rules for using the platform." },
      { property: "og:title", content: "Terms & Conditions — TradeAI" },
      { property: "og:description", content: "Rules and terms of using the TradeAI platform." },
    ],
  }),
  component: Terms,
});

const SECTIONS = [
  { h: "1. Acceptance of Terms", p: "By using TradeAI, you agree to these terms. If you do not accept them, do not use the service." },
  { h: "2. Service Description", p: "TradeAI is an AI-powered educational tool that analyzes trade screenshots. It is not investment advice." },
  { h: "3. User Accounts", p: "It is your responsibility to keep your account information accurate. Account sharing is not allowed." },
  { h: "4. Payment & Credits", p: "Credits are non-refundable once used. In the case of a technical failure, the credit is auto-restored." },
  { h: "5. Acceptable Use", p: "Misuse, scraping, reverse engineering or uploading copyrighted content is prohibited." },
  { h: "6. Intellectual Property", p: "TradeAI's brand, code and AI models are ours. Your uploaded screenshots remain yours." },
  { h: "7. Limitation of Liability", p: "TradeAI is not responsible for trading losses. The service is provided 'as-is'." },
  { h: "8. Termination", p: "We may suspend any account for violating the terms." },
  { h: "9. Governing Law", p: "These terms are governed by Indian law. Jurisdiction: Bengaluru, Karnataka." },
];

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-bold">Terms & Conditions</h1>
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
