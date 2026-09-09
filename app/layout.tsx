// app/layout.tsx
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import NotificationListener from '@/components/notifications/NotificationListener';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ThemeProvider from './theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <AuthProvider>
              <NotificationListener />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}