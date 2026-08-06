import { z } from 'zod';

export const createPostSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required').max(150, 'Title too long'),
    content: z.string().trim().min(1, 'Content is required').max(5000, 'Content too long'),
    academicYear: z.enum(['1st', '2nd', '3rd', '4th']),
    department: z.string().trim().min(1, 'Department is required').max(100),
    tags: z.array(z.string().trim().min(1)).max(10, 'Too many tags').optional(),
    isAnonymous: z.boolean().optional(),
  })
  .strict();
  export const getPostsQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
    academicYear: z.enum(['1st', '2nd', '3rd', '4th']).optional(),
    department: z.string().trim().min(1).optional(),
    tag: z.string().trim().min(1).optional(),
    search: z.string().trim().optional(),
  })
  .strict();
  export const updatePostSchema = z
  .object({
    title: z.string().trim().min(1).max(150).optional(),
    content: z.string().trim().min(1).max(5000).optional(),
    academicYear: z.enum(["1st", "2nd", "3rd", "4th"]).optional(),
    department: z.string().trim().min(1).max(100).optional(),
    tags: z.array(z.string().trim().min(1)).max(10).optional(),
    isAnonymous: z.boolean().optional(),
  })
  .strict();