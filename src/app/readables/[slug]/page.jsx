export const dynamic = "force-dynamic";

import { connectToDatabase } from "@lib/mongodb";
import Blog from "@models/Blog";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ReadablePage({ params }) {
  try {
    await connectToDatabase();
    const { slug } = await params;

    // مقاله اصلی
    const article = await Blog.findOne({ slug }).lean();
    if (!article) return notFound();

    // مقالات دیگر (غیر از همین مقاله)
    const otherArticles = await Blog.find({ slug: { $ne: slug } })
      .select("title slug image")
      .limit(4)
      .lean();

    return (
      <div className="w-full bg-gray-50 py-8 md:py-12 font-vazirmatn">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* عنوان مقاله */}
          <h1 className="text-3xl md:text-4xl font-extrabold leading-snug text-gray-900 mb-4">
            {article.title}
          </h1>

          {/* اطلاعات مقاله */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-8">
            <span className="px-3 py-1 bg-gray-200 rounded-lg text-gray-700">
              دسته‌بندی: {article.category || "عمومی"}
            </span>
            <span>📅 {article.date || "بدون تاریخ"}</span>
            <span>⏱ زمان مطالعه: {article.readTime || "۴"} دقیقه</span>
          </div>

          {/* تصویر کاور */}
          {article.image && (
            <div className="w-full mb-10">
              <img
                src={article.image}
                alt={article.title}
                className="w-full rounded-2xl shadow-lg object-cover max-h-[450px]"
              />
            </div>
          )}

          {/* متن مقاله */}
          <article
            className="
              prose prose-lg max-w-none
              prose-h2:text-gray-900 font-bold
              prose-p:text-gray-700 leading-8 tracking-wide
            "
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  article.content ||
                  "<p>محتوای این مقاله به زودی منتشر می‌شود...</p>",
              }}
            />
          </article>

          {/* جداکننده */}
          <div className="mt-12 mb-8 border-t border-gray-300"></div>

          {/* مقالات بیشتر */}
          {otherArticles.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                مقالات دیگر
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherArticles.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/readables/${item.slug}`}
                    className="group block"
                  >
                    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-44 object-cover group-hover:scale-105 transition"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* اشتراک گذاری
          <div className="mt-12 flex items-center gap-4 text-gray-700">
            <span className="font-medium">اشتراک‌گذاری:</span>
            <div className="flex gap-3 text-xl">
              <a href="#" className="hover:text-blue-600">
                🌐
              </a>
              <a href="#" className="hover:text-blue-500">
                ✉️
              </a>
              <a href="#" className="hover:text-indigo-600">
                📎
              </a>
            </div>
          </div> */}
        </div>
      </div>
    );
  } catch (error) {
    console.error("خطا در بارگذاری مقاله:", error);
    return notFound();
  }
}
