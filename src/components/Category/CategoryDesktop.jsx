import Image from "next/image";
import Link from "next/link";
import React from "react";

function Category() {
  const categories = [
    { name: "لپ‌تاپ", category: "laptop", image: "/images/laptop/2.jpg" },
    { name: "موبایل", category: "mobile", image: "/images/mobile/mobile2.jpg" },
    {
      name: "هدفون",
      category: "headphone",
      image: "/images/headphone/headphone3.jpg",
    },
    { name: "گجت‌ها", category: "game", image: "/images/game/1.jpg" },
  ];

  return (
    <section className="py-16 relative z-20 -mt-44 shadow-2xl shadow-orange-50 font-vazirmatn">
      <div className="w-11/12 md:w-4/5 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.category}
              href={`/products/category/${cat.category}`}
              className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 bg-white"
            >
              <div className="relative w-full h-52 md:h-64">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition-all duration-500"></div>
              </div>

              {/* عنوان دسته‌بندی */}
              <div className="absolute bottom-5 w-full text-center">
                <p className="text-white text-xl md:text-2xl font-bold drop-shadow-md group-hover:text-orange-300 transition-all duration-300">
                  {cat.name}
                </p>
              </div>

              <div className="absolute inset-0 border-4 border-transparent group-hover:border-orange-400 rounded-3xl transition-all duration-500"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Category;
