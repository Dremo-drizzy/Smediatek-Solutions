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

/**
 * @swagger
 * /brand:
 *   post:
 *     summary: Submit a brand identity project request
 *     tags: [Brand]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, businessName, email, brandType]
 *             properties:
 *               fullName: { type: string }
 *               businessName: { type: string }
 *               email: { type: string, format: email }
 *               brandType: { type: string }
 *               services: { type: array, items: { type: string } }
 *               description: { type: string }
 *     responses:
 *       201: { description: Request saved }
 *       400: { description: Validation failed }
 */
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

/**
 * @swagger
 * /brand:
 *   get:
 *     summary: List brand project requests (paginated, filterable, searchable)
 *     tags: [Brand]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/StatusParam'
 *       - $ref: '#/components/parameters/SortParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *       - $ref: '#/components/parameters/IncludeDeletedParam'
 *     responses:
 *       200: { description: "{ data, total, page, pages }" }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
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

/**
 * @swagger
 * /brand/{id}/status:
 *   patch:
 *     summary: Update a brand project's status
 *     tags: [Brand]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { name: id, in: path, required: true, schema: { type: string } }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [new, in-progress, won, lost] }
 *     responses:
 *       200: { description: Updated document }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
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

/**
 * @swagger
 * /brand/{id}:
 *   delete:
 *     summary: Soft-delete a brand project request (admin role only)
 *     tags: [Brand]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { name: id, in: path, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: Deleted (deletedAt set) }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
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
