// scripts/seedAndUpdateProducts.mjs
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function randomDate() {
  const now = new Date();
  const past = new Date();
  past.setMonth(now.getMonth() - 6); // شش ماه اخیر

  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime()),
  );
}

// Load .env.local manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, "..", ".env.local");

let mongoUri = process.env.MONGODB_URI;

try {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const [key, ...valueParts] = line.split("=");
      const value = valueParts.join("=").replace(/^["']|["']$/g, "");
      if (key && value) {
        process.env[key.trim()] = value;
        if (key.trim() === "MONGODB_URI") mongoUri = value;
      }
    });
  }
} catch (err) {
  console.error("خطا در خواندن .env.local:", err.message);
}

if (!mongoUri) {
  console.error("❌ MONGODB_URI تعریف نشده است!");
  process.exit(1);
}

const products = [
  // =========================
  // لپتاپ‌ها (15 محصول)
  // =========================
  {
    id: 1,
    slug: "asus-zenbook-14",
    title: "Asus ZenBook 14 UX425",
    price: 48000000,
    description: "سبک و قابل حمل، پردازنده Intel i5 نسل 11",
    category: "laptop",
    image: "/images/laptop/laptop1.jpg",
    isBestSeller: true,
  },
  {
    id: 2,
    slug: "dell-xps-13",
    title: "Dell XPS 13 9310",
    price: 62000000,
    description: "صفحه نمایش ۱۳ اینچ 4K، پردازنده Intel i7",
    category: "laptop",
    image: "/images/laptop/laptop2.jpg",
    isBestSeller: true,
  },
  {
    id: 3,
    slug: "hp-spectre-x360",
    title: "HP Spectre x360 14",
    price: 59000000,
    description: "تبدیل‌پذیر 2-in-1، سبک و باریک",
    category: "laptop",
    image: "/images/laptop/laptop3.jpg",
  },
  {
    id: 4,
    slug: "lenovo-thinkpad-x1",
    title: "Lenovo ThinkPad X1 Carbon",
    price: 75000000,
    description: "مناسب کاربری بیزنس، باتری طولانی مدت",
    category: "laptop",
    image: "/images/laptop/laptop4.jpg",
  },
  {
    id: 5,
    slug: "macbook-air-m2",
    title: "MacBook Air M2",
    price: 94000000,
    description: "باریک و سبک، پردازنده Apple M2",
    category: "laptop",
    image: "/images/laptop/laptop5.jpg",
    isBestSeller: true,
  },
  {
    id: 6,
    slug: "asus-rog-strix",
    title: "Asus ROG Strix G15",
    price: 88000000,
    description: "لپتاپ گیمینگ با کارت گرافیک RTX 3060",
    category: "laptop",
    image: "/images/laptop/laptop6.jpg",
  },
  {
    id: 7,
    slug: "msi-modern-15",
    title: "MSI Modern 15",
    price: 42000000,
    description: "سبک و اقتصادی، مناسب کار و دانشجو",
    category: "laptop",
    image: "/images/laptop/laptop7.jpg",
  },
  {
    id: 8,
    slug: "acer-swift-3",
    title: "Acer Swift 3",
    price: 38000000,
    description: "لپتاپ سبک با پردازنده AMD Ryzen 5",
    category: "laptop",
    image: "/images/laptop/laptop8.jpg",
  },
  {
    id: 9,
    slug: "dell-g15",
    title: "Dell G15 Gaming",
    price: 72000000,
    description: "لپتاپ گیمینگ با RTX 3050",
    category: "laptop",
    image: "/images/laptop/laptop9.jpg",
  },
  {
    id: 10,
    slug: "hp-pavilion-15",
    title: "HP Pavilion 15",
    price: 43000000,
    description: "لپتاپ همه‌کاره با پردازنده Intel i5",
    category: "laptop",
    image: "/images/laptop/laptop10.jpg",
  },
  {
    id: 11,
    slug: "lenovo-legion-5",
    title: "Lenovo Legion 5",
    price: 78000000,
    description: "لپتاپ گیمینگ با کارت گرافیک RTX 3060",
    category: "laptop",
    image: "/images/laptop/laptop11.jpg",
    isBestSeller: true,
  },
  {
    id: 12,
    slug: "macbook-pro-14",
    title: "MacBook Pro 14 M1",
    price: 110000000,
    description: "پردازنده Apple M1 Pro، مناسب طراحان و برنامه‌نویسان",
    category: "laptop",
    image: "/images/laptop/laptop12.jpg",
  },
  {
    id: 13,
    slug: "asus-vivobook-15",
    title: "Asus Vivobook 15",
    price: 41000000,
    description: "مناسب کاربری روزمره و دانشجویی",
    category: "laptop",
    image: "/images/laptop/laptop13.jpg",
  },
  {
    id: 14,
    slug: "acer-nitro-5",
    title: "Acer Nitro 5",
    price: 72000000,
    description: "لپتاپ گیمینگ با کارت گرافیک GTX 1650",
    category: "laptop",
    image: "/images/laptop/laptop14.jpg",
  },
  {
    id: 15,
    slug: "hp-omen-16",
    title: "HP Omen 16",
    price: 88000000,
    description: "لپتاپ قدرتمند گیمینگ با RTX 3060",
    category: "laptop",
    image: "/images/laptop/laptop15.jpg",
    isBestSeller: true,
  },

  // =========================
  // موبایل‌ها (15 محصول)
  // =========================
  {
    id: 16,
    slug: "iphone-14-pro",
    title: "iPhone 14 Pro",
    price: 95000000,
    description: "دوربین 48MP، نمایشگر Super Retina XDR",
    category: "mobile",
    image: "/images/mobile/mobile1.jpg",
    isBestSeller: true,
  },
  {
    id: 17,
    slug: "samsung-galaxy-s23",
    title: "Samsung Galaxy S23",
    price: 88000000,
    description: "صفحه نمایش 120Hz، پردازنده Snapdragon 8 Gen 2",
    category: "mobile",
    image: "/images/mobile/mobile2.jpg",
  },
  {
    id: 18,
    slug: "xiaomi-13-pro",
    title: "Xiaomi 13 Pro",
    price: 75000000,
    description: "دوربین حرفه‌ای، باتری 4820mAh",
    category: "mobile",
    image: "/images/mobile/mobile3.jpg",
    isBestSeller: true,
  },
  {
    id: 19,
    slug: "samsung-galaxy-a54",
    title: "Samsung Galaxy A54",
    price: 31000000,
    description: "موبایل اقتصادی با باتری 5000mAh",
    category: "mobile",
    image: "/images/mobile/mobile4.jpg",
  },
  {
    id: 20,
    slug: "iphone-13",
    title: "iPhone 13",
    price: 78000000,
    description: "صفحه نمایش OLED و پردازنده A15 Bionic",
    category: "mobile",
    image: "/images/mobile/mobile5.jpg",
  },
  {
    id: 21,
    slug: "samsung-galaxy-s21-fe",
    title: "Samsung Galaxy S21 FE",
    price: 56000000,
    description: "گوشی میان‌رده با دوربین عالی",
    category: "mobile",
    image: "/images/mobile/mobile6.jpg",
  },
  {
    id: 22,
    slug: "xiaomi-redmi-note-12",
    title: "Xiaomi Redmi Note 12",
    price: 22000000,
    description: "گوشی اقتصادی با باتری 5000mAh",
    category: "mobile",
    image: "/images/mobile/mobile7.jpg",
  },
  {
    id: 23,
    slug: "oneplus-11",
    title: "OnePlus 11",
    price: 67000000,
    description: "پرچمدار با نمایشگر AMOLED 120Hz",
    category: "mobile",
    image: "/images/mobile/mobile8.jpg",
  },
  {
    id: 24,
    slug: "samsung-galaxy-z-flip",
    title: "Samsung Galaxy Z Flip4",
    price: 78000000,
    description: "گوشی تاشو با نمایشگر Dynamic AMOLED",
    category: "mobile",
    image: "/images/mobile/mobile9.jpg",
  },
  {
    id: 25,
    slug: "google-pixel-7",
    title: "Google Pixel 7",
    price: 62000000,
    description: "دوربین حرفه‌ای با پردازنده Google Tensor",
    category: "mobile",
    image: "/images/mobile/mobile10.jpg",
  },

  // =========================
  // هدفون‌ها (15 محصول)
  // =========================
  {
    id: 26,
    slug: "sony-wh-1000xm5",
    title: "Sony WH-1000XM5",
    price: 18000000,
    description: "هدفون نویز کنسلینگ حرفه‌ای",
    category: "headphone",
    image: "/images/headphone/headphone1.jpg",
    isBestSeller: true,
  },
  {
    id: 27,
    slug: "bose-qc45",
    title: "Bose QC45",
    price: 17500000,
    description: "هدفون بی‌سیم با کیفیت صدای عالی",
    category: "headphone",
    image: "/images/headphone/headphone2.jpg",
  },
  {
    id: 28,
    slug: "apple-airpods-max",
    title: "Apple AirPods Max",
    price: 24000000,
    description: "هدفون روی گوش اپل با صدای بی‌نظیر",
    category: "headphone",
    image: "/images/headphone/headphone3.jpg",
    isBestSeller: true,
  },
  {
    id: 29,
    slug: "jbl-live-660nc",
    title: "JBL Live 660NC",
    price: 9500000,
    description: "هدفون بی‌سیم با باس قوی",
    category: "headphone",
    image: "/images/headphone/headphone4.jpg",
  },
  {
    id: 30,
    slug: "sennheiser-hd450bt",
    title: "Sennheiser HD 450BT",
    price: 8500000,
    description: "هدفون بی‌سیم با صدای شفاف",
    category: "headphone",
    image: "/images/headphone/headphone5.jpg",
  },
  {
    id: 31,
    slug: "sony-mdr-7506",
    title: "Sony MDR-7506",
    price: 7000000,
    description: "هدفون استودیویی با کیفیت بالا",
    category: "headphone",
    image: "/images/headphone/headphone6.jpg",
  },
  {
    id: 32,
    slug: "bose-soundlink",
    title: "Bose SoundLink",
    price: 6500000,
    description: "هدفون جمع و جور و قابل حمل",
    category: "headphone",
    image: "/images/headphone/headphone7.jpg",
  },
  {
    id: 33,
    slug: "beats-studio3",
    title: "Beats Studio3",
    price: 12000000,
    description: "هدفون باس دار اپل",
    category: "headphone",
    image: "/images/headphone/headphone8.jpg",
  },
  {
    id: 34,
    slug: "jbl-quantum-800",
    title: "JBL Quantum 800",
    price: 10500000,
    description: "هدفون گیمینگ با صدای فراگیر",
    category: "headphone",
    image: "/images/headphone/headphone9.jpg",
  },
  {
    id: 35,
    slug: "anker-soundcore-life-q30",
    title: "Anker Soundcore Life Q30",
    price: 3800000,
    description: "هدفون مقرون به صرفه با نویز کنسلینگ",
    category: "headphone",
    image: "/images/headphone/headphone10.jpg",
  },
  {
    id: 36,
    slug: "sony-wh-ch710n",
    title: "Sony WH-CH710N",
    price: 4200000,
    description: "هدفون اقتصادی با نویز کنسلینگ",
    category: "headphone",
    image: "/images/headphone/headphone1.jpg",
  },
  {
    id: 37,
    slug: "skullcandy-crusher-anc",
    title: "Skullcandy Crusher ANC",
    price: 5400000,
    description: "هدفون با باس قوی و بیسیم",
    category: "headphone",
    image: "/images/headphone/headphone2.jpg",
  },
  {
    id: 38,
    slug: "sennheiser-pxc-550",
    title: "Sennheiser PXC 550",
    price: 10500000,
    description: "هدفون مسافرتی با نویز کنسلینگ",
    category: "headphone",
    image: "/images/headphone/headphone3.jpg",
  },
  {
    id: 39,
    slug: "bose-700",
    title: "Bose 700",
    price: 22000000,
    description: "هدفون حرفه‌ای با کیفیت صدای عالی",
    category: "headphone",
    image: "/images/headphone/headphone4.jpg",
  },
  {
    id: 40,
    slug: "beats-solo-pro",
    title: "Beats Solo Pro",
    price: 9500000,
    description: "هدفون جمع و جور با صدای شفاف",
    category: "headphone",
    image: "/images/headphone/headphone5.jpg",
  },

  // =========================
  // گجت‌ها / لوازم جانبی (5 محصول)
  // =========================
  {
    id: 41,
    slug: "apple-watch-series-8",
    title: "Apple Watch Series 8",
    price: 43000000,
    description: "ساعت هوشمند با پایش سلامت و ورزش",
    category: "game",
    image: "/images/game/game1.jpg",
  },
  {
    id: 42,
    slug: "samsung-galaxy-watch-5",
    title: "Samsung Galaxy Watch 5",
    price: 32000000,
    description: "ساعت هوشمند سامسونگ با باتری طولانی",
    category: "game",
    image: "/images/game/game2.jpg",
  },
  {
    id: 43,
    slug: "xiaomi-mi-band-7",
    title: "Xiaomi Mi Band 7",
    price: 2200000,
    description: "مچ‌بند هوشمند اقتصادی و سبک",
    category: "game",
    image: "/images/game/game3.jpg",
  },
  {
    id: 44,
    slug: "anker-powerbank-20000",
    title: "Anker PowerBank 20000",
    price: 1200000,
    description: "پاوربانک پرظرفیت و قابل حمل",
    category: "game",
    image: "/images/game/game4.jpg",
  },
  {
    id: 45,
    slug: "satechi-usb-hub",
    title: "Satechi USB Hub 7-in-1",
    price: 2500000,
    description: "هاب USB با ۷ پورت و کیفیت عالی",
    category: "game",
    image: "/images/game/game5.jpg",
  },
];

