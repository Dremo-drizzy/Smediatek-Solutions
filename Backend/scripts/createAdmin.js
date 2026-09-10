import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

dotenv.config();

const run = async () => {
  const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!MONGO_URI) throw new Error("MONGO_URI is not defined");
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set to seed an admin");
  }

  await mongoose.connect(MONGO_URI);

  const email = ADMIN_EMAIL.toLowerCase().trim();
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin already exists for ${email}, skipping.`);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await Admin.create({ email, password: hashedPassword });
  console.log(`✅ Admin created for ${email}`);

  await mongoose.disconnect();
};

run().catch((error) => {
  console.error("❌ Failed to create admin:", error.message);
  process.exit(1);
});
