import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "../../lib/products"; // اینو خودمون می‌سازیم
import { cookies } from "next/headers";
import { useCart } from "../../context/CartContext";

export default async function ProductsPage() {
  const allProducts = await getAllProducts();

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  let filteredProducts = shuffleArray(allProducts);

  // دسته‌بندی
  const categories = ["همه", "لپتاپ", "موبایل", "هدفون", "گجت‌ها"];
  const categoryMap = {
    همه: "all",
    لپتاپ: "laptop",
    موبایل: "mobile",
    هدفون: "headphone",
    گجت‌ها: "game",
  };

  // مرتب سازی (فعلاً ثابت روی none)
  const priceSort = "none";

  if (priceSort === "asc") filteredProducts.sort((a, b) => a.price - b.price);
  else if (priceSort === "desc")
    filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <section className="w-full min-h-screen px-6 py-10 bg-gray-50">
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
              className={`w-48 px-6 py-3 text-xl rounded-full border transition-all duration-300 backdrop-blur-md bg-white/60 text-gray-700 hover:bg-orange-100`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
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
