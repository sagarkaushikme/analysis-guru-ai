import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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

async function handleBuy(pkg: (typeof PACKAGES)[0]) {
  try {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
    const token = getToken();

    if (!token) {
      toast.error("Pehle login karo!");
      return;
    }

    // Step 1: Create order
    const orderRes = await fetch(`${API_URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        package: pkg.id,
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
        // Step 3: Verify payment
        const verifyRes = await fetch(`${API_URL}/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...response,
            credits: pkg.credits,
          }),
        });

        if (verifyRes.ok) {
          store.addCredits(pkg.credits);
          toast.success(`${pkg.credits} credits added! 🎉`);
        } else {
          toast.error("Payment verification failed — please contact support");
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
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {PACKAGES.map((pkg) => (
        <div
          key={pkg.id}
          className={`relative rounded-2xl border p-6 transition-all hover:-translate-y-1 ${pkg.popular
              ? "border-primary/60 bg-gradient-to-b from-primary/10 to-card shadow-glow"
              : "border-border bg-card hover:border-primary/40"
            }`}
        >
          {/* Best value badge */}
          {pkg.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
              BEST VALUE
            </div>
          )}

          {/* Price */}
          <div className="text-sm font-medium text-muted-foreground">{pkg.label}</div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight">{pkg.price}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{pkg.perAnalysis}</div>

          {/* Features */}
          <ul className="mt-5 space-y-2 text-sm">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 flex-shrink-0 text-success" />
                {f}
              </li>
            ))}
          </ul>

          {/* Buy button */}
          <Button
            onClick={() => handleBuy(pkg)}
            className={`mt-6 w-full ${pkg.popular
                ? "bg-gradient-primary text-primary-foreground hover:opacity-90"
                : "variant-outline"
              }`}
            variant={pkg.popular ? "default" : "outline"}
          >
            Buy {pkg.price}
          </Button>
        </div>
      ))}
    </div>
  );
}
