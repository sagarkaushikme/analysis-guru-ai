import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { DUMMY_ANALYSIS, useStore } from "@/lib/analysis-store";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  Brain,
  Zap,
  ArrowRight,
  Share2,
  Flame,
  Activity,
  Eye,
  BookOpen,
  Gauge,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Trade Dashboard — TradeAI" },
      {
        name: "description",
        content: "Full AI trade breakdown — score, mistakes, scenarios, roast.",
      },
    ],
  }),
  component: Dashboard,
});

function scoreColor(n: number) {
  if (n >= 7) return "text-success";
  if (n >= 5) return "text-warning";
  return "text-danger";
}

function Card({
  title,
  icon: Icon,
  children,
  className = "",
  accent,
}: {
  title?: string;
  icon?: any;
  children: React.ReactNode;
  className?: string;
  accent?: "success" | "danger" | "warning" | "primary";
}) {
  const accentBorder =
    accent === "success"
      ? "border-l-4 border-l-success"
      : accent === "danger"
        ? "border-l-4 border-l-danger"
        : accent === "warning"
          ? "border-l-4 border-l-warning"
          : accent === "primary"
            ? "border-l-4 border-l-primary"
            : "";
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 ${accentBorder} ${className}`}>
      {title && (
        <div className="mb-4 flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-primary" />}
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}

function Dashboard() {
  const { current, user, credits, initialized } = useStore();
  const navigate = useNavigate();

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    navigate({ to: "/login" });
    return null;
  }
  const a = current ?? DUMMY_ANALYSIS;

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-8 sm:px-6">
        {credits === 0 && (
          <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-danger/40 bg-danger/10 p-5 sm:flex-row">
            <p className="font-semibold text-danger">Credits khatam!</p>
            <Button
              onClick={() => navigate({ to: "/pricing" })}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              ₹9 mein 1 credit lo →
            </Button>
          </div>
        )}
        {/* Header card */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-28 w-40 items-center justify-center rounded-xl border border-border bg-background text-xs text-muted-foreground">
              <div className="flex items-end gap-1 p-3">
                {[40, 60, 45, 75, 55, 85, 70, 90].map((h, i) => (
                  <div
                    key={i}
                    className="w-2 rounded-sm bg-gradient-primary"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Instrument
              </div>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{a.instrument}</h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs">
                  {a.timeframe}
                </span>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                  {a.pattern_name}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${a.pattern_type === "bullish" ? "bg-success/10 text-success" : a.pattern_type === "bearish" ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning"}`}
                >
                  {a.pattern_type}
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs">
                  Trend: {a.trend}
                </span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Trade Score
              </div>
              <div className={`text-6xl font-bold ${scoreColor(a.trade_score)}`}>
                {a.trade_score}
              </div>
              <div className="text-sm text-muted-foreground">/ 10 — {a.score_label}</div>
            </div>
          </div>
        </div>

        {/* Row 1: 4 metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            label="Trade Score"
            value={`${a.trade_score}/10`}
            sub={a.score_label}
            icon={Gauge}
            tone={a.trade_score >= 7 ? "success" : "warning"}
          />
          <Metric
            label="Risk : Reward"
            value={a.risk_reward}
            sub="Healthy ratio"
            icon={Target}
            tone="success"
          />
          <Metric
            label="Risk % of Capital"
            value={`${a.risk_percent}%`}
            sub={a.risk_level}
            icon={Shield}
            tone="warning"
          />
          <Metric
            label="Win Probability"
            value={`${a.win_probability}%`}
            sub={`AI confidence ${a.ai_confidence}%`}
            icon={Activity}
            tone="primary"
          />
        </div>

        {/* Row 2: probability + emotion */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Card title="AI Probability Engine" icon={Brain}>
            <div className="space-y-3">
              {[
                { l: "Bullish", v: 62, c: "bg-success" },
                { l: "Sideways", v: 24, c: "bg-warning" },
                { l: "Reversal", v: 14, c: "bg-danger" },
              ].map((b) => (
                <div key={b.l}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{b.l}</span>
                    <span className="font-semibold">{b.v}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-border">
                    <div className={`h-full ${b.c}`} style={{ width: `${b.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <div className="mb-2 text-xs text-muted-foreground">Next 7 candle probabilities</div>
              <div className="flex h-20 items-end gap-1.5">
                {[55, 62, 58, 70, 48, 65, 60].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-primary opacity-90"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </Card>

          <Card title="Emotion Analyzer" icon={Brain}>
            <div className="space-y-3">
              <div className="rounded-xl border border-warning/40 bg-warning/10 p-4">
                <div className="text-xs uppercase tracking-wider text-warning">Fear Detected</div>
                <div className="mt-1 font-semibold">Premature exit risk medium</div>
              </div>
              <div className="rounded-xl border border-danger/40 bg-danger/10 p-4">
                <div className="text-xs uppercase tracking-wider text-danger">Revenge Trading</div>
                <div className="mt-1 font-semibold">High — last 2 trades were losses</div>
              </div>
              <div className="rounded-xl border border-success/40 bg-success/10 p-4">
                <div className="text-xs uppercase tracking-wider text-success">Risk Management</div>
                <div className="mt-1 font-semibold">OK — SL set, position sized</div>
              </div>
              <div className="rounded-xl border border-border p-3 text-sm">
                <span className="text-muted-foreground">Detected emotion:</span>{" "}
                <span className="ml-1 font-semibold text-warning">{a.emotion_detected}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Row 3: mistakes + actions */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Card title="Mistake Detection Engine" icon={AlertTriangle}>
            <ul className="space-y-3">
              {a.mistakes.map((m, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-border bg-background p-3"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <div>
                    <div className="text-sm font-semibold">{m}</div>
                    <div className="text-xs text-muted-foreground">
                      This may impact future trades — review it.
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Smart Action Suggestions" icon={Zap}>
            <ol className="space-y-3">
              {a.action_points.map((p, i) => {
                const tone = i < 2 ? "text-success" : "text-warning";
                return (
                  <li
                    key={i}
                    className="flex gap-3 rounded-xl border border-border bg-background p-3"
                  >
                    <span className={`text-lg font-bold ${tone}`}>{i + 1}</span>
                    <span className="text-sm">{p}</span>
                  </li>
                );
              })}
            </ol>
          </Card>
        </div>

        {/* Row 4: scenarios */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Card title="Bullish Scenario" icon={TrendingUp} accent="success">
            <p className="text-sm">{a.bullish_scenario}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <Stat label="Entry" v={a.entry} />
              <Stat label="Target" v={a.target} tone="success" />
              <Stat label="SL" v={a.stop_loss} tone="danger" />
            </div>
          </Card>
          <Card title="Bearish Scenario" icon={TrendingDown} accent="danger">
            <p className="text-sm">{a.bearish_scenario}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <Stat label="Support" v={a.support} />
              <Stat label="Resistance" v={a.resistance} tone="warning" />
              <Stat label="SL" v={a.stop_loss} tone="danger" />
            </div>
          </Card>
        </div>

        {/* Row 5: 3 cols */}
        <div className="grid gap-5 lg:grid-cols-3">
          <Card title="Risk Meter" icon={Gauge}>
            <div className="flex h-3 overflow-hidden rounded-full">
              <div className="flex-1 bg-success" />
              <div className="flex-1 bg-warning" />
              <div className="flex-1 bg-danger" />
            </div>
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
            <div className="mt-4 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm">
              Current: <span className="font-semibold text-warning">{a.risk_level}</span>
            </div>
          </Card>
          <Card title="Trade Timeline Zones" icon={Target}>
            <div className="space-y-2 text-sm">
              <Zone label="Resistance" v={a.resistance} tone="danger" />
              <Zone label="Entry" v={a.entry} tone="primary" />
              <Zone label="Support" v={a.support} tone="success" />
              <Zone label="Target" v={a.target} tone="success" />
            </div>
          </Card>
          <Card title="What Smart Money Might Do" icon={Eye}>
            <div className="space-y-2 text-sm">
              <Info text="Liquidity grab below 45080 likely before move up." />
              <Info text="OI build-up at 45500 — resistance strong." />
              <Info text="FII data shows long buildup, watch closely." />
            </div>
          </Card>
        </div>

        {/* Row 6 */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Card title="Market Mood + Position Check" icon={Activity}>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(a.indicators).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border bg-background p-3">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
                  <div className="mt-1 text-sm font-semibold">{v}</div>
                </div>
              ))}
              <div className="rounded-xl border border-border bg-background p-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Trader IQ
                </div>
                <div className="mt-1 text-sm font-semibold text-primary">{a.trader_iq}/100</div>
              </div>
            </div>
          </Card>
          <Card title="Trade Journal — Top Patterns" icon={BookOpen}>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between rounded-xl border border-border bg-background p-3">
                <span>Bullish Engulfing</span>
                <span className="text-success">12 wins</span>
              </li>
              <li className="flex justify-between rounded-xl border border-border bg-background p-3">
                <span>FOMO Entries</span>
                <span className="text-danger">8 losses</span>
              </li>
              <li className="flex justify-between rounded-xl border border-border bg-background p-3">
                <span>Breakout Trades</span>
                <span className="text-success">7 wins</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Row 7: alerts */}
        <Card title="Before It Goes Wrong — Alerts" icon={AlertTriangle}>
          <div className="grid gap-3 md:grid-cols-3">
            {a.alerts.map((al, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl border border-warning/40 bg-warning/10 p-3"
              >
                <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
                <span className="text-sm">{al}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Row 8 */}
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">AI Roast Mode</h3>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
              >
                <Share2 className="mr-1.5 h-3.5 w-3.5" /> Share
              </Button>
            </div>
            <p className="mt-4 text-lg italic leading-relaxed">"{a.roast}"</p>
          </div>
          <Card title="AI Summary" icon={Brain}>
            <p className="text-sm leading-relaxed">{a.summary}</p>
            <div className="mt-4 flex gap-2 text-xs">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                Confidence {a.ai_confidence}%
              </span>
              <span className="rounded-full bg-success/10 px-2.5 py-1 text-success">Setup OK</span>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Upload → Score → Emotion → Suggestions → Repeat
          </p>
          <Button
            asChild
            size="lg"
            className="mt-4 bg-gradient-primary text-primary-foreground hover:opacity-90"
          >
            <Link to="/upload">
              + Upload a New Trade <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  icon: any;
  tone: "success" | "warning" | "danger" | "primary";
}) {
  const c =
    tone === "success"
      ? "text-success"
      : tone === "danger"
        ? "text-danger"
        : tone === "warning"
          ? "text-warning"
          : "text-primary";
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className={`h-4 w-4 ${c}`} />
      </div>
      <div className={`mt-3 text-3xl font-bold ${c}`}>{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
function Stat({
  label,
  v,
  tone,
}: {
  label: string;
  v: string;
  tone?: "success" | "danger" | "warning";
}) {
  const c =
    tone === "success"
      ? "text-success"
      : tone === "danger"
        ? "text-danger"
        : tone === "warning"
          ? "text-warning"
          : "";
  return (
    <div className="rounded-lg border border-border bg-background p-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-sm font-semibold ${c}`}>{v}</div>
    </div>
  );
}
function Zone({
  label,
  v,
  tone,
}: {
  label: string;
  v: string;
  tone: "success" | "danger" | "warning" | "primary";
}) {
  const map = {
    success: "bg-success/10 text-success",
    danger: "bg-danger/10 text-danger",
    warning: "bg-warning/10 text-warning",
    primary: "bg-primary/10 text-primary",
  };
  return (
    <div className={`flex items-center justify-between rounded-full ${map[tone]} px-4 py-2`}>
      <span className="text-xs uppercase tracking-wider">{label}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}
function Info({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-primary-foreground/90">
      {text}
    </div>
  );
}
