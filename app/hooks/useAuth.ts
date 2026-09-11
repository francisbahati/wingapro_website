// app/hooks/useAuth.ts
// Re-export the auth hook from AuthContext so both import paths work.
// Pages can import from either '@/hooks/useAuth' or '@/context/AuthContext'.
export { useAuth } from '@/context/AuthContext';
export type { User } from '@/context/AuthContext';