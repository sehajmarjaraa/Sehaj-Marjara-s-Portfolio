import { useEffect, useRef, useState } from "react";

/** True when the user asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Animate a number from 0 to `target` with ease-out cubic via rAF.
 * Re-runs whenever `target` changes (animating from the previous value).
 * Respects prefers-reduced-motion (jumps straight to target).
 */
export function useCountUp(target: number, duration = 900): number {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0));
  const fromRef = useRef(prefersReducedMotion() ? target : 0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      fromRef.current = target;
      rafRef.current = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(rafRef.current);
    }
    const from = fromRef.current;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (target - from) * eased;
      setValue(v);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

/**
 * Fake Excel "recalculation": flash a staggered green wave across all
 * `[data-cellref]` and `.recalc-cell` elements inside `container`,
 * sweeping top-left → bottom-right over ~600ms.
 */
export function runRecalcWave(container: HTMLElement | null) {
  if (!container || prefersReducedMotion()) return;
  const els = container.querySelectorAll<HTMLElement>("[data-cellref], .recalc-cell");
  if (!els.length) return;
  const origin = container.getBoundingClientRect();
  els.forEach((el) => {
    const r = el.getBoundingClientRect();
    // diagonal distance from the container's top-left corner → delay
    const dist = r.left - origin.left + (r.top - origin.top) * 1.2;
    const delay = Math.max(0, Math.min(600, dist * 0.45));
    el.style.setProperty("--recalc-delay", `${delay}ms`);
    el.classList.remove("cell-recalc");
    // force reflow so re-adding the class restarts the animation
    void el.offsetWidth;
    el.classList.add("cell-recalc");
  });
  window.setTimeout(() => {
    els.forEach((el) => el.classList.remove("cell-recalc"));
  }, 1400);
}

/** Flash a single element (e.g. a dependent cell after a slider change). */
export function flashCell(el: HTMLElement | null) {
  if (!el || prefersReducedMotion()) return;
  el.style.setProperty("--recalc-delay", "0ms");
  el.classList.remove("cell-recalc");
  void el.offsetWidth;
  el.classList.add("cell-recalc");
  window.setTimeout(() => el.classList.remove("cell-recalc"), 600);
}
