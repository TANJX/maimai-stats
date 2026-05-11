// English dictionary. This file is the source-of-truth shape; zh.ts is typed
// against `Dict = typeof en` so missing or mistyped keys fail the type check.

export const en = {
  hero: {
    eyebrow: "MAIMAI · ARCADE PRICING",
    updated: (date: string) => `Updated ${date}`,
    headlineLead: "Where to play maimai ",
    headlineEm: "without",
    headlineTrail: " getting fleeced.",
    subhead:
      "Arcades around NYC and northern NJ, ranked by what one round actually costs you. All prices in USD; card-activation fees excluded from per-round math.",
  },
  howto: {
    section: "How to read this",
    practical: {
      term: "Practical $/round",
      body: "Cost at the tier closest to a $50 top-up — the realistic walk-in number for one casual visit.",
      bodyEm: "$50 top-up",
    },
    bestcase: {
      term: "Best-case $/round",
      body: "Cheapest theoretically achievable per-round price if you commit to the top pack.",
    },
    vip: {
      term: "VIP $/round",
      bodyLead: "Not every “VIP” is the same.",
      bodyMid: " Costs vary wildly — from a small annual fee, to a one-time card upgrade, to a $20+/month subscription. The $/round figure is the rate ",
      bodyEm: "after",
      bodyTrail:
        " you've paid in; membership fees are excluded. Check each card's notes for the break-even math.",
    },
  },
  leaderboard: {
    section: "Leaderboard",
    rankBy: "Rank by",
    practical: "Practical",
    best: "Best case",
    vip: "VIP if avail.",
    filterBy: "Server",
    all: "All",
    international: "International",
    mythos: "Mythos",
  },
  card: {
    rankNum: (rank: number) => `#${rank}`,
    perRound: (units: number, unit: string) => `${units} ${unit} / round`,
    regular: "Regular",
    vipTab: "VIP",
    practicalLabel: "Practical",
    bestLabel: "Best case",
    pack: (spend: number) => `$${spend} pack`,
    vipPack: (spend: number) => `$${spend} VIP pack`,
    pricingCurve: "Pricing curve",
    legendBest: "best",
    legendPopular: "popular",
    legendTrap: "trap",
    showAll: "Show all tiers & notes",
    hideAll: "Hide all tiers & notes",
  },
  tiers: {
    spend: "Spend",
    rounds: "Rounds",
    perRound: "$/round",
    perRoundVip: "$/round VIP",
    flagBest: "best",
    flagPopular: "popular",
    flagTrap: "trap",
    cardFee: (fee: number) => `Card activation $${fee} (excluded from per-round math).`,
    cardFeeVip: (fee: number, vipFee: number) =>
      `Card activation $${fee} regular · $${vipFee} VIP (excluded from per-round math).`,
  },
  compare: {
    section: "Side-by-side",
    arcade: "Arcade",
    area: "Area",
    perRound: "Per round",
    practical: "Practical",
    best: "Best",
    vipPractical: "VIP practical",
    vipBest: "VIP best",
  },
  footer: {
    sig: "maimai pricing log · personal & ongoing",
    lastWalkedLead: "Last walked the floor:",
    caveatPre:
      "Numbers reflect posted card-vending-machine prices. Cashier-only memberships, time-play, and promo-day discounts not included. Figures are checked on each visit; corrections welcome on ",
    caveatPost: ".",
  },
};
