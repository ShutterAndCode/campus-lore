import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js"; // confirm this exists/path
import {
  updateProfileSchema,
  getPublicProfileParamsSchema,
} from "../validators/profile.validator.js";
import {
  getMyProfile,
  updateMyProfile,
  getPublicProfileController,
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/me", authenticate, getMyProfile);
router.patch(
  "/me",
  authenticate,
  validate(updateProfileSchema),
  updateMyProfile,
);
///:userId (treating "me" as a userId value if placed before me route) if /:userId were declared first.
router.get(
  "/:userId",
  authenticate,
  validate(getPublicProfileParamsSchema, "params"),
  getPublicProfileController,
);

export default router;
