import { NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongodb";
import Product from "@models/Products";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const slug = params?.slug;

    console.log("DEBUG SLUG:", slug);

    if (!slug) {
      return NextResponse.json(
        { message: "slug نامعتبر است" },
        { status: 400 }
      );
    }

    const product = await Product.findOne({
      slug: slug.trim(),
    }).lean();

    if (!product) {
      return NextResponse.json(
        {
          message: "محصول یافت نشد",
          slug,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...product,
      _id: product._id.toString(),
    });
  } catch (error) {
    console.error("PRODUCT API ERROR:", error);

    return NextResponse.json(
      { message: "server error" },
      { status: 500 }
    );
  }
}