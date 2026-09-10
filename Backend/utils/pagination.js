// Builds a Mongo filter from named, allowlisted query params only —
// never pass req.query straight into a Mongoose query.
export const buildFilter = (req, allowedStatuses) => {
  const filter = {};

  if (req.query.includeDeleted !== "true") {
    filter.deletedAt = null;
  }

  if (req.query.status && allowedStatuses.includes(req.query.status)) {
    filter.status = req.query.status;
  }

  if (req.query.search) {
    filter.$text = { $search: String(req.query.search) };
  }

  return filter;
};

export const parsePagination = (req) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const parseSort = (req, allowedFields, defaultField = "createdAt") => {
  const raw = req.query.sort;
  if (!raw || typeof raw !== "string") return { [defaultField]: -1 };

  const dir = raw.startsWith("-") ? -1 : 1;
  const field = raw.startsWith("-") ? raw.slice(1) : raw;

  if (!allowedFields.includes(field)) return { [defaultField]: -1 };
  return { [field]: dir };
};

export const buildListResponse = (data, total, page, limit) => ({
  data,
  total,
  page,
  pages: Math.max(Math.ceil(total / limit), 1),
});
