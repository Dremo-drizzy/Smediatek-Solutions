import mongoose from "mongoose";

export const ADMIN_ROLES = ["admin", "staff"];

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ADMIN_ROLES, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
