import { Link, useNavigate } from "@tanstack/react-router";
import { TrendingUp, Wallet, ArrowLeft, LogOut } from "lucide-react";
import { store, useStore } from "@/lib/analysis-store";
import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function Navbar({ variant = "marketing" }: { variant?: "marketing" | "app" }) {
  const { credits, user } = useStore();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    store.logout();
    navigate({ to: "/" });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary shadow-glow">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">TradeAI</span>
        </Link>

        {variant === "marketing" ? (
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <Link
              to="/"
              className="hover:text-foreground"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-foreground" }}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Pricing
            </Link>
            <Link
              to="/upload"
              className="hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              App
            </Link>
          </nav>
        ) : (
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link
              to="/upload"
              className="hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Upload
            </Link>
            <Link
              to="/dashboard"
              className="hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Dashboard
            </Link>
            <Link
              to="/history"
              className="hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              History
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {variant === "app" && (
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
          )}

          {user ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm sm:flex">
                <Wallet className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">Credits:</span>
                <span className="font-semibold text-foreground">{credits}</span>
              </div>
              <span className="hidden text-sm text-muted-foreground md:inline">{user.name}</span>
              {variant === "app" && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-primary/60 text-primary hover:bg-primary/10 hover:text-primary"
                >
                  <Link to="/pricing">Buy Credits</Link>
                </Button>
              )}
              <Button
                onClick={handleLogout}
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button asChild size="sm" variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
