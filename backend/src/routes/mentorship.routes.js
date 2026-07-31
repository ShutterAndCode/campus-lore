import { Router } from 'express';
import {authenticate} from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createMentorshipRequestSchema } from '../validators/mentorship.validator.js';
import { createMentorshipRequestController } from '../controllers/mentorship.controller.js';

const router = Router();

router.post(
  '/request',
  authenticate,
  validate(createMentorshipRequestSchema),
  createMentorshipRequestController
);

export default router;