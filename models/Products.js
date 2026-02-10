import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    image: String,
    category: String,
    price: Number,
    seller: String,
    sellerRating: Number,
    description: String,
    features: Object,
    colors: [String],
    sizes: [String],
    variants: [
      {
        color: String,
        size: String,
        price: Number,
        stock: Number,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: Number,
    isBestSeller: Boolean,
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
