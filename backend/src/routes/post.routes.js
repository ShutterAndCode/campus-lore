import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createPostSchema } from '../validators/post.validator.js';
import { createPostController } from '../controllers/post.controller.js';
import { getPostsQuerySchema } from '../validators/post.validator.js';
import { getPostsController } from '../controllers/post.controller.js';

const router = Router();

router.get('/', validate(getPostsQuerySchema, 'query'), getPostsController);
//public endpoint, no authentication required"
router.post('/', authenticate, validate(createPostSchema), createPostController);

export default router;