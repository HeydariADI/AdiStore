"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductsClient() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = searchParams.get("category") || "all";
  const [sortType, setSortType] = useState("default");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { label: "همه", value: "all" },
    { label: "لپتاپ", value: "laptop" },
    { label: "موبایل", value: "mobile" },
    { label: "هدفون", value: "headphone" },
    { label: "گجت‌ها", value: "game" },
  ];

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filter + Sort
  const filteredProducts = useMemo(() => {
    let list =
      activeCategory === "all"
        ? [...products]
        : products.filter((p) => p.category === activeCategory);

    switch (sortType) {
      case "cheap":
        list.sort((a, b) => a.price - b.price);
        break;

      case "expensive":
        list.sort((a, b) => b.price - a.price);
        break;

      case "popular":
        list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;

      case "newest":
        list.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      default:
        // random فقط برای حالت default
        if (activeCategory === "all") {
          list = list.sort(() => Math.random() - 0.5);
        }
    }

    return list;
  }, [products, activeCategory, sortType]);

  // ✅ change category
  const handleCategoryChange = (cat) => {
    setSortType("default");
    router.push(cat === "all" ? "/products" : `/products?category=${cat}`);
  };

  return (
    <section className="w-full min-h-screen bg-gray-50">
      <div className="max-w-full 2xl:max-w-[1700px] mx-auto px-4 py-8">

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-full border transition ${
                activeCategory === cat.value
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-orange-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-4 mb-8 text-sm">
          {["cheap", "expensive", "popular", "newest"].map((type) => (
            <button
              key={type}
              onClick={() => setSortType(type)}
              className={`${
                sortType === type
                  ? "text-orange-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              {{
                cheap: "ارزان‌ترین",
                expensive: "گران‌ترین",
                popular: "پرفروش‌ترین",
                newest: "جدیدترین",
              }[type]}
            </button>
          ))}
        </div>

        {/* Products */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredProducts.length ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
                >
                  {/* ✅ ONLY SLUG */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="block"
                  >
                    <div className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.png"}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    <h2 className="mt-3 font-semibold text-center line-clamp-2">
                      {product.title}
                    </h2>

                    {product.description && (
                      <p className="text-sm text-gray-500 text-center line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    )}
                  </Link>

                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-orange-600 font-bold">
                      {Number(product.price || 0).toLocaleString()} تومان
                    </p>

                    <button
                      onClick={() => addToCart(product)}
                      className="text-sm bg-orange-500 text-white px-3 py-1 rounded-lg"
                    >
                      افزودن
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                محصولی یافت نشد
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}