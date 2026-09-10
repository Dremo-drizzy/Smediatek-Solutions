import express from "express";
import TrainingEnrollment from "../models/TrainingEnrollment.js";
import auth from "../middleware/auth.js";
import validate, { trainingSchema } from "../middleware/validate.js";
const router = express.Router();

router.post("/", validate(trainingSchema), async (req, res) => {
  try {
    const enrollment = new TrainingEnrollment(req.body);
    await enrollment.save();
    res.status(201).json({ message: "Training enrollment submitted!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit enrollment" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const enrollments = await TrainingEnrollment.find();
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch training enrollments" });
  }
});


router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedEnrollment = await TrainingEnrollment.findByIdAndDelete(req.params.id);
    if (!deletedEnrollment) return res.status(404).json({ error: "Training enrollment not found" });
    res.json({ message: "Training enrollment deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete training enrollment" });
  }
});


export default router;
