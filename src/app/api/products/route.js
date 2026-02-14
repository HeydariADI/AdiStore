import { NextResponse } from "next/server";
// Ensure this route runs in the Node.js runtime so server-side libraries
// like mongoose can be used safely.
export const runtime = "nodejs";
import connectToDatabase from "@lib/mongodb";
import Product from "@models/Products";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const best = searchParams.get("best");

    console.log("📝 Query parameters:", { category, best });

    let query = {};
    if (category) query.category = category;
    if (best === "true") query.isBestSeller = true;

    console.log("🔍 MongoDB Query:", query);

    // Check if the request path includes an ID segment (e.g. /api/products/:id)
    const url = new URL(request.url);
    const pathname = url.pathname || "";
    const parts = pathname.split("/").filter(Boolean);
    // Example parts for /api/products/123 -> ['api','products','123']
    const maybeId =
      parts.length >= 3 && parts[parts.length - 1] !== "products"
        ? parts[parts.length - 1]
        : null;

    if (maybeId) {
      // Try to find by MongoDB _id (ObjectId) or by a slug field
      let found = null;
      try {
        found = await Product.findById(maybeId);
      } catch (e) {
        // ignore cast errors and try slug
      }

      if (!found) {
        found = await Product.findOne({ slug: maybeId });
      }

      if (!found) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(found);
    }

    const products = await Product.find(query);

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error in /api/products:", error.message || error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 },
    );
  }
}
