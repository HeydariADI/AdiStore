"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function BestSellers({ products }) {
  const { addToCart } = useCart();

  if (!products?.length) {
    return (
      <p className="text-center text-gray-600 mt-10">محصول پرفروشی یافت نشد.</p>
    );
  }

  return (
    <section className="font-vazirmatn py-10">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 text-center">
        پرفروش‌ترین‌ها
      </h2>

      {/* موبایل: اسکرول افقی با کادر نارنجی */}
      <div className="md:hidden relative bg-orange-500 py-6 rounded-xl px-4">
        <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2">
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[180px] bg-white rounded-lg shadow-md p-3 flex flex-col gap-2 flex-shrink-0"
            >
              <div className="relative w-full h-36 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.name || "محصول"}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-orange-600 font-bold text-sm">
                {product.price
                  ? Number(product.price).toLocaleString("fa-IR") + " تومان"
                  : "قیمت موجود نیست"}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded-md text-xs mt-1"
              >
                افزودن به سبد خرید
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* دسکتاپ: Grid مثل قبل */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 mt-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col gap-3"
          >
            <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name || "محصول"}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-orange-600 font-bold text-lg">
              {product.price
                ? Number(product.price).toLocaleString("fa-IR") + " تومان"
                : "قیمت موجود نیست"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
