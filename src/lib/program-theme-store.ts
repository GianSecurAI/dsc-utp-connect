import { useSyncExternalStore } from "react";

export interface ProgramTheme {
  bg: string;
  bgHeader: string;
  surface: string;
  surface2: string;
}

let _theme: ProgramTheme | null = null;
const _subs = new Set<() => void>();

function notify() {
  _subs.forEach((fn) => fn());
}

export function setTheme(t: ProgramTheme | null) {
  _theme = t;
  notify();
}

export function useProgramTheme(): ProgramTheme | null {
  return useSyncExternalStore(
    (cb) => { _subs.add(cb); return () => _subs.delete(cb); },
    () => _theme,
    () => null,
  );
}
