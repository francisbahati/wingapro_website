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

/**
 * Read the initial mode from the DOM.
 * The inline <script> in layout.tsx already set data-theme before hydration,
 * so we just mirror what's on the <html> element. No DOM mutation here.
 */
function readInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    /* ignore */
  }
  return 'light';
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  // Lazy initializer — safe because it only runs on the client
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [hydrated, setHydrated] = useState(false);

  // On mount, sync React state to whatever the inline script already applied
  useEffect(() => {
    setModeState(readInitialMode());
    setHydrated(true);
  }, []);

  // Apply mode changes ONLY after hydration AND only when user actually toggles
  const applyMode = useCallback((next: ThemeMode) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', next);
    root.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      if (hydrated) applyMode(next);
    },
    [hydrated, applyMode]
  );

  const toggle = useCallback(() => {
    setModeState((prev) => {
      const next: ThemeMode = prev === 'light' ? 'dark' : 'light';
      if (hydrated) applyMode(next);
      return next;
    });
  }, [hydrated, applyMode]);

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