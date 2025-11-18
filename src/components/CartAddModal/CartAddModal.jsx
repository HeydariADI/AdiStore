import React from "react";

export default function CartAddModal({ show, product, onClose }) {
  if (!show || !product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8 w-full max-w-sm flex flex-col items-center animate-fadeIn">
        <img
          src={product.image}
          alt={product.title}
          className="w-24 h-24 object-contain rounded-xl mb-4"
        />
        <h2 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h2>
        <p className="text-orange-600 font-bold mb-4">به سبد خرید اضافه شد!</p>
        <button
          onClick={onClose}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-vazir font-bold shadow transition-all"
        >
          بستن
        </button>
      </div>
    </div>
  );
}
