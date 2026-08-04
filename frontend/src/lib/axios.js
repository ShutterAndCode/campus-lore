import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REQUEST_TIMEOUT = 10_000;
const ACCESS_TOKEN_KEY = "accessToken";

if (!API_BASE_URL) {
  throw new Error("Missing VITE_API_BASE_URL environment variable.");
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await api.post("/auth/refresh");
        const newToken =
          refreshResponse.data?.data?.accessToken ??
          refreshResponse.data?.accessToken;

        if (!newToken) {
          throw new Error("Refresh token response did not include accessToken");
        }

        setAuthToken(newToken);
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        setAuthToken(null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
