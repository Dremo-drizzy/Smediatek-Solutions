import mongoose from "mongoose";

const TrainingSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  focus: { type: String, required: true },
  mode: { type: String, enum: ["online", "onsite", "hybrid"], required: true },
  goals: { type: String, trim: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("TrainingEnrollment", TrainingSchema);
