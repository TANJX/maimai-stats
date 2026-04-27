import { useLocale } from "../i18n";

export function LanguageToggle() {
  const [locale, setLocale] = useLocale();
  return (
    <div className="sticker-seg" role="group" aria-label="Language">
      <button
        type="button"
        className={`sticker-seg-btn ${locale === "en" ? "sticker-seg-btn-on" : ""}`}
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        className={`sticker-seg-btn ${locale === "zh" ? "sticker-seg-btn-on" : ""}`}
        onClick={() => setLocale("zh")}
        aria-pressed={locale === "zh"}
      >
        中
      </button>
    </div>
  );
}
