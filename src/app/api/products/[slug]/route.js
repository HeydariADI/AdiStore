import { NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongodb";
import Products from "@models/Products";

export const runtime = "nodejs";

export async function GET(req, context) {
  console.log("==========");
  console.log("context:", context);
  console.log("params:", context?.params);
  console.log("slug:", context?.params?.slug);
  console.log("==========");

  return NextResponse.json({
    context,
    params: context?.params,
    slug: context?.params?.slug,
  });
}