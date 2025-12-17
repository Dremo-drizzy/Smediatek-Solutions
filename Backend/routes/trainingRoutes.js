import express from "express";
import TrainingEnrollment from "../models/TrainingEnrollment.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const enrollment = new TrainingEnrollment(req.body);
    await enrollment.save();
    res.status(201).json({ message: "Training enrollment submitted!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit enrollment" });
  }
});

router.get("/", async (req, res) => {
  try {
    const enrollments = await TrainingEnrollment.find();
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch training enrollments" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedEnrollment = await TrainingEnrollment.findByIdAndDelete(req.params.id);
    if (!deletedEnrollment) return res.status(404).json({ error: "Training enrollment not found" });
    res.json({ message: "Training enrollment deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete training enrollment" });
  }
});


export default router;
