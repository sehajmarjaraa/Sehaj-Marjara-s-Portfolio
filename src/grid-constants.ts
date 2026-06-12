export const COLS = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const ROWS = 60;
export const ROW_H = 32;

export type EditingState = { value: string; source: "cell" | "bar" } | null;
