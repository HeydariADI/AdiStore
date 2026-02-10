"use client";

import Link from "next/link";
import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";

export default function CartPreviewModal() {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
      {/* Header */}
      <div className="bg-orange-500 text-white p-4 rounded-t-lg">
        <div className="flex items-center gap-2">
          <ShoppingCartIcon className="h-5 w-5" />
          <h3 className="font-bold">سبد خرید</h3>
        </div>
        <p className="text-xs mt-1">{cart.length} محصول</p>
      </div>

      {cart.length === 0 ? (
        <div className="p-6 text-center text-gray-500">سبد خرید خالی است</div>
      ) : (
        <>
          {/* Items */}
          <div className="max-h-72 overflow-y-auto divide-y">
            {cart.map((item) => (
              <div key={item._id} className="p-3 flex gap-3">
                <img
                  src={item.image}
                  className="w-14 h-14 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    تعداد: {item.quantity}
                  </p>
                  <p className="text-sm text-orange-600 font-bold">
                    {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex justify-between mb-3">
              <span>مجموع:</span>
              <span className="font-bold text-orange-600">
                {totalPrice.toLocaleString("fa-IR")} تومان
              </span>
            </div>

            <Link
              href="/cart"
              className="block bg-orange-500 text-white text-center py-2 rounded mb-2"
            >
              مشاهده سبد
            </Link>

            <Link
              href="/checkout"
              className="block bg-green-500 text-white text-center py-2 rounded"
            >
              پرداخت
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
