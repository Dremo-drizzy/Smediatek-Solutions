import express from "express";
import BrandProject from "../models/BrandProject.js";
import auth from "../middleware/auth.js";
import validate, { brandSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.post(
  "/",
  validate(brandSchema),
  asyncHandler(async (req, res) => {
    const newProject = new BrandProject(req.body);
    await newProject.save();
    res.status(201).json({ message: "Brand project submitted successfully!" });
  })
);

router.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const projects = await BrandProject.find();
    res.json(projects);
  })
);

router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const deletedProject = await BrandProject.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ error: "Brand project not found" });
    res.json({ message: "Brand project deleted successfully!" });
  })
);

export default router;
