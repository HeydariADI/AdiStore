"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";

export default function BestSellersPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/products?best=true&all=true")
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id || Math.random()}
            className="bg-white rounded-xl shadow-md overflow-hidden 
                       flex flex-col lg:flex-col sm:flex-row gap-3 p-4"
          >
            {/* تصویر */}
            <div className="relative w-24 h-24 sm:w-24 sm:h-24 lg:w-full lg:h-48 flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.title || "محصول"}
                fill
                className="object-cover"
              />
            </div>

            {/* متن */}
            <div className="flex flex-col justify-between flex-1 gap-1">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">
                {product.title || "محصول بدون نام"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-orange-600 font-bold text-sm sm:text-base">
                  {product.price || product.price === 0
                    ? Number(product.price).toLocaleString("fa-IR") + " تومان"
                    : "قیمت موجود نیست"}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shadow hover:shadow-md"
                >
                  افزودن به سبد خرید
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
