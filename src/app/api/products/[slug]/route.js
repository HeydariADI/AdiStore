import { NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongodb";
import Products from "@models/Products";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    // Next.js 16
    const { slug } = await params;

    console.log("🔥 SLUG:", slug);

    if (!slug) {
      return NextResponse.json(
        { message: "slug نامعتبر است" },
        { status: 400 }
      );
    }

    const product = await Products.findOne({
      slug: slug.trim().toLowerCase(),
    }).lean();

    if (!product) {
      return NextResponse.json(
        { message: "محصول یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...product,
      _id: product._id.toString(),
    });
  } catch (err) {
    console.error("PRODUCT API ERROR:", err);

    return NextResponse.json(
      { message: "server error" },
      { status: 500 }
    );
  }
}