import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingCards() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="relative rounded-2xl border border-primary/60 bg-gradient-to-b from-primary/10 to-card p-8 shadow-glow">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
          BEST VALUE
        </div>
        <div className="text-sm font-medium text-muted-foreground">Single</div>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-5xl font-bold tracking-tight">₹9</span>
          <span className="text-sm text-muted-foreground">/ analysis</span>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">1 analysis • No subscription</div>
        <ul className="mt-6 space-y-2.5 text-sm">
          <li className="flex items-center gap-2 text-muted-foreground"><Check className="h-4 w-4 text-success" /> Full AI breakdown</li>
          <li className="flex items-center gap-2 text-muted-foreground"><Check className="h-4 w-4 text-success" /> Emotion analyzer</li>
          <li className="flex items-center gap-2 text-muted-foreground"><Check className="h-4 w-4 text-success" /> Roast mode</li>
          <li className="flex items-center gap-2 text-muted-foreground"><Check className="h-4 w-4 text-success" /> Credits never expire</li>
        </ul>
        <Button className="mt-7 w-full bg-gradient-primary text-primary-foreground hover:opacity-90">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
