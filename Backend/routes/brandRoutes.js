import express from "express";
import BrandProject, { BRAND_STATUSES } from "../models/BrandProject.js";
import auth from "../middleware/auth.js";
import validate, { brandSchema, brandStatusSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { buildFilter, parsePagination, parseSort, buildListResponse } from "../utils/pagination.js";

const router = express.Router();
const SORT_FIELDS = ["createdAt", "email", "status"];

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
    const filter = buildFilter(req, BRAND_STATUSES);
    const { page, limit, skip } = parsePagination(req);
    const sort = parseSort(req, SORT_FIELDS);

    const [data, total] = await Promise.all([
      BrandProject.find(filter).sort(sort).skip(skip).limit(limit),
      BrandProject.countDocuments(filter),
    ]);

    res.json(buildListResponse(data, total, page, limit));
  })
);

router.patch(
  "/:id/status",
  auth,
  validate(brandStatusSchema),
  asyncHandler(async (req, res) => {
    const project = await BrandProject.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!project) return res.status(404).json({ error: "Brand project not found" });
    res.json(project);
  })
);

router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const deletedProject = await BrandProject.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deletedProject) return res.status(404).json({ error: "Brand project not found" });
    res.json({ message: "Brand project deleted successfully!" });
  })
);

export default router;
