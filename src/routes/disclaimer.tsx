import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — TradeAI" },
      { name: "description", content: "Important disclaimer regarding TradeAI analysis aur trading risks." },
      { property: "og:title", content: "Disclaimer — TradeAI" },
      { property: "og:description", content: "Risk disclaimer and educational notice for TradeAI users." },
    ],
  }),
  component: Disclaimer,
});

const SECTIONS = [
  { h: "Educational Purpose Only", p: "TradeAI sirf educational aur informational tool hai. Yeh SEBI registered investment advisor nahi hai aur koi bhi output investment advice nahi maani jaani chahiye." },
  { h: "No Guarantee of Accuracy", p: "AI-generated analysis probabilistic hai. Patterns, predictions aur scores 100% accurate nahi hote. Past patterns future results guarantee nahi karte." },
  { h: "Trading Involves Risk", p: "Stock market, F&O aur derivatives trading mein significant financial risk hai. Aap apna pura capital kho sakte ho. Sirf wahi paisa lagao jo afford kar sakte ho lose karna." },
  { h: "Consult a Professional", p: "Koi bhi trading ya investment decision lene se pehle SEBI registered financial advisor se consult karo." },
  { h: "No Liability", p: "TradeAI ya iski team kisi bhi trading loss, missed opportunity ya financial damage ke liye responsible nahi hai jo platform use karne se hua ho." },
  { h: "User Responsibility", p: "Final trading decisions purely aapki responsibility hain. AI sirf ek assist tool hai, decision-maker nahi." },
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
          ⚠️ Important: TradeAI is NOT a SEBI registered investment advisor. All content is for educational purposes only.
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
