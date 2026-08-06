import apiClient from "@/lib/apiClient";

export async function getCurrentUser() {
  const response = await apiClient.get("/auth/me");

  return response.data?.data ?? response.data;
}

export async function logout() {
  await apiClient.post("/auth/logout");
}

export function loginWithGoogle() {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
}
