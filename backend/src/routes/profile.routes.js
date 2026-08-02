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

/**
 * @swagger
 * /profile/me:
 *   get:
 *     tags: [Profile]
 *     summary: Get the authenticated user's profile
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Unauthorized
 */

router.get("/me", authenticate, getMyProfile);

/**
 * @swagger
 * /profile/me:
 *   patch:
 *     tags: [Profile]
 *     summary: Update the authenticated user's profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               avatar:
 *                 type: string
 *               bio:
 *                 type: string
 *               branch:
 *                 type: string
 *               batch:
 *                 type: string
 *               graduationYear:
 *                 type: number
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
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