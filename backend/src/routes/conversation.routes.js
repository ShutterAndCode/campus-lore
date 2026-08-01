import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  requestIdParamsSchema,
  conversationIdParamsSchema,
} from "../validators/conversation.validator.js";
import {
  createConversationController,
  getConversationsController,
  getConversationByIdController,
} from "../controllers/conversation.controller.js";
import {
  sendMessageBodySchema,
} from "../validators/message.validator.js";
import {
  sendMessageController,
  getConversationMessagesController,
} from "../controllers/message.controller.js";

const router = Router();

router.post(
  "/request/:requestId",
  authenticate,
  validate(requestIdParamsSchema, "params"),
  createConversationController,
);

router.get("/", authenticate, getConversationsController);

router.get(
  "/:conversationId",
  authenticate,
  validate(conversationIdParamsSchema, "params"),
  getConversationByIdController,
);

router.post(
  '/:conversationId/messages',
  authenticate,
  validate(conversationIdParamsSchema, 'params'),
  validate(sendMessageBodySchema, 'body'),
  sendMessageController
);

router.get(
  '/:conversationId/messages',
  authenticate,
  validate(conversationIdParamsSchema, 'params'),
  getConversationMessagesController
);

export default router;
