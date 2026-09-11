import express from "express";
import Contact, { CONTACT_STATUSES } from "../models/Contact.js";
import BrandProject, { BRAND_STATUSES } from "../models/BrandProject.js";
import LivestreamRequest, { LIVESTREAM_STATUSES } from "../models/LivestreamRequest.js";
import TrainingEnrollment, { TRAINING_STATUSES } from "../models/TrainingEnrollment.js";
import auth, { requireRole } from "../middleware/auth.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { buildFilter } from "../utils/pagination.js";

const RESOURCES = {
  contact: {
    Model: Contact,
    statuses: CONTACT_STATUSES,
    columns: ["_id", "name", "email", "message", "status", "createdAt"],
  },
  brand: {
    Model: BrandProject,
    statuses: BRAND_STATUSES,
    columns: ["_id", "fullName", "businessName", "email", "brandType", "services", "description", "status", "createdAt"],
  },
  livestream: {
    Model: LivestreamRequest,
    statuses: LIVESTREAM_STATUSES,
    columns: ["_id", "fullName", "organization", "email", "eventType", "services", "details", "status", "createdAt"],
  },
  training: {
    Model: TrainingEnrollment,
    statuses: TRAINING_STATUSES,
    columns: ["_id", "fullName", "email", "phone", "focus", "mode", "goals", "status", "createdAt"],
  },
};

const escapeCsvField = (value) => {
  if (value === undefined || value === null) return "";
  const str = Array.isArray(value)
    ? value.join("; ")
    : value instanceof Date
    ? value.toISOString()
    : String(value);

  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

const router = express.Router();

/**
 * @swagger
 * /{resource}/export:
 *   get:
 *     summary: Stream the current filtered result set as CSV (admin role only)
 *     description: Honors status/search/includeDeleted like the list endpoints, but returns the full matching set — no pagination.
 *     tags: [Export]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - name: resource
 *         in: path
 *         required: true
 *         schema: { type: string, enum: [contact, brand, livestream, training] }
 *       - $ref: '#/components/parameters/StatusParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *       - $ref: '#/components/parameters/IncludeDeletedParam'
 *     responses:
 *       200:
 *         description: CSV file
 *         content:
 *           text/csv:
 *             schema: { type: string }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { description: Unknown resource name }
 */
router.get(
  "/:resource/export",
  auth,
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const config = RESOURCES[req.params.resource];
    if (!config) return res.status(404).json({ message: "Unknown resource." });

    const { Model, statuses, columns } = config;
    const filter = buildFilter(req, statuses);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${req.params.resource}-export.csv"`);

    res.write(columns.join(",") + "\n");

    const cursor = Model.find(filter).sort({ createdAt: -1 }).cursor();
    for await (const doc of cursor) {
      res.write(columns.map((col) => escapeCsvField(doc[col])).join(",") + "\n");
    }

    res.end();
  })
);

export default router;
