"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [priceSort, setPriceSort] = useState("none");
  const { addToCart } = useCart();

  const categories = ["همه", "لپتاپ", "موبایل", "هدفون", "گجت‌ها"];
  const categoryMap = {
    همه: "all",
    لپتاپ: "laptop",
    موبایل: "mobile",
    هدفون: "headphone",
    گجت‌ها: "game",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const res = await fetch(`${baseUrl}/api/products`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  let filteredProducts = shuffleArray(allProducts);

  if (priceSort === "asc") filteredProducts.sort((a, b) => a.price - b.price);
  else if (priceSort === "desc")
    filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <section className="w-full min-h-screen px-6 py-10 bg-gray-50">
      {/* <h1 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
        محصولات
      </h1> */}

      {/* دسته‌بندی و مرتب‌سازی */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={
                cat === "همه"
                  ? "/products"
                  : `/products/category/${categoryMap[cat]}`
              }
              className={`w-48 px-6 py-3 text-xl rounded-full border transition-all duration-300 backdrop-blur-md
      ${
        false
          ? "bg-orange-500 text-white shadow-md scale-105"
          : "bg-white/60 text-gray-700 hover:bg-orange-100"
      }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          <select
            className="border rounded-2xl px-4 py-4"
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="none">مرتب‌سازی قیمت ندارد</option>
            <option value="asc">ارزان‌ترین → گران‌ترین</option>
            <option value="desc">گران‌ترین → ارزان‌ترین</option>
          </select>
        </div>
      </div>

      {/* گرید محصولات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer overflow-hidden flex flex-col items-center p-6"
            >
              {/* لینک به صفحه جزئیات محصول */}
              <Link
                href={`/products/${product._id}`}
                className="w-full flex flex-col items-center"
              >
                <div className="w-56 h-56 mb-4 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="object-contain rounded-xl"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  {product.title}
                </h2>
                <p className="text-orange-600 font-bold mt-3 text-lg">
                  {product.price.toLocaleString()} تومان
                </p>
              </Link>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-2/3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-2xl transition-colors duration-300"
              >
                اضافه به سبد خرید
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            محصولی یافت نشد 😢
          </p>
        )}
      </div>
    </section>
  );
}
