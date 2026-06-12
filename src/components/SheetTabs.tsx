import { sections, modelSection, newSheetToast } from "../content";
import type { SectionId } from "../content";

const allTabs = [...sections, modelSection];

export function SheetTabs({
  active,
  onTabChange,
  onToast,
}: {
  active: SectionId;
  onTabChange: (id: SectionId) => void;
  onToast: (msg: string) => void;
}) {
  return (
    <div className="flex items-center bg-header-bg border-t border-gridline shrink-0 select-none overflow-x-auto no-scrollbar">
      {/* Sheet nav arrows (decorative) */}
      <div className="hidden sm:flex items-center px-2 gap-2 text-gray-400 text-[11px]">
        <span>◀</span>
        <span>▶</span>
      </div>
      {allTabs.map((s) => (
        <button
          key={s.id}
          onClick={() => onTabChange(s.id)}
          className={`px-3 py-1.5 text-[12px] whitespace-nowrap border-r border-gridline transition-colors ${
            active === s.id
              ? "bg-white text-excel-green font-semibold border-t-2 border-t-excel-green -mt-px"
              : "text-gray-600 hover:bg-white/70 bg-[#ececec]"
          }`}
        >
          {s.label}
        </button>
      ))}
      <button
        onClick={() => onToast(newSheetToast)}
        className="px-3 py-1.5 text-[13px] text-gray-500 hover:bg-white/70 transition-colors"
        title="New sheet"
        aria-label="New sheet"
      >
        +
      </button>
    </div>
  );
}
