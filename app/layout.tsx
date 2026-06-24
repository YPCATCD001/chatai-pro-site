import "./globals.css";
import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n/i18n-provider";

export const metadata: Metadata = {
  title: "ChatAI Pro — AI Customer Service SaaS",
  description:
    "AI customer service trained on your documents, deployed on your website in minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" dir="ltr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
