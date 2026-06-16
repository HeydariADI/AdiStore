export async function GET(req, context) {
  try {
    await connectToDatabase();

    const slug = context?.params?.slug;

    console.log("🔥 SLUG:", slug);

    if (!slug) {
      return NextResponse.json(
        { message: "slug نامعتبر است" },
        { status: 400 }
      );
    }

    const product = await Product.findOne({
      slug: slug.toLowerCase().trim(),
    }).lean();

    if (!product) {
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