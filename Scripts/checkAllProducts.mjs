// Scripts/checkAllProducts.mjs
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

async function checkAllProducts() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log("✅ اتصال به MongoDB موفق\n");

    const db = client.db("Adistore");
    const productsCollection = db.collection("products");

    // Count all products
    const totalCount = await productsCollection.countDocuments();
    console.log(`📊 تعداد کل محصولات: ${totalCount}`);

    if (totalCount > 0) {
      console.log("\n📋 تمام محصولات:");
      const allProducts = await productsCollection.find({}).project({ 
        title: 1, 
        category: 1, 
        price: 1,
        _id: 0 
      }).toArray();
      
      allProducts.forEach((p, i) => {
        console.log(`${i + 1}. ${p.title} (${p.category}) - ${p.price}$`);
      });

      // Group by category
      console.log("\n📊 تقسیم‌بندی:");
      const categories = await productsCollection.distinct("category");
      for (const cat of categories) {
        const count = await productsCollection.countDocuments({ category: cat });
        console.log(`  - ${cat}: ${count} محصول`);
      }
    } else {
      console.log("⚠️  هیچ محصولی در collection وجود ندارد!");
    }

  } catch (err) {
    console.error("❌ خطا:", err.message);
  } finally {
    await client.close();
  }
}

checkAllProducts();
