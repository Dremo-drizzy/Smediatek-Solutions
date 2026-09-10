import mongoose from "mongoose";

export const CONTACT_STATUSES = ["new", "read", "archived"];

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: CONTACT_STATUSES, default: CONTACT_STATUSES[0] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

ContactSchema.index({ name: "text", email: "text", message: "text" });

export default mongoose.model("Contact", ContactSchema);
