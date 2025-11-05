import Image from "next/image";
import React from "react";

export const metadata = {
  title: "درباره ما | Adistor",
  description: "ادی‌استور، تجربه‌ای هوشمند از خرید دیجیتال.",
};

function AboutPage() {
  return (
    <main className="font-vazirmatn">
      {/* هدر بخش درباره ما */}
      <section className="bg-orange-100 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">درباره ما</h1>
        <p className="text-gray-600 text-lg">
          ادی‌استور، تجربه‌ای هوشمند از خرید دیجیتال
        </p>
      </section>

      {/* معرفی فروشگاه */}
      <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/about-us.jpg"
            alt="درباره فروشگاه ادی‌استور"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-right">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ما چه کسانی هستیم؟
          </h2>
          <p className="text-gray-600 leading-8 mb-6">
            ادی‌استور با هدف ایجاد تجربه‌ای متفاوت از خرید آنلاین، کار خود را از
            سال ۱۴۰۲ آغاز کرد. ما در زمینه‌ی فروش محصولات دیجیتال از جمله
            لپ‌تاپ، موبایل، هدفون و گجت‌های هوشمند فعالیت می‌کنیم و همواره در
            تلاشیم تا با ارائه‌ی کالاهای اصل، قیمت مناسب و خدمات سریع، رضایت
            مشتریانمان را جلب کنیم.
          </p>
          <p className="text-gray-600 leading-8">
            تیم ما از متخصصان حوزه‌ی فناوری و پشتیبانی تشکیل شده که به‌صورت ۲۴
            ساعته آماده‌ی پاسخگویی و راهنمایی شما هستند. ما باور داریم خرید
            دیجیتال باید ساده، لذت‌بخش و مطمئن باشد.
          </p>
        </div>
      </section>

      {/* اهداف و ارزش‌ها */}
      <section className="bg-orange-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            اهداف و ارزش‌های ما
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-orange-600 mb-3">
                رضایت مشتری
              </h3>
              <p className="text-gray-600 leading-7">
                مهم‌ترین اولویت ما رضایت شماست. ما همیشه گوش‌به‌زنگ نیازهای
                مشتریان خود هستیم.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-orange-600 mb-3">
                کیفیت و اصالت کالا
              </h3>
              <p className="text-gray-600 leading-7">
                ما فقط با برندها و تأمین‌کنندگان معتبر همکاری می‌کنیم تا محصولی
                باکیفیت به دست شما برسد.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-orange-600 mb-3">
                پشتیبانی حرفه‌ای
              </h3>
              <p className="text-gray-600 leading-7">
                تیم پشتیبانی ما همیشه در کنار شماست تا تجربه‌ای بی‌دغدغه از خرید
                داشته باشید.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* تماس سریع */}
      <section className="bg-white py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          آماده‌ایم تا به شما کمک کنیم ✨
        </h2>
        <p className="text-gray-600 mb-8">
          اگر سوالی دارید یا نیاز به مشاوره دارید، با ما تماس بگیرید.
        </p>
        <a
          href="/contact"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl transition-all"
        >
          ارتباط با ما
        </a>
      </section>
    </main>
  );
}

export default AboutPage;
