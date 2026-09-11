import express from "express";
import Contact, { CONTACT_STATUSES } from "../models/Contact.js";
import auth, { requireRole } from "../middleware/auth.js";
import validate, { contactSchema, contactStatusSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { buildFilter, parsePagination, parseSort, buildListResponse } from "../utils/pagination.js";
import { logAction } from "../utils/audit.js";
import { notifyNewSubmission } from "../utils/notifyNewSubmission.js";
import { emitNewLead } from "../socket.js";

const router = express.Router();
const SORT_FIELDS = ["createdAt", "email", "status"];

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit a contact form message
 *     tags: [Contact]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               message: { type: string }
 *     responses:
 *       201: { description: Message saved }
 *       400: { description: Validation failed }
 */
router.post(
  "/",
  validate(contactSchema),
  asyncHandler(async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();

    notifyNewSubmission({
      resourceLabel: "contact message",
      submitterEmail: newContact.email,
      submitterName: newContact.name,
      fields: { Name: newContact.name, Email: newContact.email, Message: newContact.message },
    });

    emitNewLead("contact", newContact._id);

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  })
);

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: List contact messages (paginated, filterable, searchable)
 *     tags: [Contact]
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
    const filter = buildFilter(req, CONTACT_STATUSES);
    const { page, limit, skip } = parsePagination(req);
    const sort = parseSort(req, SORT_FIELDS);

    const [data, total] = await Promise.all([
      Contact.find(filter).sort(sort).skip(skip).limit(limit),
      Contact.countDocuments(filter),
    ]);

    res.json(buildListResponse(data, total, page, limit));
  })
);

/**
 * @swagger
 * /contact/{id}/status:
 *   patch:
 *     summary: Update a contact message's status
 *     tags: [Contact]
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
 *               status: { type: string, enum: [new, read, archived] }
 *     responses:
 *       200: { description: Updated document }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.patch(
  "/:id/status",
  auth,
  validate(contactStatusSchema),
  asyncHandler(async (req, res) => {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }
    logAction({ adminId: req.admin.id, action: "status_update", resource: "contact", resourceId: message._id });
    res.json(message);
  })
);

/**
 * @swagger
 * /contact/{id}:
 *   delete:
 *     summary: Soft-delete a contact message (admin role only)
 *     tags: [Contact]
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
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }
    logAction({ adminId: req.admin.id, action: "soft_delete", resource: "contact", resourceId: message._id });
    res.json({ success: true, message: "Message deleted successfully!" });
  })
);

export default router;
