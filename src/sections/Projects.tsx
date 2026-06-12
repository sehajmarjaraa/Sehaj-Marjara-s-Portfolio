import type { ReactNode } from "react";
import { projects } from "../content";
import { Cell } from "../selection";
import { ExternalIcon } from "../icons";

const CELL_REFS = ["B10", "D10", "F10", "B14", "D14", "F14"];

/** Per-project logo: accent color + glyph, like an embedded app icon. */
const LOGOS: Record<string, { color: string; glyph: ReactNode }> = {
  // callsignal — audio waveform turning into a signal
  sentiment: {
    color: "#0e7490",
    glyph: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <line x1="8" y1="20" x2="8" y2="28" />
          <line x1="15" y1="14" x2="15" y2="34" />
          <line x1="22" y1="8" x2="22" y2="40" />
          <line x1="29" y1="16" x2="29" y2="32" />
          <line x1="36" y1="21" x2="36" y2="27" />
        </g>
        <path d="M34 14l8-8m0 0v6m0-6h-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // redline — document with a red strike-through revision line
  tenk: {
    color: "#b91c1c",
    glyph: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
        <path d="M12 6h17l8 8v28H12V6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M29 6v8h8" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45">
          <line x1="17" y1="22" x2="31" y2="22" />
          <line x1="17" y1="34" x2="31" y2="34" />
        </g>
        <line x1="15" y1="28" x2="33" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  // scenario-engine — assumption sliders
  dcf: {
    color: "#1d4ed8",
    glyph: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="8" y1="14" x2="40" y2="14" />
          <line x1="8" y1="24" x2="40" y2="24" />
          <line x1="8" y1="34" x2="40" y2="34" />
        </g>
        <circle cx="18" cy="14" r="4.5" fill="currentColor" />
        <circle cx="31" cy="24" r="4.5" fill="currentColor" />
        <circle cx="14" cy="34" r="4.5" fill="currentColor" />
      </svg>
    ),
  },
  // rebalance-desk — balance scale
  rebalancer: {
    color: "#7c3aed",
    glyph: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
        <path d="M24 8v30M14 40h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M10 14h28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M10 14l-5 12a6 6 0 0012 0l-5-12M38 14l-5 12a6 6 0 0012 0l-5-12" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  // forensic-flags — magnifier raising a flag
  forensic: {
    color: "#b45309",
    glyph: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2.5" />
        <line x1="29" y1="29" x2="40" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 26v-12m0 0h7l-2.5 3.5L27 21h-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // macro-desk — globe with a cross-asset trend line
  macro: {
    color: "#0f766e",
    glyph: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
        <ellipse cx="24" cy="24" rx="7" ry="16" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <path d="M8.5 24h31" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <path d="M12 30l7-6 5 3 9-9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M33 18h-5m5 0v5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

/** Projects rendered as embedded Excel objects, each with its own app logo. */
export function Projects({ query }: { query: string }) {
  const q = query.trim().toLowerCase();
  const visible = q
    ? projects.filter((p) =>
        [p.title, p.codename, p.description, ...p.tags].join(" ").toLowerCase().includes(q)
      )
    : projects;

  return (
    <div className="p-4 sm:p-8 max-w-6xl">
      {visible.length === 0 && (
        <div className="text-[13px] text-gray-400 italic bg-white border border-gridline p-4 inline-block">
          No matching projects. Excel would say: #N/A
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {visible.map((p, i) => {
          const logo = LOGOS[p.id];
          return (
            <Cell
              key={p.id}
              id={`entry-${p.id}`}
              cellRef={CELL_REFS[i % CELL_REFS.length]}
              className="bg-white border border-gridline shadow-sm flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Workbook-style header with the app codename */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gridline bg-header-bg">
                <span className="w-2 h-2 rounded-full" style={{ background: logo.color }} />
                <span className="text-[10.5px] font-mono text-gray-500">{p.codename}.xlsx</span>
              </div>
              {/* Logo banner */}
              <div
                className="flex items-center justify-center h-20"
                style={{ background: `${logo.color}10`, color: logo.color }}
              >
                {logo.glyph}
              </div>
              <div className="p-4 flex flex-col gap-2.5 flex-1">
                <h3 className="text-[14.5px] font-bold text-gray-900 leading-snug">{p.title}</h3>
                <p className="text-[12.5px] text-gray-600 leading-relaxed flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10.5px] font-medium text-excel-green bg-excel-green/10 border border-excel-green/25 px-1.5 py-0.5 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener"
                  className="mt-1.5 inline-flex items-center justify-center gap-1.5 text-white text-[12.5px] font-medium px-3 py-1.5 rounded-sm transition-opacity hover:opacity-85 self-start"
                  style={{ background: logo.color }}
                >
                  Open Workbook <ExternalIcon />
                </a>
              </div>
            </Cell>
          );
        })}
      </div>
    </div>
  );
}
