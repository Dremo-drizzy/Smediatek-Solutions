import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();
// ✅ POST /api/contact - Save a new message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ MongoDB Save Error:", error); // 👈 add this line
    res.status(500).json({ success: false, message: "Something went wrong.", error: error.message });
  }
});


// ✅ GET /api/contact - Fetch all messages (for admin view)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch messages." });
  }
});

// ✅ DELETE /api/contact/:id - Delete a message by ID
router.delete("/:id", async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found." });
    }
    res.json({ success: true, message: "Message deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete message." });
  }
});

export default router;
