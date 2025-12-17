
import express from "express";
import LivestreamRequest from "../models/LivestreamRequest.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const request = new LivestreamRequest(req.body);
    await request.save();
    res.status(201).json({ message: "Livestream request received!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send livestream request" });
  }
});

router.get("/", async (req, res) => {
  try {
    const requests = await LivestreamRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch livestream requests" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedRequest = await LivestreamRequest.findByIdAndDelete(req.params.id);
    if (!deletedRequest) return res.status(404).json({ error: "Livestream request not found" });
    res.json({ message: "Livestream request deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete livestream request" });
  }
});

export default router;
