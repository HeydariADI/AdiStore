import { NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongodb";
import Product from "@models/Products";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 }
      );
    }

    let product = await Product.findOne({ slug: id }).lean();

    if (!product && id.length === 24) {
      product = await Product.findById(id).lean();
    }

    if (!product) {
      return NextResponse.json(
        { message: "محصول یافت نشد" },
        { status: 404 }
      );
    }

    product._id = product._id.toString();

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ PRODUCT API ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}