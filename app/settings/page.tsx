"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/plans";
import { Check } from "lucide-react";

interface Me {
  id?: string;
  email?: string;
  subscription_tier?: string;
  monthly_message_count?: number;
}

export default function SettingsPage() {
  const [me, setMe] = useState<Me>({});

  useEffect(() => {
    fetch("/api/me").then(r => r.json()).then(d => setMe(d));
  }, []);

  return (
    <AppShell>
      <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
      <p className="text-slate-500 mt-1 mb-6">Your account and subscription.</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-lg">Account</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Email</span><span className="font-medium">{me.email || "—"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Plan</span><span className="font-medium capitalize">{me.subscription_tier || "free"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Messages this period</span><span className="font-medium">{me.monthly_message_count ?? 0}</span></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-lg">Upgrade</h2>
          <p className="text-slate-500 text-sm mt-1">
            Unlock more bots, knowledge sources, and messages.
          </p>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((tier) => (
              <div key={tier} className="flex items-center justify-between">
                <div className="capitalize font-medium">{tier}</div>
                <div>€{PLANS[tier].price_monthly}/mo</div>
              </div>
            ))}
          </div>
          <Button variant="primary" className="mt-4" onClick={() => location.href = "/pricing"}>
            View pricing
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
