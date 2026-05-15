import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingCards } from "@/components/PricingCards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — TradeAI" },
      { name: "description", content: "TradeAI pricing plans — starting at ₹9. No subscription." },
      { property: "og:title", content: "Pricing — TradeAI" },
      {
        property: "og:description",
        content: "Cheap and honest pricing. ₹9 for a single analysis.",
      },
    ],
  }),
  component: Pricing,
});

const FAQ = [
  {
    q: "Is this SEBI registered?",
    a: "No, this is an educational tool. We don't give trading advice — we only provide AI-powered analysis and insights. Make your own trading decisions.",
  },
  {
    q: "Which app screenshots work?",
    a: "Zerodha Kite, Upstox, Angel One, Groww, TradingView — all popular apps are supported. Any clear chart screenshot works.",
  },
  {
    q: "Refund policy?",
    a: "Once an analysis is successfully completed, no refund is given — credits have been used. However, if an analysis fails due to a technical issue, the credit is restored.",
  },
  { q: "Do credits expire?", a: "No! Once bought, use them anytime. No expiry." },
  {
    q: "How does payment work?",
    a: "Through Razorpay — UPI, cards, net banking are all accepted. Secure and instant.",
  },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Cheap. Honest.{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              No subscription.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Take what you need. Credits never expire.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <PricingCards />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold">Frequently Asked</h2>
        <Accordion
          type="single"
          collapsible
          className="mt-8 rounded-2xl border border-border bg-card px-2"
        >
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
