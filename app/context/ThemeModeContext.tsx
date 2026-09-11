// app/context/ThemeModeContext.tsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
  mode: ThemeMode;
  toggle: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

const STORAGE_KEY = 'wingapro-theme';

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  // Always default to LIGHT — we do NOT follow system preference.
  // This prevents the harsh dark theme from appearing uninvited.
  const [mode, setModeState] = useState<ThemeMode>('light');

  // Restore saved choice after hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') setModeState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  // Apply to <html data-theme="...">
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
    root.style.colorScheme = mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => setModeState(next), []);
  const toggle  = useCallback(
    () => setModeState((prev) => (prev === 'light' ? 'dark' : 'light')),
    []
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggle, setMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (ctx === undefined) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return ctx;
}