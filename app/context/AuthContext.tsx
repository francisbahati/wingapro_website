// app/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';

interface User {
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions to manage cookies
const setAuthCookies = (token: string, role: string) => {
  document.cookie = `jwt_token=${token}; path=/; max-age=86400; secure; samesite=lax`;
  document.cookie = `user_role=${role}; path=/; max-age=86400; secure; samesite=lax`;
};

const clearAuthCookies = () => {
  document.cookie = 'jwt_token=; path=/; max-age=0';
  document.cookie = 'user_role=; path=/; max-age=0';
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // On mount, try to restore session from tokens
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await apiClient.get('/users/profile');
        setUser(res.data.user);
        // Also sync cookies with the token if they are missing
        if (res.data.user?.role) {
          setAuthCookies(token, res.data.user.role);
        }
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        clearAuthCookies();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await apiClient.post('/auth/login', { username, password });
      const { accessToken, refreshToken, user } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      // Set cookies for middleware
      setAuthCookies(accessToken, user.role);
      setUser(user);
      router.push('/dashboard');
    } catch (error) {
      throw error; // Let the login page handle the error
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      clearAuthCookies();
      setUser(null);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}