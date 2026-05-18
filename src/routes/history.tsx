import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { store, useStore } from "@/lib/analysis-store";
import { Inbox, Loader2, SearchX } from "lucide-react";

function matchesLocalDate(isoDate: string, filterDate: string) {
  if (!filterDate) return true;
  const d = new Date(isoDate);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}` === filterDate;
}

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — TradeAI" },
      { name: "description", content: "All your past trade analyses in one place." },
    ],
  }),
  component: History,
});

function History() {
  const { history, historyLoading, historyLoaded, user } = useStore();
  const nav = useNavigate();
  const [date, setDate] = useState("");
  const [range, setRange] = useState("all");
  if (!user) {
    nav({ to: "/login" });
    return null;
  }

  const rows = useMemo(
    () =>
      history.filter((h) => {
        if (!matchesLocalDate(h.date, date)) return false;
        if (range === "high" && h.trade_score < 7) return false;
        if (range === "mid" && (h.trade_score < 5 || h.trade_score >= 7)) return false;
        if (range === "low" && h.trade_score >= 5) return false;
        return true;
      }),
    [history, date, range],
  );

  const hasFilters = Boolean(date) || range !== "all";

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analysis History</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              All your past analyses, in one place.
            </p>
          </div>
          <div className="flex gap-3">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-[160px]"
            />
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All scores</SelectItem>
                <SelectItem value="high">High (7-10)</SelectItem>
                <SelectItem value="mid">Mid (5-6)</SelectItem>
                <SelectItem value="low">Low (0-4)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {historyLoading && !historyLoaded ? (
          <div className="mt-16 flex flex-col items-center gap-3 py-20 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm">Loading your analyses...</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card py-20 text-center">
            {hasFilters && history.length > 0 ? (
              <>
                <SearchX className="h-10 w-10 text-muted-foreground" />
                <p className="text-lg font-semibold">No matches</p>
                <p className="text-sm text-muted-foreground">
                  Try a different date or score filter.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDate("");
                    setRange("all");
                  }}
                >
                  Clear filters
                </Button>
              </>
            ) : (
              <>
                <Inbox className="h-10 w-10 text-muted-foreground" />
                <p className="text-lg font-semibold">No analyses yet</p>
                <p className="text-sm text-muted-foreground">Upload one to get started!</p>
                <Button
                  asChild
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90"
                >
                  <Link to="/upload">Upload Trade</Link>
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-background/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Instrument</th>
                  <th className="px-5 py-3 text-left">Score</th>
                  <th className="px-5 py-3 text-left">Pattern</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const c =
                    r.trade_score >= 7
                      ? "text-success bg-success/10"
                      : r.trade_score >= 5
                        ? "text-warning bg-warning/10"
                        : "text-danger bg-danger/10";
                  return (
                    <tr
                      key={r.id}
                      onClick={() => {
                        store.setCurrent(r);
                        nav({ to: "/dashboard" });
                      }}
                      className="cursor-pointer border-t border-border transition-colors hover:bg-background/40"
                    >
                      <td className="px-5 py-4 text-muted-foreground">
                        {new Date(r.date).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 font-semibold">{r.instrument}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-md px-2 py-1 text-xs font-semibold ${c}`}>
                          {r.trade_score}/10
                        </span>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{r.pattern_name}</td>
                      <td className="px-5 py-4 text-right">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
