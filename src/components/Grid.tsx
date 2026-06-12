import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { COLS, ROWS, ROW_H } from "../grid-constants";
import type { EditingState } from "../grid-constants";

/**
 * The white spreadsheet surface. Every background cell is a real, typeable
 * Excel cell: click to select, type to replace, double-click or F2 to edit,
 * Enter commits + moves down, Tab commits + moves right.
 * Content blocks float above the cell layer.
 */
export function Grid({
  children,
  zoom,
  selected,
  cellValues,
  editing,
  onSelect,
  onStartEdit,
  onEditChange,
  onCommit,
  onCancel,
  scrollRef,
}: {
  children: ReactNode;
  zoom: number;
  selected: string;
  cellValues: Record<string, string>;
  editing: EditingState;
  onSelect: (ref: string) => void;
  onStartEdit: (initial: string | null) => void;
  onEditChange: (value: string) => void;
  onCommit: (move: "down" | "right" | "none") => void;
  onCancel: () => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const scale = zoom / 100;
  const selectedCol = selected.match(/^([A-Z])/)?.[1] ?? "A";
  const selectedRow = parseInt(selected.match(/(\d+)$/)?.[1] ?? "1", 10);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white">
      {/* Column headers */}
      <div className="flex shrink-0 bg-header-bg border-b border-gridline text-[11px] text-gray-500 select-none">
        <div className="w-8 sm:w-10 shrink-0 border-r border-gridline bg-header-bg" />
        {COLS.map((c) => (
          <div
            key={c}
            className={`flex-1 text-center py-0.5 border-r border-gridline font-medium ${
              c === selectedCol
                ? "bg-[#d3e8db] text-excel-green border-b-2 border-b-excel-green -mb-px"
                : ""
            }`}
          >
            {c}
          </div>
        ))}
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Row numbers */}
        <div className="w-8 sm:w-10 shrink-0 bg-header-bg border-r border-gridline text-[11px] text-gray-500 text-center select-none overflow-hidden">
          {Array.from({ length: ROWS }, (_, i) => i + 1).map((r) => (
            <div
              key={r}
              className={`h-8 leading-8 border-b border-gridline ${
                r === selectedRow ? "bg-[#d3e8db] text-excel-green font-semibold" : ""
              }`}
            >
              {r}
            </div>
          ))}
        </div>

        {/* Sheet body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div
            className="relative"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: `${100 / scale}%`,
              minHeight: ROWS * ROW_H,
            }}
          >
            {/* The real cell layer */}
            <CellLayer
              selected={selected}
              cellValues={cellValues}
              editing={editing}
              onSelect={onSelect}
              onStartEdit={onStartEdit}
              onEditChange={onEditChange}
              onCommit={onCommit}
              onCancel={onCancel}
            />
            {/* Content floats above; empty areas pass clicks through to the cells */}
            <div className="relative z-10 pointer-events-none [&_[data-cellref]]:pointer-events-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const looksNumeric = (v: string) => /^-?[\d,]+(\.\d+)?[%KMB]?\+?$/.test(v.trim());

function CellLayer({
  selected,
  cellValues,
  editing,
  onSelect,
  onStartEdit,
  onEditChange,
  onCommit,
  onCancel,
}: {
  selected: string;
  cellValues: Record<string, string>;
  editing: EditingState;
  onSelect: (ref: string) => void;
  onStartEdit: (initial: string | null) => void;
  onEditChange: (value: string) => void;
  onCommit: (move: "down" | "right" | "none") => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${COLS.length}, 1fr)`,
        gridAutoRows: ROW_H,
      }}
      aria-label="Spreadsheet cells"
    >
      {Array.from({ length: ROWS }, (_, ri) =>
        COLS.map((c) => {
          const ref = `${c}${ri + 1}`;
          const isSelected = selected === ref;
          const value = cellValues[ref] ?? "";
          return (
            <GridCell
              key={ref}
              cellRef={ref}
              value={value}
              isSelected={isSelected}
              isEditing={isSelected && editing != null}
              editValue={editing?.value ?? ""}
              editSource={editing?.source ?? "cell"}
              onSelect={onSelect}
              onStartEdit={onStartEdit}
              onEditChange={onEditChange}
              onCommit={onCommit}
              onCancel={onCancel}
            />
          );
        })
      )}
    </div>
  );
}

function GridCell({
  cellRef,
  value,
  isSelected,
  isEditing,
  editValue,
  editSource,
  onSelect,
  onStartEdit,
  onEditChange,
  onCommit,
  onCancel,
}: {
  cellRef: string;
  value: string;
  isSelected: boolean;
  isEditing: boolean;
  editValue: string;
  editSource: "cell" | "bar";
  onSelect: (ref: string) => void;
  onStartEdit: (initial: string | null) => void;
  onEditChange: (value: string) => void;
  onCommit: (move: "down" | "right" | "none") => void;
  onCancel: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the in-cell editor unless the user is typing in the formula bar.
  useEffect(() => {
    if (isEditing && editSource === "cell") {
      inputRef.current?.focus();
      // caret at end, like Excel
      const len = inputRef.current?.value.length ?? 0;
      inputRef.current?.setSelectionRange(len, len);
    }
  }, [isEditing, editSource]);

  return (
    <div
      data-gridcell={cellRef}
      onMouseDown={(e) => {
        // commit any in-progress edit, then move the selection (Excel behavior)
        if (!isSelected) {
          e.preventDefault();
          onSelect(cellRef);
        }
      }}
      onDoubleClick={() => onStartEdit(null)}
      className={`relative border-r border-b border-[#e3e3e3] text-[12.5px] text-gray-800 cursor-cell overflow-visible ${
        isSelected && !isEditing ? "cell-selected z-[2]" : ""
      }`}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => onEditChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onCommit("down");
            } else if (e.key === "Tab") {
              e.preventDefault();
              onCommit("right");
            } else if (e.key === "Escape") {
              onCancel();
            }
            e.stopPropagation();
          }}
          spellCheck={false}
          aria-label={`Cell ${cellRef}`}
          className="absolute inset-0 w-full px-1.5 bg-white outline-2 outline-excel-green z-20 text-[12.5px] font-normal min-w-0"
        />
      ) : (
        value && (
          <span
            className={`block px-1.5 leading-8 whitespace-nowrap ${
              looksNumeric(value) ? "text-right font-mono tabular-nums" : "text-left"
            } ${value === "#NAME?" ? "text-red-600 font-semibold" : ""}`}
          >
            {value}
          </span>
        )
      )}
    </div>
  );
}
