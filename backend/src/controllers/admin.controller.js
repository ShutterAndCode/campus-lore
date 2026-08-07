import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  getAllPosts,
  deleteAnyPost,
} from "../services/admin.service.js";
import { logAdminAction, ADMIN_ACTIONS } from "../utils/adminAudit.js";
export const getAdminStatsController = asyncHandler(async (req, res) => {
  const stats = await getAdminStats();

  res
    .status(200)
    .json(new ApiResponse(200, stats, "Admin statistics fetched successfully"));
});

export const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await getAllUsers();

  res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

export const updateUserRoleController = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  const user = await updateUserRole(req.user._id, userId, role);

  logAdminAction({
    admin: req.user,
    action: ADMIN_ACTIONS.UPDATE_ROLE,

    target: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },

    metadata: {
      newRole: role,
    },
  });

  res
    .status(200)
    .json(new ApiResponse(200, user, "User role updated successfully"));
});
export const getAllPostsController = asyncHandler(async (req, res) => {
  const result = await getAllPosts(req.query);

  res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Posts fetched successfully"
    )
  );
});
export const deleteAnyPostController = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await deleteAnyPost(postId);

  logAdminAction({
    admin: req.user,

    action: ADMIN_ACTIONS.DELETE_POST,

    target: {
      id: post._id.toString(),
      title: post.title,
      author: post.author?.name,
    },
  });

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Post deleted successfully"
    )
  );
});