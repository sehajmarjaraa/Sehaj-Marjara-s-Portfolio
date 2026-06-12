/**
 * ============================================================================
 * CONTENT CONFIG — edit THIS file only, then redeploy.
 * ============================================================================
 *
 * PLACEHOLDERS YOU STILL NEED TO REPLACE (search for each token):
 *
 *   [PLACEHOLDER_RESUME_URL]        — URL or path to your resume PDF
 *                                     (drop the file in /public, e.g. "/Sehaj_Marjara_Resume.pdf")
 *   [PLACEHOLDER: GPA]              — GPA shown in the status bar / About
 *
 * ============================================================================
 */

export const site = {
  fileName: "Sehaj_Marjara_Portfolio.xlsx",
  name: "Sehaj Marjara",
  headline: "Finance, MSU Broad College, May 2026",
  location: "United States",
  email: "sehajmarjaraa@gmail.com",
  phone: "(517) 980-4654",
  linkedin: "https://www.linkedin.com/in/sehajmarjara/",
  linkedinLabel: "linkedin.com/in/sehajmarjara",
  github: "https://github.com/sehajmarjaraa",
  githubLabel: "github.com/sehajmarjaraa",
  resumeUrl: "[PLACEHOLDER_RESUME_URL]",
  gpa: "[PLACEHOLDER: GPA]",
};

export type SectionId = "about" | "projects" | "skills" | "contact" | "model";

/** Ribbon + main sheet tabs. The "Model" sheet is appended separately (sheet tab only). */
export const sections: { id: SectionId; label: string }[] = [
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/** The hidden bonus sheet — appears only in the bottom sheet-tab strip, after Contact. */
export const modelSection: { id: SectionId; label: string } = {
  id: "model",
  label: "Model",
};

/** Context-aware fake formulas shown in the fx bar per section. */
export const formulas: Record<SectionId, string> = {
  about: '=HIRE(IF(candidate="Sehaj", "Yes", "Also Yes"))',
  projects: "=SUMPRODUCT(AI, finance, shipping_fast)",
  skills: "=CONDITIONAL.FORMAT(skills, 'green_means_go')",
  contact: '=VLOOKUP("dream_job", market, 2, FALSE)',
  model: "=DCF(growth, discount, exit_multiple)",
};

/** Fake live stats per section for the status bar. */
export const statusStats: Record<SectionId, string> = {
  about: "Sum: 1 candidate | Tip: type =aboutme in the formula cell",
  projects: "Sum: 6 projects | Average: 100% AI-powered | Count: 6 workbooks",
  skills: "Sum: 6 named ranges | Average: deep green | Count: 26 skills",
  contact: "Sum: 1 inbox | Average reply time: fast | Count: 0 unread",
  model: "Sum: 5 forecast years | Average: sane assumptions | Count: 1 disclaimer",
};

export const about = {
  name: site.name,
  headline: site.headline,
  intro:
    "I'm Sehaj. I work across finance, data, and AI, three things most people pick one of. KPMG deals advisory, $500K+ in budget ownership at MSU, REIT modeling, and six tools I built from data pipeline to interface. It's all here to tap through, and the Projects and Model tabs are where it gets interesting.",
  location: site.location,
  quickLinks: [
    { label: "Resume (PDF)", href: site.resumeUrl, icon: "pdf" },
    { label: "LinkedIn", href: site.linkedin, icon: "link" },
    { label: "Email", href: `mailto:${site.email}`, icon: "mail" },
    { label: "GitHub", href: site.github, icon: "github" },
  ],
};

// ---------------------------------------------------------------------------
// EXPERIENCE
// ---------------------------------------------------------------------------

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
};

export const experience: ExperienceEntry[] = [
  { id: "rha", company: "Michigan State RHA", role: "Director of Treasury & Allocation" },
  { id: "kpmg", company: "KPMG", role: "Deals Advisory Intern" },
  { id: "hp", company: "HP Tech Ventures", role: "Corporate Venture Capital Extern" },
];

/**
 * The About Me formula playground — the interactive cell where visitors type
 * Excel-style formulas to pull up sections of the resume.
 */
export const aboutPlayground = {
  hint: "Type a formula — try =aboutme, =experience, =involvement, or =projects",
  /** Maps typed formula names (lowercase, no "=") to what gets listed. */
  commands: {
    aboutme: "everything",
    experience: "experience",
    involvement: "involvement",
    // legacy alias — same list as =involvement
    leadership: "involvement",
    projects: "projects",
  } as Record<string, "everything" | "experience" | "involvement" | "projects">,
  errorText: "#NAME? — that formula isn't in this workbook. Try =aboutme",
};

