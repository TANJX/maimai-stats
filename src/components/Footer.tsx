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
      <a
        href="https://marstanjx.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="marstanjx.com"
        className="inline-flex items-center gap-1.5 self-start font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute hover:text-accent transition-colors"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.5098 8.00196C16.4501 8.05166 13.7492 8.6388 10.9157 9.77917C8.08226 10.9195 5.71993 12.3702 4.18806 13.7659C3.4196 14.4661 2.89417 15.1217 2.60919 15.6844C2.3232 16.2491 2.32318 16.6239 2.41709 16.8634C2.51101 17.1029 2.76487 17.3756 3.3554 17.5875C3.94383 17.7987 4.77007 17.9103 5.80328 17.8854C7.86294 17.8357 10.5638 17.2485 13.3973 16.1082C16.2308 14.9678 18.5931 13.5172 20.125 12.1214C20.8935 11.4212 21.4189 10.7657 21.7039 10.2029C21.9899 9.63821 21.9899 9.26343 21.896 9.0239C21.8021 8.78438 21.5482 8.51177 20.9577 8.29981C20.3692 8.08861 19.543 7.97702 18.5098 8.00196ZM21.5045 6.73608C22.3459 7.03807 23.0856 7.56424 23.4178 8.41144C23.7499 9.25864 23.5683 10.1556 23.1608 10.9603C22.7523 11.7669 22.0725 12.5782 21.22 13.3549C19.5099 14.913 16.9675 16.4564 14.0018 17.6499C11.0362 18.8435 8.14146 19.4884 5.84227 19.5439C4.69606 19.5715 3.65206 19.454 2.80858 19.1512C1.9672 18.8493 1.22749 18.3231 0.895305 17.4759C0.56312 16.6287 0.744816 15.7317 1.1523 14.9271C1.5608 14.1205 2.2406 13.3091 3.0931 12.5324C4.80313 10.9743 7.34555 9.43098 10.3112 8.2374C13.2769 7.04383 16.1716 6.39894 18.4708 6.34346C19.617 6.3158 20.661 6.43333 21.5045 6.73608Z"
            fill="currentColor"
          />
          <path
            d="M12.1561 20.4205C16.4764 20.4205 19.9787 16.8722 19.9787 12.4952C19.9787 8.11812 16.4764 4.56982 12.1561 4.56982C7.8358 4.56982 4.3335 8.11812 4.3335 12.4952C4.3335 16.8722 7.8358 20.4205 12.1561 20.4205Z"
            fill="currentColor"
          />
        </svg>
        <span>marstanjx.com</span>
      </a>
    </footer>
  );
}
