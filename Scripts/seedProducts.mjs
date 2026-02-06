// Scripts/seedProducts.mjs
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

if (!mongoUri) {
  console.error("❌ MONGODB_URI تعریف نشده است!");
  process.exit(1);
}

// Products data from db/products.js
const products = [
  {
    id: 1,
    title: "Laptop 3",
    price: 1800,
    description: "Gaming laptop with RTX",
    category: "laptop",
    image: "/images/laptop/laptop3.jpg",
  },
  {
    id: 2,
    title: "Mobile 4",
    price: 750,
    description: "Phone with great camera",
    category: "mobile",
    image: "/images/mobile/mobile4.jpg",
    isBestSeller: true,
  },
  {
    id: 3,
    title: "Mobile 3",
    price: 600,
    description: "Affordable phone",
    category: "mobile",
    image: "/images/mobile/mobile3.jpg",
    isBestSeller: true,
  },
  {
    id: 4,
    title: "Headphone 10",
    price: 210,
    description: "Studio quality",
    category: "headphone",
    image: "/images/headphone/headphone10.jpg",
  },
  {
    id: 5,
    title: "Headphone 10",
    price: 210,
    description: "Studio quality",
    category: "headphone",
    image: "/images/headphone/headphone10.jpg",
  },
  {
    id: 6,
    title: "Laptop 1",
    price: 1500,
    description: "High performance laptop",
    category: "laptop",
    image: "/images/laptop/laptop1.jpg",
    isBestSeller: true,
  },
  {
    id: 7,
    title: "Laptop 2",
    price: 1200,
    description: "Portable and powerful",
    category: "laptop",
    image: "/images/laptop/laptop2.jpg",
    isBestSeller: true,
  },
  {
    id: 8,
    title: "Mobile 8",
    price: 720,
    description: "Phone with long battery",
    category: "mobile",
    image: "/images/mobile/mobile8.jpg",
    isBestSeller: true,
  },
  {
    id: 9,
    title: "Game 7",
    price: 45,
    description: "Casual game",
    category: "game",
    image: "/images/game/game7.jpg",
  },
  {
    id: 10,
    title: "Headphone 7",
    price: 170,
    description: "Over-ear premium",
    category: "headphone",
    image: "/images/headphone/headphone7.jpg",
  },
  {
    id: 11,
    title: "Laptop 5",
    price: 2000,
    description: "Premium ultrabook",
    category: "laptop",
    image: "/images/laptop/laptop5.jpg",
  },
  {
    id: 12,
    title: "Headphone 8",
    price: 110,
    description: "Good bass",
    category: "headphone",
    image: "/images/headphone/headphone8.jpg",
  },
  {
    id: 13,
    title: "Game 10",
    price: 50,
    description: "Indie game",
    category: "game",
    image: "/images/game/game10.jpg",
  },
];

async function seedProducts() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log("✅ اتصال به MongoDB موفق");

    const db = client.db("Adistore");
    const productsCollection = db.collection("products");

    // Delete existing products
    const deleteResult = await productsCollection.deleteMany({});
    console.log(`🗑️  ${deleteResult.deletedCount} محصول قدیم حذف شد`);

    // Insert new products
    const result = await productsCollection.insertMany(products);
    console.log(`✅ ${result.insertedIds.length} محصول جدید اضافه شد`);

    // Count products by category
    const categories = await productsCollection.distinct("category");
    for (const cat of categories) {
      const count = await productsCollection.countDocuments({ category: cat });
      console.log(`📦 دسته '${cat}': ${count} محصول`);
    }

    console.log("🎉 بارگذاری محصولات انجام شد!");
  } catch (err) {
    console.error("❌ خطا:", err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedProducts();
