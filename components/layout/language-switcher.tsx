"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { Locale, LOCALES } from "@/lib/i18n/translations";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = LOCALES.find((l) => l.code === locale) || LOCALES[1];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.langSwitcher.label}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-slate-200 hover:bg-white/10 hover:border-white/20 transition backdrop-blur-sm"
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="text-xs font-medium hidden sm:inline">{current.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl animate-fade-up"
        >
          {LOCALES.map((l) => {
            const selected = l.code === locale;
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  setLocale(l.code as Locale);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm transition ${
                  selected
                    ? "bg-indigo-500/15 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-base leading-none" aria-hidden>
                  {l.flag}
                </span>
                <span className="flex-1 text-xs font-medium">{l.label}</span>
                {selected && <Check className="h-3.5 w-3.5 text-indigo-300" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
