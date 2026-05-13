import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AuthShell } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — TradeAI" }, { name: "description", content: "Free TradeAI account banao — 2 analyses free." }] }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return toast.error("Saare fields fill karo");
    if (password.length < 6) return toast.error("Password kam se kam 6 characters ka ho");
    toast.success("Account created! 2 free credits added.");
    nav({ to: "/upload" });
  };

  return <AuthShell mode="signup">
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Apna naam" /></div>
      <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" /></div>
      <div className="space-y-2"><Label htmlFor="pw">Password</Label><Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" /></div>
      <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">Create Account</Button>
    </form>
    <p className="mt-4 text-center text-sm text-muted-foreground">
      Already account hai? <Link to="/login" className="text-primary hover:underline">Login karo</Link>
    </p>
  </AuthShell>;
}
