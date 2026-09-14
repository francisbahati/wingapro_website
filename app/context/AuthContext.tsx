// context/AuthContext.tsx
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

const SECURE = typeof window !== 'undefined' && window.location.protocol === 'https:';
const COOKIE_MAX_AGE = 60 * 60 * 24;

function setAuthCookies(token: string, role: string) {
  if (typeof document === 'undefined') return;
  const base = `path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax${SECURE ? '; secure' : ''}`;
  document.cookie = `jwt_token=${token}; ${base}`;
  document.cookie = `user_role=${role}; ${base}`;
}

function clearAuthCookies() {
  if (typeof document === 'undefined') return;
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
      } catch (err: any) {
        if (cancelled) return;

        // If the backend blocked us due to wrong role, clear everything
        const msg = err?.response?.data?.message || '';
        const isRoleBlock =
          err?.response?.status === 403 &&
          typeof msg === 'string' &&
          msg.toLowerCase().includes('customers only');

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        clearAuthCookies();
        setUser(null);

        if (isRoleBlock) {
          // Surface the message to the login page
          try {
            sessionStorage.setItem('authRoleBlockMessage', msg);
          } catch (_) {}
          if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
            window.location.href = '/login';
            return;
          }
        }
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

      // 🚫 Block non-customers from ever completing login on the web app
      if (u.role && u.role !== 'customer') {
        const roleLabel = prettyRole(u.role);
        const msg = `You are ${roleLabel}. This web app is for customers only. Please use the mobile application to access your account.`;
        // Do not save anything
        throw Object.assign(new Error(msg), { isRoleBlock: true });
      }

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setAuthCookies(accessToken, u.role);
      setUser(u);
    } catch (err: any) {
      // Backend may also return the same message with status 403
      const msg = err?.response?.data?.message || err?.message;
      const isRoleBlock =
        (err?.isRoleBlock === true) ||
        (err?.response?.status === 403 &&
          typeof msg === 'string' &&
          msg.toLowerCase().includes('customers only'));

      if (isRoleBlock) {
        try {
          sessionStorage.setItem('authRoleBlockMessage', msg);
        } catch (_) {}
      }
      throw err;
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

function prettyRole(role: string): string {
  const map: Record<string, string> = {
    admin: 'an admin',
    seller: 'a seller',
    branch_director: 'a branch director',
    finance: 'a finance staff member',
    technical: 'a technical staff member',
    corporate_sales: 'a corporate sales agent',
    showroom: 'a showroom staff member',
    business_staff: 'a business staff member',
    customer: 'a customer',
  };
  return map[role] || `a ${role}`;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}