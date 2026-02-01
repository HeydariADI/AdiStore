import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Product from "../../../../models/Products";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const best = searchParams.get("best");

    const query = {};
    if (category) query.category = category;
    if (best === "true") query.isBestSeller = true;

    const products = await Product.find(query).lean();

    console.log("🟠 Query used:", query);
    console.log("🟢 Found products:", products.length);

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}
