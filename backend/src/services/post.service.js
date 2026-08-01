import ExperiencePost from '../models/experiencePost.model.js';

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