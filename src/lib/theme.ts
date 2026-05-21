export type Theme = "ember" | "orbit" | "lime";

export const THEMES: { id: Theme; label: string; hint: string; swatch: string }[] = [
  { id: "ember", label: "Ember",  hint: "coral · honey · teal (default)", swatch: "#ff6a3d" },
  { id: "orbit", label: "Orbit",  hint: "electric cyan · violet",         swatch: "#00d4ff" },
  { id: "lime",  label: "Lime",   hint: "single-shot punchy green",       swatch: "#c6f24e" },
];

export function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  if (t === "ember") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", t);
  }
  try {
    if (t === "ember") localStorage.removeItem("theme");
    else localStorage.setItem("theme", t);
  } catch {}
  window.dispatchEvent(new CustomEvent("themechange", { detail: t }));
}

export function getTheme(): Theme {
  if (typeof document === "undefined") return "ember";
  const v = document.documentElement.getAttribute("data-theme");
  return v === "orbit" || v === "lime" ? v : "ember";
}
