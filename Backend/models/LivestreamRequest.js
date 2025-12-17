import mongoose from "mongoose";

const LiveSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  organization: { type: String, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  eventType: { type: String, required: true },
  services: [{ type: String }],
  details: { type: String, trim: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("LivestreamRequest", LiveSchema);
