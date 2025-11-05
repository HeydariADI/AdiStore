// src/models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  isBestSeller: { type: Boolean, default: false },
});

// درست: بررسی مدل موجود و در غیر این صورت ایجاد مدل جدید
const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;
