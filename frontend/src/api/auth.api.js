import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/apiConstants";

export async function getCurrentUser() {
  const response = await api.get(API_ENDPOINTS.AUTH.ME);
  return response.data?.data ?? response.data;
}

export async function refreshAccessToken() {
  const response = await api.post(API_ENDPOINTS.AUTH.REFRESH);
  return response.data?.data?.accessToken ?? response.data?.accessToken;
}

export function loginWithGoogle() {
  window.location.assign(`${import.meta.env.VITE_API_BASE_URL}${API_ENDPOINTS.AUTH.GOOGLE_LOGIN}`);
}

export async function logout() {
  await api.post(API_ENDPOINTS.AUTH.LOGOUT);
}
