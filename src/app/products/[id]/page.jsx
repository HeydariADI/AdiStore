"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import {
  BuildingStorefrontIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function enTofa(num) {
  if (typeof num !== "number") return num;
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (d) => farsiDigits[d]);
}

export default function ProductDetail() {
  const { id } = useParams(); // ✅ همیشه درست

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${id}`, { cache: "no-store" });

        if (!res.ok) {
          setProduct(null);
          return;
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("خطا:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center p-10">در حال بارگذاری...</p>;
  if (!product) return <p className="text-center p-10">محصول یافت نشد 😢</p>;

  return (
    <div className="w-full bg-gray-50">
      <div className="mx-auto px-4 py-6 font-vazirmatn max-w-full 2xl:max-w-[1700px]">
        {/* موبایل: کارت بالا با تصویر + نام + قیمت + دکمه */}
        <div className="lg:hidden bg-white rounded-xl shadow p-4 flex flex-col gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-contain rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold">{product.title}</h1>
            <p className="text-xl font-bold text-orange-600">
              {enTofa(product.price)} تومان
            </p>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>

        {/* دسکتاپ و موبایل همزمان: grid اصلی */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* تصویر دسکتاپ */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white rounded-xl shadow p-6 flex justify-center items-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-[350px] lg:h-[420px] object-contain"
              />
            </div>
          </div>

          {/* اطلاعات و ویژگی‌ها */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* موبایل: ویژگی‌ها بالای fold */}
            {product.features && (
              <div className="lg:hidden bg-white rounded-xl shadow p-4 mt-4">
                <h2 className="font-bold mb-2">ویژگی‌ها</h2>
                <div className="grid grid-cols-2 gap-2 overflow-x-auto scrollbar-hide">
                  {Object.entries(product.features).map(([k, v]) => (
                    <div
                      key={k}
                      className="bg-gray-100 p-2 rounded-lg min-w-[100px] flex-shrink-0"
                    >
                      <p className="text-xs text-gray-500">{k}</p>
                      <p className="font-bold text-sm">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* دسکتاپ: ویژگی‌ها */}
            {product.features && (
              <div className="hidden lg:block">
                <h2 className="font-bold mt-4 mb-3">ویژگی‌ها</h2>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.features).map(([k, v]) => (
                    <div key={k} className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">{k}</p>
                      <p className="font-bold text-sm">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* بخش خرید دسکتاپ */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-10 sticky top-24">
              <div>
                <p className="text-xl font-semibold">فروشنده</p>
                <p className="font-bold flex items-center gap-2 mt-2">
                  <BuildingStorefrontIcon className="w-6 h-6 text-gray-500" />
                  {product.seller || "فروشگاه ادی استور"}
                </p>
              </div>

              <p className="text-2xl font-bold text-orange-600">
                {enTofa(product.price)} تومان
              </p>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl"
              >
                افزودن به سبد خرید
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="text-blue-600 font-semibold flex items-center gap-2 hover:underline"
              >
                <TruckIcon className="w-5 h-5" /> روش و هزینه ارسال
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* مودال ارسال */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
          <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-md p-10 relative animate-fadeIn">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <h2 className="text-lg font-bold mb-4">روش‌ها و هزینه ارسال</h2>
            <ul className="flex flex-col gap-3 text-gray-700">
              <li>🚚 پست پیشتاز: ۲۰,۰۰۰ تومان - ۲ تا ۳ روز کاری</li>
              <li>🏍️ پیک ویژه: ۳۰,۰۰۰ تومان - ۱ روز کاری (فقط شهر تهران)</li>
              <li>📦 تحویل فروشگاه: رایگان</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
