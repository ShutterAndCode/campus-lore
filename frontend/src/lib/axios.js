import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true, //withCredentials: true tells Axios to include cookies on every request — without it,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

let onUnauthorized = null;

export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && onUnauthorized) {
      onUnauthorized();
    }
    return Promise.reject(error);
  }
);
export default api;
