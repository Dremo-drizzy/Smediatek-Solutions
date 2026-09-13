import multer from "multer";

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

// Minimal magic-byte signatures for the 4 formats we accept. Hand-rolled
// rather than pulling in a package: it's a fixed, small set of byte
// patterns, and avoids taking on a dependency's own CVE history just to
// check them (file-type's CJS-compatible releases are pinned to a version
// range with a known DoS advisory — GHSA-5v7r-6r5c-r473 — and its current
// patched release is ESM-only, which doesn't mix cleanly with this
// CommonJS-transformed test setup).
const SIGNATURES = [
  { mime: "image/jpeg", matches: (b) => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    mime: "image/png",
    matches: (b) =>
      b.length >= 8 &&
      b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 &&
      b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a,
  },
  {
    mime: "image/gif",
    matches: (b) =>
      b.length >= 6 &&
      b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38 &&
      (b[4] === 0x37 || b[4] === 0x39) && b[5] === 0x61,
  },
  {
    mime: "image/webp",
    matches: (b) =>
      b.length >= 12 &&
      b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
      b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50,
  },
];

const detectImageMime = (buffer) => SIGNATURES.find(({ matches }) => matches(buffer))?.mime ?? null;

// multer's fileFilter only sees the client-declared Content-Type for each
// part, which costs nothing to spoof (e.g. a renamed .html file declared as
// image/jpeg). Once the file is fully buffered in memory, sniff its actual
// magic bytes against the same allowlist so a disguised file can't pass.
export const verifyImageContent = (req, res, next) => {
  for (const file of req.files || []) {
    if (!ALLOWED_MIME_TYPES.includes(detectImageMime(file.buffer))) {
      return res.status(400).json({ message: "One or more files are not valid images." });
    }
  }
  next();
};

export default upload;
