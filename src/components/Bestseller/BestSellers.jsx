// src/components/Bestseller/BestSellers.jsx
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

      {/* موبایل: اسکرول افقی با بک‌گراند نارنجی */}
      <div className="md:hidden bg-orange-500 rounded-xl p-4">
        <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[160px] snap-start bg-white rounded-lg shadow-md p-3 flex flex-col gap-2 relative"
            >
              <Link href={`/products/${product._id}`}>
                <div className="relative w-full h-36 bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.name || "محصول"}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mt-2 line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              <p className="text-orange-600 font-bold text-sm mt-1 text-center">
                {product.price
                  ? Number(product.price).toLocaleString("fa-IR") + " تومان"
                  : "قیمت موجود نیست"}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="bg-orange-600 hover:bg-orange-700 text-white text-xs w-full py-1.5 rounded-md mt-2 shadow transition"
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
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow hover:shadow-md mt-2"
            >
              افزودن به سبد خرید
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
}
