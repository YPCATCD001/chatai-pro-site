export type SubscriptionTier = "free" | "starter" | "growth" | "agency";

export interface PlanInfo {
  tier: SubscriptionTier;
  name: string;
  price_monthly: number;
  price_yearly: number;
  bot_limit: number | "unlimited";
  message_limit: number;
  document_limit: number | "unlimited";
  features: string[];
  highlighted?: boolean;
  stripe_price_id?: string;
}

export const PLANS: Record<SubscriptionTier, PlanInfo> = {
  free: {
    tier: "free",
    name: "Free",
    price_monthly: 0,
    price_yearly: 0,
    bot_limit: 1,
    message_limit: 100,
    document_limit: 5,
    features: [
      "1 bot",
      "100 AI messages / month",
      "5 knowledge base documents",
      "Branded widget",
      "Community support",
    ],
  },
  starter: {
    tier: "starter",
    name: "Starter",
    price_monthly: 49,
    price_yearly: 490,
    bot_limit: 2,
    message_limit: 3000,
    document_limit: 50,
    features: [
      "2 bots",
      "3,000 AI messages / month",
      "50 knowledge base documents",
      "Remove branding",
      "Basic analytics",
      "Email support",
    ],
    highlighted: true,
  },
  growth: {
    tier: "growth",
    name: "Growth",
    price_monthly: 129,
    price_yearly: 1290,
    bot_limit: 5,
    message_limit: 10000,
    document_limit: 200,
    features: [
      "5 bots",
      "10,000 AI messages / month",
      "200 knowledge base documents",
      "Full analytics dashboard",
      "Multi-language support",
      "Priority support",
    ],
  },
  agency: {
    tier: "agency",
    name: "Agency",
    price_monthly: 299,
    price_yearly: 2990,
    bot_limit: "unlimited",
    message_limit: 50000,
    document_limit: "unlimited",
    features: [
      "Unlimited bots",
      "50,000 AI messages / month",
      "Unlimited documents",
      "White-label widget",
      "API access",
      "Dedicated account manager",
    ],
  },
};

export const PLAN_ORDER: SubscriptionTier[] = [
  "free",
  "starter",
  "growth",
  "agency",
];

export function getPlanLimits(tier: SubscriptionTier): {
  bots: number;
  messages: number;
  documents: number;
} {
  const p = PLANS[tier];
  return {
    bots: p.bot_limit === "unlimited" ? 9999 : p.bot_limit,
    messages: p.message_limit,
    documents: p.document_limit === "unlimited" ? 9999 : p.document_limit,
  };
}
