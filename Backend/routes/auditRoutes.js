import express from "express";
import AuditLog from "../models/AuditLog.js";
import auth, { requireRole } from "../middleware/auth.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { parsePagination, buildListResponse } from "../utils/pagination.js";

const router = express.Router();

router.get(
  "/",
  auth,
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const { page, limit, skip } = parsePagination(req);

    const [data, total] = await Promise.all([
      AuditLog.find()
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .populate("adminId", "email"),
      AuditLog.countDocuments(),
    ]);

    res.json(buildListResponse(data, total, page, limit));
  })
);

export default router;
