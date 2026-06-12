import { createContext } from "react";

type SelectionState = {
  selected: string;
  select: (ref: string) => void;
};

export const SelectionContext = createContext<SelectionState>({
  selected: "A1",
  select: () => {},
});

/** Move a cell ref like "C7" by (dCol, dRow), clamped to A-H / 1-40. */
export function moveCellRef(ref: string, dCol: number, dRow: number): string {
  const match = ref.match(/^([A-Z])(\d+)$/);
  if (!match) return "A1";
  const col = Math.min(Math.max(match[1].charCodeAt(0) - 65 + dCol, 0), 7);
  const row = Math.min(Math.max(parseInt(match[2], 10) + dRow, 1), 40);
  return `${String.fromCharCode(65 + col)}${row}`;
}
