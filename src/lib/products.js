import connectToDatabase from "./mongodb";
import Product from "../../models/Products";

export async function getAllProducts() {
  await connectToDatabase();
  const products = await Product.find({}).lean();
  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
}
