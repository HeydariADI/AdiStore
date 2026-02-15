"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroMobile() {
  const slides = [
    "/images/hero/14.png",
    "/images/hero/17.png",
    "/images/hero/15.png",
  ];

  return (
    <section className="w-full h-[220px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {slides.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
