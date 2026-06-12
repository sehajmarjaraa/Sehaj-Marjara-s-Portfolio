/** Tiny inline SVG icon set (Excel-ish, 16/20px strokes) — zero dependencies. */

type IconProps = { className?: string };

export function PdfIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M5 2h7l4 4v12H5V2z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 2v4h4" stroke="currentColor" strokeWidth="1.3" />
      <text x="6.2" y="14.5" fontSize="5.5" fill="currentColor" fontWeight="700">
        PDF
      </text>
    </svg>
  );
}

export function LinkIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M8.5 11.5l3-3M7 13l-1.5 1.5a2.5 2.5 0 01-3.5-3.5L4.5 8.5M13 7l1.5-1.5a2.5 2.5 0 013.5 3.5L15.5 11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MailIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 5.5l7 5.5 7-5.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function TableIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="3.5" width="15" height="13" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 8h15M2.5 12h15M8 3.5v13M13 3.5v13" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function ChartIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M3 17V3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 17h14" stroke="currentColor" strokeWidth="1.3" />
      <rect x="5.5" y="10" width="2.5" height="5" fill="currentColor" />
      <rect x="9.5" y="6" width="2.5" height="9" fill="currentColor" />
      <rect x="13.5" y="8" width="2.5" height="7" fill="currentColor" />
    </svg>
  );
}

export function PersonIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.5 17c.8-3 3.4-4.5 6.5-4.5s5.7 1.5 6.5 4.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function FxIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <text x="2" y="15" fontSize="13" fontStyle="italic" fill="currentColor" fontFamily="Georgia, serif">
        fx
      </text>
    </svg>
  );
}

export function FilterIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M3 4h14l-5.5 6.5V16l-3 1.5v-7L3 4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function CommentIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M3 4.5h14v9H9l-3.5 3v-3H3v-9z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GridIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="6" height="6" fill="currentColor" opacity="0.9" />
      <rect x="11" y="3" width="6" height="6" fill="currentColor" opacity="0.6" />
      <rect x="3" y="11" width="6" height="6" fill="currentColor" opacity="0.6" />
      <rect x="11" y="11" width="6" height="6" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function ShareIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M10 12V3m0 0L6.5 6.5M10 3l3.5 3.5M4 11v5h12v-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function GithubIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.6a8.5 8.5 0 00-2.687 16.565c.425.078.58-.184.58-.41 0-.202-.007-.737-.011-1.447-2.365.514-2.864-1.14-2.864-1.14-.387-.982-.944-1.244-.944-1.244-.772-.527.058-.517.058-.517.853.06 1.302.876 1.302.876.759 1.3 1.99.925 2.475.707.077-.55.297-.925.54-1.138-1.888-.214-3.873-.943-3.873-4.2 0-.928.331-1.687.875-2.281-.088-.215-.38-1.08.083-2.25 0 0 .714-.229 2.338.871a8.14 8.14 0 014.256 0c1.623-1.1 2.336-.871 2.336-.871.464 1.17.172 2.035.084 2.25.545.594.874 1.353.874 2.28 0 3.266-1.988 3.984-3.882 4.194.305.263.577.782.577 1.577 0 1.138-.01 2.056-.01 2.336 0 .228.153.492.584.409A8.5 8.5 0 0010 1.6z"
      />
    </svg>
  );
}

export function ExternalIcon({ className = "w-3.5 h-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M8 4H4v12h12v-4M12 4h4v4M16 4l-7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
