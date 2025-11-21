/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: ["Vazirmatn", "Vazir", "Tahoma", "Arial", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#FF6B00", // رنگ اصلی برند (نارنجی)
          light: "#FFF2E0", // پس‌زمینه نرم بخش‌ها
          hover: "#E65A00", // حالت hover دکمه‌ها
        },
        text: {
          primary: "#222222", // متن اصلی
          secondary: "#555555", // متن فرعی
        },
        surface: {
          base: "#FFFFFF", // پس‌زمینه اصلی
          card: "#FAFAFA", // پس‌زمینه کارت‌ها
        },
      },
    },
  },
  plugins: [],
};
