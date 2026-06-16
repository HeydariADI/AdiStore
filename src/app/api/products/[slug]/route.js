export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const slug = params?.slug?.toLowerCase().trim();

    console.log("🔥 SLUG:", slug);

    if (!slug) {
      return NextResponse.json(
        { message: "slug نامعتبر است" },
        { status: 400 }
      );
    }

    const product = await Product.findOne({
      slug: { $regex: new RegExp(`^${slug}$`, "i") }
    }).lean();

    if (!product) {
      console.log("❌ NOT FOUND IN DB:", slug);

      return NextResponse.json(
        { message: "محصول یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...product,
      _id: product._id?.toString(),
    });

  } catch (err) {
    console.error("PRODUCT API ERROR:", err);

    return NextResponse.json(
      { message: "server error" },
      { status: 500 }
    );
  }
}