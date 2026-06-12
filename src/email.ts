import { site } from "./content";

/**
 * Robust email handoff: the mailto: link still fires (default anchor
 * behavior), but we also copy the address and announce it — so visitors
 * without a configured mail app still get the email.
 */
export function onEmailClick() {
  navigator.clipboard?.writeText(site.email).catch(() => {});
  window.dispatchEvent(
    new CustomEvent("app-toast", {
      detail: `${site.email} copied to clipboard — opening your mail app…`,
    })
  );
}
