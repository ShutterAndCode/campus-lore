import apiClient from "@/lib/apiClient";

export const adminApi = {
  getStats: async () => {
    const response = await apiClient.get("/admin/stats");

    return response.data;
  },

  getUsers: async () => {
    const response = await apiClient.get("/admin/users");

    return response.data;
  },

  getPosts: async () => {
    const response = await apiClient.get("/admin/posts");

    return response.data;
  },

  updateUserRole: async (userId, role) => {
    const response = await apiClient.patch(`/admin/users/${userId}/role`, {
      role,
    });

    return response.data;
  },
  deletePost: async (postId) => {
    const response = await apiClient.delete(`/admin/posts/${postId}`);

    return response.data;
  },
  getReports: async () => {
    const response = await apiClient.get("/reports");

    return response.data;
  },

  updateReportStatus: async (reportId, status) => {
    const response = await apiClient.patch(`/reports/${reportId}`, {
      status,
    });

    return response.data;
  },

  resolveReport: async (reportId) => {
    const response = await apiClient.delete(`/reports/${reportId}/action`);

    return response.data;
  },
};
