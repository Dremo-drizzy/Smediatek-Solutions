import mongoose from "mongoose";

export const BRAND_STATUSES = ["new", "in-progress", "won", "lost"];

const BrandSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    businessName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    brandType: { type: String, required: true },
    services: [{ type: String }],
    description: { type: String, trim: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: BRAND_STATUSES, default: BRAND_STATUSES[0] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

BrandSchema.index({ email: 1 });
BrandSchema.index({ createdAt: -1 });
BrandSchema.index({ status: 1 });
BrandSchema.index({ fullName: "text", businessName: "text", email: "text", brandType: "text", description: "text" });

export default mongoose.model("BrandProject", BrandSchema);
