import apiClient from "@/lib/apiClient";


export async function createReport(postId, payload) {
  const response = await apiClient.post(
    `/reports/${postId}`,
    payload
  );

  return response.data;
}