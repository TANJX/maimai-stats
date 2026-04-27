import { useMemo, useState } from "react";
import { dataset } from "./data/arcades";
import { rankArcades, type RankBy } from "./lib/ranking";
import { Hero } from "./components/Hero";
import { HowToRead } from "./components/HowToRead";
import { Leaderboard } from "./components/Leaderboard";
import { ComparisonTable } from "./components/ComparisonTable";
import { Footer } from "./components/Footer";

export function App() {
  const [rankBy, setRankBy] = useState<RankBy>("vip");
  const ranked = useMemo(() => rankArcades(dataset.arcades, rankBy), [rankBy]);

  return (
    <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-10 pt-6 pb-20">
      <Hero lastUpdated={dataset.lastUpdated} />
      <HowToRead />
      <Leaderboard arcades={dataset.arcades} rankBy={rankBy} onRankByChange={setRankBy} />
      <ComparisonTable arcades={ranked} />
      <Footer lastUpdated={dataset.lastUpdated} />
    </div>
  );
}
