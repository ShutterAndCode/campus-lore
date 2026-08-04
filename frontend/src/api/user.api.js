import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/apiConstants";

export async function getCurrentUser() {
  const { data } = await api.get(API_ENDPOINTS.USER.ME);
  return data;
}

export async function updateCurrentUser(profile) {
  const { data } = await api.patch(
    API_ENDPOINTS.USER.ME,
    profile
  );

  return data;
}