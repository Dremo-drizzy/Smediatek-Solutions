import express from "express";
import LivestreamRequest, { LIVESTREAM_STATUSES } from "../models/LivestreamRequest.js";
import auth, { requireRole } from "../middleware/auth.js";
import validate, { liveSchema, liveStatusSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { buildFilter, parsePagination, parseSort, buildListResponse } from "../utils/pagination.js";

const router = express.Router();
const SORT_FIELDS = ["createdAt", "email", "status"];

router.post(
  "/",
  validate(liveSchema),
  asyncHandler(async (req, res) => {
    const request = new LivestreamRequest(req.body);
    await request.save();
    res.status(201).json({ message: "Livestream request received!" });
  })
);

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
    res.json(request);
  })
);

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
    res.json({ message: "Livestream request deleted successfully!" });
  })
);

export default router;
