/
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

async function showProductIds() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log("✅ اتصال به MongoDB موفق\n");

    const db = client.db("Adistore");
    const productsCollection = db.collection("products");

    const products = await productsCollection.find({}).limit(5).project({ 
      _id: 1, 
      id: 1,
      title: 1
    }).toArray();
    
    console.log("📋 نمونه محصولات و ID‌های آنها:\n");
    products.forEach((p) => {
      console.log(`محصول: ${p.title}`);
      console.log(`  _id (ObjectId): ${p._id}`);
      console.log(`  id (numeric): ${p.id}`);
      console.log("");
    });

  } catch (err) {
    console.error("❌ خطا:", err.message);
  } finally {
    await client.close();
  }
}

showProductIds();
