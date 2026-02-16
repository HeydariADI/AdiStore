"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";

export default function BestSellersPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    fetch(`${baseUrl}/api/products?best=true&all=true`) // می‌تونیم all=true برای نمایش همه اضافه کنیم
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (!products.length)
    return <p className="text-center mt-10">محصول پرفروشی یافت نشد.</p>;

  return (
    <div className="container mx-auto px-4 py-10 font-vazirmatn">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center cursor-pointer">
        پرفروش‌ترین‌ها
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id || Math.random()}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col"
          >
            <div className="relative w-full h-48 md:h-56 bg-gray-100 rounded-2xl overflow-hidden">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name || "محصول"}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-base font-semibold text-gray-800 mt-3 line-clamp-1">
              {product.name || "محصول بدون نام"}
            </h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {product.description}
            </p>

            <div className="flex justify-between items-center mt-3">
              <p className="text-orange-600 font-bold text-sm">
                {product.price || product.price === 0
                  ? Number(product.price).toLocaleString("fa-IR") + " تومان"
                  : "قیمت موجود نیست"}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow hover:shadow-md"
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
