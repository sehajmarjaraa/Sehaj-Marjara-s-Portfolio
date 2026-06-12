import { statusStats } from "../content";
import type { SectionId } from "../content";

export function StatusBar({
  active,
  zoom,
  onZoom,
}: {
  active: SectionId;
  zoom: number;
  onZoom: (z: number) => void;
}) {
  return (
    <div className="flex items-center bg-chrome text-gray-300 text-[11px] h-6 px-3 gap-3 shrink-0 select-none">
      <span className="text-gray-300 shrink-0">Ready</span>
      <span className="hidden lg:inline text-gray-500">|</span>
      <span className="hidden lg:inline text-gray-400 whitespace-nowrap">
        Circular References: none (verified)
      </span>

      <div className="ml-auto flex items-center gap-3 min-w-0">
        <span className="truncate text-gray-300 hidden xs:inline sm:inline">
          {statusStats[active]}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onZoom(Math.max(75, zoom - 5))}
            className="hover:bg-white/10 rounded px-1"
            aria-label="Zoom out"
          >
            −
          </button>
          <input
            type="range"
            min={75}
            max={125}
            step={5}
            value={zoom}
            onChange={(e) => onZoom(Number(e.target.value))}
            className="w-16 sm:w-24 accent-excel-green h-1"
            aria-label="Zoom"
          />
          <button
            onClick={() => onZoom(Math.min(125, zoom + 5))}
            className="hover:bg-white/10 rounded px-1"
            aria-label="Zoom in"
          >
            +
          </button>
          <span className="w-9 text-right tabular-nums">{zoom}%</span>
        </div>
      </div>
    </div>
  );
}
