// ✅ brandRoutes.js
import express from "express";
import BrandProject from "../models/BrandProject.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newProject = new BrandProject(req.body);
    await newProject.save();
    res.status(201).json({ message: "Brand project submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit brand project" });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await BrandProject.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch brand projects" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await BrandProject.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ error: "Brand project not found" });
    res.json({ message: "Brand project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete brand project" });
  }
});

export default router;
