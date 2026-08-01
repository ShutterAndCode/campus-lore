import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPostSchema,getPostsQuerySchema } from "../validators/post.validator.js";
import { createPostController,getPostsController} from "../controllers/post.controller.js";
import {
  postIdParamsSchema,
  createReactionBodySchema,
} from "../validators/postReaction.validator.js";
import { toggleReactionController } from "../controllers/postReaction.controller.js";
const router = Router();

router.get("/", validate(getPostsQuerySchema, "query"), getPostsController);
//public endpoint, no authentication required"
router.post(
  "/",
  authenticate,
  validate(createPostSchema),
  createPostController,
);
router.post(
  '/:postId/reactions',
  authenticate,
  validate(postIdParamsSchema, 'params'),
  validate(createReactionBodySchema, 'body'),
  toggleReactionController
);
export default router;
