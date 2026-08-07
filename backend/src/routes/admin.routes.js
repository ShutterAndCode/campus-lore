import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

import {
  getAdminStatsController,
  getAllUsersController,
  updateUserRoleController,
  getAllPostsController,
  deleteAnyPostController,
} from "../controllers/admin.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

router.use(authenticate);
router.use(authorize("admin"));

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get("/stats", getAdminStatsController);

/*
|--------------------------------------------------------------------------
| User Management
|--------------------------------------------------------------------------
*/

router.get("/users", getAllUsersController);

router.patch("/users/:userId/role", updateUserRoleController);
/*
|--------------------------------------------------------------------------
| Post Moderation
|--------------------------------------------------------------------------
*/

router.get("/posts", getAllPostsController);

router.delete("/posts/:postId", deleteAnyPostController);

export default router;
