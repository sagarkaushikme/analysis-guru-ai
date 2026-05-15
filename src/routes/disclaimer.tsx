import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — TradeAI" },
      {
        name: "description",
        content: "Important disclaimer regarding TradeAI analysis and trading risks.",
      },
      { property: "og:title", content: "Disclaimer — TradeAI" },
      {
        property: "og:description",
        content: "Risk disclaimer and educational notice for TradeAI users.",
      },
    ],
  }),
  component: Disclaimer,
});

const SECTIONS = [
  {
    h: "Educational Purpose Only",
    p: "TradeAI is purely an educational and informational tool. It is not a SEBI registered investment advisor, and no output should be considered investment advice.",
  },
  {
    h: "No Guarantee of Accuracy",
    p: "AI-generated analysis is probabilistic. Patterns, predictions and scores are not 100% accurate. Past patterns do not guarantee future results.",
  },
  {
    h: "Trading Involves Risk",
    p: "Stock market, F&O and derivatives trading carries significant financial risk. You can lose your entire capital. Only invest what you can afford to lose.",
  },
  {
    h: "Consult a Professional",
    p: "Before making any trading or investment decision, consult a SEBI registered financial advisor.",
  },
  {
    h: "No Liability",
    p: "TradeAI and its team are not responsible for any trading loss, missed opportunity or financial damage that arises from using the platform.",
  },
  {
    h: "User Responsibility",
    p: "Final trading decisions are entirely your responsibility. AI is just an assist tool, not a decision-maker.",
  },
];

function Disclaimer() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h1 className="text-4xl font-bold">Disclaimer</h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: May 13, 2026</p>

        <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5 text-sm text-primary">
          ⚠️ Important: TradeAI is NOT a SEBI registered investment advisor. All content is for
          educational purposes only.
        </div>

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
