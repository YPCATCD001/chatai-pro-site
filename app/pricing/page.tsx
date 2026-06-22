"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PLANS } from "@/lib/plans";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const ORDER = ["free", "starter", "growth", "agency"] as const;

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
        <h1 className="text-3xl md:text-4xl font-bold">Simple pricing</h1>
        <p className="text-slate-500 mt-3">
          Start free and upgrade when you grow. Cancel any time.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {ORDER.map((tier) => {
          const plan = PLANS[tier];
          const highlighted = tier === "starter";
          return (
            <div
              key={tier}
              className={
                "rounded-2xl border bg-white p-6 flex flex-col " +
                (highlighted ? "border-indigo-500 shadow-lg ring-2 ring-indigo-100 scale-[1.02]" : "border-slate-200 shadow-sm")
              }
            >
              <div className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                {plan.name}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">€{plan.price_monthly}</span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>
              <div className="text-xs text-slate-500">Or €{plan.price_yearly}/year</div>
              <ul className="mt-5 space-y-2 text-sm text-slate-700 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={highlighted ? "primary" : "outline"}
                className="mt-6 w-full"
                onClick={() => checkout(tier)}
              >
                {tier === "free" ? "Start free" : "Upgrade"}
              </Button>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
