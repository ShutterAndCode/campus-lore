import { logger } from "../config/logger.js";

export const ADMIN_ACTIONS = {
  UPDATE_ROLE: "UPDATE_ROLE",
  DELETE_POST: "DELETE_POST",
  DELETE_COMMENT: "DELETE_COMMENT",
  REVIEW_REPORT: "REVIEW_REPORT",
  DISMISS_REPORT: "DISMISS_REPORT",
  RESOLVE_REPORT: "RESOLVE_REPORT",
  DELETE_POST: "DELETE_POST",
};

export const logAdminAction = ({
  admin,
  action,
  target = {},
  metadata = {},
}) => {
  logger.info({
    type: "ADMIN_AUDIT",

    action,

    admin: {
      id: admin?._id?.toString(),
      name: admin?.name,
      email: admin?.email,
    },

    target,

    metadata,

    timestamp: new Date().toISOString(),
  });
};