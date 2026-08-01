import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  updateProfileSchema,
  searchUsersQuerySchema,
} from "../validators/profile.validator.js";

import { userIdParamsSchema } from "../validators/common.validator.js";

import {
  getMyProfile,
  updateMyProfile,
  getPublicProfileController,
  searchUsersController,
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/me", authenticate, getMyProfile);

router.patch(
  "/me",
  authenticate,
  validate(updateProfileSchema),
  updateMyProfile
);

// Place before "/:userId" so "search" isn't treated as a userId.
router.get(
  "/search",
  authenticate,
  validate(searchUsersQuerySchema, "query"),
  searchUsersController
);

// Public profile by user ID.
router.get(
  "/:userId",
  authenticate,
  validate(userIdParamsSchema, "params"),
  getPublicProfileController
);

export default router;