"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = searchParams.get("category") || "all";

  const [priceSort, setPriceSort] = useState("none");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { label: "همه", value: "all" },
    { label: "لپتاپ", value: "laptop" },
    { label: "موبایل", value: "mobile" },
    { label: "هدفون", value: "headphone" },
    { label: "گجت‌ها", value: "game" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // فیلتر و رندوم
  let filteredProducts =
    activeCategory === "all"
      ? [...products]
      : products.filter((p) => p.category === activeCategory);

  if (activeCategory === "all") {
    // شفل آرایه (Fisher-Yates)
    for (let i = filteredProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredProducts[i], filteredProducts[j]] = [
        filteredProducts[j],
        filteredProducts[i],
      ];
    }
  }

  // مرتب سازی قیمت
  if (priceSort === "asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (priceSort === "desc") filteredProducts.sort((a, b) => b.price - a.price);

  const handleCategoryChange = (cat) => {
    if (cat === "all") router.push("/products");
    else router.push(`/products?category=${cat}`);
  };

  return (
    <section className="w-full min-h-screen bg-gray-50">
      <div className="max-w-full 2xl:max-w-[1700px] mx-auto px-4 py-8">
        {/* نوار دسته بندی + مرتب سازی */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`
                  px-4 py-1.5 text-sm
                  sm:px-5 sm:py-2 sm:text-base
                  lg:px-6 lg:py-2 lg:text-lg
                  rounded-full border transition
                  ${
                    activeCategory === cat.value
                      ? "bg-orange-500 text-white"
                      : "bg-white hover:bg-orange-100"
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="
                appearance-none
                px-4 py-1.5 text-sm
                sm:px-5 sm:py-2 sm:text-base
                lg:px-6 lg:py-2 lg:text-lg
                rounded-full border
                bg-white
                pr-10
                max-w-[160px] sm:max-w-none
                focus:outline-none focus:ring-2 focus:ring-orange-400
                cursor-pointer
              "
            >
              <option value="none">مرتب‌سازی</option>
              <option value="asc">ارزان‌ترین</option>
              <option value="desc">گران‌ترین</option>
            </select>

            <span
              className="
                pointer-events-none
                absolute left-3 top-1/2 -translate-y-1/2
                text-gray-400 text-xs sm:text-base
              "
            >
              ⇅
            </span>
          </div>
        </div>

        {/* محصولات */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div
            className="
              grid grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-8
            "
          >
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
                          src={product.image}
                          alt={product.title}
                          width={300}
                          height={300}
                          className="object-contain w-full h-full"
                          loading="lazy"
                        />
                      </div>

                      <h2 className="mt-3 text-center font-semibold line-clamp-2">
                        {product.title}
                      </h2>

                      {/* توضیح کوتاه محصول */}
                      {product.description && (
                        <p className="mt-1 text-gray-500 text-sm text-center line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </Link>

                    <p className="text-orange-600 font-bold mt-3">
                      {product.price.toLocaleString()} تومان
                    </p>

                    {/* <button
    onClick={() => addToCart(product)}
    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition"
  >
    افزودن به سبد خرید
  </button> */}
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
