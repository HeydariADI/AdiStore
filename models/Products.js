import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  isBestSeller: { type: Boolean, default: false },
}, { collection: 'products' }); // مشخص‌کردن نام collection

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
