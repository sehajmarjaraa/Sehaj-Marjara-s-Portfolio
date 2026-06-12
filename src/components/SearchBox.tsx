import { useEffect, useRef } from "react";
import { SearchIcon } from "../icons";

/** Excel-style "Find" box. Opens with Cmd/Ctrl+F and filters Projects + Experience. */
export function SearchBox({
  open,
  query,
  onQuery,
  onClose,
}: {
  open: boolean;
  query: string;
  onQuery: (q: string) => void;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;
  return (
    <div className="absolute top-1 right-3 z-40 bg-chrome-dark border border-white/15 rounded shadow-xl flex items-center gap-2 px-2.5 py-1.5 w-72 max-w-[85vw]">
      <SearchIcon className="w-4 h-4 text-gray-400" />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        placeholder="Find in projects…"
        className="flex-1 bg-transparent text-[12.5px] text-gray-100 outline-none placeholder:text-gray-500"
        aria-label="Search projects"
      />
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white text-[14px] leading-none"
        aria-label="Close search"
      >
        ×
      </button>
    </div>
  );
}
