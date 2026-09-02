// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AuthProvider } from '@/context/AuthContext';
import NotificationListener from '@/components/notifications/NotificationListener';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WingaPro',
  description: 'WingaPro Business Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <NotificationListener />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}