// app/theme-provider.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useThemeMode } from '@/context/ThemeModeContext';

// =========================================================
// 60/30/10 PALETTE
// =========================================================
export const brand = {
  white:    '#FFFFFF',
  slate50:  '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate700: '#334155',
  slate900: '#0F172A',

  navy:      '#0A2E5C',
  navyLight: '#123A6B',
  navySoft:  '#123A6B',
  navyDeep:  '#061B38',

  cyan:      '#00B4D8',
  cyanSoft:  '#4DD0E1',
  cyanDeep:  '#0096B8',

  success: '#10B981',
  warning: '#F59E0B',
  error:   '#EF4444',
  info:    '#3B82F6',
};

// =========================================================
// THEME FACTORY
// =========================================================
function buildTheme(mode: 'light' | 'dark') {
  const isLight = mode === 'light';

  // Soft, brand-matched dark palette — NOT pure black
  const darkBg          = '#0E1526';   // deep navy-slate
  const darkSurface     = '#16203A';   // cards, paper
  const darkSurface2    = '#1B2742';
  const darkBorder      = 'rgba(148, 163, 184, 0.16)';
  const darkBorderHover = 'rgba(0, 180, 216, 0.35)';
  const darkText        = '#E6EAF2';
  const darkTextMuted   = '#94A3B8';

  return createTheme({
    palette: {
      mode,
      primary: {
        main:  isLight ? brand.navy      : '#4B8FD6',
        light: isLight ? brand.navyLight : '#5FA0E0',
        dark:  isLight ? brand.navyDeep  : '#2E6BB0',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main:  brand.cyan,
        light: brand.cyanSoft,
        dark:  brand.cyanDeep,
        contrastText: '#FFFFFF',
      },
      success: { main: brand.success },
      warning: { main: brand.warning },
      error:   { main: brand.error },
      info:    { main: brand.info },
      background: {
        default: isLight ? brand.slate50 : darkBg,
        paper:   isLight ? brand.white   : darkSurface,
      },
      text: {
        primary:   isLight ? brand.slate900 : darkText,
        secondary: isLight ? brand.slate500 : darkTextMuted,
      },
      divider: isLight ? brand.slate200 : darkBorder,
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
      h6: { fontSize: '1rem',     fontWeight: 600 },
      body1: { fontSize: '1rem',    lineHeight: 1.6  },
      body2: { fontSize: '0.9rem',  lineHeight: 1.55 },
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
            transition: 'background-color .3s ease, color .3s ease',
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
            background: isLight
              ? brand.navy
              : 'linear-gradient(135deg, #2E6BB0 0%, #4B8FD6 100%)',
            boxShadow: isLight
              ? '0 4px 14px rgba(10,46,92,0.20)'
              : '0 4px 14px rgba(75,143,214,0.35)',
            '&:hover': {
              background: isLight ? brand.navyLight : '#5FA0E0',
              boxShadow: isLight
                ? '0 8px 22px rgba(10,46,92,0.28)'
                : '0 8px 22px rgba(75,143,214,0.45)',
            },
          },
          containedSecondary: {
            background: brand.cyan,
            boxShadow: '0 4px 14px rgba(0,180,216,0.24)',
            '&:hover': { background: brand.cyanDeep },
          },
          outlined: {
            borderColor: isLight ? brand.slate200 : 'rgba(148,163,184,0.30)',
            color: isLight ? brand.navy : '#E6EAF2',
            '&:hover': {
              borderColor: isLight ? brand.navy : brand.cyan,
              bgcolor: isLight ? 'rgba(10,46,92,0.03)' : 'rgba(0,180,216,0.08)',
            },
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
            border: `1px solid ${isLight ? brand.slate200 : darkBorder}`,
            boxShadow: isLight
              ? '0 1px 2px rgba(15,23,42,0.04)'
              : '0 1px 2px rgba(0,0,0,0.30)',
            backgroundImage: 'none',
            backgroundColor: isLight ? brand.white : darkSurface,
            transition:
              'transform .2s ease, box-shadow .2s ease, border-color .2s ease, background-color .2s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: isLight ? brand.white : darkSurface,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.04)',
            transition: 'box-shadow .15s ease, border-color .15s ease, background-color .2s ease',
            '& fieldset': {
              borderColor: isLight
                ? brand.slate200
                : 'rgba(148,163,184,0.22)',
            },
            '&:hover fieldset': {
              borderColor: isLight ? brand.slate400 : 'rgba(148,163,184,0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: isLight ? brand.navy : brand.cyan,
              borderWidth: 2,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: isLight ? brand.slate500 : darkTextMuted,
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
              isLight ? brand.slate200 : darkBorder
            }`,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 600,
            color: isLight ? brand.slate500 : darkTextMuted,
            backgroundColor: isLight
              ? brand.slate50
              : 'rgba(255,255,255,0.03)',
          },
          body: {
            color: isLight ? brand.slate700 : darkText,
            borderColor: isLight ? brand.slate200 : darkBorder,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            backgroundColor: isLight ? brand.white : darkSurface,
            borderRight: `1px solid ${isLight ? brand.slate200 : darkBorder}`,
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
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            backgroundColor: isLight ? brand.white : darkSurface,
            border: `1px solid ${isLight ? 'transparent' : darkBorder}`,
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderColor: isLight ? brand.slate200 : darkBorder,
            color: isLight ? brand.slate500 : darkTextMuted,
            '&.Mui-selected': {
              backgroundColor: isLight
                ? 'rgba(10,46,92,0.06)'
                : 'rgba(0,180,216,0.14)',
              color: isLight ? brand.navy : brand.cyan,
              borderColor: isLight ? brand.navy : brand.cyan,
              '&:hover': {
                backgroundColor: isLight
                  ? 'rgba(10,46,92,0.10)'
                  : 'rgba(0,180,216,0.20)',
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
  const { mode } = useThemeMode();

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}