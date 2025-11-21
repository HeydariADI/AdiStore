"use client";

import Link from "next/link";
import { useCart } from "../../../context/CartContext";
import { useEffect, useState } from "react";
import { use } from "react";

function enTofa(num) {
  if (typeof num !== "number") return num;
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (d) => farsiDigits[d]);
}

export default function ProductDetail({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`
      );
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center p-10">در حال بارگذاری...</p>;

  return (
    <div className="product-detail container mx-auto py-10 flex flex-col md:flex-row gap-10 font-vazir">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-4 w-full max-w-md flex items-center justify-center group">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-xl w-full object-contain h-72 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-6 justify-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          {product.title}
        </h1>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base text-gray-500">دسته‌بندی:</span>
          <Link
            href={`/products/category/${product.category}`}
            className="text-orange-600 underline font-bold text-lg"
          >
            {product.category}
          </Link>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-gray-700 shadow-sm border border-orange-100">
          {product.description}
        </div>
        <div className="flex items-center gap-6 mt-4">
          <span className="text-2xl md:text-3xl font-bold text-orange-600 drop-shadow">
            {enTofa(product.price)} تومان
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
}
