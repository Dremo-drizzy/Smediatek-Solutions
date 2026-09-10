import express from "express";
import TrainingEnrollment from "../models/TrainingEnrollment.js";
import auth from "../middleware/auth.js";
import validate, { trainingSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.post(
  "/",
  validate(trainingSchema),
  asyncHandler(async (req, res) => {
    const enrollment = new TrainingEnrollment(req.body);
    await enrollment.save();
    res.status(201).json({ message: "Training enrollment submitted!" });
  })
);

router.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const enrollments = await TrainingEnrollment.find();
    res.json(enrollments);
  })
);

router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const deletedEnrollment = await TrainingEnrollment.findByIdAndDelete(req.params.id);
    if (!deletedEnrollment) return res.status(404).json({ error: "Training enrollment not found" });
    res.json({ message: "Training enrollment deleted successfully!" });
  })
);

export default router;
