import ExperiencePost from '../models/experiencePost.model.js';
import { PUBLIC_PROFILE_FIELDS } from "./profile.service.js";

const normalizeTags = (tags = []) => {
  const normalized = tags.map((tag) => tag.trim().toLowerCase());
  return [...new Set(normalized)];
};

export const createPost = async (authorId, postData) => {
  const { title, content, academicYear, department, tags, isAnonymous } = postData;

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
export const getPosts = async ({ page, limit, academicYear, department, tag }) => {
  const filter = {};
  if (academicYear) filter.academicYear = academicYear;
  if (department) filter.department = department;
  if (tag) filter.tags = tag.trim().toLowerCase();

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    ExperiencePost.find(filter)
      .populate('author', PUBLIC_PROFILE_FIELDS)
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