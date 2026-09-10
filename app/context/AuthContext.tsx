// app/context/AuthContext.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  role: string;
  wallet_balance?: number;
  branchId?: number | null;
  referral_code?: string;
  seller_registration_paid?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cookie helpers — secure flag only in production
const SECURE = typeof window !== 'undefined' && window.location.protocol === 'https:';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

function setAuthCookies(token: string, role: string) {
  const base = `path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax${SECURE ? '; secure' : ''}`;
  document.cookie = `jwt_token=${token}; ${base}`;
  document.cookie = `user_role=${role}; ${base}`;
}

function clearAuthCookies() {
  const base = `path=/; max-age=0; samesite=lax${SECURE ? '; secure' : ''}`;
  document.cookie = `jwt_token=; ${base}`;
  document.cookie = `user_role=; ${base}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshProfile = useCallback(async () => {
    try {
      const res = await apiClient.get('/users/profile');
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  }, []);

  // On mount — restore session
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      if (!token) {
        if (!cancelled) setIsLoading(false);
        return;
      }
      try {
        const res = await apiClient.get('/users/profile');
        if (cancelled) return;
        setUser(res.data.user);
        if (res.data.user?.role) {
          setAuthCookies(token, res.data.user.role);
        }
      } catch {
        if (cancelled) return;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        clearAuthCookies();
        setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await apiClient.post('/auth/login', { username, password });
      const { accessToken, refreshToken, user: u } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setAuthCookies(accessToken, u.role);
      setUser(u);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch { /* ignore */ }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    clearAuthCookies();
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}