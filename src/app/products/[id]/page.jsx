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
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        console.log(`🔍 Fetching from: ${baseUrl}/api/products/${id}`);
        
        const res = await fetch(`${baseUrl}/api/products/${id}`);
        console.log(`📊 Response status: ${res.status}`);
        
        if (res.ok) {
          const data = await res.json();
          console.log(`✅ محصول دریافت شد:`, data);
          setProduct(data);
        } else {
          const errorText = await res.text();
          console.error(`❌ Failed to fetch product - Status: ${res.status}`);
          console.error(`❌ Response: ${errorText}`);
        }
      } catch (error) {
        console.error("❌ Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center p-10">در حال بارگذاری...</p>;
  if (!product) return <p className="text-center p-10">محصول یافت نشد 😢</p>;

  return (
    <div className="container mx-auto py-10 flex flex-col lg:flex-row gap-10 font-vazir">
      {/* سمت راست: تصویر و جزئیات محصول */}
      <div className="flex-1 flex flex-col gap-6">
        {/* تصویر محصول */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 w-full flex items-center justify-center group">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-xl w-full object-contain h-96 transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* عنوان و دسته‌بندی */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            {product.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>دسته‌بندی:</span>
            <Link
              href={`/products/category/${product.category}`}
              className="text-blue-600 underline"
            >
              {product.category}
            </Link>
          </div>
          {product.rating && (
            <div className="flex items-center gap-2 text-yellow-500 text-sm">
              <span>⭐ {product.rating}</span>
              <span>({product.reviewsCount || 0} دیدگاه)</span>
            </div>
          )}
        </div>

        {/* ویژگی‌ها */}
        <div className="w-full max-w-2xl mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">ویژگی‌ها</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.features ? (
              Object.entries(product.features).map(([key, value]) => (
                <div key={key} className="bg-gray-100 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">{key}</p>
                  <p className="font-bold text-gray-800">{value}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                ویژگی‌ای برای این محصول موجود نیست
              </p>
            )}
          </div>
        </div>
      </div>

      {/* سمت چپ: فروشنده، قیمت و افزودن به سبد */}
      <div className="flex-1 flex flex-col gap-6">
        {/* فروشنده */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-1">
          <p className="text-gray-700 font-medium">فروشنده</p>
          <p className="text-blue-600 font-bold">
            {product.seller || "فروشنده ناشناس"}
          </p>
          {product.sellerRating && (
            <p className="text-green-600 text-sm">
              {product.sellerRating} عملکرد عالی
            </p>
          )}
        </div>

        {/* قیمت و افزودن به سبد */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
          <span className="text-2xl md:text-3xl font-bold text-orange-600">
            {enTofa(product.price)} تومان
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow transition-all"
          >
            افزودن به سبد خرید
          </button>
        </div>

        {/* بیمه (اختیاری) */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span>بیمه تجهیزات دیجیتال - بیمه سامان</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import { useCart } from "../../../context/CartContext";
// import { useEffect, useState } from "react";
// import { use } from "react";
// import { products } from "../../db/products";

// function enTofa(num) {
//   if (typeof num !== "number") return num;
//   const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
//   return num.toString().replace(/\d/g, (d) => farsiDigits[d]);
// }

// export default function ProductDetail({ params: paramsPromise }) {
//   const params = use(paramsPromise);
//   const { id } = params;
//   const [product, setProduct] = useState(null);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const found = products.find((p) => p._id === id);
//       setProduct(found || null);
//     };
//     fetchProduct();
//   }, [id]);

//   if (!product) return <p className="text-center p-10">در حال بارگذاری...</p>;

//   return (
//     <div className="container mx-auto py-10 flex flex-col lg:flex-row gap-10 font-vazir">
//       {/* سمت راست: تصویر و جزئیات محصول */}
//       <div className="flex-1 flex flex-col gap-6">
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 w-full flex items-center justify-center group">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="rounded-xl w-full object-contain h-96 transition-transform duration-300 group-hover:scale-110"
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
//             {product.title}
//           </h1>
//           <div className="flex items-center gap-2 text-gray-500 text-sm">
//             <span>دسته‌بندی:</span>
//             <Link
//               href={`/products/category/${product.category}`}
//               className="text-blue-600 underline"
//             >
//               {product.category}
//             </Link>
//           </div>
//           {product.rating && (
//             <div className="flex items-center gap-2 text-yellow-500 text-sm">
//               <span>⭐ {product.rating}</span>
//               <span>({product.reviewsCount || 0} دیدگاه)</span>
//             </div>
//           )}
//         </div>
//         <div className="w-full max-w-2xl mt-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">ویژگی‌ها</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {product.features ? (
//               Object.entries(product.features).map(([key, value]) => (
//                 <div key={key} className="bg-gray-100 rounded-xl p-4">
//                   <p className="text-sm text-gray-500 mb-1">{key}</p>
//                   <p className="font-bold text-gray-800">{value}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">
//                 ویژگی‌ای برای این محصول موجود نیست
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* سمت چپ: فروشنده، قیمت و افزودن به سبد */}
//       <div className="flex-1 flex flex-col gap-6">
//         <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-1">
//           <p className="text-gray-700 font-medium">فروشنده</p>
//           <p className="text-blue-600 font-bold">
//             {product.seller || "فروشنده ناشناس"}
//           </p>
//           {product.sellerRating && (
//             <p className="text-green-600 text-sm">
//               {product.sellerRating} عملکرد عالی
//             </p>
//           )}
//         </div>
//         <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
//           <span className="text-2xl md:text-3xl font-bold text-orange-600">
//             {enTofa(product.price)} تومان
//           </span>
//           <button
//             onClick={() => addToCart(product)}
//             className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow transition-all"
//           >
//             افزودن به سبد خرید
//           </button>
//         </div>
//         <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2">
//           <label className="flex items-center gap-2">
//             <input type="checkbox" />
//             <span>بیمه تجهیزات دیجیتال - بیمه سامان</span>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }
