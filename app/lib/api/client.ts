// lib/api/client.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// ✅ Every request from the customer web app is tagged so the backend
// can block non-customer roles with a clear message.
const APP_CLIENT_HEADER = 'web-customer';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'X-App-Client': APP_CLIENT_HEADER,
  },
  timeout: 30000,
});

const SECURE = typeof window !== 'undefined' && window.location.protocol === 'https:';
const COOKIE_BASE = `path=/; samesite=lax${SECURE ? '; secure' : ''}`;

function clearAuthCookies() {
  if (typeof document === 'undefined') return;
  document.cookie = `jwt_token=; ${COOKIE_BASE}; max-age=0`;
  document.cookie = `user_role=; ${COOKIE_BASE}; max-age=0`;
}

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Ensure the app-client header is always present
      if (config.headers && !config.headers['X-App-Client']) {
        config.headers['X-App-Client'] = APP_CLIENT_HEADER;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let refreshPromise: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    // 🚫 Do NOT refresh if the server blocked us due to wrong role
    const data: any = error.response?.data;
    const isRoleBlock =
      status === 403 &&
      typeof data?.message === 'string' &&
      data.message.toLowerCase().includes('customers only');

    if (isRoleBlock) {
      // Let the caller (AuthContext) handle the specific message
      return Promise.reject(error);
    }

    if (status === 401 && !original._retry) {
      original._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) throw new Error('No refresh token');
          const { data } = await axios.post(
            `${API_BASE}/auth/refresh-token`,
            { refreshToken },
            { headers: { 'X-App-Client': APP_CLIENT_HEADER } }
          );
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