import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Upload as UploadIcon, Loader2, FileImage } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DUMMY_ANALYSIS, store, useStore } from "@/lib/analysis-store";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Trade — TradeAI" },
      { name: "description", content: "Upload your chart screenshot and get a full AI analysis." },
    ],
  }),
  component: UploadPage,
});

const APPS = ["Zerodha", "Upstox", "Angel One", "Groww", "TradingView"];

function UploadPage() {
  const nav = useNavigate();
  const { credits, history } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return toast.error("Only image files are allowed");
    if (credits <= 0) return toast.error("No credits left — please buy more");
    setLoading(true);
    try {
      // Try real API but fall back to dummy on failure
      const fd = new FormData();
      fd.append("screenshot", file);
      let data = DUMMY_ANALYSIS;
      try {
        const res = await fetch("http://localhost:3001/api/analyze", { method: "POST", body: fd });
        if (res.ok) {
          const json = await res.json();
          // Backend returns { success: true, data: {...} }
          data = json.data || json;
        }
      } catch {
        /* fallback */
      }
      await new Promise((r) => setTimeout(r, 1500));
      store.useCredit();
      store.setCurrent({ ...data, id: crypto.randomUUID(), date: new Date().toISOString() });
      toast.success("Analysis ready!");
      nav({ to: "/dashboard" });
    } catch {
      toast.error("Something went wrong — please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Upload Your Trade</h1>
          <p className="mt-2 text-muted-foreground">
            Drop a chart screenshot — full breakdown in 15 seconds.
          </p>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          onClick={() => inputRef.current?.click()}
          className={`mt-10 cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all ${
            drag ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="font-medium">AI is analyzing...</p>
              <p className="text-sm text-muted-foreground">
                Detecting pattern, calculating risk, checking emotion...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                <UploadIcon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <p className="text-lg font-semibold">Drop your chart screenshot here</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  or click to select • PNG, JPG (max 10MB)
                </p>
              </div>
              <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                Choose File
              </Button>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground">Supported:</span>
          {APPS.map((a) => (
            <span
              key={a}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
            >
              {a}
            </span>
          ))}
        </div>

        {/* Recent */}
        <section className="mt-16">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold">Recent Analyses</h2>
            <Link to="/history" className="text-sm text-primary hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {history.slice(0, 3).map((h) => {
              const c =
                h.trade_score >= 7
                  ? "text-success bg-success/10"
                  : h.trade_score >= 5
                    ? "text-warning bg-warning/10"
                    : "text-danger bg-danger/10";
              return (
                <div
                  key={h.id}
                  className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(h.date).toLocaleDateString()}
                      </div>
                      <div className="mt-1 font-semibold">{h.instrument}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{h.pattern_name}</div>
                    </div>
                    <span className={`rounded-lg px-2.5 py-1 text-sm font-semibold ${c}`}>
                      {h.trade_score}/10
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <FileImage className="h-3.5 w-3.5" /> Screenshot
                  </div>
                  <Button
                    onClick={() => {
                      store.setCurrent(h);
                      nav({ to: "/dashboard" });
                    }}
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                  >
                    View
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
