import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { aboutPlayground, formulaToasts } from "./content";
import type { SectionId } from "./content";
import { SelectionContext, moveCellRef } from "./selection-context";
import { runRecalcWave } from "./motion";
import { TitleBar } from "./components/TitleBar";
import { Ribbon } from "./components/Ribbon";
import { FormulaBar } from "./components/FormulaBar";
import { Grid } from "./components/Grid";
import type { EditingState } from "./grid-constants";
import { SheetTabs } from "./components/SheetTabs";
import { StatusBar } from "./components/StatusBar";
import { Toast } from "./components/Toast";
import { LoadingScreen } from "./components/LoadingScreen";
import { SearchBox } from "./components/SearchBox";
import { GhostCollaborator } from "./components/GhostCollaborator";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";
import { ModelSheet } from "./sections/ModelSheet";

export default function App() {
  const [active, setActive] = useState<SectionId>("about");
  const [selected, setSelected] = useState("A1");
  const [zoom, setZoom] = useState(100);
  const [toast, setToast] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [fxOverride, setFxOverride] = useState<string | null>(null);
  const [aboutCmd, setAboutCmd] = useState<string | null>(null);
  /** Real cell contents, keyed `${sheet}:${ref}` — every grid cell is typeable. */
  const [cellValues, setCellValues] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<EditingState>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingHighlight = useRef<string | null>(null);
  const toastIndex = useRef(0);

  const sheetKey = useCallback((ref: string) => `${active}:${ref}`, [active]);
  const sheetValues = useMemo(() => {
    const prefix = `${active}:`;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(cellValues)) {
      if (k.startsWith(prefix)) out[k.slice(prefix.length)] = v;
    }
    return out;
  }, [cellValues, active]);

  // Brief "Opening workbook…" splash on first paint.
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1100);
    return () => clearTimeout(t);
  }, []);

  // Global toast channel (e.g. email links announce the copied address).
  useEffect(() => {
    const onToast = (e: Event) => setToast((e as CustomEvent<string>).detail);
    window.addEventListener("app-toast", onToast);
    return () => window.removeEventListener("app-toast", onToast);
  }, []);

  const switchTab = useCallback((id: SectionId) => {
    setActive(id);
    setFxOverride(null);
    setEditing(null);
    scrollRef.current?.scrollTo({ top: 0 });
  }, []);

  /** A recognized command (=aboutme etc.) — jump to About and run it. */
  const runFormulaCommand = useCallback(
    (cmd: string) => {
      setAboutCmd(cmd);
      switchTab("about");
    },
    [switchTab]
  );

  /**
   * Jump to another sheet and flash a specific entry (skill cross-references).
   * Experience entries live behind =experience on About.
   */
  const goToEntry = useCallback(
    (sheet: "projects" | "experience" | "involvement", entryId: string) => {
      pendingHighlight.current = entryId;
      if (sheet === "experience" || sheet === "involvement") {
        setAboutCmd(`=${sheet}`);
        switchTab("about");
      } else {
        switchTab(sheet);
      }
    },
    [switchTab]
  );

  const startEdit = useCallback(
    (initial: string | null, source: "cell" | "bar" = "cell") => {
      setEditing({
        value: initial ?? cellValues[sheetKey(selected)] ?? "",
        source,
      });
    },
    [cellValues, selected, sheetKey]
  );

  const editChange = useCallback((value: string, source: "cell" | "bar") => {
    setEditing((e) => ({ value, source: e?.source ?? source }));
  }, []);

  /** Commit the in-progress edit — evaluate =commands, store everything else. */
  const commitEdit = useCallback(
    (move: "down" | "right" | "none") => {
      setEditing((e) => {
        if (e == null) return null;
        let stored = e.value;
        const v = e.value.trim();
        if (v.startsWith("=") && v.length > 1) {
          const name = v.slice(1).toLowerCase().replace(/\(\)$/, "");
          if (aboutPlayground.commands[name]) {
            runFormulaCommand(`=${name}`);
            stored = `=${name}`;
          } else {
            stored = "#NAME?";
            setToast(formulaToasts[toastIndex.current % formulaToasts.length]);
            toastIndex.current += 1;
          }
        }
        setCellValues((prev) => {
          const next = { ...prev };
          const k = sheetKey(selected);
          if (stored.trim() === "") delete next[k];
          else next[k] = stored;
          return next;
        });
        return null;
      });
      if (move === "down") setSelected((s) => moveCellRef(s, 0, 1));
      if (move === "right") setSelected((s) => moveCellRef(s, 1, 0));
    },
    [runFormulaCommand, selected, sheetKey]
  );

  const cancelEdit = useCallback(() => setEditing(null), []);

  /** Selecting another cell commits any in-progress edit first (Excel behavior). */
  const selectCell = useCallback(
    (ref: string) => {
      if (editing) commitEdit("none");
      setSelected(ref);
    },
    [editing, commitEdit]
  );

  // After each sheet switch: run the recalc wave, then resolve any pending
  // cross-reference highlight.
  useEffect(() => {
    if (!loaded) return;
    const wave = setTimeout(() => runRecalcWave(scrollRef.current), 60);
    const jump = setTimeout(() => {
      if (!pendingHighlight.current) return;
      const el = document.getElementById(`entry-${pendingHighlight.current}`);
      pendingHighlight.current = null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("entry-highlight");
        setTimeout(() => el.classList.remove("entry-highlight"), 2200);
      }
    }, 300);
    return () => {
      clearTimeout(wave);
      clearTimeout(jump);
    };
  }, [active, loaded, aboutCmd]);

  // Keyboard: arrows move the selection, typing starts an edit (Excel-style),
  // Enter moves down, F2 edits, Delete clears, Cmd/Ctrl+F opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setSearchOpen(true);
        return;
      }
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.metaKey || e.ctrlKey || e.altKey) return;

      const moves: Record<string, [number, number]> = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      };
      const move = moves[e.key];
      if (move) {
        e.preventDefault();
        setSelected((s) => moveCellRef(s, move[0], move[1]));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        setSelected((s) => moveCellRef(s, 0, 1));
        return;
      }
      // Don't type over content blocks — only real grid cells are editable.
      const covered = document.querySelector(`[data-cellref="${selected}"]`);
      if (covered) return;
      if (e.key === "F2") {
        e.preventDefault();
        startEdit(null);
        return;
      }
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        setCellValues((prev) => {
          const next = { ...prev };
          delete next[sheetKey(selected)];
          return next;
        });
        return;
      }
      // A printable character replaces the cell content, like Excel.
      if (e.key.length === 1) {
        e.preventDefault();
        startEdit(e.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, sheetKey, startEdit]);

  const selectionValue = useMemo(
    () => ({ selected, select: selectCell }),
    [selected, selectCell]
  );

  const section = useMemo(() => {
    switch (active) {
      case "about":
        return <About autoCmd={aboutCmd} />;
      case "projects":
        return <Projects query={query} />;
      case "skills":
        return <Skills onFormulaHover={setFxOverride} goToEntry={goToEntry} />;
      case "contact":
        return <Contact />;
      case "model":
        return <ModelSheet />;
    }
  }, [active, query, goToEntry, aboutCmd]);

  return (
    <SelectionContext.Provider value={selectionValue}>
      <div className="h-full flex flex-col overflow-hidden">
        <LoadingScreen done={loaded} />
        <TitleBar onComments={() => switchTab("contact")} />
        <Ribbon active={active} onTabChange={switchTab} onCommand={runFormulaCommand} />
        <FormulaBar
          active={active}
          cellRef={selected}
          cellValue={sheetValues[selected] ?? ""}
          editing={editing}
          override={fxOverride}
          onEditChange={(v) => editChange(v, "bar")}
          onCommit={commitEdit}
          onCancel={cancelEdit}
        />

        <div className="relative flex-1 flex flex-col min-h-0">
          <SearchBox
            open={searchOpen}
            query={query}
            onQuery={setQuery}
            onClose={() => {
              setSearchOpen(false);
              setQuery("");
            }}
          />
          <Grid
            zoom={zoom}
            selected={selected}
            cellValues={sheetValues}
            editing={editing}
            onSelect={selectCell}
            onStartEdit={(initial) => startEdit(initial, "cell")}
            onEditChange={(v) => editChange(v, "cell")}
            onCommit={commitEdit}
            onCancel={cancelEdit}
            scrollRef={scrollRef}
          >
            {/* key remounts the section so the fade replays on each switch */}
            <div key={active} className="sheet-enter min-h-full pb-16">
              {section}
            </div>
            <GhostCollaborator containerRef={scrollRef} active={active} />
          </Grid>
        </div>

        <SheetTabs active={active} onTabChange={switchTab} onToast={setToast} />
        <StatusBar active={active} zoom={zoom} onZoom={setZoom} />
        <Toast message={toast} onDismiss={() => setToast(null)} />
      </div>
    </SelectionContext.Provider>
  );
}
