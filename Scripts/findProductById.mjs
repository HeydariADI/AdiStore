// Scripts/findProductById.mjs
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

async function findProductById() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db("Adistore");
    const productsCollection = db.collection("products");

    // Test ID from the error
    const testId = "6985540357ed4e41e0074d4e";
    
    console.log(`🔍 جستجو برای محصول با id: ${testId}\n`);

    const product = await productsCollection.findOne({ _id: testId });
    
    if (product) {
      console.log(`✅ محصول پیدا شد!`);
      console.log(JSON.stringify(product, null, 2));
    } else {
      console.log(`❌ محصول پیدا نشد!`);
      
      // Show first product
      console.log("\n📋 اولین محصول در database:");
      const firstProduct = await productsCollection.findOne({});
      if (firstProduct) {
        console.log(JSON.stringify(firstProduct, null, 2));
      }
    }

  } catch (err) {
    console.error("❌ خطا:", err.message);
  } finally {
    await client.close();
  }
}

findProductById();
