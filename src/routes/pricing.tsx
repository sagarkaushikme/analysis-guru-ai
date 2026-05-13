import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingCards } from "@/components/PricingCards";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — TradeAI" },
      { name: "description", content: "TradeAI ke pricing plans — ₹9 se shuru. No subscription." },
      { property: "og:title", content: "Pricing — TradeAI" },
      { property: "og:description", content: "Sasta aur honest pricing. ₹9 mein single analysis." },
    ],
  }),
  component: Pricing,
});

const FAQ = [
  { q: "Kya yeh SEBI registered hai?", a: "Nahi, yeh educational tool hai. Hum trading advice nahi dete — sirf AI-powered analysis aur insights provide karte hain. Apne trades ka decision khud lo." },
  { q: "Konsi apps ke screenshots kaam karte hain?", a: "Zerodha Kite, Upstox, Angel One, Groww, TradingView — saare popular apps support hai. Koi bhi clear chart screenshot chalega." },
  { q: "Refund policy?", a: "Analysis successfully ho gayi toh refund nahi milta — credits use ho gaye. Lekin agar technical issue ki wajah se analysis fail ho jaye toh credit wapas mil jaata hai." },
  { q: "Credits expire hote hain?", a: "Nahi! Ek baar buy kiye, kabhi bhi use karo. No expiry." },
  { q: "Payment kaise hota hai?", a: "Razorpay ke through — UPI, cards, net banking sab accept hai. Secure aur instant." },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">Sasta. Honest. <span className="bg-gradient-primary bg-clip-text text-transparent">No subscription.</span></h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Jitna chaiye utna lo. Credits expire nahi hote.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <PricingCards />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold">Frequently Asked</h2>
        <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-border bg-card px-2">
          {FAQ.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="border-border">
              <AccordionTrigger className="px-4 text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <Footer />
    </div>
  );
}
