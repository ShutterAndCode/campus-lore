import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { commentIdParamsSchema, createCommentBodySchema } from '../validators/comment.validator.js';
import { createReplyController } from '../controllers/comment.controller.js';

const router = Router();

router.post(
  '/:commentId/replies',
  authenticate,
  validate(commentIdParamsSchema, 'params'),
  validate(createCommentBodySchema, 'body'),
  createReplyController
);

export default router;