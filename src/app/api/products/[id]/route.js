import { NextResponse } from "next/server";
import connectToDatabase from "@lib/mongodb";
import Product from "@models/Products";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();

    console.log(`🔍 جستجو برای محصول با id: ${id}`);

    let product = null;

    // سعی کنید از findById استفاده کنید (در صورتی که id یک ObjectId معتبر باشد)
    if (mongoose.Types.ObjectId.isValid(id)) {
      try {
        product = await Product.findById(id);
        if (product) {
          console.log(`✅ محصول پیدا شد توسط findById`);
          return NextResponse.json(product.toObject());
        }
      } catch (err) {
        console.log(`⚠️ findById خطا: ${err.message}`);
      }
    }

    // اگر محصول پیدا نشد
    console.log(`❌ محصول یافت نشد برای id: ${id}`);
    return NextResponse.json({ message: "محصول یافت نشد" }, { status: 404 });
  } catch (error) {
    console.error("❌ Server error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch product", details: error.message },
      { status: 500 }
    );
  }
}
