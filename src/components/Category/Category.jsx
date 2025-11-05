import Image from "next/image";
import Link from "next/link";
import React from "react";

function Category() {
  const categories = [
    { name: "لپ‌تاپ", slug: "laptop", image: "/images/laptop/2.jpg" },
    { name: "موبایل", slug: "mobile", image: "/images/mobile/mobile2.jpg" },
    {
      name: "هدفون",
      slug: "headphone",
      image: "/images/headphone/headphone2.jpg",
    },
    { name: "گجت‌ها", slug: "gadget", image: "/images/game/1.jpg" },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white font-vazirmatn">
      <div className="w-11/12 md:w-4/5 mx-auto">
        {/* <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">
          دسته‌بندی محصولات
        </h2> */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 bg-white"
            >
              {/* تصویر دسته‌بندی */}
              <div className="relative w-full h-52 md:h-64">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* لایه گرادیان برای خوانایی بیشتر */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition-all duration-500"></div>
              </div>

              {/* عنوان دسته‌بندی */}
              <div className="absolute bottom-5 w-full text-center">
                <p className="text-white text-xl md:text-2xl font-bold drop-shadow-md group-hover:text-orange-300 transition-all duration-300">
                  {cat.name}
                </p>
              </div>

              {/* افکت مرزی در hover */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-orange-400 rounded-3xl transition-all duration-500"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Category;
