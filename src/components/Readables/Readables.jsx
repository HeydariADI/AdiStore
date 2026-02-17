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
    <section className="py-16 bg-gray-50 font-vazirmatn ">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-xl md:text-3xl font-extrabold text-gray-800 text-center mb-10">
          خواندنی‌ها
        </h2>

        {/* موبایل: اسکرول افقی */}
        <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/readables/${article.slug}`}
              className="min-w-[220px] relative flex-shrink-0 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-56">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                  <h3 className="text-white text-base font-bold line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* دسکتاپ: Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/readables/${article.slug}`}
              className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="relative h-64">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <h3 className="text-white text-lg font-bold line-clamp-2">
                    {article.title}
                  </h3>
                </div>
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-orange-400 rounded-2xl transition-all duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
