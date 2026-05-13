import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Brain, Target, Users, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TradeAI" },
      { name: "description", content: "TradeAI ke baare mein jaano — AI-powered trade analysis platform built for Indian retail traders." },
      { property: "og:title", content: "About TradeAI" },
      { property: "og:description", content: "Hum kyu bana rahe hain TradeAI — Indian traders ke liye honest AI analysis." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Brain, title: "AI-First", text: "Har analysis advanced LLM aur pattern recognition ke through milta hai — guesswork nahi." },
  { icon: Target, title: "Honest Feedback", text: "Hum sirf wahi bolte hain jo data dikhata hai. No hype, no fake gurus." },
  { icon: Users, title: "Built for India", text: "Hinglish UI, Indian brokers, NSE/BSE patterns — sab kuch local trader ke liye tuned." },
  { icon: Zap, title: "Fast & Affordable", text: "₹9 mein full analysis, 30 second mein. Subscription nahi, fair pricing." },
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
            India ke 1.5 crore retail traders ke liye banayi gayi AI-powered analysis platform. Humara mission hai har trader ko institutional-grade insights dena — bina expensive subscriptions ke.
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
            TradeAI shuru hua ek simple problem se — retail traders ko entry ke baad pata hi nahi chalta ki kya galat hua. Brokers charts dete hain, finfluencers tips dete hain, lekin <span className="text-foreground">honest, personalized post-trade analysis</span> kahin nahi milta.
          </p>
          <p className="mt-4 text-muted-foreground">
            Humne AI ko train kiya har trader ki actual screenshots samajhne ke liye — pattern, risk-reward, emotion, mistakes — sab ek dashboard mein. Goal: har trade se seekho, har month better bano.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
