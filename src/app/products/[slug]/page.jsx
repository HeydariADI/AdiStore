"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  BuildingStorefrontIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function enTofa(num) {
  if (typeof num !== "number") return num;
  const farsiDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return num.toString().replace(/\d/g, (d) => farsiDigits[d]);
}

export default function ProductDetail() {
  const { slug } = useParams(); // ✅ FIX: slug نه id

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/products/${slug}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          setProduct(null);
          return;
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <p className="text-center p-10 text-gray-600">
        در حال بارگذاری...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center p-10 text-red-500">
        محصول یافت نشد 😢
      </p>
    );
  }

  return (
    <div className="w-full bg-gray-50">
      <div className="mx-auto px-4 py-6 font-vazirmatn max-w-full 2xl:max-w-[1700px]">

        {/* موبایل */}
        <div className="lg:hidden bg-white rounded-xl shadow p-4 flex flex-col gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-contain rounded-lg"
          />

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

        {/* دسکتاپ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">

          {/* تصویر */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white rounded-xl shadow p-6 flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-[420px] object-contain"
              />
            </div>
          </div>

          {/* ویژگی‌ها */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {product.features && (
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="font-bold mb-3">ویژگی‌ها</h2>

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

          {/* خرید */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-xl shadow p-5 sticky top-24 flex flex-col gap-6">

              <div>
                <p className="text-lg font-semibold">فروشنده</p>
                <p className="flex items-center gap-2 mt-2 font-bold">
                  <BuildingStorefrontIcon className="w-5 h-5" />
                  {product.seller || "ادی استور"}
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
                className="text-blue-600 flex items-center gap-2 hover:underline"
              >
                <TruckIcon className="w-5 h-5" />
                روش ارسال
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <h2 className="font-bold mb-4">روش‌های ارسال</h2>

            <ul className="space-y-2 text-gray-700">
              <li>🚚 پست: 2 تا 3 روز</li>
              <li>🏍 پیک: 1 روز</li>
              <li>📦 تحویل حضوری</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}