import { createContext, useContext, useState } from "react";

export interface ProgramTheme {
  bg: string;
  bgHeader: string;
  surface: string;
  surface2: string;
}

interface ThemeCtx {
  theme: ProgramTheme | null;
  setTheme: (t: ProgramTheme | null) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: null, setTheme: () => {} });

export function ProgramThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ProgramTheme | null>(null);
  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export function useProgramTheme() {
  return useContext(Ctx);
}
