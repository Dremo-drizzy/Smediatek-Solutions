import express from "express";
import Contact from "../models/Contact.js";
import auth from "../middleware/auth.js";
import validate, { contactSchema, contactStatusSchema } from "../middleware/validate.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.post(
  "/",
  validate(contactSchema),
  asyncHandler(async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  })
);

router.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const filter = req.query.includeDeleted === "true" ? {} : { deletedAt: null };
    const messages = await Contact.find(filter).sort({ createdAt: -1 });
    res.json(messages);
  })
);

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
    res.json(message);
  })
);

router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }
    res.json({ success: true, message: "Message deleted successfully!" });
  })
);

export default router;
