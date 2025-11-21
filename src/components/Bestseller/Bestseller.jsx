"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useRef, useState } from "react";

export default function AmazingDeals({ products }) {
  const { addToCart } = useCart();
  const scrollRef = useRef(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!products?.length) {
    return <p className="text-center text-gray-600">محصول پرفروشی یافت نشد.</p>;
  }

  return (
    <section className="bg-orange-500 py-10 font-vazirmatn relative mt-20 rounded-lg">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        {/* TITEL BOX */}
        <div className="flex-none w-full md:w-52 h-auto  rounded-2xl flex flex-col items-center justify-center p-4 gap-2 md:sticky md:-mr-60 md:self-center">
          <h2 className="text-white text-xl md:text-3xl font-extrabold text-center">
            پرفروش ترین
          </h2>
          <p className="text-white text-sm mt-1 text-center">
            تا <span className="font-bold">46%</span> تخفیف
          </p>
          <Link
            href="/bestsellers"
            className="text-orange-700 bg-white px-3 py-1 md:w-32 md:h-10 md:text-lg md:mt-5 rounded-md text-xs hover:bg-gray-100 transition"
          >
            مشاهده همه
          </Link>
        </div>

        {/* SCROLLABLE PRODUCTS */}
        <div
          ref={scrollRef}
          className="flex-1 flex gap-4 md:gap-6 overflow-x-auto scroll-smooth py-4 cursor-grab active:cursor-grabbing select-none scrollbar-hide"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {products.map((product) => (
            <Link
              key={product._id || Math.random()}
              href={`/products/${product._id}`}
              className="min-w-[180px] sm:min-w-[220px] md:min-w-[260px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group relative"
            >
              {/* IMAGE */}
              <div className="relative w-full h-44 sm:h-52 md:h-60 bg-gray-100 rounded-t-2xl overflow-hidden">
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.name || "تصویر محصول"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-3 sm:p-4 flex flex-col justify-between h-[150px] sm:h-[170px]">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center line-clamp-1">
                  {product.name || product.title || "محصول بدون نام"}
                </h3>

                <p className="text-xs text-gray-500 text-center line-clamp-2 mt-1">
                  {product.description || "توضیحی برای این محصول وجود ندارد."}
                </p>

                <p className="text-orange-600 font-bold text-sm text-center mt-2 sm:mt-3">
                  {product.price || product.price === 0
                    ? Number(product.price).toLocaleString("fa-IR") + " تومان"
                    : "قیمت موجود نیست"}
                </p>
              </div>

              <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
                🔥 پرفروش
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
