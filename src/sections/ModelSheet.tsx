import { useMemo, useRef, useState } from "react";
import { dcfModel } from "../content";
import { Cell } from "../selection";
import { CountUp } from "../components/CountUp";
import { flashCell } from "../motion";

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(v) ? v : min, min), max);

/** A genuinely functional toy DCF. Inputs are constrained to sane ranges. */
export function ModelSheet() {
  const [growth, setGrowth] = useState(dcfModel.inputs.growth.initial);
  const [discount, setDiscount] = useState(dcfModel.inputs.discount.initial);
  const [exitMult, setExitMult] = useState(dcfModel.inputs.exitMultiple.initial);
  const tableRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const recalc = () => {
    flashCell(tableRef.current);
    flashCell(outputRef.current);
  };

  const model = useMemo(() => {
    const g = growth / 100;
    const r = discount / 100;
    const years = [1, 2, 3, 4, 5].map((t) => {
      const revenue = dcfModel.baseRevenue * Math.pow(1 + g, t);
      const fcf = revenue * dcfModel.fcfMargin;
      const pv = fcf / Math.pow(1 + r, t);
      return { t, revenue, fcf, pv };
    });
    const terminal = years[4].fcf * exitMult;
    const pvTerminal = terminal / Math.pow(1 + r, 5);
    const valuation = years.reduce((s, y) => s + y.pv, 0) + pvTerminal;
    return { years, terminal, pvTerminal, valuation };
  }, [growth, discount, exitMult]);

  return (
    <div className="p-4 sm:p-8 max-w-4xl flex flex-col gap-5">
      {/* Inputs */}
      <Cell cellRef="C34" className="bg-white border border-gridline shadow-sm overflow-hidden">
        <div className="px-4 py-2 border-b border-gridline bg-header-bg flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono text-gray-500">{dcfModel.title}</span>
          <span className="text-[13px] font-semibold text-gray-800">Assumptions</span>
          <span className="ml-auto text-[10.5px] text-gray-400 hidden sm:inline">
            blue cells are inputs — edit them
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <InputCell
            label={dcfModel.inputs.growth.label}
            value={growth}
            min={dcfModel.inputs.growth.min}
            max={dcfModel.inputs.growth.max}
            suffix={dcfModel.inputs.growth.suffix}
            onChange={(v) => {
              setGrowth(v);
              recalc();
            }}
          />
          <InputCell
            label={dcfModel.inputs.discount.label}
            value={discount}
            min={dcfModel.inputs.discount.min}
            max={dcfModel.inputs.discount.max}
            suffix={dcfModel.inputs.discount.suffix}
            onChange={(v) => {
              setDiscount(v);
              recalc();
            }}
          />
          <InputCell
            label={dcfModel.inputs.exitMultiple.label}
            value={exitMult}
            min={dcfModel.inputs.exitMultiple.min}
            max={dcfModel.inputs.exitMultiple.max}
            suffix={dcfModel.inputs.exitMultiple.suffix}
            onChange={(v) => {
              setExitMult(v);
              recalc();
            }}
          />
        </div>
      </Cell>

      {/* Projection table */}
      <Cell cellRef="C38" className="bg-white border border-gridline shadow-sm overflow-hidden">
        <div className="px-4 py-2 border-b border-gridline bg-header-bg">
          <span className="text-[13px] font-semibold text-gray-800">5-Year Projection</span>
          <span className="text-[11px] font-mono text-gray-500 ml-2">($M)</span>
        </div>
        <div ref={tableRef} className="overflow-x-auto">
          <table className="border-collapse w-full min-w-[460px] text-[12px]">
            <thead>
              <tr className="bg-excel-green text-white font-semibold">
                <th className="px-3 py-1.5 text-left border-r border-white/20">Line item</th>
                {model.years.map((y) => (
                  <th key={y.t} className="px-3 py-1.5 text-right border-r border-white/20 font-mono">
                    Y{y.t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono">
              <Row label="Revenue" values={model.years.map((y) => y.revenue)} />
              <Row label={`FCF (${Math.round(dcfModel.fcfMargin * 100)}% margin)`} values={model.years.map((y) => y.fcf)} banded />
              <Row label="PV of FCF" values={model.years.map((y) => y.pv)} />
            </tbody>
          </table>
        </div>
        <div className="px-3 py-1.5 text-[11px] text-gray-500 border-t border-gridline font-mono">
          Terminal value: {model.terminal.toFixed(1)} @ {exitMult}× FCF → PV {model.pvTerminal.toFixed(1)}
        </div>
      </Cell>

      {/* Output */}
      <Cell cellRef="C44" className="bg-white border border-gridline shadow-sm inline-block sm:max-w-sm">
        <div ref={outputRef} className="px-5 py-4">
          <div className="text-[10.5px] uppercase tracking-wide text-gray-400 font-semibold">
            {dcfModel.outputLabel}
          </div>
          <CountUp
            value={model.valuation}
            prefix="$"
            suffix="M"
            decimals={1}
            duration={500}
            className="text-[28px] font-bold text-excel-green font-mono"
          />
          <div className="text-[11px] text-gray-400 mt-0.5 font-mono">
            = Σ PV(FCF) + PV(terminal)
          </div>
        </div>
      </Cell>

      {/* Disclaimer footnote */}
      <div className="recalc-cell bg-white border border-gridline shadow-sm px-4 py-2 text-[12px] text-gray-500 italic inline-block self-start">
        {dcfModel.disclaimer}
      </div>
    </div>
  );
}

function Row({ label, values, banded = false }: { label: string; values: number[]; banded?: boolean }) {
  return (
    <tr className={banded ? "bg-[#f2f8f4]" : "bg-white"}>
      <td className="px-3 py-1.5 border-r border-b border-gridline font-sans text-gray-700">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="px-3 py-1.5 text-right border-r border-b border-gridline text-gray-800 tabular-nums">
          {v.toFixed(1)}
        </td>
      ))}
    </tr>
  );
}

/**
 * Excel input-cell styling: light yellow fill, blue font.
 * Typing is unconstrained (so "15" doesn't fight you mid-keystroke);
 * the value clamps to its sane range on blur / Enter.
 */
function InputCell({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  const [raw, setRaw] = useState(String(value));

  const commit = () => {
    const clamped = clamp(Number(raw), min, max);
    setRaw(String(clamped));
    onChange(clamped);
  };

  return (
    <label className="border-r border-b sm:border-b-0 border-gridline px-4 py-3 block">
      <span className="text-[11px] text-gray-500 block mb-1">
        {label}{" "}
        <span className="text-gray-400 font-mono">
          ({min}–{max})
        </span>
      </span>
      <span className="flex items-center gap-1.5">
        <input
          type="number"
          value={raw}
          min={min}
          max={max}
          onChange={(e) => {
            setRaw(e.target.value);
            const n = Number(e.target.value);
            // recompute live while the typed value is already in range
            if (e.target.value !== "" && Number.isFinite(n) && n >= min && n <= max) {
              onChange(n);
            }
          }}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          }}
          className="w-20 bg-[#fff8d9] border border-[#d9cd8e] text-[#1f4e9c] font-mono font-semibold text-[14px] px-2 py-1 outline-none focus:border-excel-green"
        />
        <span className="text-[11.5px] text-gray-500">{suffix}</span>
      </span>
    </label>
  );
}
