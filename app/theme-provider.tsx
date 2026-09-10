// app/theme-provider.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMediaQuery } from '@mui/material';

// =========================================================
// 60/30/10 PALETTE
// 60% → neutral (whites, soft grays)
// 30% → navy (structure: footer, buttons, headlines)
// 10% → cyan (accent: links, hovers, highlights)
// =========================================================
export const brand = {
  // 60% — DOMINANT: neutrals
  white: '#FFFFFF',
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate700: '#334155',
  slate900: '#0F172A',

  // 30% — SECONDARY: navy
  navy: '#0A2E5C',
  navyLight: '#123A6B',
  navySoft: '#123A6B',
  navyDeep: '#061B38',

  // 10% — ACCENT: cyan
  cyan: '#00B4D8',
  cyanSoft: '#4DD0E1',
  cyanDeep: '#0096B8',

  // semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

// =========================================================
// THEME FACTORY
// =========================================================
function buildTheme(mode: 'light' | 'dark') {
  const isLight = mode === 'light';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: brand.navy,
        light: brand.navyLight,
        dark: brand.navyDeep,
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: brand.cyan,
        light: brand.cyanSoft,
        dark: brand.cyanDeep,
        contrastText: '#FFFFFF',
      },
      success: { main: brand.success },
      warning: { main: brand.warning },
      error: { main: brand.error },
      info: { main: brand.info },
      background: {
        default: isLight ? brand.slate50 : '#0B1220',
        paper: isLight ? brand.white : '#111A2C',
      },
      text: {
        primary: isLight ? brand.slate900 : '#F1F5F9',
        secondary: isLight ? brand.slate500 : '#94A3B8',
      },
      divider: isLight ? brand.slate200 : 'rgba(148, 163, 184, 0.14)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
        fontWeight: 800,
        letterSpacing: '-0.025em',
        lineHeight: 1.05,
        color: isLight ? brand.navy : '#F1F5F9',
      },
      h2: {
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        color: isLight ? brand.navy : '#F1F5F9',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: 1.2,
        color: isLight ? brand.navy : '#F1F5F9',
      },
      h4: { fontSize: '1.375rem', fontWeight: 700, lineHeight: 1.25 },
      h5: { fontSize: '1.125rem', fontWeight: 600 },
      h6: { fontSize: '1rem', fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
      body2: { fontSize: '0.9rem', lineHeight: 1.55 },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
      caption: { fontSize: '0.75rem', letterSpacing: '0.02em' },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
        },
      },
      MuiContainer: {
        defaultProps: { maxWidth: 'lg' },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '10px 22px',
            fontWeight: 600,
            textTransform: 'none',
            transition:
              'transform .15s ease, box-shadow .15s ease, background .15s ease',
            '&:hover': { transform: 'translateY(-1px)' },
            '&:active': { transform: 'translateY(0)' },
          },
          containedPrimary: {
            background: brand.navy,
            boxShadow: '0 4px 14px rgba(10,46,92,0.20)',
            '&:hover': {
              background: brand.navyLight,
              boxShadow: '0 8px 22px rgba(10,46,92,0.28)',
            },
          },
          containedSecondary: {
            background: brand.cyan,
            boxShadow: '0 4px 14px rgba(0,180,216,0.24)',
            '&:hover': { background: brand.cyanDeep },
          },
          sizeLarge: { padding: '14px 32px', fontSize: '1rem', borderRadius: 14 },
          sizeSmall: {
            padding: '6px 14px',
            fontSize: '0.8125rem',
            borderRadius: 10,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            border: `1px solid ${
              isLight ? brand.slate200 : 'rgba(148,163,184,0.12)'
            }`,
            boxShadow: isLight
              ? '0 1px 2px rgba(15,23,42,0.04)'
              : '0 1px 2px rgba(0,0,0,0.4)',
            backgroundImage: 'none',
            transition:
              'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.03)',
            transition: 'box-shadow .15s ease, border-color .15s ease',
            '& fieldset': {
              borderColor: isLight
                ? brand.slate200
                : 'rgba(148,163,184,0.2)',
            },
            '&:hover fieldset': {
              borderColor: brand.slate400,
            },
            '&.Mui-focused fieldset': {
              borderColor: isLight ? brand.navy : brand.cyan,
              borderWidth: 2,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, fontWeight: 500 },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: 'none',
            borderBottom: `1px solid ${
              isLight ? brand.slate200 : 'rgba(148,163,184,0.14)'
            }`,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
            color: isLight ? brand.slate500 : brand.slate300,
            backgroundColor: isLight
              ? brand.slate50
              : 'rgba(255,255,255,0.02)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            borderRight: `1px solid ${
              isLight ? brand.slate200 : 'rgba(148,163,184,0.14)'
            }`,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            margin: '2px 8px',
            '&.Mui-selected': {
              backgroundColor: isLight
                ? 'rgba(10,46,92,0.06)'
                : 'rgba(0,180,216,0.14)',
              color: isLight ? brand.navy : brand.cyan,
              '&:hover': {
                backgroundColor: isLight
                  ? 'rgba(10,46,92,0.10)'
                  : 'rgba(0,180,216,0.2)',
              },
            },
          },
        },
      },
    },
  });
}

// =========================================================
// PROVIDER
// =========================================================
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const mode: 'light' | 'dark' = useMemo(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-mode');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return prefersDark ? 'dark' : 'light';
  }, [prefersDark]);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}