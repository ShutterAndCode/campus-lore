import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REQUEST_TIMEOUT = 10_000;

if (!API_BASE_URL) {
  throw new Error("Missing VITE_API_BASE_URL environment variable.");
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = {
      status: error.response?.status ?? null,
      message:
        error.response?.data?.message ??
        error.message ??
        "Unexpected error",
      original: error,
    };
    return Promise.reject(normalizedError);
  }
);

export default apiClient;