"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PLANS } from "@/lib/plans";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Rocket, Building2 } from "lucide-react";

const ORDER = ["free", "starter", "growth", "agency"] as const;

const PLAN_ICONS = {
  free: Sparkles,
  starter: Zap,
  growth: Rocket,
  agency: Building2,
};

const PLAN_COLORS = {
  free: "from-slate-500 to-slate-600",
  starter: "from-violet-500 to-fuchsia-500",
  growth: "from-blue-500 to-cyan-500",
  agency: "from-amber-500 to-orange-500",
};

export default function PricingPage() {
  async function checkout(tier: string) {
    if (tier === "free") {
      location.href = "/register";
      return;
    }
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (data.url) location.href = data.url;
      else alert(data.error || "Something went wrong");
    } catch (e: any) { alert(e.message); }
  }

  return (
    <AppShell>
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4">
          <Zap className="w-4 h-4" />
          Simple pricing
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Choose your plan
        </h1>
        <p className="text-muted-foreground mt-3 text-[15px]">
          Start free and upgrade when you grow. Cancel any time, no questions asked.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {ORDER.map((tier) => {
          const plan = PLANS[tier];
          const highlighted = tier === "starter";
          const Icon = PLAN_ICONS[tier];
          
          return (
            <div
              key={tier}
              className={
                "relative rounded-2xl border bg-card p-6 flex flex-col transition-all duration-300 card-shadow " +
                (highlighted 
                  ? "border-primary/50 shadow-xl shadow-primary/10 ring-2 ring-primary/20 scale-[1.02]" 
                  : "border-border/60 hover:border-primary/30")
              }
            >
              {highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${PLAN_COLORS[tier]} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {plan.name}
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-4xl font-bold tracking-tight">€{plan.price_monthly}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <div className="text-xs text-muted-foreground mb-5">
                or €{plan.price_yearly}/year (save 20%)
              </div>

              <ul className="space-y-2.5 text-sm flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={highlighted ? "primary" : "secondary"}
                className={`mt-6 w-full ${highlighted ? "" : "border-border/60"}`}
                onClick={() => checkout(tier)}
              >
                {tier === "free" ? "Start free" : "Upgrade now"}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center max-w-2xl mx-auto">
        <p className="text-sm text-muted-foreground">
          All plans include 24/7 support, SSL encryption, and 99.9% uptime guarantee.
        </p>
      </div>
    </AppShell>
  );
}
