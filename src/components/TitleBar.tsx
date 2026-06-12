import { site } from "../content";
import { CommentIcon, ShareIcon } from "../icons";
import { onEmailClick } from "../email";

export function TitleBar({ onComments }: { onComments: () => void }) {
  return (
    <div className="bg-chrome-dark text-gray-300 flex items-center h-10 px-3 select-none shrink-0 relative">
      {/* macOS traffic lights (decorative) */}
      <div className="flex items-center gap-2 mr-3">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/20" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/20" />
        <span className="w-3 h-3 rounded-full bg-[#28c840] border border-black/20" />
      </div>

      {/* AutoSave toggle (decorative) */}
      <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-gray-400">
        <span>AutoSave</span>
        <span className="w-7 h-4 rounded-full bg-excel-green relative" aria-hidden>
          <span className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white" />
        </span>
        <span className="text-gray-500">On</span>
      </div>

      {/* Filename, centered */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[13px] font-medium text-gray-100 max-w-[55%] sm:max-w-none truncate">
        <svg viewBox="0 0 32 32" className="w-4 h-4 shrink-0" aria-hidden>
          <rect width="32" height="32" rx="6" fill="#217346" />
          <path d="M9 8h5.2l2.9 5.1L20 8h5l-5.2 8L25 24h-5.2l-2.9-5.2L14 24H9l5.4-8L9 8z" fill="#fff" />
        </svg>
        <span className="truncate">{site.fileName}</span>
      </div>

      {/* Right: Share + Comments */}
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={onComments}
          className="hidden sm:flex items-center gap-1.5 text-[12px] text-gray-300 hover:bg-chrome-light rounded px-2 py-1 transition-colors"
          title="Jump to the contact section"
        >
          <CommentIcon className="w-4 h-4" />
          Comments
        </button>
        <a
          href={`mailto:${site.email}?subject=Saw your portfolio — let's talk`}
          onClick={onEmailClick}
          className="flex items-center gap-1.5 text-[12px] bg-excel-green hover:bg-excel-green-light text-white rounded px-2.5 py-1 transition-colors"
        >
          <ShareIcon />
          Share
        </a>
      </div>
    </div>
  );
}