// ---------------------------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------------------------

export type Project = {
  id: string;
  /** Short app codename shown in the card header (like a workbook name). */
  codename: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
};

export const projects: Project[] = [
  {
    id: "sentiment",
    codename: "callsignal",
    title: "Earnings Call Sentiment Analyzer",
    description: "Turns earnings call transcripts into auditable buy-side signals, with every claim grounded in a direct quote and temperature-0 model judgment.",
    tags: ["Earnings Transcripts", "Sentiment Scoring", "Evidence-Grounded"],
    link: "https://callsignal.vercel.app/",
  },
  {
    id: "tenk",
    codename: "redline",
    title: "AI 10-K Auto-Summarizer",
    description: "Pulls year-over-year changes from real SEC EDGAR 10-K filings into evidence-grounded research, every figure traceable to source.",
    tags: ["SEC EDGAR", "YoY Diff Engine", "Filing Analysis"],
    link: "https://redline-10k-auto-summarizer.vercel.app/",
  },
  {
    id: "dcf",
    codename: "scenario-engine",
    title: "Natural Language DCF Override",
    description: "A deterministic DCF on live SEC data that you perturb with sliders or plain English, no manual formula edits.",
    tags: ["DCF Modeling", "Live SEC Data", "Scenario Engine"],
    link: "https://dcf-scenario-engine.vercel.app/",
  },
  {
    id: "rebalancer",
    codename: "rebalance-desk",
    title: "Conversational Portfolio Rebalancer",
    description: "Constraint-aware mean-variance rebalancing on real market data, with fiduciary guardrails and deterministic risk analytics.",
    tags: ["Mean-Variance Optimization", "Risk Analytics", "Market Data"],
    link: "https://conversational-portfolio-rebalancer.vercel.app/",
  },
  {
    id: "forensic",
    codename: "forensic-flags",
    title: "AI Forensic Anomaly Detector",
    description: "An earnings-quality screen on real filings using Beneish M-Score, Altman Z, and accrual diagnostics to flag numbers-versus-narrative gaps.",
    tags: ["Beneish M-Score", "Altman Z-Score", "Accrual Diagnostics"],
    link: "https://ai-forensic-anomaly-detector.vercel.app/",
  },
  {
    id: "macro",
    codename: "macro-desk",
    title: "AI Macro News-to-Trade Engine",
    description: "An 18-indicator macro dashboard from public data plus an LLM strategist that turns news events into structured cross-asset reads.",
    tags: ["18 Macro Indicators", "Cross-Asset Signals", "Event Analysis"],
    link: "https://ai-macro-news-to-trade-engine.vercel.app/",
  },
];

// ---------------------------------------------------------------------------
// INVOLVEMENT — campus organizations & extracurriculars (not just leadership)
// ---------------------------------------------------------------------------

export type InvolvementEntry = {
  id: string;
  organization: string;
  role: string;
};

export const involvement: InvolvementEntry[] = [
  { id: "ra", organization: "Michigan State REHS", role: "Resident Assistant" },
  {
    id: "scno",
    organization: "Students Consulting for Nonprofit Organizations (SCNO)",
    role: "Associate Consultant",
  },
  { id: "aig", organization: "Alternative Investments Group", role: "Real Estate Sector Analyst" },
  { id: "mbp", organization: "MBP NIL Business Teams", role: "Team Lead — Finance" },
  { id: "fa", organization: "Finance Association", role: "Member" },
  { id: "sia", organization: "Student Investment Association", role: "Member" },
  { id: "bisc", organization: "Broad International Student Council (BISC)", role: "Member" },
];

// ---------------------------------------------------------------------------
// SKILLS — named ranges, per-skill formulas, cross-references
// ---------------------------------------------------------------------------

/** Where a skill was used. `sheet` + `id` jump to and highlight that entry. */
export type SkillRef = {
  sheet: "projects" | "experience" | "involvement";
  id: string; // matches projects[].id, experience[].id, or involvement[].id
  label: string; // display name in the popover
};

export type Skill = {
  name: string;
  /** Shown in the formula bar on hover. */
  formula: string;
  /** Optional popover lines shown instead of cross-references (e.g. language proficiency). */
  details?: string[];
  /** Cross-references — drives popover links AND heat-map intensity. */
  refs: SkillRef[];
  /** Optional override for heat-map intensity (0-3), e.g. native languages. */
  intensity?: 0 | 1 | 2 | 3;
};

