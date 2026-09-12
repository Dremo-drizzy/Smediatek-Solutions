import cron from "node-cron";
import Contact from "../models/Contact.js";
import BrandProject from "../models/BrandProject.js";
import LivestreamRequest from "../models/LivestreamRequest.js";
import TrainingEnrollment from "../models/TrainingEnrollment.js";
import { sendMail } from "../utils/mailer.js";
import { weeklyDigestEmail } from "../emails/weeklyDigestEmail.js";

const RESOURCES = [
  { Model: Contact, label: "Contact messages" },
  { Model: BrandProject, label: "Brand identity requests" },
  { Model: LivestreamRequest, label: "Livestream requests" },
  { Model: TrainingEnrollment, label: "Training enrollments" },
];

export const runWeeklyDigest = async () => {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const counts = await Promise.all(
    RESOURCES.map(async ({ Model, label }) => ({
      label,
      count: await Model.countDocuments({ createdAt: { $gte: since }, deletedAt: null }),
    }))
  );

  await sendMail({ to: process.env.ADMIN_EMAIL, ...weeklyDigestEmail(counts) });
};

// Every Monday at 8am, server local time.
export const scheduleWeeklyDigest = () => {
  cron.schedule("0 8 * * 1", () => {
    runWeeklyDigest().catch((error) => {
      console.error("❌ Failed to send weekly digest:", error.message);
    });
  });
};
