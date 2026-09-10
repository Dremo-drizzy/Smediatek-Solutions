import mongoose from "mongoose";

export const LIVESTREAM_STATUSES = ["new", "in-progress", "won", "lost"];

const LiveSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    organization: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    eventType: { type: String, required: true },
    services: [{ type: String }],
    details: { type: String, trim: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: LIVESTREAM_STATUSES, default: LIVESTREAM_STATUSES[0] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

LiveSchema.index({ fullName: "text", organization: "text", email: "text", eventType: "text", details: "text" });

export default mongoose.model("LivestreamRequest", LiveSchema);
