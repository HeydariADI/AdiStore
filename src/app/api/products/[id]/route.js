import { NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongodb";
import Product from "@models/Products";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    let product = null;

    // slug search
    product = await Product.findOne({ slug: id }).lean();

    // fallback _id
    if (!product && id.length === 24) {
      product = await Product.findById(id).lean();
    }

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    product._id = product._id.toString();

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}