import type { Arcade } from "../types/pricing";

export type RankBy = "practical" | "best" | "vip";

export function priceFor(arcade: Arcade, rankBy: RankBy): number {
  switch (rankBy) {
    case "best":
      return arcade.best.cost;
    case "vip":
      return arcade.vipPractical?.cost ?? arcade.practical.cost;
    case "practical":
      return arcade.practical.cost;
  }
}

export function rankArcades(arcades: Arcade[], rankBy: RankBy): Arcade[] {
  return [...arcades].sort((a, b) => priceFor(a, rankBy) - priceFor(b, rankBy));
}

export function hasVip(arcade: Arcade): boolean {
  return arcade.vipPractical != null;
}
