import { Router } from 'express';
import {authenticate} from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { notificationIdParamsSchema, getNotificationsQuerySchema } from '../validators/notification.validator.js';
import {
  getNotificationsController,
  markNotificationAsReadController,
  markAllNotificationsAsReadController,
} from '../controllers/notification.controller.js';

const router = Router();

router.get('/', authenticate, validate(getNotificationsQuerySchema, 'query'), getNotificationsController);
router.patch('/read-all', authenticate, markAllNotificationsAsReadController);
router.patch(
  '/:notificationId/read',
  authenticate,
  validate(notificationIdParamsSchema, 'params'),
  markNotificationAsReadController
);

export default router;
///read-all is registered above /:notificationId/read — same recurring rule to avoid static-segment  versus param collision