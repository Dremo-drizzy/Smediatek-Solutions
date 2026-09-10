import AuditLog from "../models/AuditLog.js";

// Fire-and-forget: an audit log failure should never fail the request
// that triggered it, so this is never awaited by its callers.
export const logAction = ({ adminId, action, resource, resourceId }) => {
  AuditLog.create({ adminId, action, resource, resourceId }).catch((error) => {
    console.error("❌ Failed to write audit log:", error.message);
  });
};
