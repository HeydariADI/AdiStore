//

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [priceSort, setPriceSort] = useState("none");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          console.log("✅ Products loaded:", data.length);
          setProducts(data);
        } else {
          console.error("❌ Failed to fetch products");
          setProducts([]);
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["همه", "لپتاپ", "موبایل", "هدفون", "گجت‌ها"];
  const categoryMap = {
    همه: "all",
    لپتاپ: "laptop",
    موبایل: "mobile",
    هدفون: "headphone",
    گجت‌ها: "game",
  };

  let filteredProducts = [...products];

  if (priceSort === "asc") filteredProducts.sort((a, b) => a.price - b.price);
  else if (priceSort === "desc")
    filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <section className="w-full min-h-screen px-6 py-10 bg-gray-50">
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
                bg-white/60 text-gray-700 hover:bg-orange-100`}
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

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-2xl text-orange-500">درحال بارگذاری...</div>
        </div>
      )}

      {/* گرید محصولات */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={product._id || index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer overflow-hidden flex flex-col items-center p-6"
              >
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
      )}
    </section>
  );
}