export type SkillCategory = {
  category: string;
  /** Excel-style named-range label, shown top-left of the range outline. */
  rangeName: string;
  skills: Skill[];
};

const REF = {
  rha: { sheet: "experience", id: "rha", label: "Michigan State RHA — Treasury" },
  kpmg: { sheet: "experience", id: "kpmg", label: "KPMG Deals Advisory" },
  hp: { sheet: "experience", id: "hp", label: "HP Tech Ventures" },
  sentiment: { sheet: "projects", id: "sentiment", label: "Earnings Call Sentiment Analyzer" },
  tenk: { sheet: "projects", id: "tenk", label: "AI 10-K Auto-Summarizer" },
  dcf: { sheet: "projects", id: "dcf", label: "Natural Language DCF Override" },
  rebalancer: { sheet: "projects", id: "rebalancer", label: "Conversational Portfolio Rebalancer" },
  forensic: { sheet: "projects", id: "forensic", label: "AI Forensic Anomaly Detector" },
  macro: { sheet: "projects", id: "macro", label: "AI Macro News-to-Trade Engine" },
  ra: { sheet: "involvement", id: "ra", label: "Michigan State REHS — RA" },
  scno: { sheet: "involvement", id: "scno", label: "SCNO — Associate Consultant" },
  aig: { sheet: "involvement", id: "aig", label: "Alternative Investments Group" },
  mbp: { sheet: "involvement", id: "mbp", label: "MBP NIL Business Teams" },
} satisfies Record<string, SkillRef>;

