import express from "express";
import PortfolioItem from "../models/PortfolioItem.js";
import auth, { requireRole } from "../middleware/auth.js";
import validate, { portfolioSchema, portfolioUpdateSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { logAction } from "../utils/audit.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const items = await PortfolioItem.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  })
);

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
