import { useT } from "../i18n";

export function HowToRead() {
  const t = useT();
  // Split the practical body around the emphasized phrase so we can <strong> it.
  const [practicalLead, practicalTrail] = t.howto.practical.body.split(
    t.howto.practical.bodyEm,
  );
  return (
    <section className="mb-9">
      <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink m-0 mb-3.5 font-bold">
        {t.howto.section}
      </h2>
      <dl className="m-0 grid grid-cols-1 sm:grid-cols-3 gap-0 border-t-2 border-ink sm:border-b-2">
        <div className="py-3.5 border-b-2 border-ink sm:border-b-0 sm:border-r-2 sm:py-3.5 sm:px-4 sm:first:pl-0 sm:last:pr-0 sm:last:border-r-0">
          <dt className="sticker-dt">{t.howto.practical.term}</dt>
          <dd className="m-0 text-ink-soft text-[15px] leading-snug text-pretty font-medium">
            {practicalLead}
            <strong className="text-ink">{t.howto.practical.bodyEm}</strong>
            {practicalTrail}
          </dd>
        </div>
        <div className="py-3.5 border-b-2 border-ink sm:border-b-0 sm:border-r-2 sm:py-3.5 sm:px-4 sm:last:pr-0 sm:last:border-r-0">
          <dt className="sticker-dt">{t.howto.bestcase.term}</dt>
          <dd className="m-0 text-ink-soft text-[15px] leading-snug text-pretty font-medium">
            {t.howto.bestcase.body}
          </dd>
        </div>
        <div className="py-3.5 sm:border-b-0 sm:py-3.5 sm:px-4 sm:last:pr-0">
          <dt className="sticker-dt">{t.howto.vip.term}</dt>
          <dd className="m-0 text-ink-soft text-[15px] leading-snug text-pretty font-medium">
            <strong className="text-ink">{t.howto.vip.bodyLead}</strong>
            {t.howto.vip.bodyMid}
            <em className="not-italic text-ink">{t.howto.vip.bodyEm}</em>
            {t.howto.vip.bodyTrail}
          </dd>
        </div>
      </dl>
    </section>
  );
}
