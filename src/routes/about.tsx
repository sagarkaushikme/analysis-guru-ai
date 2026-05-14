import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Brain, Target, Users, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TradeAI" },
      { name: "description", content: "Learn about TradeAI — an AI-powered trade analysis platform built for Indian retail traders." },
      { property: "og:title", content: "About TradeAI" },
      { property: "og:description", content: "Why we're building TradeAI — honest AI analysis for Indian traders." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Brain, title: "AI-First", text: "Every analysis is powered by advanced LLMs and pattern recognition — no guesswork." },
  { icon: Target, title: "Honest Feedback", text: "We only say what the data shows. No hype, no fake gurus." },
  { icon: Users, title: "Built for India", text: "Clear UI, Indian brokers, NSE/BSE patterns — everything tuned for the local trader." },
  { icon: Zap, title: "Fast & Affordable", text: "Full analysis in 30 seconds for ₹9. No subscriptions, just fair pricing." },
];

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">TradeAI</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            An AI-powered analysis platform built for India's 15 million retail traders. Our mission is to give every trader institutional-grade insights — without expensive subscriptions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold">Our Story</h2>
          <p className="mt-4 text-muted-foreground">
            TradeAI started with a simple problem — after entering a trade, retail traders rarely understand what went wrong. Brokers give charts, finfluencers give tips, but <span className="text-foreground">honest, personalized post-trade analysis</span> isn't available anywhere.
          </p>
          <p className="mt-4 text-muted-foreground">
            We trained AI to understand a trader's actual screenshots — pattern, risk-reward, emotion, mistakes — all in one dashboard. Goal: learn from every trade, get better every month.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
