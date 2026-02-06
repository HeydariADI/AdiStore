// Scripts/seedExtendedProducts.mjs
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { extendedProducts } from "./extendedProducts.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, "..", ".env.local");

let mongoUri = process.env.MONGODB_URI;

// Load .env.local
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

async function seedExtendedProducts() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log("✅ اتصال به MongoDB موفق\n");

    const db = client.db("Adistore");
    const productsCollection = db.collection("products");

    // Delete existing products
    const deleteResult = await productsCollection.deleteMany({});
    console.log(`🗑️  ${deleteResult.deletedCount} محصول قدیم حذف شد\n`);

    // Insert new products
    const result = await productsCollection.insertMany(extendedProducts);
    console.log(`✅ ${result.insertedIds.length} محصول جدید اضافه شد!\n`);

    // Statistics
    const totalCount = await productsCollection.countDocuments();
    console.log(`📊 تعداد کل محصولات: ${totalCount}\n`);

    // Count by category
    const categories = await productsCollection.distinct("category");
    console.log("📦 تقسیم‌بندی بر اساس دسته:");
    for (const cat of categories) {
      const count = await productsCollection.countDocuments({ category: cat });
      console.log(`  - ${cat}: ${count} محصول`);
    }

    // Count best sellers
    const bestSellerCount = await productsCollection.countDocuments({ isBestSeller: true });
    console.log(`\n⭐ محصولات پرفروش: ${bestSellerCount}`);

    console.log("\n🎉 بارگذاری محصولات انجام شد!");
  } catch (err) {
    console.error("❌ خطا:", err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedExtendedProducts();
