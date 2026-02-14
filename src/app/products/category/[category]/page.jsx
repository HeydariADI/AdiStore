"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

function enTofa(num) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (d) => farsiDigits[d]);
}

export default function CategoryPage() {
  const params = useParams();
  const { category } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products?category=${category}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          setProducts([]);
          return;
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("خطا:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  if (loading) return <p className="text-center p-10">در حال بارگذاری...</p>;
  if (!products.length)
    return <p className="text-center p-10">محصولی یافت نشد 😢</p>;

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="mx-auto px-4 py-8 font-vazirmatn max-w-full 2xl:max-w-[1700px]">
        {/* <h1 className="text-2xl font-bold mb-6">محصولات دسته {category}</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col gap-3"
            >
              <div className="flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 object-contain"
                />
              </div>
              <h2 className="text-lg font-bold">{product.title}</h2>
              <p className="text-gray-500 text-sm line-clamp-2">
                {product.description}
              </p>
              <p className="text-red-600 font-bold text-lg">
                {enTofa(product.price)} تومان
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
