"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

function SpecialOffer() {
  const router = useRouter();
  const { addToCart } = useCart();

  const specialProduct = {
    id: 1,
    name: "لپ‌تاپ Asus ZenBook",
    price: 36800000, // قیمت تخفیف خورده
    originalPrice: 45800000, // قیمت اصلی
    image: "/images/laptop/laptop1.jpg",
  };

  // ✅ تابع فرمت قیمت با locale ثابت
  const formatPrice = (price) =>
    new Intl.NumberFormat("fa-IR", { useGrouping: true }).format(price);

  const handleBuyClick = () => {
    addToCart(specialProduct);
    router.push("/cart");
  };

  return (
    <section className="mt-20 py-16 font-vazirmatn">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* تصویر محصول */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={specialProduct.image}
            width={400}
            height={400}
            alt={specialProduct.name}
            className="rounded-3xl shadow-xl object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* توضیحات */}
        <div className="w-full md:w-1/2 text-center md:text-right space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            پیشنهاد ویژه امروز
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            لپ‌تاپ قدرتمند {specialProduct.name} با تخفیف استثنایی ۲۰٪ برای مدت
            محدود!
          </p>

          <div className="flex flex-col md:flex-row md:items-center md:gap-4 justify-center md:justify-start">
            <p className="text-orange-600 text-2xl md:text-3xl font-bold">
              {formatPrice(specialProduct.price)} تومان
            </p>
            <p className="line-through text-gray-400 text-lg md:text-xl">
              {formatPrice(specialProduct.originalPrice)} تومان
            </p>
          </div>

          {/* دکمه خرید ویژه */}
          <button
            onClick={handleBuyClick}
            className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            خرید ویژه
          </button>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffer;
