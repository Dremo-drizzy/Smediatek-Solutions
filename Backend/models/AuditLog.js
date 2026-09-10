import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  resourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now },
});

AuditLogSchema.index({ timestamp: -1 });

export default mongoose.model("AuditLog", AuditLogSchema);
