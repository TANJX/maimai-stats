import type { ReactNode } from "react";

// Render a tiny inline-markdown subset: **bold** and *italic*. No nesting.
export function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let i = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > i) out.push(text.slice(i, m.index));
    const t = m[0];
    if (t.startsWith("**")) {
      out.push(
        <strong key={key++} className="text-ink font-bold">
          {t.slice(2, -2)}
        </strong>,
      );
    } else {
      out.push(
        <em key={key++} className="text-accent not-italic font-semibold">
          {t.slice(1, -1)}
        </em>,
      );
    }
    i = m.index + t.length;
  }
  if (i < text.length) out.push(text.slice(i));
  return out;
}
