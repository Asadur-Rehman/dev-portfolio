"use client";

import { useCallback, useEffect, useState } from "react";
import {
  applyColorMode,
  COLOR_MODE_EVENT,
  getColorMode,
  type ColorMode,
  toggleColorMode,
} from "@/lib/theme";

export function useColorMode() {
  const [mode, setMode] = useState<ColorMode>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMode(getColorMode());
    setReady(true);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ColorMode>).detail;
      setMode(detail ?? getColorMode());
    };

    window.addEventListener(COLOR_MODE_EVENT, onChange);
    return () => window.removeEventListener(COLOR_MODE_EVENT, onChange);
  }, []);

  const set = useCallback((next: ColorMode) => {
    applyColorMode(next);
    setMode(next);
  }, []);

  const toggle = useCallback(() => {
    setMode(toggleColorMode());
  }, []);

  return { mode, set, toggle, ready };
}
