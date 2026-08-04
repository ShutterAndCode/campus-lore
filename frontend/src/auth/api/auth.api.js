import authApiClient from "@/auth/utils/axios";

export async function getCurrentUser() {
  const response = await authApiClient.get("/profile/me");
  return response.data?.data ?? response.data;
}

export async function updateCurrentUser(profileData) {
  const response = await authApiClient.patch(
    "/profile/me",
    profileData
  );

  return response.data?.data ?? response.data;
}

export async function logout() {
  await authApiClient.post("/auth/logout");
}

export function loginWithGoogle() {
  window.location.href =
    `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
}