import { NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongodb";
import Product from "@models/Products";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const slug = params?.slug?.trim();

    if (!slug) {
      return NextResponse.json(
        {
          message: "شناسه محصول نامعتبر است",
          success: false,
        },
        { status: 400 }
      );
    }

    let product = null;

    // جستجو بر اساس slug
    product = await Product.findOne({ slug }).lean();

    // جستجو بر اساس id عددی
    if (!product && !isNaN(slug)) {
      product = await Product.findOne({
        id: Number(slug),
      }).lean();
    }

    // جستجو بر اساس ObjectId
    if (
      !product &&
      slug.length === 24 &&
      /^[a-fA-F0-9]{24}$/.test(slug)
    ) {
      product = await Product.findById(slug).lean();
    }

    if (!product) {
      return NextResponse.json(
        {
          message: "محصول یافت نشد",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...product,
      _id: product._id.toString(),
      success: true,
    });
  } catch (error) {
    console.error("PRODUCT API ERROR:", error);

    return NextResponse.json(
      {
        message: "خطای سرور",
        success: false,
      },
      { status: 500 }
    );
  }
}