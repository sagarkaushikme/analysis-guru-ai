import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — TradeAI" },
      { name: "description", content: "TradeAI privacy policy — kaise hum aapka data handle karte hain." },
      { property: "og:title", content: "Privacy Policy — TradeAI" },
      { property: "og:description", content: "How TradeAI collects, uses and protects your data." },
    ],
  }),
  component: Privacy,
});

const SECTIONS = [
  { h: "1. Information We Collect", p: "Hum aapka name, email, payment info aur trade screenshots collect karte hain jab aap upload karte ho. Screenshots sirf analysis ke liye process hote hain." },
  { h: "2. How We Use Your Data", p: "Data ka use sirf service deliver karne, payment process karne aur product improve karne ke liye hota hai. Hum aapka data bechte nahi." },
  { h: "3. Screenshot Storage", p: "Uploaded screenshots 30 din ke baad automatically delete ho jaate hain. Aap kabhi bhi manually delete kar sakte ho apne dashboard se." },
  { h: "4. Third-Party Services", p: "Hum Razorpay (payments), Cloud hosting providers, aur AI processing APIs use karte hain. Sab GDPR/Indian DPDP compliant hain." },
  { h: "5. Cookies", p: "Essential cookies session management ke liye use hote hain. Analytics cookies anonymous hain." },
  { h: "6. Your Rights", p: "Aap kabhi bhi apna data export, delete ya correct kar sakte ho. Email karo support@tradeai.in." },
  { h: "7. Contact", p: "Privacy questions ke liye: privacy@tradeai.in" },
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
