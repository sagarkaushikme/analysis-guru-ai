import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Single", price: 9, count: 1, per: 9 },
  { name: "Small", price: 49, count: 6, per: 8.1 },
  { name: "Medium", price: 99, count: 15, per: 6.6, best: true },
  { name: "Large", price: 249, count: 50, per: 4.9 },
];

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {plans.map((p) => (
        <div
          key={p.name}
          className={`relative rounded-2xl border p-6 transition-all hover:-translate-y-1 ${
            p.best
              ? "border-primary/60 bg-gradient-to-b from-primary/10 to-card shadow-glow"
              : "border-border bg-card"
          }`}
        >
          {p.best && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
              BEST VALUE
            </div>
          )}
          <div className="text-sm font-medium text-muted-foreground">{p.name}</div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight">₹{p.price}</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {p.count} {p.count === 1 ? "analysis" : "analyses"}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">≈ ₹{p.per} each</div>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2 text-muted-foreground"><Check className="h-4 w-4 text-success" /> Full AI breakdown</li>
            <li className="flex items-center gap-2 text-muted-foreground"><Check className="h-4 w-4 text-success" /> Emotion analyzer</li>
            <li className="flex items-center gap-2 text-muted-foreground"><Check className="h-4 w-4 text-success" /> Roast mode</li>
          </ul>
          <Button
            className={`mt-6 w-full ${p.best ? "bg-gradient-primary text-primary-foreground hover:opacity-90" : ""}`}
            variant={p.best ? "default" : "outline"}
          >
            Buy Now
          </Button>
        </div>
      ))}
    </div>
  );
}
