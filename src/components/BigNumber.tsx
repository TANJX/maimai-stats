import { splitDollars } from "../lib/format";

interface Props {
  value: number | null | undefined;
  label: string;
  sub?: string;
  size: "lg" | "md";
}

export function BigNumber({ value, label, sub, size }: Props) {
  const isLg = size === "lg";
  // Label style: cyan chip for the lg "Practical", navy chip for the md "Best case".
  const chipClass = isLg ? "bg-accent-2 text-white" : "bg-ink text-white";

  if (value == null) {
    return (
      <div className="flex flex-col gap-1">
        <span
          className={`sticker-chip ${chipClass} font-mono text-[10px] tracking-[0.12em] uppercase self-start`}
        >
          {label}
        </span>
        <div className="font-mono font-medium text-ink-mute text-[32px] leading-none">—</div>
        {sub && (
          <div className="font-mono text-[11px] tracking-[0.04em] text-ink-soft font-semibold">
            {sub}
          </div>
        )}
      </div>
    );
  }

  const { dollars, cents } = splitDollars(value);

  return (
    <div className="flex flex-col gap-1.5">
      <span
        className={`sticker-chip ${chipClass} font-mono text-[10px] tracking-[0.12em] uppercase self-start`}
      >
        {label}
      </span>
      <div
        className={`font-mono font-semibold text-ink leading-none flex items-baseline ${
          isLg
            ? "text-[clamp(48px,7vw,72px)] tracking-[-0.03em]"
            : "text-[clamp(28px,4vw,38px)] text-ink-soft tracking-[-0.02em]"
        }`}
      >
        <span className={`text-[0.55em] mr-[0.05em] mt-[0.18em] ${isLg ? "text-accent" : "text-ink-mute"}`}>
          $
        </span>
        <span>{dollars}</span>
        <span className={`mx-[0.02em] ${isLg ? "text-accent" : "text-ink-mute"}`}>.</span>
        <span
          className={`self-end mb-[0.08em] ${
            isLg ? "text-accent-2 text-[0.5em] mb-[0.12em]" : "text-ink-soft text-[0.62em]"
          }`}
        >
          {cents}
        </span>
      </div>
      {sub && (
        <div className="font-mono text-[11px] tracking-[0.04em] text-ink-soft font-semibold">
          {sub}
        </div>
      )}
    </div>
  );
}
