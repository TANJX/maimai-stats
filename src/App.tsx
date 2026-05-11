import { useMemo, useState } from "react";
import { dataset } from "./data/arcades";
import { rankArcades, type RankBy } from "./lib/ranking";
import { useShowMythos } from "./lib/flags";
import { Hero } from "./components/Hero";
import { HowToRead } from "./components/HowToRead";
import { Leaderboard, type ServerFilter } from "./components/Leaderboard";
import { ComparisonTable } from "./components/ComparisonTable";
import { Footer } from "./components/Footer";

export function App() {
  const [rankBy, setRankBy] = useState<RankBy>("vip");
  const [serverFilter, setServerFilter] = useState<ServerFilter>("all");
  const showMythos = useShowMythos();

  const arcades = useMemo(() => {
    const gated = showMythos
      ? dataset.arcades
      : dataset.arcades.filter((a) => a.server !== "Mythos");
    if (serverFilter === "all") return gated;
    return gated.filter((a) => a.server === serverFilter);
  }, [showMythos, serverFilter]);
  const ranked = useMemo(() => rankArcades(arcades, rankBy), [arcades, rankBy]);

  return (
    <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-10 pt-6 pb-20">
      <Hero lastUpdated={dataset.lastUpdated} />
      <HowToRead />
      <Leaderboard
        arcades={arcades}
        rankBy={rankBy}
        onRankByChange={setRankBy}
        serverFilter={serverFilter}
        onServerFilterChange={setServerFilter}
        showMythosFilter={showMythos}
      />
      <ComparisonTable arcades={ranked} />
      <Footer lastUpdated={dataset.lastUpdated} />
    </div>
  );
}
