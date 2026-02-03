//

import { NextResponse } from "next/server";
import { products } from "../../../db/products";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const best = searchParams.get("best");

  let result = products;

  if (category) result = result.filter((p) => p.category === category);
  if (best === "true") result = result.filter((p) => p.isBestSeller === true);

  console.log("🟢 Local products:", result.length);

  return NextResponse.json(result);
}
