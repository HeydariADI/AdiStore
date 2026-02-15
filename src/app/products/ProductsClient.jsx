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

  // Fetch safe با URL کامل
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
        );

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        console.error("Fetch products error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter + Sort + Randomize
  const filteredProducts = useMemo(() => {
    let list =
      activeCategory === "all"
        ? [...products]
        : products.filter((p) => p.category === activeCategory);

    // Sort
    if (sortType === "cheap") list.sort((a, b) => a.price - b.price);
    if (sortType === "expensive") list.sort((a, b) => b.price - a.price);
    if (sortType === "popular")
      list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    if (sortType === "newest")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Randomize if default + all
    if (activeCategory === "all" && sortType === "default") {
      list = list.sort(() => Math.random() - 0.5);
    }

    return list;
  }, [products, activeCategory, sortType]);

  // Category change
  const handleCategoryChange = (cat) => {
    setSortType("default");
    router.push(cat === "all" ? "/products" : `/products?category=${cat}`);
  };

  // // Scroll to top on change
  // useEffect(() => {
  //   window.scrollTo({ top: 0 });
  // }, [sortType, activeCategory]);

  return (
    <section className="w-full min-h-screen bg-gray-50">
      <div className="max-w-full 2xl:max-w-[1700px] mx-auto px-4 py-8">
        {/* دسته‌بندی و مرتب‌سازی */}
        <div className="flex flex-wrap justify-between items-center gap-6 mb-10">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-4 py-1.5 text-sm sm:px-5 sm:py-2 sm:text-base lg:px-6 lg:py-2 lg:text-lg rounded-full border transition ${
                  activeCategory === cat.value
                    ? "bg-orange-500 text-white"
                    : "bg-white hover:bg-orange-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm lg:text-base">
            <span className="text-gray-500">مرتب‌سازی:</span>
            {["cheap", "expensive", "popular", "newest"].map((type) => (
              <button
                key={type}
                onClick={() => setSortType(type)}
                className={`transition ${
                  sortType === type
                    ? "text-orange-600 font-bold"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                {
                  {
                    cheap: "ارزان‌ترین",
                    expensive: "گران‌ترین",
                    popular: "پرفروش‌ترین",
                    newest: "جدیدترین",
                  }[type]
                }
              </button>
            ))}
          </div>
        </div>

        {/* محصولات */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filteredProducts.length ? (
              filteredProducts.map((product) => {
                const id = product.slug || product._id || product.id;
                return (
                  <div
                    key={id}
                    className="bg-white rounded-2xl shadow hover:shadow-xl transition p-5 flex flex-col"
                  >
                    <Link
                      href={`/products/${id}`}
                      className="flex-1 flex flex-col items-center"
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

                      <h2 className="mt-3 text-center font-semibold line-clamp-2">
                        {product.title}
                      </h2>

                      {product.description && (
                        <p className="mt-1 text-gray-500 text-sm text-center line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </Link>

                    <div className="mt-3 flex justify-between items-center">
                      <p className="text-orange-600 font-bold">
                        {Number(product.price || 0).toLocaleString()} تومان
                      </p>
                    </div>
                  </div>
                );
              })
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
