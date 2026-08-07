import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createReport,
  getReports,
  updateReportStatus,
  resolveReport,
} from "../services/report.service.js";

export const createReportController = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { reason, description } = req.body;
  const report = await createReport(postId, req.user._id, reason, description);
  res
    .status(201)
    .json(new ApiResponse(201, report, "Post reported successfully"));
});

export const getReportsController = asyncHandler(async (req, res) => {
  const { page, limit, status } = req.query;
  const result = await getReports(page, limit, status);
  res
    .status(200)
    .json(new ApiResponse(200, result, "Reports fetched successfully"));
});

export const updateReportStatusController = asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const { status } = req.body;
  const report = await updateReportStatus(reportId, req.user._id, status);
  res
    .status(200)
    .json(new ApiResponse(200, report, "Report status updated successfully"));
});
export const resolveReportController = asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const report = await resolveReport(reportId, req.user._id);
  res.status(200).json(new ApiResponse(200, report, 'Report resolved and content moderated'));
});