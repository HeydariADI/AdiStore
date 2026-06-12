import { NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongodb";
import Product from "@models/Products";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");

    let query = {};

    // فقط اگر category وجود داشت
    if (category) {
      query.category = category;
    }

    console.log("🔍 Query:", query);

    const products = await Product.find(query).lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error in products API:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}