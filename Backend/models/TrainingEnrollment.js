import mongoose from "mongoose";

export const TRAINING_STATUSES = ["pending", "confirmed", "completed"];

const TrainingSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  focus: { type: String, required: true },
  mode: { type: String, enum: ["online", "onsite", "hybrid"], required: true },
  goals: { type: String, trim: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: TRAINING_STATUSES, default: TRAINING_STATUSES[0] },
  deletedAt: { type: Date, default: null },
});

export default mongoose.model("TrainingEnrollment", TrainingSchema);
