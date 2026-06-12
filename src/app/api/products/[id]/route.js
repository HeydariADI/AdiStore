import { NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongodb";
import Product from "@models/Products";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const id = params?.id?.trim();

    if (!id) {
      return NextResponse.json(
        { message: "شناسه محصول نامعتبر است" },
        { status: 400 }
      );
    }

    let product = null;

    // 1️⃣ تلاش با slug (اولویت اصلی)
    product = await Product.findOne({ slug: id }).lean();

    // 2️⃣ تلاش با custom numeric id
    if (!product && !isNaN(id)) {
      product = await Product.findOne({ id: Number(id) }).lean();
    }

    // 3️⃣ تلاش با MongoDB ObjectId
    if (!product && id.length === 24 && /^[a-fA-F0-9]+$/.test(id)) {
      product = await Product.findById(id).lean();
    }

    // ❌ اگر چیزی پیدا نشد
    if (!product) {
      return NextResponse.json(
        {
          message: "محصول یافت نشد",
          success: false,
        },
        { status: 404 }
      );
    }

    // تبدیل _id برای JSON
    return NextResponse.json({
      ...product,
      _id: product._id?.toString(),
      success: true,
    });
  } catch (error) {
    console.error("❌ PRODUCT API ERROR:", error);

    return NextResponse.json(
      {
        message: "خطای سرور",
        success: false,
      },
      { status: 500 }
    );
  }
}