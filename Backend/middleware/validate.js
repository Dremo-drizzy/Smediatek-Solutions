import { z } from "zod";
import { CONTACT_STATUSES } from "../models/Contact.js";
import { BRAND_STATUSES } from "../models/BrandProject.js";
import { LIVESTREAM_STATUSES } from "../models/LivestreamRequest.js";
import { TRAINING_STATUSES } from "../models/TrainingEnrollment.js";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(254),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export const brandSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  businessName: z.string().trim().min(1, "Business name is required").max(150),
  email: z.string().trim().email("Invalid email address").max(254),
  brandType: z.string().trim().min(1, "Brand type is required").max(100),
  services: z.array(z.string().trim().max(100)).max(20).optional(),
  description: z.string().trim().max(2000).optional(),
});

export const liveSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  organization: z.string().trim().max(150).optional(),
  email: z.string().trim().email("Invalid email address").max(254),
  eventType: z.string().trim().min(1, "Event type is required").max(100),
  services: z.array(z.string().trim().max(100)).max(20).optional(),
  details: z.string().trim().max(2000).optional(),
});

export const trainingSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(254),
  phone: z.string().trim().min(1, "Phone is required").max(30),
  focus: z.string().trim().min(1, "Focus is required").max(150),
  mode: z.enum(["online", "onsite", "hybrid"]),
  goals: z.string().trim().max(2000).optional(),
});

export const contactStatusSchema = z.object({ status: z.enum(CONTACT_STATUSES) });
export const brandStatusSchema = z.object({ status: z.enum(BRAND_STATUSES) });
export const liveStatusSchema = z.object({ status: z.enum(LIVESTREAM_STATUSES) });
export const trainingStatusSchema = z.object({ status: z.enum(TRAINING_STATUSES) });

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed.",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  req.body = result.data;
  next();
};

export default validate;
