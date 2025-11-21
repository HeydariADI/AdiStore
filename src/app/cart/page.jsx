"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const router = useRouter();

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto p-12 text-center">
        <h1 className="text-3xl font-bold mb-6">سبد خرید</h1>
        <p className="text-gray-600 text-lg">سبد خرید شما خالی است.</p>
      </div>
    );
  }

  const total = cart.reduce(
    (s, item) => s + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="container mx-auto p-12">
      <h1 className="text-3xl font-bold mb-8">سبد خرید</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id || item.title}
            className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transition hover:shadow-xl"
          >
            <div className="flex items-center gap-6 w-full sm:w-auto">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name || item.title}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                />
              )}
              <div className="flex flex-col items-start">
                <p className="font-vazir font-bold text-lg text-gray-900 mb-2">
                  {item.name || item.title}
                </p>

                {/* کنترل تعداد */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        Math.max((item.quantity || 1) - 1, 1)
                      )
                    }
                    className="bg-gray-200 px-4 py-2 rounded-lg text-lg font-bold hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="px-4 text-lg font-semibold">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item._id, (item.quantity || 1) + 1)
                    }
                    className="bg-gray-200 px-4 py-2 rounded-lg text-lg font-bold hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-0">
              <p className="font-bold text-gray-700 text-lg">
                {((item.price || 0) * (item.quantity || 1)).toLocaleString()}{" "}
                تومان
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-200 text-red-700 px-4 py-2 rounded-lg font-bold hover:bg-red-300 transition"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-6 rounded-2xl border border-gray-200">
        <p className="text-2xl font-bold text-gray-900 font-vazir mb-4 sm:mb-0">
          جمع کل: {total.toLocaleString()} تومان
        </p>
        <div className="flex gap-4">
          <button
            className="bg-orange-200 text-gray-800 px-6 py-3 rounded-lg font-bold font-vazir transition hover:bg-orange-300"
            onClick={() => clearCart()}
          >
            پاک کردن سبد
          </button>
          <button
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold font-vazir transition hover:bg-orange-700"
            onClick={() => router.push("/checkout")}
          >
            ادامه خرید
          </button>
        </div>
      </div>
    </div>
  );
}
