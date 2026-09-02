// app/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/api/client'; // Create this next if not already present

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'seller' | 'branch_director' | 'finance' | 'technical' | 'corporate_sales' | 'showroom' | 'business_staff' | 'customer';
  // add other user fields as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // On mount, check if user is already logged in (e.g., token in cookie)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await axios.post('/auth/login', { email, password });
      setUser(res.data.user);
      // Token is stored in HttpOnly cookie by the backend or we set it here (if using custom logic)
      // For simplicity, assume backend sets a cookie or we store in local storage (not recommended)
      router.push('/dashboard');
    } catch (error) {
      throw error; // Let the caller handle the error
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch {
      // ignore
    } finally {
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