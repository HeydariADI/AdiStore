"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function BestSellers({ products }) {
  const { addToCart, cart } = useCart();

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-600">محصول پرفروشی یافت نشد.</p>;
  }

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-20 font-vazirmatn">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">
          پرفروش‌ ترین‌ها
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product._id || Math.random()} // اگر _id موجود نبود
              className="relative bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
            >
              <div className="relative w-full h-64 bg-gray-100">
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.name || "تصویر محصول"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex flex-col justify-between h-[220px]">
                <h3 className="text-lg font-semibold text-gray-800 text-center line-clamp-1">
                  {product.name || product.title || "محصول بدون نام"}
                </h3>
                <p className="text-sm text-gray-500 text-center line-clamp-2 mt-2">
                  {product.description || "توضیحی برای این محصول وجود ندارد."}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-orange-600 font-bold text-lg">
                    {product.price || product.price === 0
                      ? Number(product.price).toLocaleString("fa-IR") + " تومان"
                      : "قیمت موجود نیست"}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all shadow hover:shadow-lg"
                  >
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>

              <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                پرفروش 🔥
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
