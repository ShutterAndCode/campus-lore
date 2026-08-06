import ExperiencePost from "../models/experiencePost.model.js";
import { PUBLIC_PROFILE_FIELDS } from "./profile.service.js";
import Comment from "../models/comment.model.js";
import ApiError from "../utils/ApiError.js";
import PostReaction from "../models/postReaction.model.js";
const normalizeTags = (tags = []) => {
  const normalized = tags.map((tag) => tag.trim().toLowerCase());
  return [...new Set(normalized)];
};

export const createPost = async (authorId, postData) => {
  const { title, content, academicYear, department, tags, isAnonymous } =
    postData;

  const post = await ExperiencePost.create({
    author: authorId,
    title: title.trim(),
    content: content.trim(),
    academicYear,
    department: department.trim(),
    tags: normalizeTags(tags),
    isAnonymous: isAnonymous || false,
  });

  return post;
};
export const getPosts = async ({
  page,
  limit,
  academicYear,
  department,
  tag,
}) => {
  const filter = {};
  if (academicYear) filter.academicYear = academicYear;
  if (department) filter.department = department;
  if (tag) filter.tags = tag.trim().toLowerCase();

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    ExperiencePost.find(filter)
      .populate("author", PUBLIC_PROFILE_FIELDS)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    ExperiencePost.countDocuments(filter),
  ]);

  return {
    posts,
    pagination: {
      page,
      limit,
      totalPosts: total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
export const getPostById = async (postId) => {
  const post = await ExperiencePost.findById(postId).populate(
    "author",
    PUBLIC_PROFILE_FIELDS,
  );

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return post;
};
export const deletePost = async (postId, userId) => {
  const post = await ExperiencePost.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  await Comment.deleteMany({ post: postId });
  await PostReaction.deleteMany({ post: postId });
  await post.deleteOne();

  return { deleted: true };
};
