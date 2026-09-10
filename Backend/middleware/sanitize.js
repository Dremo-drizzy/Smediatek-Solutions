import mongoSanitize from "express-mongo-sanitize";

// Express 5 exposes req.query as a getter-only accessor (re-parsed from
// the raw query string on every read), so express-mongo-sanitize's own
// middleware crashes trying to do `req.query = ...`. req.body and
// req.params are plain writable properties, so those are sanitized in
// place as usual; a query string carrying a prohibited key is rejected
// instead, since it can't be safely rewritten.
const sanitizeRequest = (req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);

  if (req.query && mongoSanitize.has(req.query)) {
    return res.status(400).json({ message: "Invalid characters in query parameters." });
  }

  next();
};

export default sanitizeRequest;
