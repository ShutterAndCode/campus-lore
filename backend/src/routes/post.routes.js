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
} from "../controllers/post.controller.js";

import { createReactionBodySchema } from "../validators/postReaction.validator.js";
import { toggleReactionController } from "../controllers/postReaction.controller.js";

import { createCommentBodySchema } from "../validators/comment.validator.js";
import {
  createCommentController,
  getPostCommentsController,
} from "../controllers/comment.controller.js";

import { postIdParamsSchema } from "../validators/common.validator.js";

const router = Router();

router.get(
  "/",
  validate(getPostsQuerySchema, "query"),
  getPostsController
);

router.post(
  "/",
  authenticate,
  validate(createPostSchema),
  createPostController
);

router.post(
  "/:postId/reactions",
  authenticate,
  validate(postIdParamsSchema, "params"),
  validate(createReactionBodySchema, "body"),
  toggleReactionController
);

router.post(
  "/:postId/comments",
  authenticate,
  validate(postIdParamsSchema, "params"),
  validate(createCommentBodySchema, "body"),
  createCommentController
);

router.get(
  "/:postId/comments",
  validate(postIdParamsSchema, "params"),
  getPostCommentsController
);

export default router;