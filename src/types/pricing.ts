export interface TierFlags {
  popular?: boolean;
  best?: boolean;
  vipBest?: boolean;
  trap?: boolean;
  vipOnly?: boolean;
}

export interface PricingTier extends TierFlags {
  spend: number;
  units?: number | null;
  vipUnits?: number;
  perUnit: number;
  perRound?: number | null;
  perRoundVip?: number | null;
  combo?: string;
}

export interface PricingHighlight {
  cost: number;
  /** Dollar amount of the pack this highlight refers to. */
  spend: number;
  /** True if the pack is a VIP/membership pack. UI composes "$55 pack" vs. "$55 VIP pack". */
  vip?: boolean;
}

export interface Membership {
  firstMonth?: number;
  ongoingMonth?: number;
  annual?: number;
}

export type Server = "Mythos" | "International";

export interface Arcade {
  id: string;
  name: string;
  area: string;
  server: Server;
  unitName: string;
  unitsPerRound: number;
  unitsPerRoundVip?: number;
  tiers: PricingTier[];
  practical: PricingHighlight;
  best: PricingHighlight;
  vipPractical?: PricingHighlight;
  vipBest?: PricingHighlight;
  cardFee?: number;
  cardFeeVip?: number;
  membership?: Membership;
  /** Editorial commentary, one entry = one bullet. Translated per locale. */
  notes: { en: string[]; zh: string[] };
}

export interface PricingDataset {
  lastUpdated: string;
  arcades: Arcade[];
}