// جزئیات دسته‌ها
const categoryDetails = {
  mobile: {
    spec: {
      cpu: "MediaTek Helio G99",
      storage: "128 گیگابایت",
      ram: "6 گیگابایت",
      displaySize: "6.7 اینچ",
      camera: "سه‌گانه 50 مگاپیکسل + 5 مگاپیکسل + 2 مگاپیکسل",
      battery: "5000 میلی‌آمپر ساعت",
      weight: "195 گرم",
      os: "Android 13",
    },
    colors: ["سیاه", "سفید", "آبی", "نارنجی"],
    sizes: ["5.5 اینچ", "6.5 اینچ", "6.8 اینچ"],
    variants: [
      { color: "سیاه", size: "128GB", stock: 15, priceMultiplier: 1 },
      { color: "سیاه", size: "256GB", stock: 10, priceMultiplier: 1.15 },
    ],
    rating: 4.5,
    reviews: 245,
  },
  laptop: {
    spec: {
      cpu: "Intel Core i7 1360P",
      ram: "16 گیگابایت DDR5",
      storage: "512 گیگابایت SSD",
      display: "15.6 اینچ IPS Full HD",
      gpu: "NVIDIA RTX 3050",
      battery: "56 وات‌ساعت",
      weight: "1.8 کیلوگرم",
      os: "Windows 11",
    },
    colors: ["خاکستری", "نقره‌ای", "سیاه"],
    sizes: ["13 اینچ", "15.6 اینچ", "17 اینچ"],
    variants: [
      { color: "خاکستری", size: "8GB RAM", stock: 8, priceMultiplier: 1 },
      { color: "خاکستری", size: "16GB RAM", stock: 12, priceMultiplier: 1.2 },
    ],
    rating: 4.7,
    reviews: 312,
  },
  headphone: {
    spec: {
      type: "بی‌سیم بلوتوثی",
      connection: "Bluetooth 5.3",
      driver: "40 میلی‌متر",
      batteryLife: "30 ساعت پخش مداوم",
      chargingPort: "USB-C",
      noiseCanceling: "فعال (ANC)",
      weight: "250 گرم",
      frequency: "20 Hz - 20 kHz",
    },
    colors: ["سیاه", "طلایی", "سفید", "قرمز"],
    sizes: ["Standart"],
    variants: [
      { color: "سیاه", size: "حاشیه‌ای", stock: 25, priceMultiplier: 1 },
      { color: "طلایی", size: "حاشیه‌ای", stock: 18, priceMultiplier: 1.1 },
    ],
    rating: 4.3,
    reviews: 178,
  },
  game: {
    spec: {
      type: "گجت هوشمند چندمنظوره",
      features: "پشتیبانی از بلوتوث، ردیاب سلامتی، اعلان تماس و پیام",
      battery: "300 میلی‌آمپر ساعت",
      compatibility: "Android و iOS",
      material: "سیلیکون و آلومینیوم",
      waterproof: "IP67 ضد آب",
      displaySize: "1.4 اینچ",
      weight: "45 گرم",
    },
    colors: ["مشکی", "سفید", "آبی", "سبز"],
    sizes: ["S", "M", "L", "XL"],
    variants: [{ color: "مشکی", size: "M", stock: 30, priceMultiplier: 1 }],
    rating: 4.2,
    reviews: 156,
  },
};

