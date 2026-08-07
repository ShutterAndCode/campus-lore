import Report from "../models/report.model.js";
import ExperiencePost from "../models/experiencePost.model.js";
import ApiError from "../utils/ApiError.js";
const PUBLIC_PROFILE_FIELDS =
  "name avatar bio branch batch graduationYear createdAt";
export const createReport = async (postId, reporterId, reason, description) => {
  const post = await ExperiencePost.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() === reporterId.toString()) {
    throw new ApiError(400, "You cannot report your own post");
  }

  const existingReport = await Report.findOne({
    reporter: reporterId,
    post: postId,
  });
  if (existingReport) {
    throw new ApiError(409, "You have already reported this post");
  }

  const report = await Report.create({
    reporter: reporterId,
    post: postId,
    reason,
    description,
  });

  return report;
};

export const getReports = async (page, limit, status) => {
  const skip = (page - 1) * limit;

  const [reports, total] = await Promise.all([
    Report.find({ status })
      .populate("reporter", PUBLIC_PROFILE_FIELDS)
      .populate("post", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Report.countDocuments({ status }),
  ]);

  return {
    reports,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateReportStatus = async (reportId, adminId, newStatus) => {
  const report = await Report.findById(reportId);
  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  if (report.status !== "pending") {
    throw new ApiError(409, "This report has already been reviewed");
  }

  report.status = newStatus;
  report.reviewedAt = new Date();
  report.reviewedBy = adminId;
  await report.save();

  return report;
};

export const resolveReport = async (reportId, adminId) => {
  const report = await Report.findById(reportId);
  if (!report) {
    throw new ApiError(404, 'Report not found');
  }

  if (report.status !== 'reviewed') {
    throw new ApiError(409, 'Only reviewed reports can be moderated');
  }

  const post = await ExperiencePost.findById(report.post);
  if (!post) {
    throw new ApiError(404, 'The reported post no longer exists');
  }

  await Comment.deleteMany({ post: post._id });
  await PostReaction.deleteMany({ post: post._id });
  await post.deleteOne();

  report.status = 'resolved';
  report.resolvedAt = new Date();
  report.resolvedBy = adminId;
  await report.save();

  return report;
};