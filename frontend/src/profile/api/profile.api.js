import authApiClient from "@/auth/utils/axios";

export async function getMyProfile() {
  const response = await authApiClient.get("/profile/me");

  return response.data.data;
}

export async function updateMyProfile(data) {
  const response = await authApiClient.patch(
    "/profile/me",
    data
  );

  return response.data.data;
}