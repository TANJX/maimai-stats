import { useT } from "../i18n";

interface Props {
  lastUpdated: string;
}

export function Footer({ lastUpdated }: Props) {
  const t = useT();
  return (
    <footer className="sticker-foot pt-7 mt-12 flex flex-col gap-4">
      <div className="flex justify-between items-baseline gap-4 flex-wrap font-mono text-[11px] tracking-[0.08em] uppercase text-ink">
        <div className="font-semibold">{t.footer.sig}</div>
        <div className="text-ink-soft">
          {t.footer.lastWalkedLead} <strong className="text-ink">{lastUpdated}</strong>
        </div>
      </div>
      <p className="text-[13px] leading-relaxed text-ink-soft m-0 max-w-[68ch] text-pretty">
        {t.footer.caveatPre}
        <a
          href="https://github.com/TANJX"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono font-semibold text-ink underline decoration-2 decoration-accent underline-offset-[3px] hover:text-accent transition-colors"
        >
          @TANJX
        </a>
        {t.footer.caveatPost}
      </p>
    </footer>
  );
}
