// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useCart } from "../../context/CartContext";
// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function ProductsPage() {
//   const { addToCart } = useCart();
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const activeCategory = searchParams.get("category") || "all";

//   const [sortType, setSortType] = useState("default");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const categories = [
//     { label: "همه", value: "all" },
//     { label: "لپتاپ", value: "laptop" },
//     { label: "موبایل", value: "mobile" },
//     { label: "هدفون", value: "headphone" },
//     { label: "گجت‌ها", value: "game" },
//   ];

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("/api/products", { cache: "no-store" });

//         const data = await res.json();
//         setProducts(Array.isArray(data) ? data : data.products || []);
//       } catch {
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // filter-products

//   let filteredProducts =
//     activeCategory === "all"
//       ? [...products]
//       : products.filter((p) => p.category === activeCategory);

//   if (activeCategory === "all" && sortType === "default") {
//     for (let i = filteredProducts.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [filteredProducts[i], filteredProducts[j]] = [
//         filteredProducts[j],
//         filteredProducts[i],
//       ];
//     }
//   }

//   // sort

//   if (sortType === "cheap") filteredProducts.sort((a, b) => a.price - b.price);
//   if (sortType === "expensive")
//     filteredProducts.sort((a, b) => b.price - a.price);
//   if (sortType === "popular")
//     filteredProducts.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
//   if (sortType === "newest")
//     filteredProducts.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//     );

//   const handleCategoryChange = (cat) => {
//     setSortType("default");
//     if (cat === "all") router.push("/products");
//     else router.push(`/products?category=${cat}`);
//   };

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [sortType, activeCategory]);

//   return (
//     <section className="w-full min-h-screen bg-gray-50">
//       <div className="max-w-full 2xl:max-w-[1700px] mx-auto px-4 py-8">
//         {/* نوار بالا */}
//         <div className="flex flex-wrap justify-between items-center gap-6 mb-10">
//           {/* دسته بندی */}
//           <div className="flex flex-wrap gap-3">
//             {categories.map((cat) => (
//               <button
//                 key={cat.value}
//                 onClick={() => handleCategoryChange(cat.value)}
//                 className={`px-4 py-1.5 text-sm sm:px-5 sm:py-2 sm:text-base lg:px-6 lg:py-2 lg:text-lg rounded-full border transition ${
//                   activeCategory === cat.value
//                     ? "bg-orange-500 text-white"
//                     : "bg-white hover:bg-orange-100"
//                 }`}
//               >
//                 {cat.label}
//               </button>
//             ))}
//           </div>

//           {/* مرتب سازی */}
//           <div className="flex items-center gap-6 text-sm lg:text-base">
//             <span className="text-gray-500">مرتب‌سازی:</span>

//             <button
//               onClick={() => setSortType("cheap")}
//               className={`transition ${
//                 sortType === "cheap"
//                   ? "text-orange-600 font-bold"
//                   : "text-gray-600 hover:text-orange-500"
//               }`}
//             >
//               ارزان‌ترین
//             </button>

//             <button
//               onClick={() => setSortType("expensive")}
//               className={`transition ${
//                 sortType === "expensive"
//                   ? "text-orange-600 font-bold"
//                   : "text-gray-600 hover:text-orange-500"
//               }`}
//             >
//               گران‌ترین
//             </button>

//             <button
//               onClick={() => setSortType("popular")}
//               className={`transition ${
//                 sortType === "popular"
//                   ? "text-orange-600 font-bold"
//                   : "text-gray-600 hover:text-orange-500"
//               }`}
//             >
//               پرفروش‌ترین
//             </button>

//             <button
//               onClick={() => setSortType("newest")}
//               className={`transition ${
//                 sortType === "newest"
//                   ? "text-orange-600 font-bold"
//                   : "text-gray-600 hover:text-orange-500"
//               }`}
//             >
//               جدیدترین
//             </button>
//           </div>
//         </div>

//         {/* محصولات */}
//         {loading ? (
//           <div className="flex justify-center items-center min-h-[300px]">
//             <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
//             {filteredProducts.length ? (
//               filteredProducts.map((product) => {
//                 const id = product.slug || product._id || product.id;
//                 return (
//                   <div
//                     key={id}
//                     className="bg-white rounded-2xl shadow hover:shadow-xl transition p-5 flex flex-col"
//                   >
//                     <Link
//                       href={`/products/${id}`}
//                       className="flex-1 flex flex-col items-center"
//                     >
//                       <div className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
//                         <Image
//                           src={product.image}
//                           alt={product.title}
//                           width={300}
//                           height={300}
//                           className="object-contain w-full h-full"
//                           loading="lazy"
//                         />
//                       </div>

//                       <h2 className="mt-3 text-center font-semibold line-clamp-2">
//                         {product.title}
//                       </h2>

//                       {product.description && (
//                         <p className="mt-1 text-gray-500 text-sm text-center line-clamp-2">
//                           {product.description}
//                         </p>
//                       )}
//                     </Link>

//                     <div className="mt-3 flex justify-between items-center">
//                       <p className="text-orange-600 font-bold">
//                         {Number(product.price || 0).toLocaleString()} تومان
//                       </p>

//                       {/* {product.reviews && (
//                         <span className="text-xs text-gray-500">
//                           {product.reviews} فروش
//                         </span>
//                       )} */}
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="col-span-full text-center text-gray-500">
//                 محصولی یافت نشد
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

//

import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
