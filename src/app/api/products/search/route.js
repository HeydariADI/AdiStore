// src/app/api/products/search/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "@lib/mongodb";
import Product from "@models/Products";

export const runtime = "nodejs";

// Simple in-memory cache
const cache = {};

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() || "";
    const category = searchParams.get("category") || "all";

    const key = `${q}-${category}`;
    if (cache[key]) {
      // ⚡ Return cached result immediately
      return NextResponse.json(cache[key]);
    }

    const filter = {
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    };
    if (category !== "all") filter.category = category;

    const results = await Product.find(filter).limit(10);

    // Save in cache
    cache[key] = results;

    return NextResponse.json(results);
  } catch (error) {
    console.error("❌ Search error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 },
    );
  }
}
