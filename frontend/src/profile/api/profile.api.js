import apiClient from "@/lib/apiClient";

export async function getMyProfile() {
  const response = await apiClient.get("/profile/me");

  return response.data.data;
}

export async function updateMyProfile(data) {
  const response = await apiClient.patch(
    "/profile/me",
    data
  );

  return response.data.data;
}