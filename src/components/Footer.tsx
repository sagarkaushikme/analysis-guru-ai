import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
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

          <div>
            <p className="text-sm font-semibold text-foreground">Product</p>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <Link to="/pricing" className="hover:text-foreground">Pricing</Link>
              <Link to="/about" className="hover:text-foreground">About</Link>
              <Link to="/contact" className="hover:text-foreground">Contact</Link>
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Legal</p>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground">Terms & Conditions</Link>
              <Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
            </nav>
          </div>
        </div>
        <p className="mt-8 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          Educational purposes only. Not SEBI registered advice. © {new Date().getFullYear()} TradeAI.
        </p>
      </div>
    </footer>
  );
}
