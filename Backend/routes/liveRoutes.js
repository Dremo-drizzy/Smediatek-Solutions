import express from "express";
import LivestreamRequest, { LIVESTREAM_STATUSES } from "../models/LivestreamRequest.js";
import auth, { requireRole } from "../middleware/auth.js";
import validate, { liveSchema, liveStatusSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { buildFilter, parsePagination, parseSort, buildListResponse } from "../utils/pagination.js";
import { logAction } from "../utils/audit.js";
import { notifyNewSubmission } from "../utils/notifyNewSubmission.js";
import { emitNewLead } from "../socket.js";

const router = express.Router();
const SORT_FIELDS = ["createdAt", "email", "status"];

/**
 * @swagger
 * /livestream:
 *   post:
 *     summary: Submit a livestreaming service request
 *     tags: [Livestream]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, eventType]
 *             properties:
 *               fullName: { type: string }
 *               organization: { type: string }
 *               email: { type: string, format: email }
 *               eventType: { type: string }
 *               services: { type: array, items: { type: string } }
 *               details: { type: string }
 *     responses:
 *       201: { description: Request saved }
 *       400: { description: Validation failed }
 */
router.post(
  "/",
  validate(liveSchema),
  asyncHandler(async (req, res) => {
    const request = new LivestreamRequest(req.body);
    await request.save();

    notifyNewSubmission({
      resourceLabel: "livestream request",
      submitterEmail: request.email,
      submitterName: request.fullName,
      fields: {
        "Full Name": request.fullName,
        Organization: request.organization,
        Email: request.email,
        "Event Type": request.eventType,
        Services: request.services,
        Details: request.details,
      },
    });

    emitNewLead("livestream", request._id);

    res.status(201).json({ message: "Livestream request received!" });
  })
);

/**
 * @swagger
 * /livestream:
 *   get:
 *     summary: List livestreaming requests (paginated, filterable, searchable)
 *     tags: [Livestream]
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
    const filter = buildFilter(req, LIVESTREAM_STATUSES);
    const { page, limit, skip } = parsePagination(req);
    const sort = parseSort(req, SORT_FIELDS);

    const [data, total] = await Promise.all([
      LivestreamRequest.find(filter).sort(sort).skip(skip).limit(limit),
      LivestreamRequest.countDocuments(filter),
    ]);

    res.json(buildListResponse(data, total, page, limit));
  })
);

/**
 * @swagger
 * /livestream/{id}/status:
 *   patch:
 *     summary: Update a livestream request's status
 *     tags: [Livestream]
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
  validate(liveStatusSchema),
  asyncHandler(async (req, res) => {
    const request = await LivestreamRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!request) return res.status(404).json({ error: "Livestream request not found" });
    logAction({ adminId: req.admin.id, action: "status_update", resource: "livestream", resourceId: request._id });
    res.json(request);
  })
);

/**
 * @swagger
 * /livestream/{id}:
 *   delete:
 *     summary: Soft-delete a livestreaming request (admin role only)
 *     tags: [Livestream]
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
    const deletedRequest = await LivestreamRequest.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deletedRequest) return res.status(404).json({ error: "Livestream request not found" });
    logAction({ adminId: req.admin.id, action: "soft_delete", resource: "livestream", resourceId: deletedRequest._id });
    res.json({ message: "Livestream request deleted successfully!" });
  })
);

export default router;
