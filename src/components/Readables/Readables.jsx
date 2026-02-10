"use client";
import Link from "next/link";
import Image from "next/image";

// نمونه‌ی دیتابیس (میتونی از MongoDB یا فایل lib/articles.js بخونی)
export const articles = [
  {
    slug: "tech-trends-2025",
    title: "10 ترند مهم تکنولوژی در ۲۰۲۵",
    image: "/images/read/1.png",
  },
  {
    slug: "mobile-review-galaxy",
    title: "نقد و بررسی مدل جدید Galaxy S25",
    image: "/images/read/2.png",
  },
  {
    slug: "popular-games-2025",
    title: "۱۰ بازی محبوب ۲۰۲۵ که نباید از دست بدهید",
    image: "/images/read/3.png",
  },
  {
    slug: "ai-in-everyday-life",
    title: "هوش مصنوعی و کاربردهای آن در زندگی روزمره",
    image: "/images/read/4.png",
  },
];

export default function Readables() {
  return (
    <section className="py-16 bg-gray-50 font-vazirmatn mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-10">
          خواندنی‌ها
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/readables/${article.slug}`}
              className="group block"
            >
              <div className="relative h-56 md:h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* تصویر پس‌زمینه */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${article.image})` }}
                ></div>

                {/* overlay برای تار کردن پس‌زمینه */}
                <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                  <h3 className="text-white text-lg md:text-xl font-bold line-clamp-2">
                    {article.title}
                  </h3>
                </div>

                {/* افکت hover روی border */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-orange-400 rounded-2xl transition-all duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
