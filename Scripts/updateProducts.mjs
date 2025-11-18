// scripts/updateProducts.mjs
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=").replace(/^["']|["']$/g, "");
      if (key && value) {
        process.env[key.trim()] = value;
        if (key.trim() === "MONGODB_URI") {
          mongoUri = value;
        }
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

async function updateProducts() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log("✅ اتصال به MongoDB موفق");

    const db = client.db("myStore");
    const products = db.collection("products");

    // Category details
    const categoryDetails = {
      mobile: {
        cpu: "MediaTek Helio G99",
        storage: "128 گیگابایت",
        ram: "6 گیگابایت",
        displaySize: "6.7 اینچ",
        camera: "سه‌گانه 50 مگاپیکسل + 5 مگاپیکسل + 2 مگاپیکسل",
        battery: "5000 میلی‌آمپر ساعت",
      },
      laptop: {
        cpu: "Intel Core i7 1360P",
        ram: "16 گیگابایت DDR5",
        storage: "512 گیگابایت SSD",
        display: "15.6 اینچ IPS Full HD",
        gpu: "NVIDIA RTX 3050",
        battery: "56 وات‌ساعت",
      },
      headphone: {
        type: "بی‌سیم بلوتوثی",
        connection: "Bluetooth 5.3",
        driver: "40 میلی‌متر",
        batteryLife: "30 ساعت پخش مداوم",
        chargingPort: "USB-C",
        noiseCanceling: "فعال (ANC)",
      },
      game: {
        type: "گجت هوشمند چندمنظوره",
        features: "پشتیبانی از بلوتوث، ردیاب سلامتی، اعلان تماس و پیام",
        battery: "300 میلی‌آمپر ساعت",
        compatibility: "Android و iOS",
        material: "سیلیکون و آلومینیوم",
        waterproof: "IP67 ضد آب",
      },
    };

    // Update each category
    for (const [category, details] of Object.entries(categoryDetails)) {
      const result = await products.updateMany(
        { category },
        { $set: { details } }
      );
      console.log(
        `✅ ${result.modifiedCount} محصول در دسته '${category}' به‌روزرسانی شد.`
      );
    }

    console.log("🎉 به‌روزرسانی همه‌ی دسته‌ها انجام شد!");
  } catch (err) {
    console.error("❌ خطا:", err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

updateProducts();
