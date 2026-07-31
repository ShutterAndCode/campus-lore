import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js"; // confirm this exists/path
import {
  updateProfileSchema,
  getPublicProfileParamsSchema,
  searchUsersQuerySchema,
} from "../validators/profile.validator.js";
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
  updateMyProfile,
);
// so that search isnt considered as userID
router.get(
  '/search',
  authenticate,
  validate(searchUsersQuerySchema, 'query'),
  searchUsersController
);


//
///:userId (treating "me" as a userId value if placed before me route) if /:userId were declared first.
router.get(
  "/:userId",
  authenticate,
  validate(getPublicProfileParamsSchema, "params"),
  getPublicProfileController,
);


export default router;