export const skills: SkillCategory[] = [
  {
    category: "Modeling & Valuation",
    rangeName: "Skills_Modeling",
    skills: [
      {
        name: "DCF",
        formula: '=EXPERIENCE("DCF", terminal_value=TRUE, sheet="Model")',
        refs: [REF.dcf, REF.kpmg, REF.aig],
      },
      {
        name: "Comps",
        formula: '=EXPERIENCE("Comps", peer_sets="curated")',
        refs: [REF.kpmg, REF.aig, REF.hp],
      },
      {
        name: "LBO",
        formula: '=EXPERIENCE("LBO", leverage="responsible")',
        refs: [REF.kpmg, REF.aig],
      },
      {
        name: "3-Statement",
        formula: '=EXPERIENCE("3-Statement", linked=TRUE, balanced=TRUE)',
        refs: [REF.kpmg, REF.forensic, REF.dcf],
      },
      {
        name: "Sensitivity Analysis",
        formula: '=EXPERIENCE("Sensitivity", tables="two-variable")',
        refs: [REF.dcf, REF.kpmg, REF.rebalancer],
      },
    ],
  },
  {
    category: "Corporate Finance & FP&A",
    rangeName: "Skills_FPA",
    skills: [
      {
        name: "Budgeting & Forecasting",
        formula: '=EXPERIENCE("Budgeting", owned="$500K+")',
        refs: [REF.rha, REF.mbp, REF.scno],
      },
      {
        name: "Variance Analysis",
        formula: '=EXPERIENCE("Variance", actuals_vs_plan="explained")',
        refs: [REF.rha, REF.mbp, REF.forensic],
      },
      {
        name: "Financial Reporting",
        formula: '=EXPERIENCE("Reporting", audience="stakeholders")',
        refs: [REF.rha, REF.kpmg, REF.mbp],
      },
      {
        name: "Scenario Analysis",
        formula: '=EXPERIENCE("Scenarios", cases="base/bull/bear")',
        refs: [REF.dcf, REF.macro, REF.rha],
      },
    ],
  },
  {
    category: "Strategy & Research",
    rangeName: "Skills_Strategy",
    skills: [
      {
        name: "Market Sizing",
        formula: '=EXPERIENCE("TAM", bottoms_up=TRUE)',
        refs: [REF.hp, REF.scno, REF.aig],
      },
      {
        name: "Competitive Analysis",
        formula: '=EXPERIENCE("Competitive", moats="mapped")',
        refs: [REF.hp, REF.kpmg, REF.scno],
      },
      {
        name: "Process Improvement",
        formula: '=EXPERIENCE("Process", steps_removed="many")',
        refs: [REF.rha, REF.scno, REF.ra],
      },
      {
        name: "KPI Development",
        formula: '=EXPERIENCE("KPIs", vanity_metrics=FALSE)',
        refs: [REF.rha, REF.mbp, REF.macro],
      },
    ],
  },
  {
    category: "Technical & Data",
    rangeName: "Skills_Technical",
    skills: [
      {
        name: "Excel",
        formula: '=EXPERIENCE("Excel", years=6, keyboard_only=TRUE)',
        refs: [REF.kpmg, REF.hp, REF.dcf],
      },
      {
        name: "Python",
        formula: '=EXPERIENCE("Python", projects=6)',
        refs: [REF.sentiment, REF.tenk, REF.rebalancer, REF.macro],
      },
      {
        name: "SQL",
        formula: '=EXPERIENCE("SQL", joins="all of them")',
        refs: [REF.forensic, REF.macro],
      },
      {
        name: "Power BI",
        formula: '=EXPERIENCE("Power BI", dashboards="clean")',
        refs: [REF.kpmg, REF.rha],
      },
      {
        name: "Tableau",
        formula: '=EXPERIENCE("Tableau", vizzes="clean")',
        refs: [REF.scno, REF.macro],
      },
    ],
  },
  {
    category: "AI Tooling",
    rangeName: "Skills_AI",
    skills: [
      {
        name: "Claude API",
        formula: '=EXPERIENCE("Claude API", projects=6, tokens="many")',
        refs: [REF.sentiment, REF.tenk, REF.dcf, REF.rebalancer, REF.forensic, REF.macro],
      },
      {
        name: "Prompt Engineering",
        formula: '=EXPERIENCE("Prompting", iterations=∞)',
        refs: [REF.sentiment, REF.tenk, REF.dcf, REF.rebalancer, REF.forensic, REF.macro],
      },
      {
        name: "NLP",
        formula: '=EXPERIENCE("NLP", sentiment="bullish")',
        refs: [REF.sentiment, REF.tenk],
      },
      { name: "RAG Pipelines", formula: '=EXPERIENCE("RAG", retrieval="grounded")', refs: [REF.tenk] },
      {
        name: "AI Agents",
        formula: '=EXPERIENCE("Agents", autonomy="supervised")',
        refs: [REF.rebalancer, REF.macro],
      },
    ],
  },
  {
    category: "Languages",
    rangeName: "Skills_Languages",
    skills: [
      {
        name: "English",
        formula: '=EXPERIENCE("English", fluency="native")',
        details: ["Speaking — Native", "Reading — Native", "Writing — Native"],
        refs: [],
        intensity: 3,
      },
      {
        name: "Hindi",
        formula: '=EXPERIENCE("Hindi", fluency="native")',
        details: ["Speaking — Native", "Reading — Native", "Writing — Native"],
        refs: [],
        intensity: 3,
      },
      {
        name: "Punjabi",
        formula: '=EXPERIENCE("Punjabi", fluency="native")',
        details: ["Speaking — Native", "Reading — Native", "Writing — Native"],
        refs: [],
        intensity: 3,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// CONTACT
// ---------------------------------------------------------------------------

export const contact = {
  email: site.email,
  phone: site.phone,
  linkedin: site.linkedin,
  linkedinLabel: site.linkedinLabel,
  note: "Open to full-time analyst roles starting Summer 2026 across finance, strategy, and analytics. Open to relocating and remote roles as well. Email is the fastest way to reach me.",
};

// ---------------------------------------------------------------------------
// MODEL SHEET — working toy DCF
// ---------------------------------------------------------------------------

export const dcfModel = {
  title: "Toy_DCF_v1",
  /** Year-0 revenue in $M — the model grows this forward 5 years. */
  baseRevenue: 100,
  /** Free-cash-flow margin applied to revenue. */
  fcfMargin: 0.25,
  /** Editable inputs (blue font / yellow fill, like real Excel input cells). */
  inputs: {
    growth: { label: "Revenue growth", min: 0, max: 30, initial: 12, suffix: "%" },
    discount: { label: "Discount rate", min: 6, max: 25, initial: 10, suffix: "%" },
    exitMultiple: { label: "Exit multiple", min: 4, max: 20, initial: 12, suffix: "× FCF" },
  },
  outputLabel: "Implied Valuation",
  disclaimer: "Disclaimer: simplified model. For the full version, hire me.",
};

// ---------------------------------------------------------------------------
// EASTER EGGS
// ---------------------------------------------------------------------------

/** Easter-egg toasts shown when pressing Enter in the formula bar. */
export const formulaToasts = [
  "#HIRED!",
  "Circular reference detected: my passion for finance refers to itself.",
  "Error 404: reasons not to interview Sehaj not found.",
  "This formula returned: 'Strong Buy'.",
];

/** Toast for the "+" sheet tab. */
export const newSheetToast = "Nice try. Headcount is frozen until I'm hired.";

/** Label on the ghost collaborator selection box. */
export const ghostLabel = "Recruiter (viewing)";
