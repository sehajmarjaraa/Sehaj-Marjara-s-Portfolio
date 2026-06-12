import { useEffect, useRef, useState } from "react";
import { formulas } from "../content";
import type { SectionId } from "../content";
import type { EditingState } from "../grid-constants";

/**
 * The fx bar mirrors the active cell, exactly like Excel: it shows the
 * selected cell's content, and typing here edits that cell live. On sheet
 * load (before the user touches anything) it types out a joke formula.
 */
export function FormulaBar({
  active,
  cellRef,
  cellValue,
  editing,
  override,
  onEditChange,
  onCommit,
  onCancel,
}: {
  active: SectionId;
  cellRef: string;
  /** Stored value of the selected cell. */
  cellValue: string;
  editing: EditingState;
  /** Transient formula (e.g. hovering a skill cell) — shown instantly. */
  override?: string | null;
  onEditChange: (value: string) => void;
  onCommit: (move: "down" | "right" | "none") => void;
  onCancel: () => void;
}) {
  const [demo, setDemo] = useState("");
  const [demoTyping, setDemoTyping] = useState(true);
  const [focused, setFocused] = useState(false);
  const [prevActive, setPrevActive] = useState(active);
  const inputRef = useRef<HTMLInputElement>(null);
  const interruptedRef = useRef(false);

  // Reset the demo animation when the sheet changes (render-time adjustment).
  if (prevActive !== active) {
    setPrevActive(active);
    setDemo("");
    setDemoTyping(true);
  }

  // Type out the section's joke formula on sheet change; stops the moment
  // the user interacts with anything.
  useEffect(() => {
    interruptedRef.current = false;
    const formula = formulas[active];
    let i = 0;
    const timer = setInterval(() => {
      if (interruptedRef.current) {
        clearInterval(timer);
        setDemoTyping(false);
        return;
      }
      i += 1;
      setDemo(formula.slice(0, i));
      if (i >= formula.length) {
        clearInterval(timer);
        setDemoTyping(false);
      }
    }, 22);
    return () => clearInterval(timer);
  }, [active]);

  // Anything real to show beats the demo animation.
  const interacted = editing != null || cellValue !== "";
  useEffect(() => {
    if (interacted) interruptedRef.current = true;
  }, [interacted]);

  const shown =
    editing != null
      ? editing.value
      : cellValue !== ""
        ? cellValue
        : !focused && override != null
          ? override
          : demo;

  return (
    <div className="flex items-stretch bg-chrome border-t border-black/30 h-7 shrink-0 select-none">
      {/* Cell reference box */}
      <div className="w-16 sm:w-20 flex items-center justify-center text-[12px] text-gray-200 bg-chrome-light border-r border-black/40 font-medium">
        {cellRef}
      </div>
      {/* fx label */}
      <div className="w-9 flex items-center justify-center text-gray-400 italic text-[13px] font-serif border-r border-black/40">
        fx
      </div>
      {/* Formula input — edits the selected cell, exactly like Excel */}
      <div className="flex-1 flex items-center bg-chrome-light px-2 min-w-0">
        <input
          ref={inputRef}
          value={shown}
          onChange={(e) => {
            interruptedRef.current = true;
            setDemoTyping(false);
            onEditChange(e.target.value);
          }}
          onFocus={() => {
            interruptedRef.current = true;
            setDemoTyping(false);
            setFocused(true);
          }}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onCommit("down");
              inputRef.current?.blur();
            } else if (e.key === "Tab") {
              e.preventDefault();
              onCommit("right");
            } else if (e.key === "Escape") {
              onCancel();
              inputRef.current?.blur();
            }
            e.stopPropagation();
          }}
          spellCheck={false}
          aria-label="Formula bar"
          className={`w-full bg-transparent text-[12.5px] font-mono outline-none placeholder:text-gray-500 ${
            !focused && override != null && editing == null && cellValue === ""
              ? "text-amber-200"
              : "text-emerald-50"
          }`}
          placeholder="Type in any cell — try =aboutme"
        />
        {demoTyping && !focused && editing == null && cellValue === "" && (
          <span className="fx-caret text-emerald-50" />
        )}
      </div>
    </div>
  );
}
