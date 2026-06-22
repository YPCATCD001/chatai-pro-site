export const siteConfig = {
  name: "ChatAI Pro",
  description:
    "Deploy an AI customer service chatbot on your website in 5 minutes. 24/7 online, powered by Mistral AI.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  links: {
    twitter: "#",
    github: "#",
  },
};

export type SiteConfig = typeof siteConfig;
