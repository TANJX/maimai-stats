import type { Arcade } from "../types/pricing";
import { fmt } from "../lib/format";
import { useT } from "../i18n";

interface Props {
  arcades: Arcade[];
}

export function ComparisonTable({ arcades }: Props) {
  const t = useT();
  return (
    <section className="mb-12">
      <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink m-0 mb-3.5 font-bold">
        {t.compare.section}
      </h2>
      <div className="sticker-table-wrap">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>{t.compare.arcade}</Th>
                <Th>{t.compare.area}</Th>
                <Th align="right">{t.compare.perRound}</Th>
                <Th align="right">{t.compare.practical}</Th>
                <Th align="right">{t.compare.best}</Th>
                <Th align="right">{t.compare.vipPractical}</Th>
                <Th align="right">{t.compare.vipBest}</Th>
              </tr>
            </thead>
            <tbody>
              {arcades.map((a) => (
                <tr key={a.id} className="border-b-2 border-rule-soft last:border-b-0">
                  <Td bold>{a.name}</Td>
                  <Td>{a.area}</Td>
                  <Td align="right">
                    {a.unitsPerRound}
                    {a.unitsPerRoundVip && a.unitsPerRoundVip !== a.unitsPerRound
                      ? ` / ${a.unitsPerRoundVip}`
                      : ""}{" "}
                    {a.unitName}
                  </Td>
                  <Td align="right" bold>
                    {fmt(a.practical?.cost)}
                  </Td>
                  <Td align="right">{fmt(a.best?.cost)}</Td>
                  <Td align="right" bold>
                    {fmt(a.vipPractical?.cost)}
                  </Td>
                  <Td align="right">{fmt(a.vipBest?.cost)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      className={`bg-ink text-white font-mono text-[10px] tracking-[0.1em] uppercase font-semibold py-2.5 px-3 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
  bold,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  bold?: boolean;
}) {
  return (
    <td
      className={`py-2.5 px-3 font-mono text-[13px] text-ink ${
        align === "right" ? "text-right tabular-nums" : "text-left"
      } ${bold ? "font-semibold" : ""}`}
    >
      {children}
    </td>
  );
}
