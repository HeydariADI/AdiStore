"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slides = [
    {
      id: 1,
      title: "بهترین تجربه خرید دیجیتال",
      text: "گوشی، لپ‌تاپ، لوازم جانبی — همه یکجا!",
      image: "/images/hero/14.png",
    },
    {
      id: 2,
      title: "پیشنهاد ویژه این هفته",
      text: "تخفیف‌های شگفت‌انگیز روی کالاهای دیجیتال",
      image: "/images/hero/17.png",
    },
    {
      id: 3,
      title: "جدیدترین محصولات بازار",
      text: "به‌روزترین مدل‌ها با بهترین قیمت",
      image: "/images/hero/15.png",
    },
  ];

  if (!mounted) {
    return (
      <section className="relative w-full h-[550px] md:h-[650px] bg-gray-200 animate-pulse" />
    );
  }

  return (
    <section className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-amber-50">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center justify-center bg-gray-200">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black opacity-40" />

              <div className="absolute flex inset-0  flex-col items-center justify-center text-center text-white font-bold z-10 px-4 ">
                <h2 className="text-3xl   md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl drop-shadow-lg ">
                  {slide.text}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
