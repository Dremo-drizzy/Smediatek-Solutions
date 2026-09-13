import AuditLog from "../models/AuditLog.js";
import logger from "./logger.js";

// Fire-and-forget: an audit log failure should never fail the request
// that triggered it, so this is never awaited by its callers.
export const logAction = ({ adminId, action, resource, resourceId }) => {
  AuditLog.create({ adminId, action, resource, resourceId }).catch((error) => {
    logger.error("Failed to write audit log", { error: error.message });
  });
};
