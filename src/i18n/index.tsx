import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en } from "./en";
import { zh } from "./zh";
import type { Dict, Locale } from "./types";

export type { Locale } from "./types";

const STORAGE_KEY = "maimai-locale";

const DICTS: Record<Locale, Dict> = { en, zh };

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage?.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "zh") return stored;
  const langs = navigator.languages ?? [navigator.language];
  for (const tag of langs ?? []) {
    if (typeof tag !== "string") continue;
    const lower = tag.toLowerCase();
    if (lower.startsWith("zh")) return "zh";
    if (lower.startsWith("en")) return "en";
  }
  return "en";
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Dict;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface ProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: ProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage may be unavailable (private mode, etc.) — fail silently.
    }
  }, []);

  // Reflect the chosen locale on <html lang>, helps screen readers + CJK font selection.
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: DICTS[locale] }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an <I18nProvider>");
  }
  return ctx;
}

/** Returns the current locale's dictionary. Access strings via `t.section.key`. */
export function useT(): Dict {
  return useI18n().t;
}

/** Returns the current locale + setter, for the language toggle. */
export function useLocale(): [Locale, (next: Locale) => void] {
  const { locale, setLocale } = useI18n();
  return [locale, setLocale];
}
