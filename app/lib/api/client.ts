// app/lib/api/client.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

const SECURE = typeof window !== 'undefined' && window.location.protocol === 'https:';
const COOKIE_BASE = `path=/; samesite=lax${SECURE ? '; secure' : ''}`;

function clearAuthCookies() {
  document.cookie = `jwt_token=; ${COOKIE_BASE}; max-age=0`;
  document.cookie = `user_role=; ${COOKIE_BASE}; max-age=0`;
}

// ---- Request interceptor: attach token ----
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- Response interceptor: refresh on 401 ----
let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      // Deduplicate concurrent refresh calls
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) throw new Error('No refresh token');
          const { data } = await axios.post(`${API_BASE}/auth/refresh-token`, {
            refreshToken,
          });
          const newToken = data.accessToken as string;
          localStorage.setItem('accessToken', newToken);
          return newToken;
        })().finally(() => {
          refreshPromise = null;
        });
      }

      try {
        const newToken = await refreshPromise;
        original.headers = { ...(original.headers || {}), Authorization: `Bearer ${newToken}` };
        return apiClient(original);
      } catch {
        // Refresh failed — clean up and force login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        clearAuthCookies();
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;