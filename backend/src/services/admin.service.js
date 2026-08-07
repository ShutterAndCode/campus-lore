import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ExperiencePost from "../models/experiencePost.model.js";
import Comment from "../models/comment.model.js";
import Report from "../models/report.model.js";
import mongoose from "mongoose";


export const getAdminStats = async () => {
  const [users, posts, comments, reports, pendingReports] = await Promise.all([
    User.countDocuments(),
    ExperiencePost.countDocuments(),
    Comment.countDocuments(),
    Report.countDocuments(),
    Report.countDocuments({ status: "pending" }),
  ]);

  return {
    users,
    posts,
    comments,
    reports,
    pendingReports,
  };
};
export const getAllUsers = async () => {
  const users = await User.find({})
    .select(
      "name email avatar branch batch graduationYear role organization createdAt",
    )
    .sort({ createdAt: -1 });

  return users;
};

export const updateUserRole = async (currentAdminId, userId, role) => {
  const allowedRoles = ["student", "admin"];

  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  // Prevent an admin from changing their own role
  if (currentAdminId.toString() === userId) {
    throw new ApiError(400, "You cannot change your own role.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Prevent removing the last admin
  if (user.role === "admin" && role === "student") {
    const adminCount = await User.countDocuments({ role: "admin" });

    if (adminCount <= 1) {
      throw new ApiError(
        400,
        "At least one admin must remain in the system."
      );
    }
  }

  user.role = role;
  await user.save();

  return await User.findById(userId).select(
    "name email avatar branch batch graduationYear role organization createdAt"
  );
};
export const getAllPosts = async (query) => {
  const {
    search = "",
    department,
    academicYear,
    page = 1,
    limit = 10,
  } = query;

  const filter = {};

  if (department) {
    filter.department = department;
  }

  if (academicYear) {
    filter.academicYear = academicYear;
  }

  if (search.trim()) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [posts, total] = await Promise.all([
    ExperiencePost.find(filter)
      .populate("author", "name email avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),

    ExperiencePost.countDocuments(filter),
  ]);

  return {
    posts,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};
export const deleteAnyPost = async (postId) => {
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post id");
  }

  const post = await ExperiencePost.findById(postId)
    .populate("author", "name email");

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  await Comment.deleteMany({
    post: post._id,
  });

  await Report.deleteMany({
    post: post._id,
  });

  await ExperiencePost.findByIdAndDelete(postId);

  return post;
};