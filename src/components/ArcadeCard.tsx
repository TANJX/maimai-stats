import { useEffect, useState } from "react";
import type { Arcade, PricingHighlight, Server } from "../types/pricing";
import { hasVip, type RankBy } from "../lib/ranking";
import { useT } from "../i18n";
import type { Dict } from "../i18n/types";
import { BigNumber } from "./BigNumber";
import { Sparkline } from "./Sparkline";
import { TiersTable } from "./TiersTable";

function ServerBadge({ server }: { server: Server }) {
  // Server names are proper nouns — kept verbatim regardless of locale.
  const cls =
    server === "Mythos"
      ? "bg-accent-2 text-white"
      : "bg-pop text-ink";
  return (
    <span
      className={`sticker-pill ${cls} font-mono text-[10px] tracking-[0.1em] uppercase !py-[2px] !px-2.5`}
    >
      {server}
    </span>
  );
}

function packLabel(t: Dict, h: PricingHighlight | undefined): string | undefined {
  if (!h) return undefined;
  return h.vip ? t.card.vipPack(h.spend) : t.card.pack(h.spend);
}

interface Props {
  arcade: Arcade;
  rank: number;
  rankBy: RankBy;
}

export function ArcadeCard({ arcade, rank, rankBy }: Props) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const vipAvailable = hasVip(arcade);
  const [showVip, setShowVip] = useState(rankBy === "vip" && vipAvailable);
  // Re-sync the per-card view whenever the leaderboard's rankBy changes.
  useEffect(() => {
    setShowVip(rankBy === "vip" && vipAvailable);
  }, [rankBy, vipAvailable]);
  const showVipNumbers = vipAvailable && showVip;
  const isTop = rank === 1;

  const practical = showVipNumbers ? arcade.vipPractical : arcade.practical;
  const best = showVipNumbers ? arcade.vipBest : arcade.best;
  const unitsPerRound =
    showVipNumbers && arcade.unitsPerRoundVip != null
      ? arcade.unitsPerRoundVip
      : arcade.unitsPerRound;

  return (
    <article
      className={`sticker-card ${isTop ? "sticker-card-top" : ""} relative flex flex-col gap-3.5`}
    >
      <header className="relative">
        <div className="flex items-baseline gap-1.5 font-mono text-[11px] tracking-[0.1em] uppercase text-ink-mute mb-2 whitespace-nowrap">
          <span className="font-mono font-semibold text-[13px] text-accent">{t.card.rankNum(rank)}</span>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3
            className={`font-display font-extrabold text-ink leading-[1.05] tracking-[-0.02em] m-0 ${
              isTop ? "text-[36px] sm:text-[44px] lg:text-[48px]" : "text-[26px] sm:text-[30px] md:text-[34px]"
            }`}
          >
            {arcade.name}
          </h3>
          <ServerBadge server={arcade.server} />
        </div>
        <div className="mt-2.5 font-mono text-[11.5px] text-ink-mute tracking-[0.04em] flex items-baseline gap-2.5 flex-wrap justify-between">
          <span className="flex-1 min-w-0">{arcade.area}</span>
          <span className="text-ink-soft tabular-nums whitespace-nowrap">
            {t.card.perRound(unitsPerRound, arcade.unitName)}
          </span>
        </div>
      </header>

      {vipAvailable && (
        <div className="sticker-seg" role="tablist">
          <button
            role="tab"
            type="button"
            className={`sticker-seg-btn ${!showVip ? "sticker-seg-btn-on" : ""}`}
            onClick={() => setShowVip(false)}
          >
            {t.card.regular}
          </button>
          <button
            role="tab"
            type="button"
            className={`sticker-seg-btn ${showVip ? "sticker-seg-btn-on" : ""}`}
            onClick={() => setShowVip(true)}
          >
            {t.card.vipTab}
          </button>
        </div>
      )}

      <div
        className={`sticker-perf grid items-end py-2.5 gap-3.5 ${
          isTop
            ? "grid-cols-1 min-[400px]:grid-cols-[1.6fr_2px_1fr]"
            : "grid-cols-1 min-[400px]:grid-cols-[1.4fr_2px_1fr]"
        }`}
      >
        <BigNumber
          value={practical?.cost}
          label={t.card.practicalLabel}
          sub={packLabel(t, practical)}
          size="lg"
        />
        <div className="hidden min-[400px]:block w-[2px] bg-ink self-stretch" />
        <BigNumber
          value={best?.cost}
          label={t.card.bestLabel}
          sub={packLabel(t, best)}
          size="md"
        />
      </div>

      <div className="text-ink">
        <div className="flex justify-between items-center font-mono text-[10px] tracking-[0.1em] uppercase text-ink mb-1.5 font-semibold">
          <span>{t.card.pricingCurve}</span>
          <span className="flex gap-2.5 items-center normal-case tracking-[0.04em]">
            <i className="inline-block w-[7px] h-[7px] rounded-full bg-best mr-1 align-middle" />
            {t.card.legendBest}
            <i className="inline-block w-[7px] h-[7px] rounded-full bg-pop mr-1 align-middle" />
            {t.card.legendPopular}
            <i className="inline-block w-[7px] h-[7px] rounded-full bg-trap mr-1 align-middle" />
            {t.card.legendTrap}
          </span>
        </div>
        <Sparkline tiers={arcade.tiers} showVip={showVipNumbers} />
      </div>

      <button
        type="button"
        className="sticker-more flex justify-between items-center font-mono text-[12px] tracking-[0.06em] uppercase text-ink font-bold pt-3 pb-1 w-full transition-colors hover:text-accent"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{open ? t.card.hideAll : t.card.showAll}</span>
        <span
          className="inline-block text-[18px] font-light transition-transform duration-150"
          style={{ transform: open ? "rotate(90deg)" : "" }}
        >
          ›
        </span>
      </button>

      {open && <TiersTable arcade={arcade} showVip={showVipNumbers} />}
    </article>
  );
}
