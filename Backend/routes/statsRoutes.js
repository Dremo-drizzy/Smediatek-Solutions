import express from "express";
import auth from "../middleware/auth.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Contact from "../models/Contact.js";
import BrandProject from "../models/BrandProject.js";
import LivestreamRequest from "../models/LivestreamRequest.js";
import TrainingEnrollment from "../models/TrainingEnrollment.js";

const router = express.Router();

const RESOURCES = {
  contact: Contact,
  brand: BrandProject,
  livestream: LivestreamRequest,
  training: TrainingEnrollment,
};

const MONTHS_BACK = 12;

const getLastNMonthLabels = (n) => {
  const now = new Date();
  const labels = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    labels.push(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`);
  }
  return labels;
};

const getStartOfMonthsAgo = (n) => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (n - 1), 1));
};

router.get(
  "/overview",
  auth,
  asyncHandler(async (req, res) => {
    const months = getLastNMonthLabels(MONTHS_BACK);
    const since = getStartOfMonthsAgo(MONTHS_BACK);

    const entries = await Promise.all(
      Object.entries(RESOURCES).map(async ([key, Model]) => {
        const [monthlyRaw, statusRaw] = await Promise.all([
          Model.aggregate([
            { $match: { deletedAt: null, createdAt: { $gte: since } } },
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt", timezone: "UTC" } },
                count: { $sum: 1 },
              },
            },
          ]),
          Model.aggregate([
            { $match: { deletedAt: null } },
            { $group: { _id: "$status", count: { $sum: 1 } } },
          ]),
        ]);

        const countByMonth = Object.fromEntries(monthlyRaw.map((r) => [r._id, r.count]));
        const monthly = months.map((month) => ({ month, count: countByMonth[month] || 0 }));
        const statusBreakdown = statusRaw.map((r) => ({ status: r._id, count: r.count }));

        return [key, { monthly, statusBreakdown }];
      })
    );

    const monthly = Object.fromEntries(entries.map(([key, v]) => [key, v.monthly]));
    const statusBreakdown = Object.fromEntries(entries.map(([key, v]) => [key, v.statusBreakdown]));

    res.json({ months, monthly, statusBreakdown });
  })
);

export default router;
