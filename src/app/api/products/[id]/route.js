import { NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongodb";
import Product from "@models/Products";

export async function GET(request, { params }) {
  const { id } = await Promise.resolve(params);

  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "شناسه نامعتبر است" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    let product = null;

    // ابتدا با slug امتحان کن (برای URLهای خوانا)
    product = await Product.findOne({ slug: id }).lean();

    // اگر با slug پیدا نشد و شبیه ObjectId است، با _id امتحان کن
    if (
      !product &&
      id.length === 24 &&
      /^[a-fA-F0-9]+$/.test(id)
    ) {
      product = await Product.findById(id).lean();
    }

    if (!product) {
      return NextResponse.json({ message: "محصول یافت نشد" }, { status: 404 });
    }

    // تبدیل _id به string برای JSON
    if (product._id) {
      product._id = product._id.toString();
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ API ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
