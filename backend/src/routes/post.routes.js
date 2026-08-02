import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  createPostSchema,
  getPostsQuerySchema,
} from "../validators/post.validator.js";

import {
  createPostController,
  getPostsController,
  deletePostController,
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
import { createReportBodySchema } from '../validators/report.validator.js';
import { createReportController } from '../controllers/report.controller.js';

const router = Router();

router.get("/", validate(getPostsQuerySchema, "query"), getPostsController);

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
  '/:postId/report',
  authenticate,
  validate(postIdParamsSchema, 'params'),
  validate(createReportBodySchema, 'body'),
  createReportController
);

export default router;
