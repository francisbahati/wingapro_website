// app/theme.ts
'use client';

import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'] });

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0a2e5c',
      light: '#1a3a5c',
      dark: '#0a1a2b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00b4d8',
    },
    background: {
      default: '#f4f6fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default theme;