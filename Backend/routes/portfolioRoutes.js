import express from "express";
import PortfolioItem from "../models/PortfolioItem.js";
import auth, { requireRole } from "../middleware/auth.js";
import validate, { portfolioSchema, portfolioUpdateSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { logAction } from "../utils/audit.js";

const router = express.Router();

/**
 * @swagger
 * /portfolio:
 *   get:
 *     summary: List portfolio items, sorted by order (public, unauthenticated)
 *     tags: [Portfolio]
 *     security: []
 *     responses:
 *       200: { description: Array of portfolio items }
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const items = await PortfolioItem.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  })
);

/**
 * @swagger
 * /portfolio:
 *   post:
 *     summary: Add a portfolio item (admin role only)
 *     tags: [Portfolio]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, category, imageUrl]
 *             properties:
 *               title: { type: string }
 *               category: { type: string }
 *               imageUrl: { type: string }
 *               description: { type: string }
 *               order: { type: integer }
 *     responses:
 *       201: { description: Created item }
 *       400: { description: Validation failed }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.post(
  "/",
  auth,
  requireRole("admin"),
  validate(portfolioSchema),
  asyncHandler(async (req, res) => {
    const item = new PortfolioItem(req.body);
    await item.save();
    logAction({ adminId: req.admin.id, action: "portfolio_create", resource: "portfolio", resourceId: item._id });
    res.status(201).json(item);
  })
);

/**
 * @swagger
 * /portfolio/{id}:
 *   patch:
 *     summary: Edit a portfolio item (admin role only)
 *     tags: [Portfolio]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { name: id, in: path, required: true, schema: { type: string } }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Any subset of title/category/imageUrl/description/order
 *             properties:
 *               title: { type: string }
 *               category: { type: string }
 *               imageUrl: { type: string }
 *               description: { type: string }
 *               order: { type: integer }
 *     responses:
 *       200: { description: Updated item }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.patch(
  "/:id",
  auth,
  requireRole("admin"),
  validate(portfolioUpdateSchema),
  asyncHandler(async (req, res) => {
    const item = await PortfolioItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Portfolio item not found." });
    logAction({ adminId: req.admin.id, action: "portfolio_update", resource: "portfolio", resourceId: item._id });
    res.json(item);
  })
);

/**
 * @swagger
 * /portfolio/{id}:
 *   delete:
 *     summary: Delete a portfolio item (admin role only)
 *     tags: [Portfolio]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { name: id, in: path, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: Deleted }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.delete(
  "/:id",
  auth,
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const item = await PortfolioItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Portfolio item not found." });
    logAction({ adminId: req.admin.id, action: "portfolio_delete", resource: "portfolio", resourceId: item._id });
    res.json({ message: "Portfolio item deleted successfully!" });
  })
);

export default router;
