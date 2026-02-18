"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

export default function WeeklySpecialOffer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat("fa-IR", { useGrouping: true }).format(price);

  useEffect(() => {
    fetch("/api/products?specialOffer=true")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">در حال بارگذاری...</p>
    );
  if (!products.length)
    return (
      <p className="text-center mt-10 text-gray-600">محصول ویژه‌ای یافت نشد.</p>
    );

  return (
    <section className="mt-10 py-6 font-vazirmatn">
      <div className="container mx-auto px-4">
        {/* کارت بزرگ تیتر */}
        <div className="flex flex-col md:flex-row bg-gray-50 shadow rounded-xl p-4 md:p-6 gap-4">
          {/* تیتر */}
          <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-4 w-full md:w-1/3">
            <h2 className="text-lg md:text-xl md:m-4 font-bold text-gray-800">
              پیشنهاد ویژه هفته
            </h2>
            <p className="bg-orange-500 text-white text-xs md:text-sm rounded-3xl px-3 py-1">
              تا 40% تخفیف
            </p>
          </div>

          {/* اسکرول افقی محصولات */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth w-full md:w-2/3 py-2">
            {products.map((product) => (
              <Link
                key={product.id || product._id}
                href={`/products/${product.id || product._id}`}
                className="min-w-[140px] md:min-w-[160px] bg-white rounded-lg shadow-md p-2 flex flex-col items-center flex-shrink-0 relative hover:scale-105 transition-transform"
              >
                {/* تخفیف */}
                {product.discount && (
                  <span className="absolute top-1 right-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
                    {product.discount}
                  </span>
                )}

                {/* تصویر */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 mb-2">
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.title || "محصول ویژه"}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>

                {/* نام محصول */}
                <p className="text-xs md:text-sm text-gray-700 text-center line-clamp-2">
                  {product.title}
                </p>

                {/* قیمت */}
                <p className="text-orange-600 font-bold text-sm md:text-base mt-1">
                  {formatPrice(product.price)} تومان
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
