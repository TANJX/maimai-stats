import { useMemo } from "react";
import type { Arcade } from "../types/pricing";
import { rankArcades, type RankBy } from "../lib/ranking";
import { useT } from "../i18n";
import { ArcadeCard } from "./ArcadeCard";

interface Props {
  arcades: Arcade[];
  rankBy: RankBy;
  onRankByChange: (next: RankBy) => void;
}

export function Leaderboard({ arcades, rankBy, onRankByChange }: Props) {
  const t = useT();
  const ranked = useMemo(() => rankArcades(arcades, rankBy), [arcades, rankBy]);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between gap-4 mb-3.5 flex-wrap">
        <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink m-0 font-bold">
          {t.leaderboard.section}
        </h2>
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase text-ink flex-wrap">
          <span className="font-semibold whitespace-nowrap">{t.leaderboard.rankBy}</span>
          <SortButton current={rankBy} value="practical" label={t.leaderboard.practical} onClick={onRankByChange} />
          <SortButton current={rankBy} value="best" label={t.leaderboard.best} onClick={onRankByChange} />
          <SortButton current={rankBy} value="vip" label={t.leaderboard.vip} onClick={onRankByChange} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {ranked.map((a, i) => (
          <ArcadeCard key={a.id} arcade={a} rank={i + 1} rankBy={rankBy} />
        ))}
      </div>
    </section>
  );
}

interface SortButtonProps {
  current: RankBy;
  value: RankBy;
  label: string;
  onClick: (next: RankBy) => void;
}

function SortButton({ current, value, label, onClick }: SortButtonProps) {
  const on = current === value;
  return (
    <button
      type="button"
      className={`sticker-sort-btn ${on ? "sticker-sort-btn-on" : ""}`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}

// Re-export so App can use the same union without separate import.
export type { RankBy };
