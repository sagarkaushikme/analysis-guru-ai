import { createFileRoute, Link } from "@tanstack/react-router";
import { Upload, BarChart3, Brain, Flame, ArrowRight, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingCards } from "@/components/PricingCards";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TradeAI — Full Trade Analysis for Just ₹9" },
      {
        name: "description",
        content:
          "Upload a screenshot, get a full AI breakdown of your trade. Pattern, mistakes, scenarios, roast — everything for ₹9.",
      },
      { property: "og:title", content: "TradeAI — AI Trade Analysis" },
      {
        property: "og:description",
        content: "Full AI breakdown of your trade — pattern, mistakes, emotion, roast. Just ₹9.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                AI-powered • Made for Indian traders
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Get a{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Full Analysis
                </span>{" "}
                of Your Trade — for Just ₹9
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Upload a screenshot and get a complete AI breakdown. Pattern, mistakes, scenarios,
                roast — all of it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90"
                >
                  <Link to="/upload">
                    Try It Free <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/dashboard">See Demo</Link>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full border-2 border-background bg-gradient-primary"
                    />
                  ))}
                </div>
                <span>2,400+ traders trust TradeAI</span>
              </div>
            </div>

            {/* Hero card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">BANKNIFTY 45200CE</div>
                    <div className="mt-1 text-lg font-semibold">Bullish Engulfing</div>
                  </div>
                  <div className="rounded-xl bg-success/10 px-3 py-2 text-right">
                    <div className="text-2xl font-bold text-success">7.2</div>
                    <div className="text-[10px] uppercase tracking-wider text-success">Score</div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { l: "Bullish", v: 62, c: "bg-success" },
                    { l: "Sideways", v: 24, c: "bg-warning" },
                    { l: "Reversal", v: 14, c: "bg-danger" },
                  ].map((b) => (
                    <div key={b.l} className="rounded-lg border border-border bg-background p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {b.l}
                      </div>
                      <div className="mt-1 text-lg font-bold">{b.v}%</div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                        <div className={`h-full ${b.c}`} style={{ width: `${b.v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex h-24 items-end gap-1.5 rounded-lg border border-border bg-background p-3">
                  {[40, 65, 50, 80, 55, 90, 70, 60, 85, 75, 95, 68].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-gradient-primary"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm italic text-muted-foreground">
                  "Looks like a FOMO trade — entry was already 2% above..."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Everything a trader needs</h2>
          <p className="mt-3 text-muted-foreground">One screenshot, 20+ deep insights.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: BarChart3,
              title: "20+ Metrics",
              desc: "Trade score, pattern detection, R:R, win probability, risk analysis — all covered.",
            },
            {
              icon: Brain,
              title: "Emotion Analyzer",
              desc: "FOMO, revenge trading, overconfidence — AI catches your emotional mistakes.",
            },
            {
              icon: Flame,
              title: "AI Roast Mode",
              desc: "Funny, brutal, honest feedback. Looking in the mirror is sometimes necessary.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">3 steps. 15 seconds. Done.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Upload a screenshot",
                desc: "Zerodha, Upstox, Groww, TradingView — any app works.",
              },
              {
                n: "02",
                title: "AI analyzes it",
                desc: "A deep breakdown in 15 seconds — pattern, risk, emotion, all of it.",
              },
              {
                n: "03",
                title: "Get a full dashboard",
                desc: "Score, mistakes, action points, roast — all clear.",
              },
            ].map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-border bg-card p-6">
                <div className="bg-gradient-primary bg-clip-text text-5xl font-bold text-transparent">
                  {s.n}
                </div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Pricing — cheap and honest</h2>
          <p className="mt-3 text-muted-foreground">Take what you need. No subscription trap.</p>
        </div>
        <div className="mt-12">
          <PricingCards />
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Loved by traders</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                name: "Rahul K.",
                quote: "FOMO trades stopped. The ₹49 pack saved me ₹5,000 a month.",
              },
              { name: "Neha S.", quote: "Roast mode is gold. One look and my head cooled down." },
              {
                name: "Aman P.",
                quote:
                  "Pattern detection is spot on. Saw the demo and immediately took the medium plan.",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex gap-0.5 text-warning">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-primary" />
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">Verified trader</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-10 text-center sm:p-16">
          <div className="absolute inset-0 bg-hero-glow" />
          <div className="relative">
            <Upload className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Your first analysis is free</h2>
            <p className="mt-3 text-muted-foreground">
              Sign up and get 2 free credits. Try it, then decide.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              <Link to="/signup">
                Create Free Account <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
