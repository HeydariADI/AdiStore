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

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => setIsDown(false);
  const handleMouseLeave = () => setIsDown(false);

  const handleMouseMove = (e) => {
    if (!isDown) return;
    const walk = (e.pageX - startX) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!products?.length) {
    return <p className="text-center mt-10">محصول پرفروشی یافت نشد.</p>;
  }

  return (
    <section className="font-vazirmatn py-10">
      <div className="hidden md:flex bg-orange-500 rounded-xl overflow-hidden">
        {/* باکس تیتر (هم‌عرض یک محصول) */}
        <div className="min-w-[220px] flex flex-col justify-center items-center text-white p-4 border-l border-white/30">
          <h2 className="font-bold text-lg mb-2">پرفروش‌ترین‌ها</h2>
          <Link href="/bestsellers" className="text-sm underline">
            مشاهده همه
          </Link>
        </div>

        {/* اسکرول */}
        <div
          ref={scrollRef}
          className="
            flex-1 
            overflow-x-auto 
            cursor-grab 
            active:cursor-grabbing 
            select-none
            scrollbar-hide
          "
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div className="flex gap-3 p-4 w-max">
            {products.map((product) => (
              <div
                key={product._id}
                className="min-w-[220px] bg-white rounded-md p-3 flex flex-col"
              >
                <div className="relative w-full h-44 mb-2">
                  <Image
                    src={product.image}
                    alt={product.name || product.title || "product"}
                    fill
                    className="object-contain"
                  />
                </div>

                <p className="text-xs text-gray-700 line-clamp-2">
                  {product.name || product.title}
                </p>

                <p className="text-red-500 font-bold text-sm mt-auto">
                  {Number(product.price).toLocaleString("fa-IR")} تومان
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
