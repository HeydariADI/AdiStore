import ProductsList from "@/components/ProductsList/ProductsList";

// متادیتا برای SEO
export async function generateMetadata({ params }) {
  const { category } = params;
  return {
    title: `خرید ${category} | فروشگاه من`,
    description: `جدیدترین محصولات ${category} با بهترین قیمت.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products?category=${category}`, {
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
      <h1 className="text-2xl font-bold mb-6 capitalize text-center">
        {category}
      </h1>
      <ProductsList products={products} />
    </section>
  );
}
