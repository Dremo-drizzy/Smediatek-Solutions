import mongoose from "mongoose";

const PortfolioItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PortfolioItemSchema.index({ order: 1 });
PortfolioItemSchema.index({ category: 1 });

export default mongoose.model("PortfolioItem", PortfolioItemSchema);
