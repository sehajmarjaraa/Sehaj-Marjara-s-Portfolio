import {
  about,
  aboutPlayground,
  experience,
  involvement,
  projects,
  site,
} from "../content";
import { Cell } from "../selection";
import { ExternalIcon, GithubIcon, LinkIcon, MailIcon, PdfIcon } from "../icons";

type ResultKind = "everything" | "experience" | "involvement" | "projects" | "error" | null;

const parse = (raw: string | null): ResultKind => {
  if (!raw) return null;
  const name = raw.trim().toLowerCase().replace(/^=/, "").replace(/\(\)$/, "");
  if (!name) return null;
  return aboutPlayground.commands[name] ?? "error";
};

export function About({
  autoCmd,
}: {
  /** The last =command committed in any cell (or via ribbon / skill refs). */
  autoCmd: string | null;
}) {
  const result = parse(autoCmd);

  return (
    <div className="p-4 sm:p-8 max-w-5xl flex flex-col gap-4">
      {/* Name + intro */}
      <Cell cellRef="C2" className="bg-white border border-gridline shadow-sm p-4 sm:p-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{about.name}</h1>
        <p className="text-excel-green font-semibold text-[14px] mt-1">{about.headline}</p>
        <p className="text-gray-700 text-[13.5px] leading-relaxed mt-3">{about.intro}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-[12.5px] text-gray-500">
          <span>📍 {about.location}</span>
        </div>
      </Cell>

      {/* Quick links */}
      <Cell cellRef="C3" className="bg-white border border-gridline shadow-sm p-4">
        <div className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold mb-2.5">
          Quick Links
        </div>
        <div className="flex flex-wrap gap-2.5">
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 bg-excel-green hover:bg-excel-green-light text-white text-[13px] font-medium px-3.5 py-2 rounded-sm transition-colors"
          >
            <PdfIcon className="w-4 h-4" /> Resume (PDF)
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 border border-excel-green text-excel-green hover:bg-excel-green/5 text-[13px] font-medium px-3.5 py-2 rounded-sm transition-colors"
          >
            <LinkIcon className="w-4 h-4" /> LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 border border-excel-green text-excel-green hover:bg-excel-green/5 text-[13px] font-medium px-3.5 py-2 rounded-sm transition-colors"
          >
            <MailIcon className="w-4 h-4" /> Email
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 border border-excel-green text-excel-green hover:bg-excel-green/5 text-[13px] font-medium px-3.5 py-2 rounded-sm transition-colors"
          >
            <GithubIcon className="w-4 h-4" /> GitHub
          </a>
        </div>
      </Cell>

      {/* Hint, written on the sheet like a comment — the cells below it are
          real Excel cells: click one and start typing. */}
      <div className="text-[12px] text-gray-400 italic font-mono px-1 select-none">
        # {aboutPlayground.hint} — click any empty cell and type
      </div>

      {/* Results — keyed so the populate animation replays per command */}
      {result && (
        <div key={result} className="flex flex-col gap-4">
          {result === "error" && (
            <Cell cellRef="B12" className="bg-white border border-gridline shadow-sm px-4 py-3">
              <span className="font-mono text-[13px] text-red-600 font-semibold">#NAME?</span>
              <span className="text-[12.5px] text-gray-500 ml-2">{aboutPlayground.errorText}</span>
            </Cell>
          )}
          {(result === "everything" || result === "experience") && <ExperienceList />}
          {(result === "everything" || result === "involvement") && <InvolvementList />}
          {(result === "everything" || result === "projects") && <ProjectsList />}
        </div>
      )}
    </div>
  );
}

function GroupHeader({ rangeName, title }: { rangeName: string; title: string }) {
  return (
    <div className="px-4 py-2 border-b border-gridline bg-excel-green text-white flex items-center gap-2">
      <span className="text-[10.5px] font-mono text-white/70">{rangeName}</span>
      <span className="text-[13px] font-semibold">{title}</span>
    </div>
  );
}

function pop(i: number): React.CSSProperties {
  return { "--pop-delay": `${i * 90}ms` } as React.CSSProperties;
}

function ExperienceList() {
  return (
    <Cell cellRef="B13" className="bg-white border border-gridline shadow-sm overflow-hidden">
      <GroupHeader rangeName="=experience" title="Work Experience" />
      {experience.map((e, i) => (
        <div
          key={e.id}
          id={`entry-${e.id}`}
          className={`recalc-cell cell-populate grid grid-cols-1 sm:grid-cols-2 text-[13px] border-b border-gridline ${
            i % 2 === 1 ? "bg-[#f2f8f4]" : "bg-white"
          }`}
          style={pop(i)}
        >
          <div className="px-3 pt-2 sm:py-2 font-semibold text-gray-900">{e.company}</div>
          <div className="px-3 pb-2 sm:py-2 text-gray-700">{e.role}</div>
        </div>
      ))}
    </Cell>
  );
}

function InvolvementList() {
  return (
    <Cell cellRef="B14" className="bg-white border border-gridline shadow-sm overflow-hidden">
      <GroupHeader rangeName="=involvement" title="Campus Involvement & Extracurriculars" />
      {involvement.map((l, i) => (
        <div
          key={l.id}
          id={`entry-${l.id}`}
          className={`recalc-cell cell-populate grid grid-cols-1 sm:grid-cols-2 text-[13px] border-b border-gridline ${
            i % 2 === 1 ? "bg-[#f2f8f4]" : "bg-white"
          }`}
          style={pop(i)}
        >
          <div className="px-3 pt-2 sm:py-2 font-semibold text-gray-900">{l.organization}</div>
          <div className="px-3 pb-2 sm:py-2 text-gray-700">{l.role}</div>
        </div>
      ))}
    </Cell>
  );
}

function ProjectsList() {
  return (
    <Cell cellRef="B15" className="bg-white border border-gridline shadow-sm overflow-hidden">
      <GroupHeader rangeName="=projects" title="Projects" />
      {projects.map((p, i) => (
        <div
          key={p.id}
          className={`cell-populate recalc-cell grid grid-cols-[1fr_auto] items-center text-[13px] border-b border-gridline ${
            i % 2 === 1 ? "bg-[#f2f8f4]" : "bg-white"
          }`}
          style={pop(i)}
        >
          <div className="px-3 py-2 font-semibold text-gray-900">{p.title}</div>
          <a
            href={p.link}
            target="_blank"
            rel="noopener"
            className="mx-3 inline-flex items-center gap-1 text-excel-green hover:underline text-[12px] font-medium"
          >
            Open <ExternalIcon />
          </a>
        </div>
      ))}
    </Cell>
  );
}
