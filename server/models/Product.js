import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    category: {
      type: String,
      required: true,
      enum: ["face", "hair", "body", "wellness", "gifting"],
    },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number, default: null },
    stock: { type: Number, required: true, default: 0 },
    ingredients: [{ type: String }],
    image: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
