import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — TradeAI" },
      { name: "description", content: "TradeAI ke terms of service — platform use karne ke rules." },
      { property: "og:title", content: "Terms & Conditions — TradeAI" },
      { property: "og:description", content: "Rules and terms of using the TradeAI platform." },
    ],
  }),
  component: Terms,
});

const SECTIONS = [
  { h: "1. Acceptance of Terms", p: "TradeAI use karke aap in terms se agree karte ho. Agar accept nahi toh service use mat karo." },
  { h: "2. Service Description", p: "TradeAI ek AI-powered educational tool hai jo trade screenshots analyze karta hai. Yeh investment advice nahi hai." },
  { h: "3. User Accounts", p: "Account information sahi rakhna aapki responsibility hai. Account sharing allowed nahi hai." },
  { h: "4. Payment & Credits", p: "Credits non-refundable hain ek baar use ho jaaye toh. Technical failure ki case mein credit auto-restore hota hai." },
  { h: "5. Acceptable Use", p: "Platform ka misuse, scraping, reverse engineering ya copyrighted content upload karna prohibited hai." },
  { h: "6. Intellectual Property", p: "TradeAI ka brand, code, aur AI models humare hain. Aapke uploaded screenshots aapke hi rehte hain." },
  { h: "7. Limitation of Liability", p: "Trading losses ke liye TradeAI responsible nahi hai. Service 'as-is' provide ki jaati hai." },
  { h: "8. Termination", p: "Hum kisi bhi account ko terms violation par suspend kar sakte hain." },
  { h: "9. Governing Law", p: "Yeh terms Indian law ke under hain. Jurisdiction: Bengaluru, Karnataka." },
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
