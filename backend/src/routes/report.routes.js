import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { postIdParamsSchema,reportIdParamsSchema } from "../validators/common.validator.js";
import {
  getReportsQuerySchema,
  updateReportStatusBodySchema,
  createReportBodySchema
} from "../validators/report.validator.js";
import {
  createReportController,
  getReportsController,
  updateReportStatusController,
  resolveReportController,
} from "../controllers/report.controller.js";

const router = Router();

router.post(
  "/:postId",
  authenticate,
  validate(postIdParamsSchema, "params"),
  validate(createReportBodySchema, "body"),
  createReportController,
);
router.get(
  "/",
  authenticate,
  authorize("admin"),
  validate(getReportsQuerySchema, "query"),
  getReportsController,
);

router.patch(
  "/:reportId",
  authenticate,
  authorize("admin"),
  validate(reportIdParamsSchema, "params"),
  validate(updateReportStatusBodySchema, "body"),
  updateReportStatusController,
);

router.delete(
  "/:reportId/action",
  authenticate,
  authorize("admin"),
  validate(reportIdParamsSchema, "params"),
  resolveReportController,
);

export default router;