async function seedAndUpdate() {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    console.log("✅ اتصال به MongoDB موفق");

    const db = client.db("Adistore");
    const productsCollection = db.collection("products");

    // پاک کردن محصولات قبلی
    const deleteResult = await productsCollection.deleteMany({});
    console.log(`🗑️  ${deleteResult.deletedCount} محصول قدیم حذف شد`);

    // اضافه کردن محصولات اولیه
    const productsWithDate = products.map((p) => ({
      ...p,
      createdAt: randomDate(),
    }));

    const insertResult = await productsCollection.insertMany(productsWithDate);

    console.log(`✅ ${insertResult.insertedIds.length} محصول جدید اضافه شد`);

    // آپدیت ویژگی‌ها
    for (const [category, details] of Object.entries(categoryDetails)) {
      const result = await productsCollection.updateMany(
        { category },
        {
          $set: {
            features: details.spec,
            colors: details.colors,
            sizes: details.sizes,
            variants: details.variants.map((v) => ({
              ...v,
              price: null, // قیمت بر اساس frontend محاسبه می‌شود
            })),
            rating: details.rating,
            reviews: details.reviews,
            inStock: true,
          },
        },
      );
      console.log(
        `✅ ${result.modifiedCount} محصول در دسته '${category}' به‌روزرسانی شد.`,
      );
    }

    console.log("🎉 همه محصولات seed و update شدند!");
  } catch (err) {
    console.error("❌ خطا:", err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedAndUpdate();
