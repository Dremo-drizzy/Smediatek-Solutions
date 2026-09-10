import dotenv from "dotenv";
import mongoose from "mongoose";
import PortfolioItem from "../models/PortfolioItem.js";

dotenv.config();

const ITEMS = [
  {
    title: "Wedding Invite Design",
    category: "Bride",
    imageUrl: "/portfolio/Bride/Book.jpg",
    description: "Elegant Wedding Invite",
    order: 0,
  },
  {
    title: "Branded Merchandise",
    category: "Bride",
    imageUrl: "/portfolio/Bride/Mug.jpg",
    description: "Custom Branded Mugs",
    order: 1,
  },
  {
    title: "Bridal Party Apparel",
    category: "Bride",
    imageUrl: "/portfolio/Bride/Shirt.jpg",
    description: "Bridal Party Apparel",
    order: 2,
  },
  {
    title: "Campaign Poster",
    category: "Chocolla",
    imageUrl: "/portfolio/Chocolla/ad-1.jpg",
    description: "Bold Campaign Poster",
    order: 3,
  },
  {
    title: "Primary Packaging",
    category: "Chocolla",
    imageUrl: "/portfolio/Chocolla/Coffee-Pouch.jpg",
    description: "Sustainable Coffee Pouch",
    order: 4,
  },
  {
    title: "Extended Packaging Variant",
    category: "Chocolla",
    imageUrl: "/portfolio/Chocolla/Coffee-PouchEP.jpg",
    description: "Retail-Ready Packaging",
    order: 5,
  },
  {
    title: "Business Card (Back)",
    category: "GlobalXT",
    imageUrl: "/portfolio/GlobalXT/bcard-3-back.jpg",
    description: "Minimal Business Card",
    order: 6,
  },
  {
    title: "Merch Cap",
    category: "GlobalXT",
    imageUrl: "/portfolio/GlobalXT/cap.jpg",
    description: "Branded Event Cap",
    order: 7,
  },
  {
    title: "Uniform Polo",
    category: "GlobalXT",
    imageUrl: "/portfolio/GlobalXT/polo.jpg",
    description: "Corporate Uniform Polo",
    order: 8,
  },
  {
    title: "Primary Logo Mark",
    category: "IEAD",
    imageUrl: "/portfolio/IEAD/Logo-on-deep-blue.png",
    description: "Core Brand Logo",
    order: 9,
  },
  {
    title: "Volunteer Polo",
    category: "IEAD",
    imageUrl: "/portfolio/IEAD/White-Polo-Presentation.png",
    description: "Volunteer Branded Polo",
    order: 10,
  },
  {
    title: "Youth Program Poster",
    category: "IEAD",
    imageUrl: "/portfolio/IEAD/Youths.png",
    description: "Vibrant Youth Poster",
    order: 11,
  },
  {
    title: "Branded Bottle",
    category: "IEAD",
    imageUrl: "/portfolio/IEAD/Water-bottle.png",
    description: "Branded Event Bottle",
    order: 12,
  },
];

const run = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await PortfolioItem.countDocuments();
  if (existing > 0) {
    console.log(`PortfolioItem collection already has ${existing} document(s), skipping.`);
    await mongoose.disconnect();
    return;
  }

  const inserted = await PortfolioItem.insertMany(ITEMS);
  console.log(`✅ Inserted ${inserted.length} portfolio items.`);

  await mongoose.disconnect();
};

run().catch((error) => {
  console.error("❌ Failed to migrate portfolio:", error.message);
  process.exit(1);
});
