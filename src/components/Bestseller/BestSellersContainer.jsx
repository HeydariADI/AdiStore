"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useRef, useState } from "react";

export default function BestSellers({ products }) {
  const { addToCart } = useCart();
  const scrollRef = useRef(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag & Scroll
  const handleMouseDown = (e) => {
    setIsDown(true);
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    const walk = (pageX - startX) * 1.5; // سرعت بیشتر اسکرول
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

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
      <div className="md:hidden relative bg-orange-500 rounded-lg py-6 px-4">
        <p className="text-white text-sm text-center mb-4">
          تا <span className="font-bold">46%</span> تخفیف
        </p>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleMouseMove}
        >
          {products.map((product) => (
            <Link
              key={product._id || Math.random()}
              href={`/products/${product._id}`}
              className="min-w-[150px] snap-start bg-white rounded-2xl shadow-md hover:shadow-lg transition p-3 flex flex-col gap-2 relative"
            >
              <div className="relative w-full h-36 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.name || "محصول"}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 text-center">
                {product.name || product.title || "محصول بدون نام"}
              </h3>

              <p className="text-orange-600 font-bold text-sm text-center mt-1">
                {product.price || product.price === 0
                  ? Number(product.price).toLocaleString("fa-IR") + " تومان"
                  : "قیمت موجود نیست"}
              </p>

              <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
                🔥 پرفروش
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* دسکتاپ: Grid مثل قبل */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 mt-6">
        {products.map((product) => (
          <Link
            key={product._id || Math.random()}
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
              {product.price || product.price === 0
                ? Number(product.price).toLocaleString("fa-IR") + " تومان"
                : "قیمت موجود نیست"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
