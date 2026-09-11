import express from "express";
import BrandProject, { BRAND_STATUSES } from "../models/BrandProject.js";
import auth, { requireRole } from "../middleware/auth.js";
import validate, { brandSchema, brandStatusSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { buildFilter, parsePagination, parseSort, buildListResponse } from "../utils/pagination.js";
import { logAction } from "../utils/audit.js";
import { notifyNewSubmission } from "../utils/notifyNewSubmission.js";
import { emitNewLead } from "../socket.js";

const router = express.Router();
const SORT_FIELDS = ["createdAt", "email", "status"];

router.post(
  "/",
  validate(brandSchema),
  asyncHandler(async (req, res) => {
    const newProject = new BrandProject(req.body);
    await newProject.save();

    notifyNewSubmission({
      resourceLabel: "brand identity request",
      submitterEmail: newProject.email,
      submitterName: newProject.fullName,
      fields: {
        "Full Name": newProject.fullName,
        "Business Name": newProject.businessName,
        Email: newProject.email,
        "Brand Type": newProject.brandType,
        Services: newProject.services,
        Description: newProject.description,
      },
    });

    emitNewLead("brand", newProject._id);

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
    logAction({ adminId: req.admin.id, action: "status_update", resource: "brand", resourceId: project._id });
    res.json(project);
  })
);

router.delete(
  "/:id",
  auth,
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const deletedProject = await BrandProject.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deletedProject) return res.status(404).json({ error: "Brand project not found" });
    logAction({ adminId: req.admin.id, action: "soft_delete", resource: "brand", resourceId: deletedProject._id });
    res.json({ message: "Brand project deleted successfully!" });
  })
);

export default router;
