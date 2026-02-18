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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 
                 flex flex-col lg:flex-col gap-3 sm:flex-row items-center lg:items-start"
        >
          {/* تصویر */}
          <div className="flex-shrink-0 w-24 h-24 lg:w-full lg:h-40 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain w-full h-full"
            />
          </div>

          {/* متن */}
          <div className="flex flex-col gap-1 flex-1">
            <h2 className="text-sm sm:text-base font-bold line-clamp-2">
              {product.title}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
              {product.description}
            </p>
            <p className="text-red-600 font-bold text-sm sm:text-lg mt-1">
              {enTofa(product.price)} تومان
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
