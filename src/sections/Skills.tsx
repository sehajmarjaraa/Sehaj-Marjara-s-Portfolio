import { useState } from "react";
import { skills } from "../content";
import type { Skill, SkillRef } from "../content";
import { Cell } from "../selection";

/**
 * Intensity = number of cross-referenced projects/roles.
 * 0 refs (lightest) → 3+ refs (full Excel green).
 */
const LEVEL_BG = ["#eef5f0", "#c4e0cf", "#7fbf9a", "#217346"];
const LEVEL_TEXT = ["#41604f", "#1d5c39", "#0f3d25", "#ffffff"];

const intensity = (s: Skill) => s.intensity ?? Math.min(s.refs.length, 3);

export function Skills({
  onFormulaHover,
  goToEntry,
}: {
  onFormulaHover: (formula: string | null) => void;
  goToEntry: (sheet: SkillRef["sheet"], entryId: string) => void;
}) {
  const [openSkill, setOpenSkill] = useState<string | null>(null);

  return (
    <div className="p-4 sm:p-8 max-w-5xl" onClick={() => setOpenSkill(null)}>
      <div className="text-[11.5px] text-gray-500 mb-3">
        Hover a cell to inspect its formula · click for cross-references
      </div>
      <div className="flex flex-col gap-6">
        {skills.map((cat, ci) => (
          <div key={cat.category} className="relative">
            {/* Named-range label, the way Excel marks a named range */}
            <div className="absolute -top-2.5 left-2 z-10 bg-white border border-excel-green/50 text-excel-green text-[10px] font-mono px-1.5 leading-4">
              {cat.rangeName}
            </div>
            <Cell
              cellRef={`B${24 + ci * 2}`}
              className="bg-white border border-excel-green/40 outline outline-1 outline-offset-2 outline-excel-green/20 shadow-sm"
            >
              <div className="px-4 pt-3 pb-1.5 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-gray-800">{cat.category}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 p-2 gap-px bg-gridline/50">
                {[...cat.skills].sort((a, b) => intensity(b) - intensity(a)).map((s) => (
                  <SkillCell
                    key={s.name}
                    skill={s}
                    open={openSkill === s.name}
                    onHover={onFormulaHover}
                    onToggle={() => setOpenSkill(openSkill === s.name ? null : s.name)}
                    goToEntry={goToEntry}
                  />
                ))}
              </div>
            </Cell>
          </div>
        ))}

        {/* Legend — intensity is real: it counts cross-references */}
        <div className="flex items-center gap-2 text-[11px] text-gray-500 flex-wrap">
          <span>Used in</span>
          {LEVEL_BG.map((bg, i) => (
            <span key={bg} className="flex items-center gap-1">
              <span className="w-5 h-3.5 border border-gridline" style={{ background: bg }} />
              <span>{i === 3 ? "3+" : i}</span>
            </span>
          ))}
          <span>linked projects / roles</span>
        </div>
      </div>
    </div>
  );
}

function SkillCell({
  skill,
  open,
  onHover,
  onToggle,
  goToEntry,
}: {
  skill: Skill;
  open: boolean;
  onHover: (f: string | null) => void;
  onToggle: () => void;
  goToEntry: (sheet: SkillRef["sheet"], entryId: string) => void;
}) {
  const lvl = intensity(skill);
  return (
    <div className="relative">
      <button
        onMouseEnter={() => onHover(skill.formula)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(skill.formula)}
        onBlur={() => onHover(null)}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-expanded={open}
        className={`recalc-cell w-full px-3 py-3 text-[12.5px] font-medium text-center cursor-cell transition-shadow ${
          open ? "cell-selected" : ""
        }`}
        style={{ background: LEVEL_BG[lvl], color: LEVEL_TEXT[lvl] }}
        title={skill.formula}
      >
        {skill.name}
      </button>

      {/* Cross-reference popover */}
      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 z-30 w-60 bg-white border border-gridline shadow-lg text-left"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-1.5 bg-header-bg border-b border-gridline text-[10.5px] font-mono text-gray-500">
            {skill.details ? "Proficiency" : "Trace Dependents"} · {skill.name}
          </div>
          {skill.details ? (
            skill.details.map((d) => (
              <div
                key={d}
                className="px-3 py-2 text-[12px] text-gray-700 border-b border-gridline/60 flex items-center gap-2"
              >
                <span className="text-excel-green text-[11px]">✓</span> {d}
              </div>
            ))
          ) : skill.refs.length === 0 ? (
            <div className="px-3 py-2.5 text-[12px] text-gray-400 italic">
              No linked entries — used everywhere, cited nowhere.
            </div>
          ) : (
            skill.refs.map((r) => (
              <button
                key={`${r.sheet}-${r.id}`}
                onClick={() => goToEntry(r.sheet, r.id)}
                className="w-full text-left px-3 py-2 text-[12px] text-gray-700 hover:bg-[#e9f4ee] hover:text-excel-green border-b border-gridline/60 flex items-center gap-2 transition-colors"
              >
                <span className="text-excel-green text-[10px]">↗</span>
                <span className="flex-1 truncate">{r.label}</span>
                <span className="text-[10px] text-gray-400 capitalize">{r.sheet}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
