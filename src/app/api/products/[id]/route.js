import { NextResponse } from "next/server";
import connectToDatabase from "@lib/mongodb";
import Product from "@models/Products";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  const { id } = await Promise.resolve(params);

  try {
    await connectToDatabase();

    let product = null;

    // اگر ObjectId بود
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }

    // اگر با slug بود
    if (!product) {
      product = await Product.findOne({ slug: id });
    }

    if (!product) {
      return NextResponse.json({ message: "محصول یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ API ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
