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
  search,
}) => {
  const filter = {};
  if (academicYear) filter.academicYear = academicYear;
  if (department) filter.department = department;
  if (tag) filter.tags = tag.trim().toLowerCase();
  if (search?.trim()) {
  const regex = new RegExp(search.trim(), "i");

  filter.$or = [
    { title: regex },
    { content: regex },
    { tags: regex },
  ];
}

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
export const updatePost = async (postId, userId, updates) => {
  const post = await ExperiencePost.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to edit this post"
    );
  }

  if (updates.title !== undefined) {
    post.title = updates.title.trim();
  }

  if (updates.content !== undefined) {
    post.content = updates.content.trim();
  }

  if (updates.academicYear !== undefined) {
    post.academicYear = updates.academicYear;
  }

  if (updates.department !== undefined) {
    post.department = updates.department.trim();
  }

  if (updates.tags !== undefined) {
    post.tags = normalizeTags(updates.tags);
  }

  if (updates.isAnonymous !== undefined) {
    post.isAnonymous = updates.isAnonymous;
  }

  await post.save();

  return post.populate("author", PUBLIC_PROFILE_FIELDS);
};