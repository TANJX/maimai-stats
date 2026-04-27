import type { PricingTier } from "../types/pricing";
import { fmt } from "../lib/format";

interface Props {
  tiers: PricingTier[];
  showVip: boolean;
  width?: number;
  height?: number;
}

const STROKE = "#10306b"; // ink
const FILL = "rgba(16, 48, 107, 0.08)";
const TRAP = "#ff5a3d";
const BEST = "#ff4fb8";
const POP = "#ffe84a";
const DOT_FILL = "#ffffff";

export function Sparkline({ tiers, showVip, width = 280, height = 64 }: Props) {
  const pts = tiers
    .filter((t) => (showVip ? t.perRoundVip != null : t.perRound != null))
    .map((t) => ({ ...t, y: (showVip ? t.perRoundVip : t.perRound) as number }))
    .sort((a, b) => a.spend - b.spend);

  if (pts.length < 2) return null;

  const xs = pts.map((p) => p.spend);
  const ys = pts.map((p) => p.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const pad = 10;

  const sx = (x: number) =>
    pad + ((x - xMin) / (xMax - xMin || 1)) * (width - pad * 2);
  const sy = (y: number) =>
    height - pad - ((y - yMin) / (yMax - yMin || 1)) * (height - pad * 2);

  const path = pts
    .map((p, i) => `${i ? "L" : "M"}${sx(p.spend).toFixed(1)},${sy(p.y).toFixed(1)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      style={{ display: "block", overflow: "visible" }}
    >
      <path
        d={`${path} L${sx(xMax).toFixed(1)},${height - pad} L${sx(xMin).toFixed(1)},${height - pad} Z`}
        fill={FILL}
      />
      <path
        d={path}
        fill="none"
        stroke={STROKE}
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {pts.map((p, i) => {
        const cx = sx(p.spend);
        const cy = sy(p.y);
        const isTrap = p.trap;
        const isBest = showVip ? p.vipBest : p.best;
        const isPop = p.popular;
        const r = isTrap || isBest || isPop ? 4 : 2.4;
        const color = isTrap ? TRAP : isBest ? BEST : isPop ? POP : STROKE;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r + 1.5} fill={DOT_FILL} stroke={STROKE} strokeWidth="1" />
            <circle cx={cx} cy={cy} r={r} fill={color} stroke={STROKE} strokeWidth="1" />
            {isTrap && (
              <text
                x={cx}
                y={cy - 9}
                textAnchor="middle"
                fontSize="9"
                fill={TRAP}
                fontWeight="700"
              >
                trap
              </text>
            )}
          </g>
        );
      })}
      <text
        x={width - 2}
        y={sy(yMax) - 3}
        textAnchor="end"
        fontSize="9"
        fill={STROKE}
        opacity="0.7"
        fontFamily="ui-monospace, Menlo, monospace"
      >
        {fmt(yMax)}
      </text>
      <text
        x={width - 2}
        y={sy(yMin) + 10}
        textAnchor="end"
        fontSize="9"
        fill={STROKE}
        opacity="0.7"
        fontFamily="ui-monospace, Menlo, monospace"
      >
        {fmt(yMin)}
      </text>
      <text
        x={2}
        y={height - 2}
        fontSize="9"
        fill={STROKE}
        opacity="0.6"
        fontFamily="ui-monospace, Menlo, monospace"
      >
        ${xMin}
      </text>
      <text
        x={width - 2}
        y={height - 2}
        textAnchor="end"
        fontSize="9"
        fill={STROKE}
        opacity="0.6"
        fontFamily="ui-monospace, Menlo, monospace"
      >
        ${xMax}
      </text>
    </svg>
  );
}
