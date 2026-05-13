import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TradeAI" },
      { name: "description", content: "TradeAI team se baat karo — support, feedback ya partnership ke liye." },
      { property: "og:title", content: "Contact TradeAI" },
      { property: "og:description", content: "Reach out for support or partnerships." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">Get in <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span></h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Sawal, feedback, ya partnership — hum sun rahe hain.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-4 pb-20 sm:px-6 md:grid-cols-2">
        <div className="space-y-4">
          {[
            { icon: Mail, title: "Email", text: "support@tradeai.in" },
            { icon: MessageCircle, title: "WhatsApp", text: "+91 98765 43210" },
            { icon: MapPin, title: "Office", text: "Bengaluru, Karnataka, India" },
          ].map((i) => (
            <div key={i.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <i.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">{i.title}</p>
                <p className="text-sm text-muted-foreground">{i.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message bhej diya — hum 24 ghante mein reply karenge.");
            (e.target as HTMLFormElement).reset();
          }}
          className="space-y-4 rounded-2xl border border-border bg-card p-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" required placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required placeholder="you@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="msg">Message</Label>
            <Textarea id="msg" required rows={5} placeholder="Kya bolna hai?" />
          </div>
          <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">Send Message</Button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
