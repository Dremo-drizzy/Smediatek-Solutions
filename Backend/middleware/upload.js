import multer from "multer";
import { fileTypeFromBuffer } from "file-type";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 3 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      const error = new Error("Only JPEG, PNG, WEBP, or GIF images are allowed.");
      error.status = 400;
      return cb(error);
    }
    cb(null, true);
  },
});

// multer's fileFilter only sees the client-declared Content-Type for each
// part, which costs nothing to spoof (e.g. a renamed .html file declared as
// image/jpeg). Once the file is fully buffered in memory, sniff its actual
// magic bytes against the same allowlist so a disguised file can't pass.
export const verifyImageContent = async (req, res, next) => {
  try {
    for (const file of req.files || []) {
      const detected = await fileTypeFromBuffer(file.buffer);
      if (!detected || !ALLOWED_MIME_TYPES.includes(detected.mime)) {
        return res.status(400).json({ message: "One or more files are not valid images." });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default upload;
