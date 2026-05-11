import type { Arcade } from "../types/pricing";
import { fmt } from "../lib/format";
import { renderInline } from "../lib/markdown";
import { useT, useLocale } from "../i18n";

interface Props {
  arcade: Arcade;
  showVip: boolean;
}

export function TiersTable({ arcade, showVip }: Props) {
  const t = useT();
  const [locale] = useLocale();
  const unitLabel = arcade.unitName;
  const unitsPerRound =
    showVip && arcade.unitsPerRoundVip != null
      ? arcade.unitsPerRoundVip
      : arcade.unitsPerRound;

  const rows = arcade.tiers
    .filter((tr) => (showVip ? tr.perRoundVip != null : tr.perRound != null))
    .sort((a, b) => a.spend - b.spend);

  const notes = arcade.notes[locale];

  return (
    <div className="flex flex-col gap-3.5">
      <table className="w-full font-mono text-[12.5px] tabular-nums border-collapse">
        <thead>
          <tr>
            <th className="text-left font-mono font-medium text-[10px] tracking-[0.1em] uppercase text-ink-mute pb-2 pl-0 pr-2 border-b-2 border-ink">
              {t.tiers.spend}
            </th>
            <th className="text-right font-mono font-medium text-[10px] tracking-[0.1em] uppercase text-ink-mute pb-2 px-2 border-b-2 border-ink">
              {unitLabel}
            </th>
            <th className="text-right font-mono font-medium text-[10px] tracking-[0.1em] uppercase text-ink-mute pb-2 px-2 border-b-2 border-ink">
              {showVip ? t.tiers.perRoundVip : t.tiers.perRound}
            </th>
            <th className="text-right font-mono font-medium text-[10px] tracking-[0.1em] uppercase text-ink-mute pb-2 px-2 border-b-2 border-ink">
              {t.tiers.rounds}
            </th>
            <th className="border-b-2 border-ink pb-2"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((tr, i) => {
            const isBest = showVip ? tr.vipBest : tr.best;
            const rowBg = isBest ? "bg-rule-soft" : "";
            const trapTd = tr.trap ? "text-trap" : "text-ink";
            const tierUnits =
              showVip && tr.vipUnits != null ? tr.vipUnits : tr.units;
            const tierRounds =
              tierUnits != null ? Math.floor(tierUnits / unitsPerRound) : null;
            return (
              <tr key={i} className={rowBg}>
                <td className="py-1.5 pl-0 pr-2 border-b border-rule-soft">
                  ${tr.spend}
                  {tr.combo && (
                    <em className="ml-1.5 not-italic text-[10px] text-accent tracking-wider">
                      {tr.combo}
                    </em>
                  )}
                </td>
                <td className="text-right py-1.5 px-2 border-b border-rule-soft">
                  {tierUnits ?? "—"}
                </td>
                <td
                  className={`text-right py-1.5 px-2 border-b border-rule-soft font-semibold ${trapTd}`}
                >
                  {fmt(showVip ? tr.perRoundVip : tr.perRound)}
                </td>
                <td className="text-right py-1.5 px-2 border-b border-rule-soft">
                  {tierRounds ?? "—"}
                </td>
                <td className="py-1.5 pl-2 pr-0 border-b border-rule-soft">
                  <div className="flex gap-1 justify-end flex-wrap">
                    {isBest && (
                      <span className="font-mono text-[9px] tracking-[0.08em] uppercase font-bold px-1.5 py-0.5 rounded-full border-2 border-ink bg-accent text-white">
                        {t.tiers.flagBest}
                      </span>
                    )}
                    {tr.popular && (
                      <span className="font-mono text-[9px] tracking-[0.08em] uppercase font-bold px-1.5 py-0.5 rounded-full border-2 border-ink bg-pop text-ink">
                        {t.tiers.flagPopular}
                      </span>
                    )}
                    {tr.trap && (
                      <span className="font-mono text-[9px] tracking-[0.08em] uppercase font-bold px-1.5 py-0.5 rounded-full border-2 border-ink bg-trap text-white">
                        {t.tiers.flagTrap}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {arcade.cardFee != null && (
        <p className="font-mono text-[11px] text-ink-mute m-0 tracking-[0.02em]">
          {arcade.cardFeeVip != null
            ? t.tiers.cardFeeVip(arcade.cardFee, arcade.cardFeeVip)
            : t.tiers.cardFee(arcade.cardFee)}
        </p>
      )}

      <ul className="flex flex-col gap-2 m-0 p-0 list-none border-t-2 border-dashed border-ink pt-3">
        {notes.map((n, i) => (
          <li
            key={i}
            className="sticker-note text-[14px] leading-snug text-ink-soft text-pretty"
          >
            {renderInline(n)}
          </li>
        ))}
      </ul>
    </div>
  );
}
