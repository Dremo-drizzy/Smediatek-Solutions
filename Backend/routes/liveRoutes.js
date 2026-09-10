import express from "express";
import LivestreamRequest from "../models/LivestreamRequest.js";
import auth from "../middleware/auth.js";
import validate, { liveSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

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
    const requests = await LivestreamRequest.find();
    res.json(requests);
  })
);

router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const deletedRequest = await LivestreamRequest.findByIdAndDelete(req.params.id);
    if (!deletedRequest) return res.status(404).json({ error: "Livestream request not found" });
    res.json({ message: "Livestream request deleted successfully!" });
  })
);

export default router;
