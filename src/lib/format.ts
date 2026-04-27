export function fmt(n: number | null | undefined, d = 2): string {
  return n == null ? "—" : `$${n.toFixed(d)}`;
}

export function fmtCents(n: number | null | undefined, d = 4): string {
  return n == null ? "—" : `$${n.toFixed(d)}`;
}

export function splitDollars(value: number): { dollars: number; cents: string } {
  const dollars = Math.floor(value);
  const cents = Math.round((value - dollars) * 100)
    .toString()
    .padStart(2, "0");
  return { dollars, cents };
}
