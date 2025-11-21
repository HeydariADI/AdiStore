"use client";

import React from "react";
import { useCart } from "../context/CartContext";

function enTofa(num) {
  if (typeof num !== "number") return num;
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (d) => farsiDigits[d]);
}

export default function CartAddModal({ show, product, onClose }) {
  const { cart, updateQuantity, removeFromCart, setShowAddModal } = useCart();

  if (!show || !product) return null;

  const cartItem = cart.find((i) => i._id === product._id) || { quantity: 1 };
  const qty = cartItem.quantity || 1;
  const unitPrice = Number(product.price) || 0;
  const total = unitPrice * qty;

  const dec = () => {
    const next = qty - 1;
    if (next <= 0) {
      removeFromCart(product._id);
      setShowAddModal(false);
      return;
    }
    updateQuantity(product._id, next);
  };

  const inc = () => {
    updateQuantity(product._id, qty + 1);
  };

  const handleRemove = () => {
    removeFromCart(product._id);
    setShowAddModal(false);
  };

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-6 w-full max-w-md flex flex-col items-center gap-4 animate-fadeIn">
        <div className="flex items-center gap-4 w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-20 h-20 object-contain rounded-md"
          />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
            <p className="text-sm text-gray-500">
              قیمت واحد:{" "}
              <span className="text-orange-600 font-semibold">
                {enTofa(unitPrice)} تومان
              </span>
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={dec} className="px-3 py-1 bg-gray-100 rounded">
              −
            </button>
            <div className="px-4 py-1 border rounded text-center w-16">
              {qty}
            </div>
            <button onClick={inc} className="px-3 py-1 bg-gray-100 rounded">
              +
            </button>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">جمع</div>
            <div className="text-lg font-bold text-orange-600">
              {enTofa(total)} تومان
            </div>
          </div>
        </div>

        <div className="w-full flex gap-3">
          <button
            onClick={handleRemove}
            className="flex-1 bg-red-100 text-red-600 px-4 py-2 rounded-xl"
          >
            حذف از سبد
          </button>
          <button
            onClick={() => setShowAddModal(false)}
            className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-xl"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
