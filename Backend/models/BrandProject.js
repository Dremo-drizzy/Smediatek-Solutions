import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  businessName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  brandType: { type: String, required: true },
  services: [{ type: String }],
  description: { type: String, trim: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("BrandProject", BrandSchema);
