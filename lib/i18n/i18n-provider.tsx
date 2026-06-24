"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, Locale, LOCALES, RTL_LOCALES } from "./translations";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof translations[Locale];
  locales: typeof LOCALES;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "chatai_locale";

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "zh";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && translations[stored as Locale]) {
      return stored as Locale;
    }
    const nav = (window.navigator.language || "zh").toLowerCase();
    if (nav.startsWith("zh")) return "zh";
    if (nav.startsWith("ar")) return "ar";
    if (nav.startsWith("ja")) return "ja";
    if (nav.startsWith("ko")) return "ko";
    if (nav.startsWith("de")) return "de";
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("it")) return "it";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("pt")) return "pt";
    if (nav.startsWith("nl")) return "nl";
    if (nav.startsWith("sv")) return "sv";
    if (nav.startsWith("pl")) return "pl";
    if (nav.startsWith("tr")) return "tr";
    if (nav.startsWith("th")) return "th";
    if (nav.startsWith("vi")) return "vi";
    if (nav.startsWith("id")) return "id";
    if (nav.startsWith("cs")) return "cs";
    if (nav.startsWith("ru")) return "ru";
    if (nav.startsWith("he")) return "he";
    if (nav.startsWith("hi")) return "hi";
    return "zh";
  } catch {
    return "zh";
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLocaleState(detectInitialLocale());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const dir: "ltr" | "rtl" = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
      document.body.dir = dir;
      document.documentElement.setAttribute("data-locale", locale);
      document.documentElement.setAttribute("data-dir", dir);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale, mounted]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: translations[locale],
      locales: LOCALES,
      dir: RTL_LOCALES.includes(locale) ? "rtl" : "ltr",
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      locale: "zh" as Locale,
      setLocale: () => {},
      t: translations.zh,
      locales: LOCALES,
      dir: "ltr" as const,
    };
  }
  return ctx;
}
