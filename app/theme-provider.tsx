// app/theme-provider.tsx
'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

const theme = createTheme({
  palette: {
    primary: { main: '#0A2E5C' },
    secondary: { main: '#00b4d8' },
  },
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}