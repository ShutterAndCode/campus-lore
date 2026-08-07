import { adminApi } from "../api/admin.api";

export const adminService = {
  async getStats() {
    const response = await adminApi.getStats();

    return response.data;
  },

  async getUsers() {
    const response = await adminApi.getUsers();

    return response.data;
  },

  async getPosts() {
    const response = await adminApi.getPosts();

    return response.data.posts;
  },
  async updateUserRole(userId, role) {
    const response = await adminApi.updateUserRole(userId, role);

    return response.data;
  },
  async deletePost(postId) {
    const response = await adminApi.deletePost(postId);

    return response;
  },
  async getReports() {
    const response = await adminApi.getReports();

    return response.data.reports;
  },

  async updateReportStatus(reportId, status) {
    const response = await adminApi.updateReportStatus(reportId, status);

    return response.data;
  },

  async resolveReport(reportId) {
    const response = await adminApi.resolveReport(reportId);

    return response;
  },
};
