import { site } from "../content";

export function LoadingScreen({ done }: { done: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[100] bg-excel-green flex flex-col items-center justify-center gap-6 transition-opacity duration-300 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={done}
    >
      <svg viewBox="0 0 32 32" className="w-16 h-16 drop-shadow" aria-hidden>
        <rect width="32" height="32" rx="6" fill="#fff" />
        <path
          d="M9 8h5.2l2.9 5.1L20 8h5l-5.2 8L25 24h-5.2l-2.9-5.2L14 24H9l5.4-8L9 8z"
          fill="#217346"
        />
      </svg>
      <div className="text-white text-[14px] font-medium">
        Opening {site.fileName}…
      </div>
      <div className="flex gap-1.5" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="load-dot w-1.5 h-1.5 rounded-full bg-white" />
        ))}
      </div>
    </div>
  );
}
