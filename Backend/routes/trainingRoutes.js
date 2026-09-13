import express from "express";
import TrainingEnrollment, { TRAINING_STATUSES } from "../models/TrainingEnrollment.js";
import auth, { requireRole } from "../middleware/auth.js";
import validate, { trainingSchema, trainingStatusSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { buildFilter, parsePagination, parseSort, buildListResponse } from "../utils/pagination.js";
import { logAction } from "../utils/audit.js";
import { notifyNewSubmission } from "../utils/notifyNewSubmission.js";
import { emitNewLead } from "../socket.js";

const router = express.Router();
const SORT_FIELDS = ["createdAt", "email", "status"];

/**
 * @swagger
 * /training:
 *   post:
 *     summary: Submit a media training enrollment
 *     tags: [Training]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, phone, focus, mode]
 *             properties:
 *               fullName: { type: string }
 *               email: { type: string, format: email }
 *               phone: { type: string }
 *               focus: { type: string }
 *               mode: { type: string, enum: [online, onsite, hybrid] }
 *               goals: { type: string }
 *     responses:
 *       201: { description: Enrollment saved }
 *       400: { description: Validation failed }
 */
router.post(
  "/",
  validate(trainingSchema),
  asyncHandler(async (req, res) => {
    const enrollment = new TrainingEnrollment(req.body);
    await enrollment.save();

    notifyNewSubmission({
      resourceLabel: "training enrollment",
      submitterEmail: enrollment.email,
      submitterName: enrollment.fullName,
      fields: {
        "Full Name": enrollment.fullName,
        Email: enrollment.email,
        Phone: enrollment.phone,
        Focus: enrollment.focus,
        Mode: enrollment.mode,
        Goals: enrollment.goals,
      },
    });

    emitNewLead("training", enrollment._id);

    res.status(201).json({ message: "Training enrollment submitted!" });
  })
);

/**
 * @swagger
 * /training:
 *   get:
 *     summary: List training enrollments (paginated, filterable, searchable)
 *     tags: [Training]
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
    const filter = buildFilter(req, TRAINING_STATUSES);
    const { page, limit, skip } = parsePagination(req);
    const sort = parseSort(req, SORT_FIELDS);

    const [data, total] = await Promise.all([
      TrainingEnrollment.find(filter).sort(sort).skip(skip).limit(limit),
      TrainingEnrollment.countDocuments(filter),
    ]);

    res.json(buildListResponse(data, total, page, limit));
  })
);

/**
 * @swagger
 * /training/{id}/status:
 *   patch:
 *     summary: Update a training enrollment's status
 *     tags: [Training]
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
 *               status: { type: string, enum: [pending, confirmed, completed] }
 *     responses:
 *       200: { description: Updated document }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.patch(
  "/:id/status",
  auth,
  validate(trainingStatusSchema),
  asyncHandler(async (req, res) => {
    const enrollment = await TrainingEnrollment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!enrollment) return res.status(404).json({ error: "Training enrollment not found" });
    logAction({ adminId: req.admin.id, action: "status_update", resource: "training", resourceId: enrollment._id });
    res.json(enrollment);
  })
);

/**
 * @swagger
 * /training/{id}:
 *   delete:
 *     summary: Soft-delete a training enrollment (admin role only)
 *     tags: [Training]
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
    const deletedEnrollment = await TrainingEnrollment.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deletedEnrollment) return res.status(404).json({ error: "Training enrollment not found" });
    logAction({ adminId: req.admin.id, action: "soft_delete", resource: "training", resourceId: deletedEnrollment._id });
    res.json({ message: "Training enrollment deleted successfully!" });
  })
);

export default router;
