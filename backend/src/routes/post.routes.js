import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPostSchema } from '../validators/post.validator.js';
import { createPostController } from '../controllers/post.controller.js';

const router = Router();

router.post('/', authenticate, validate(createPostSchema), createPostController);

export default router;