export type ColorMode = "light" | "dark";

const STORAGE_KEY = "color-mode";

export const COLOR_MODE_EVENT = "colormodechange";

const THEME_COLORS: Record<ColorMode, string> = {
  light: "#f7f8fa",
  dark: "#0b0d11",
};

export function getStoredColorMode(): ColorMode | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
}

export function getSystemColorMode(): ColorMode {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getColorMode(): ColorMode {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

export function applyColorMode(mode: ColorMode) {
  if (typeof document === "undefined") return;

  document.documentElement.setAttribute("data-theme", mode);
  document.documentElement.style.colorScheme = mode;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLORS[mode]);

  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {}

  window.dispatchEvent(new CustomEvent(COLOR_MODE_EVENT, { detail: mode }));
}

export function toggleColorMode(): ColorMode {
  const next: ColorMode = getColorMode() === "dark" ? "light" : "dark";
  applyColorMode(next);
  return next;
}

/** Inline script — must run before paint to avoid theme flash */
export const colorModeInitScript = `(function(){try{var s=localStorage.getItem("${STORAGE_KEY}");var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light");document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;
