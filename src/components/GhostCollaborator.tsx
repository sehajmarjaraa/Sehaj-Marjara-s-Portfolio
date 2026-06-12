import { useEffect, useState } from "react";
import { ghostLabel } from "../content";
import { usePrefersReducedMotion } from "../motion";

const CELL_W = 96;
const CELL_H = 32;

/**
 * A faint second-user selection box that wanders to a new cell every 8-15s,
 * like a collaborator in a shared workbook. Picks empty grid cells only
 * (rejects spots that intersect real content blocks). Desktop only.
 */
export function GhostCollaborator({
  containerRef,
  active,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  active: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (reduced || window.innerWidth < 768) return;
    let timer: number;

    const hop = () => {
      const container = containerRef.current;
      if (!container) return;
      const width = container.clientWidth;
      const viewTop = container.scrollTop;
      const viewH = container.clientHeight;
      const blocks = [...container.querySelectorAll<HTMLElement>("[data-cellref]")].map((el) => {
        const r = el.getBoundingClientRect();
        const c = container.getBoundingClientRect();
        return {
          left: r.left - c.left,
          top: r.top - c.top + viewTop,
          right: r.right - c.left,
          bottom: r.bottom - c.top + viewTop,
        };
      });

      // try a few random grid cells inside the visible area; keep empty ones
      for (let attempt = 0; attempt < 10; attempt++) {
        const x = Math.floor(Math.random() * Math.max(1, (width - CELL_W) / CELL_W)) * CELL_W;
        const y =
          Math.floor((viewTop + 40 + Math.random() * Math.max(CELL_H, viewH - 120)) / CELL_H) *
          CELL_H;
        const pad = 8;
        const clear = blocks.every(
          (b) =>
            x + CELL_W + pad < b.left || x > b.right + pad || y + CELL_H + pad < b.top || y > b.bottom + pad
        );
        if (clear) {
          setPos({ x, y });
          break;
        }
      }
      timer = window.setTimeout(hop, 8000 + Math.random() * 7000);
    };

    timer = window.setTimeout(hop, 2500 + Math.random() * 3000);
    return () => window.clearTimeout(timer);
    // re-seed per sheet so it reacts to tab switches
  }, [reduced, active, containerRef]);

  if (reduced || !pos) return null;
  return (
    <div
      className="ghost-cursor hidden md:block"
      style={{ left: pos.x, top: pos.y, width: CELL_W, height: CELL_H }}
      aria-hidden
    >
      <span className="ghost-cursor-label">{ghostLabel}</span>
    </div>
  );
}
