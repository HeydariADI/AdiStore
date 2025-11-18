// scripts/updateProductsDebug.mjs
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

    // اول: کل محصولات موجود را شمار کنید
    const totalCount = await products.countDocuments();
    console.log(`📊 کل محصولات: ${totalCount}`);

    // دسته‌بندی‌های موجود را بررسی کنید
    const categories = await products.distinct("category");
    console.log(`📁 دسته‌بندی‌های موجود:`, categories);

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
    console.log("\n🔄 شروع آپ‌دیت...\n");
    for (const [category, details] of Object.entries(categoryDetails)) {
      console.log(`  📍 دسته '${category}':`);

      // بررسی محصولات این دسته
      const countBefore = await products.countDocuments({ category });
      console.log(`    - محصولات قبل از آپ‌دیت: ${countBefore}`);

      // آپ‌دیت انجام شود
      const result = await products.updateMany(
        { category },
        { $set: { details } }
      );

      console.log(`    - modifiedCount: ${result.modifiedCount}`);
      console.log(`    - acknowledged: ${result.acknowledged}`);

      // بررسی محصولات بعد از آپ‌دیت
      const sampleProduct = await products.findOne({ category });
      if (sampleProduct) {
        console.log(`    - نمونه محصول آپ‌دیت شده:`, {
          title: sampleProduct.title,
          category: sampleProduct.category,
          details: sampleProduct.details ? "✅ موجود" : "❌ موجود نیست",
        });
      }
      console.log();
    }

    console.log("🎉 به‌روزرسانی تکمیل شد!");
  } catch (err) {
    console.error("❌ خطا:", err.message);
    console.error(err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

updateProducts();
