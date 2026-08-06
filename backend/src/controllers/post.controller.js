import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
} from "../services/post.service.js";

export const createPostController = asyncHandler(async (req, res) => {
  const post = await createPost(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, post, "Post created successfully"));
});
export const getPostsController = asyncHandler(async (req, res) => {
  const result = await getPosts(req.query);
  res
    .status(200)
    .json(new ApiResponse(200, result, "Posts fetched successfully"));
});
export const getPostByIdController = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await getPostById(postId);

  res.status(200).json(new ApiResponse(200, post, "Post fetched successfully"));
});
export const deletePostController = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const result = await deletePost(postId, req.user._id);
  res
    .status(200)
    .json(new ApiResponse(200, result, "Post deleted successfully"));
});
export const updatePostController = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await updatePost(postId, req.user._id, req.body);

  res.status(200).json(new ApiResponse(200, post, "Post updated successfully"));
});
