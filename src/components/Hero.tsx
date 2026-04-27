import { useT } from "../i18n";
import { LanguageToggle } from "./LanguageToggle";

interface Props {
  lastUpdated: string;
}

export function Hero({ lastUpdated }: Props) {
  const t = useT();
  return (
    <header className="pb-7 mb-7">
      <div className="flex justify-between items-center gap-4 font-mono text-[11px] tracking-[0.14em] uppercase text-ink mb-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="sticker-pill bg-accent text-white !py-[3px] !px-2.5 text-[10px]">
            {t.hero.eyebrow}
          </span>
          <span className="font-semibold text-ink">{t.hero.updated(lastUpdated)}</span>
        </div>
        <LanguageToggle />
      </div>

      <h1 className="font-display font-extrabold text-ink leading-[1.05] tracking-[-0.02em] m-0 mb-3.5 text-[clamp(34px,7.5vw,68px)] text-balance py-1.5">
        {t.hero.headlineLead}
        <em className="not-italic text-accent">{t.hero.headlineEm}</em>
        {t.hero.headlineTrail}
      </h1>

      <p className="text-[clamp(15px,1.6vw,18px)] leading-relaxed text-ink font-medium max-w-[62ch] m-0 text-pretty">
        {t.hero.subhead}
      </p>
    </header>
  );
}
