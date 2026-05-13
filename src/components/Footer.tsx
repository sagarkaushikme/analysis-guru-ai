import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">TradeAI</span>
            </div>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Apni trade ka full analysis — sirf ₹9 mein. AI-powered insights for Indian traders.
            </p>
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <Link to="/pricing" className="hover:text-foreground">Pricing</Link>
            <Link to="/login" className="hover:text-foreground">Login</Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          Educational purposes only. Not SEBI registered advice. © {new Date().getFullYear()} TradeAI.
        </p>
      </div>
    </footer>
  );
}
