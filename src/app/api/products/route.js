import { NextResponse } from "next/server";
import connectToDatabase from "@lib/mongodb";
import Product from "@models/Products";

export async function GET(request) {
  try {
    console.log("🔵 API /api/products - شروع درخواست");
    
    await connectToDatabase();
    console.log("✅ MongoDB متصل شد");

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const best = searchParams.get("best");

    console.log("📝 Query parameters:", { category, best });

    let query = {};
    if (category) query.category = category;
    if (best === "true") query.isBestSeller = true;

    console.log("🔍 MongoDB Query:", query);

    const products = await Product.find(query);
    console.log(`✅ ${products.length} محصول دریافت شد`);

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error in /api/products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}
