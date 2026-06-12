import { useEffect } from "react";

export function Toast({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, 3200);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  if (!message) return null;
  return (
    <div className="toast-enter fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-chrome-dark text-gray-100 text-[13px] px-4 py-2.5 rounded shadow-lg border border-white/10 flex items-center gap-2 max-w-[90vw]">
      <span className="text-excel-green-light font-bold font-mono">fx</span>
      <span>{message}</span>
    </div>
  );
}
