import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  createPostSchema,
  getPostsQuerySchema,
  updatePostSchema,
} from "../validators/post.validator.js";

import {
  createPostController,
  getPostsController,
  getPostByIdController,
  deletePostController,
  updatePostController,
} from "../controllers/post.controller.js";

import { createReactionBodySchema } from "../validators/postReaction.validator.js";
import { toggleReactionController } from "../controllers/postReaction.controller.js";

import { createCommentBodySchema } from "../validators/comment.validator.js";
import {
  createCommentController,
  getPostCommentsController,
  deleteCommentController,
} from "../controllers/comment.controller.js";

import {
  postIdParamsSchema,
  commentIdParamsSchema,
} from "../validators/common.validator.js";
import { createReportBodySchema } from "../validators/report.validator.js";
import { createReportController } from "../controllers/report.controller.js";

const router = Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     tags: [Posts]
 *     summary: Get paginated experience posts feed
 *     security: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: academicYear
 *         schema:
 *           type: string
 *           enum: [1st, 2nd, 3rd, 4th]
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 */

router.get("/", validate(getPostsQuerySchema, "query"), getPostsController);
router.get(
  "/:postId",
  validate(postIdParamsSchema, "params"),
  getPostByIdController,
);

/**
 * @swagger
 * /posts:
 *   post:
 *     tags: [Posts]
 *     summary: Create a new experience post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, academicYear, department]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               academicYear:
 *                 type: string
 *                 enum: [1st, 2nd, 3rd, 4th]
 *               department:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isAnonymous:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.post(
  "/",
  authenticate,
  validate(createPostSchema),
  createPostController,
);

router.post(
  "/:postId/reactions",
  authenticate,
  validate(postIdParamsSchema, "params"),
  validate(createReactionBodySchema, "body"),
  toggleReactionController,
);

router.post(
  "/:postId/comments",
  authenticate,
  validate(postIdParamsSchema, "params"),
  validate(createCommentBodySchema, "body"),
  createCommentController,
);

router.get(
  "/:postId/comments",
  validate(postIdParamsSchema, "params"),
  getPostCommentsController,
);
router.patch(
  "/:postId",
  authenticate,
  validate(postIdParamsSchema, "params"),
  validate(updatePostSchema),
  updatePostController,
);
router.delete(
  "/:postId/comments/:commentId",
  authenticate,
  validate(postIdParamsSchema, "params"),
  validate(commentIdParamsSchema, "params"),
  deleteCommentController,
);
router.delete(
  "/:postId",
  authenticate,
  validate(postIdParamsSchema, "params"),
  deletePostController,
);
router.post(
  "/:postId/report",
  authenticate,
  validate(postIdParamsSchema, "params"),
  validate(createReportBodySchema, "body"),
  createReportController,
);

export default router;
