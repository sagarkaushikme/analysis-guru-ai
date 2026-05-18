import { useState } from "react";
import { Check, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { store } from "@/lib/analysis-store";
import { toast } from "sonner";
import { getToken } from "@/lib/auth";

const PACKAGES = [
  {
    id: "single",
    label: "1 Analysis",
    price: "₹9",
    amount: 900,
    credits: 1,
    perAnalysis: "₹9 per analysis",
    popular: false,
  },
  {
    id: "small",
    label: "6 Analyses",
    price: "₹49",
    amount: 4900,
    credits: 6,
    perAnalysis: "₹8.1 per analysis",
    popular: false,
  },
  {
    id: "medium",
    label: "15 Analyses",
    price: "₹99",
    amount: 9900,
    credits: 15,
    perAnalysis: "₹6.6 per analysis",
    popular: true,
  },
  {
    id: "large",
    label: "50 Analyses",
    price: "₹249",
    amount: 24900,
    credits: 50,
    perAnalysis: "₹4.9 per analysis",
    popular: false,
  },
];

const FEATURES = ["Full AI breakdown", "Emotion analyzer", "Roast mode", "Credits never expire"];

type PromoData = {
  valid: boolean;
  code: string;
  youtuber_name?: string;
  discount_percent: number;
  original_amount: number;
  final_amount: number;
  package_id: string;
};

async function handleBuy(
  pkg: (typeof PACKAGES)[0],
  promoData: PromoData | null,
  promoCode: string,
) {
  try {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
    const token = getToken();

    if (!token) {
      toast.error("Pehle login karo!");
      return;
    }

    const appliedPromo = promoData && promoData.package_id === pkg.id ? promoData : null;

    // Step 1: Create order
    const orderRes = await fetch(`${API_URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        package: pkg.id,
        promo_code: appliedPromo ? promoCode : undefined,
      }),
    });

    if (!orderRes.ok) {
      const err = await orderRes.json();
      throw new Error(err.error || "Order create fail");
    }
    const order = await orderRes.json();

    // Step 2: Razorpay checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "TradeAI",
      description: `${pkg.credits} Trade Analysis Credits`,
      order_id: order.orderId,
      handler: async function (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) {
        const verifyRes = await fetch(`${API_URL}/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const data = await verifyRes.json().catch(() => ({}));
        if (verifyRes.ok) {
          store.setCredits(data.total_credits ?? store.get().credits + (data.credits_added ?? pkg.credits));
          toast.success(data.message || `${data.credits_added} credits add ho gaye!`);
          window.location.href = "/upload";
        } else {
          toast.error(data?.error || "Payment verify fail - support se contact karo");
        }
      },
      prefill: { name: "Trader" },
      theme: { color: "#6C63FF" },
      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong — please try again");
  }
}

export function PricingCards() {
  const [promoCode, setPromoCode] = useState("");
  const [promoData, setPromoData] = useState<PromoData | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>("medium");

  async function validatePromo() {
    if (!promoCode.trim()) {
      toast.error("Promo code daalo pehle");
      return;
    }
    const token = getToken();
    if (!token) {
      toast.error("Pehle login karo!");
      return;
    }
    setPromoLoading(true);
    setPromoError(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
      const res = await fetch(`${API_URL}/promo/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: promoCode.trim().toUpperCase(),
          package_id: selectedPackage,
        }),
      });
      const data = await res.json();
      if (data.valid) {
        setPromoData({ ...data, package_id: selectedPackage });
        setPromoError(null);
        toast.success(
          `${data.youtuber_name || "Promo"} code valid! ${data.discount_percent}% discount applied`,
        );
      } else {
        setPromoData(null);
        setPromoError(data.error || "Invalid promo code");
        toast.error(data.error || "Invalid promo code");
      }
    } catch {
      setPromoData(null);
      setPromoError("Failed to validate code");
      toast.error("Failed to validate code");
    } finally {
      setPromoLoading(false);
    }
  }

  function clearPromo() {
    setPromoCode("");
    setPromoData(null);
    setPromoError(null);
  }

  return (
    <div className="space-y-8">
      {/* Promo Code Section */}
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <Tag className="h-4 w-4 text-primary" />
          Promo code hai? Daalo!
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="e.g. TRADE50"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            disabled={!!promoData || promoLoading}
            className="uppercase"
          />
          {promoData ? (
            <Button variant="outline" onClick={clearPromo}>
              <X className="h-4 w-4" /> Remove
            </Button>
          ) : (
            <Button onClick={validatePromo} disabled={promoLoading}>
              {promoLoading ? "Checking..." : "Apply"}
            </Button>
          )}
        </div>

        {promoData && (
          <div className="mt-3 rounded-lg border border-success/40 bg-success/10 px-3 py-2 text-sm text-success">
            <span className="font-semibold">{promoData.code} applied!</span>{" "}
            <span className="text-foreground">
              ₹{(promoData.original_amount / 100).toFixed(0)} → ₹
              {(promoData.final_amount / 100).toFixed(0)}{" "}
              <span className="text-success">(-{promoData.discount_percent}%)</span>
            </span>
          </div>
        )}

        {promoError && !promoData && (
          <div className="mt-3 text-sm text-destructive">{promoError}</div>
        )}

        <p className="mt-2 text-xs text-muted-foreground">
          Select a package below, then apply your promo code.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PACKAGES.map((pkg) => {
          const isPromoForThis = promoData && promoData.package_id === pkg.id;
          const finalPrice = isPromoForThis
            ? `₹${(promoData!.final_amount / 100).toFixed(0)}`
            : pkg.price;
          const savings = isPromoForThis
            ? (promoData!.original_amount - promoData!.final_amount) / 100
            : 0;
          const isSelected = selectedPackage === pkg.id;

          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`relative cursor-pointer rounded-2xl border p-6 transition-all hover:-translate-y-1 ${
                pkg.popular
                  ? "border-primary/60 bg-gradient-to-b from-primary/10 to-card shadow-glow"
                  : "border-border bg-card hover:border-primary/40"
              } ${isSelected ? "ring-2 ring-primary" : ""}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
                  BEST VALUE
                </div>
              )}

              <div className="text-sm font-medium text-muted-foreground">{pkg.label}</div>
              <div className="mt-3 flex items-baseline gap-2">
                {isPromoForThis && (
                  <span className="text-lg text-muted-foreground line-through">{pkg.price}</span>
                )}
                <span className="text-4xl font-bold tracking-tight">{finalPrice}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{pkg.perAnalysis}</div>

              {isPromoForThis && savings > 0 && (
                <div className="mt-2 inline-block rounded-md bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                  ₹{savings} bachaya!
                </div>
              )}

              <ul className="mt-5 space-y-2 text-sm">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 flex-shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuy(pkg, promoData, promoCode);
                }}
                className={`mt-6 w-full ${
                  pkg.popular ? "bg-gradient-primary text-primary-foreground hover:opacity-90" : ""
                }`}
                variant={pkg.popular ? "default" : "outline"}
              >
                Buy {finalPrice}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
