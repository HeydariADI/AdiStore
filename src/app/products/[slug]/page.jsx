import ProductsList from "@/components/ProductsList/ProductsList";

// ✅ متادیتا برای SEO
export async function generateMetadata({ params }) {
  const { slug } = params;
  return {
    title: `خرید ${slug} | فروشگاه من`,
    description: `جدیدترین محصولات ${slug} با بهترین قیمت.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // ✅ درخواست بر اساس category نه id
  const res = await fetch(`${baseUrl}/api/products?category=${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return (
      <p className="text-red-500 text-center mt-10">خطا در دریافت اطلاعات</p>
    );
  }

  const products = await res.json();

  if (!products || products.length === 0) {
    return <p className="text-center p-10">هیچ محصولی در این دسته یافت نشد.</p>;
  }

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 capitalize text-center">{slug}</h1>

      {/* ✅ نمایش تمام محصولات دسته */}
      <ProductsList products={products} />
    </section>
  );
}
