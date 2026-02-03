"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

// شبیه‌سازی Auth
const useAuth = () => {
  const isLoggedIn = false;
  return { isLoggedIn };
};

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );

  const handleContinue = () => {
    if (isLoggedIn) {
      router.push("/checkout");
    } else {
      router.push("authentication/login");
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-3xl font-bold">سبد خرید شما خالی است</h1>
      </div>
    );
  }

  return (
    <div className="cartpage flex flex-col lg:flex-row p-5 mt-4 justify-between items-start gap-6">
      <div className="w-full lg:w-2/3 p-4 m-1 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-4 ">
            <h1 className="text-3xl font-bold">سبد خرید شما</h1>
            <span className="text-xl font-medium">{cart.length} عدد کالا</span>
          </div>
        </div>

        {cart.map((item) => (
          <div
            key={item._id}
            className="cartproduct flex flex-col justify-center items-center mt-5 p-10 border border-gray-300 rounded-2xl shadow w-full"
          >
            <div className="flex justify-between items-center w-full flex-col lg:flex-row">
              <div className="cartproduct_info flex-1">
                <h1 className="text-2xl font-bold p-4">
                  {item.name || item.title}
                </h1>
                <ul className="flex flex-col p-5 text-lg gap-5">
                  <li>🔯 6 ماه گارانتی شرکتی</li>
                  <li>✔ موجود در انبار </li>
                </ul>
              </div>

              <div className="cartproduct_image w-80 h-80 mt-5 p-4 flex justify-center items-center">
                <img src={item.image} alt={item.name} className="w-60 h-60" />
              </div>
            </div>

            <div className="flex justify-between items-center w-full m-4 p-4 border border-gray-100 shadow rounded-xl flex-col lg:flex-row gap-4">
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

                {/* حذف کالا با Heroicons */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="w-10 h-10 flex justify-center items-center rounded-lg border shadow-sm hover:bg-red-100 text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* قیمت */}
              <p className="font-bold text-lg">
                {((item.price || 0) * item.quantity).toLocaleString()} تومان
              </p>

              {/* رنگ */}
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <span>مشکی</span>
                <span className="w-5 h-5 bg-black rounded-sm border"></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* صورتحساب */}
      <div className="w-full lg:w-1/3 p-10 mb-10">
        <h1 className="text-3xl font-bold m-10">صورتحساب</h1>

        <div className="border border-gray-200 shadow w-full p-10 flex flex-col gap-10 text-xl">
          <div className="flex justify-between items-center">
            <p>قیمت محصول</p>
            <p>{total.toLocaleString()} ریال</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-bold">جمع کل</p>
            <p>{total.toLocaleString()} ریال</p>
          </div>

          <button
            onClick={handleContinue}
            className="bg-orange-500 p-6 rounded-xl text-white text-2xl font-medi w-full hover:bg-orange-600 transition"
          >
            ادامه خرید
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
