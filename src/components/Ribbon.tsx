import type { ReactNode } from "react";
import { sections, modelSection, about, projects, site } from "../content";

const ribbonTabs = [...sections, modelSection];
import type { SectionId } from "../content";
import {
  ChartIcon,
  CommentIcon,
  FilterIcon,
  FxIcon,
  GithubIcon,
  GridIcon,
  LinkIcon,
  MailIcon,
  PdfIcon,
  PersonIcon,
  TableIcon,
} from "../icons";

type RibbonButton = {
  label: string;
  icon: ReactNode;
  action?:
    | { type: "scroll"; target: string }
    | { type: "link"; href: string }
    | { type: "command"; cmd: string };
};

type RibbonGroup = { label: string; buttons: RibbonButton[] };

const iconFor = (name: string): ReactNode => {
  switch (name) {
    case "pdf":
      return <PdfIcon />;
    case "mail":
      return <MailIcon />;
    case "github":
      return <GithubIcon />;
    default:
      return <LinkIcon />;
  }
};

/** Per-tab ribbon button groups, derived from the content config. */
const ribbonGroups: Record<SectionId, RibbonGroup[]> = {
  about: [
    {
      label: "Quick Links",
      buttons: about.quickLinks.map((l) => ({
        label: l.label,
        icon: iconFor(l.icon),
        action: { type: "link", href: l.href },
      })),
    },
    {
      label: "Formulas",
      buttons: [
        { label: "=aboutme", icon: <FxIcon />, action: { type: "command", cmd: "=aboutme" } },
        { label: "=experience", icon: <TableIcon />, action: { type: "command", cmd: "=experience" } },
        { label: "=involvement", icon: <PersonIcon />, action: { type: "command", cmd: "=involvement" } },
        { label: "=projects", icon: <ChartIcon />, action: { type: "command", cmd: "=projects" } },
      ],
    },
  ],
  projects: [
    {
      label: "Workbooks",
      buttons: projects.map((p) => ({
        label: p.title.split(" ").slice(0, 2).join(" "),
        icon: <ChartIcon />,
        action: { type: "scroll", target: `entry-${p.id}` },
      })),
    },
  ],
  skills: [
    {
      label: "Conditional Formatting",
      buttons: [
        { label: "Color Scales", icon: <GridIcon /> },
        { label: "Data Bars", icon: <ChartIcon /> },
        { label: "Icon Sets", icon: <FilterIcon /> },
      ],
    },
    {
      label: "Functions",
      buttons: [{ label: "Insert Function", icon: <FxIcon /> }],
    },
  ],
  model: [
    {
      label: "Forecast",
      buttons: [
        { label: "Goal Seek", icon: <FxIcon /> },
        { label: "Scenario Manager", icon: <TableIcon /> },
        { label: "What-If Analysis", icon: <ChartIcon /> },
      ],
    },
    {
      label: "Hiring Tools",
      buttons: [
        {
          label: "Full Version",
          icon: <MailIcon />,
          action: { type: "link", href: `mailto:${site.email}?subject=Re: the full DCF model` },
        },
      ],
    },
  ],
  contact: [
    {
      label: "Comments",
      buttons: [
        {
          label: "New Comment",
          icon: <CommentIcon />,
          action: { type: "link", href: `mailto:${site.email}` },
        },
      ],
    },
    {
      label: "Reach Out",
      buttons: [
        {
          label: "Email",
          icon: <MailIcon />,
          action: { type: "link", href: `mailto:${site.email}` },
        },
        {
          label: "LinkedIn",
          icon: <LinkIcon />,
          action: { type: "link", href: site.linkedin },
        },
        {
          label: "Resume (PDF)",
          icon: <PdfIcon />,
          action: { type: "link", href: site.resumeUrl },
        },
      ],
    },
  ],
};

function scrollToEntry(targetId: string) {
  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function runAction(action: RibbonButton["action"], onCommand: (cmd: string) => void) {
  if (!action) return;
  if (action.type === "command") {
    onCommand(action.cmd);
  } else if (action.type === "scroll") {
    scrollToEntry(action.target);
  } else if (action.href.startsWith("mailto:")) {
    window.location.href = action.href;
  } else {
    window.open(action.href, "_blank", "noopener");
  }
}

export function Ribbon({
  active,
  onTabChange,
  onCommand,
}: {
  active: SectionId;
  onTabChange: (id: SectionId) => void;
  onCommand: (cmd: string) => void;
}) {
  return (
    <div className="bg-chrome text-gray-200 select-none shrink-0">
      {/* Tab strip — horizontal scroll on mobile */}
      <div className="flex items-end gap-0.5 px-2 pt-1.5 overflow-x-auto no-scrollbar">
        {ribbonTabs.map((s) => (
          <button
            key={s.id}
            onClick={() => onTabChange(s.id)}
            className={`px-3 py-1.5 text-[12.5px] whitespace-nowrap rounded-t transition-colors ${
              active === s.id
                ? "text-white font-semibold border-b-2 border-excel-green bg-chrome-light"
                : "text-gray-300 hover:bg-chrome-light hover:text-white"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Button groups — hidden on mobile */}
      <div className="hidden md:flex items-stretch gap-1 px-3 py-1.5 bg-chrome-light border-t border-black/30 overflow-x-auto no-scrollbar min-h-[74px]">
        {ribbonGroups[active].map((group, gi) => (
          <div key={group.label} className="flex items-stretch">
            {gi > 0 && <div className="w-px bg-white/10 mx-2 my-1" />}
            <div className="flex flex-col">
              <div className="flex items-start gap-0.5 flex-1">
                {group.buttons.map((b) => (
                  <button
                    key={b.label}
                    onClick={() => runAction(b.action, onCommand)}
                    className={`flex flex-col items-center justify-start gap-1 px-2 pt-1.5 pb-1 rounded text-gray-200 min-w-[58px] max-w-[84px] transition-colors hover:bg-white/10 ${
                      b.action ? "cursor-pointer" : "cursor-default opacity-80"
                    }`}
                    title={b.action ? b.label : `${b.label} (decorative — like most of Excel's ribbon)`}
                  >
                    <span className="text-gray-100">{b.icon}</span>
                    <span className="text-[10.5px] leading-tight text-center line-clamp-2">
                      {b.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="text-center text-[10px] text-gray-400 pt-0.5 px-1 whitespace-nowrap">
                {group.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
