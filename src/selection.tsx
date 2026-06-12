import { useContext } from "react";
import type { ReactNode } from "react";
import { SelectionContext } from "./selection-context";

/**
 * A content block pinned to a fake spreadsheet cell reference.
 * Clicking it shows Excel's green selection border + fill handle and
 * updates the cell reference box in the formula bar.
 */
export function Cell({
  cellRef,
  children,
  className = "",
  id,
}: {
  cellRef: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const { selected, select } = useContext(SelectionContext);
  const isSelected = selected === cellRef;
  return (
    <div
      id={id}
      data-cellref={cellRef}
      onClick={(e) => {
        e.stopPropagation();
        select(cellRef);
      }}
      className={`${className} ${isSelected ? "cell-selected" : ""} cursor-cell`}
    >
      {children}
    </div>
  );
}
