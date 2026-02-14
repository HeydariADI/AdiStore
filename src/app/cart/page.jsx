"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

const useAuth = () => {
  const isLoggedIn = false;
  return { isLoggedIn };
};

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [selectedColors, setSelectedColors] = useState(
    cart.reduce((acc, item) => {
      acc[item._id] = item.colors?.[0] || "";
      return acc;
    }, {}),
  );

  const handleColorChange = (id, color) => {
    setSelectedColors((prev) => ({ ...prev, [id]: color }));
  };

  const total = cart.reduce((sum, item) => {
    const variantMultiplier =
      item.variants?.find((v) => v.color === selectedColors[item._id])
        ?.priceMultiplier || 1;
    return sum + (item.price || 0) * (item.quantity || 1) * variantMultiplier;
  }, 0);

  const handleContinue = () => {
    if (isLoggedIn) router.push("/checkout");
    else router.push("/authentication/login");
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-3xl font-bold">سبد خرید شما خالی است</h1>
      </div>
    );
  }

  return (
    <div className="cartpage flex flex-col lg:flex-row p-5 mt-4 gap-6">
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">سبد خرید شما</h1>
          <span className="text-xl font-medium">{cart.length} کالا</span>
        </div>

        {cart.map((item) => (
          <div
            key={item._id}
            className="cartproduct flex flex-col gap-4 p-6 border border-gray-300 rounded-2xl shadow w-full"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-4 items-center">
              <div className="flex-1">
                <h1 className="text-2xl font-bold">
                  {item.name || item.title}
                </h1>
                <ul className="flex flex-col gap-2 mt-2 text-lg">
                  <li>🔯 6 ماه گارانتی شرکتی</li>
                  <li>✔ موجود در انبار</li>
                </ul>
              </div>

              <div className="w-72 h-72 flex justify-center items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-60 h-60 object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-4 p-4 border border-gray-100 shadow rounded-xl gap-4">
              {/* کنترل تعداد */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    updateQuantity(item._id, Math.max(item.quantity - 1, 1))
                  }
                  className="w-10 h-10 flex justify-center items-center rounded-lg border shadow-sm hover:bg-gray-100"
                >
                  ➖
                </button>
                <span className="text-lg font-bold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="w-10 h-10 flex justify-center items-center rounded-lg border shadow-sm hover:bg-gray-100"
                >
                  ➕
                </button>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="w-10 h-10 flex justify-center items-center rounded-lg border shadow-sm hover:bg-red-100 text-red-500"
                >
                  ❌
                </button>
              </div>

              {/* قیمت */}
              <p className="font-bold text-lg">
                {(
                  (item.price || 0) *
                  (item.quantity || 1) *
                  (item.variants?.find(
                    (v) => v.color === selectedColors[item._id],
                  )?.priceMultiplier || 1)
                ).toLocaleString()}{" "}
                تومان
              </p>

              {/* انتخاب رنگ با Tailwind Tooltip */}
              <div className="flex items-center gap-3">
                {item.colors?.map((color) => {
                  const colorHex =
                    {
                      سیاه: "#000",
                      سفید: "#fff",
                      خاکستری: "#888",
                      نقره‌ای: "#c0c0c0",
                      آبی: "#007bff",
                      نارنجی: "#f97316",
                      طلایی: "#FFD700",
                      قرمز: "#FF0000",
                      سبز: "#22c55e",
                    }[color] || color.toLowerCase();

                  const isSelected = selectedColors[item._id] === color;

                  return (
                    <button
                      key={color}
                      onClick={() => handleColorChange(item._id, color)}
                      style={{ backgroundColor: colorHex }}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition
          ${
            isSelected
              ? "border-orange-500 shadow-lg scale-110"
              : "border-gray-400" // همه رنگ‌ها به‌خصوص سفید مشخص باشند
          }`}
                    >
                      {isSelected && (
                        <span className="text-white font-bold text-xs select-none">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* صورتحساب */}
      <div className="w-full lg:w-1/3 p-6 mb-10">
        <h1 className="text-3xl font-bold mb-4">صورتحساب</h1>
        <div className="border border-gray-200 shadow w-full p-6 flex flex-col gap-6 text-lg">
          <div className="flex justify-between">
            <p>قیمت محصول</p>
            <p>{total.toLocaleString()} ریال</p>
          </div>

          <div className="flex justify-between">
            <p className="font-bold">جمع کل</p>
            <p>{total.toLocaleString()} ریال</p>
          </div>

          <button
            onClick={handleContinue}
            className="bg-orange-500 p-4 rounded-xl text-white text-xl font-medium w-full hover:bg-orange-600 transition"
          >
            ادامه خرید
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
