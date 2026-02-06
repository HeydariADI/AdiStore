// Scripts/testAPI.mjs
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

async function testAPI() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log("✅ اتصال به MongoDB موفق\n");

    const db = client.db("Adistore");
    const productsCollection = db.collection("products");

    // Test 1: All products
    console.log("🔍 Test 1: همه محصولات");
    const allProducts = await productsCollection.find({}).toArray();
    console.log(`   تعداد: ${allProducts.length}`);

    // Test 2: Laptop category
    console.log("\n🔍 Test 2: دسته 'laptop'");
    const laptops = await productsCollection.find({ category: "laptop" }).toArray();
    console.log(`   تعداد: ${laptops.length}`);
    laptops.forEach((p) => console.log(`   - ${p.title}`));

    // Test 3: Mobile category
    console.log("\n🔍 Test 3: دسته 'mobile'");
    const mobiles = await productsCollection.find({ category: "mobile" }).toArray();
    console.log(`   تعداد: ${mobiles.length}`);
    mobiles.forEach((p) => console.log(`   - ${p.title}`));

    // Test 4: Headphone category
    console.log("\n🔍 Test 4: دسته 'headphone'");
    const headphones = await productsCollection.find({ category: "headphone" }).toArray();
    console.log(`   تعداد: ${headphones.length}`);
    headphones.forEach((p) => console.log(`   - ${p.title}`));

    // Test 5: Game category
    console.log("\n🔍 Test 5: دسته 'game'");
    const games = await productsCollection.find({ category: "game" }).toArray();
    console.log(`   تعداد: ${games.length}`);
    games.forEach((p) => console.log(`   - ${p.title}`));

    // Test 6: Best sellers
    console.log("\n🔍 Test 6: محصولات پرفروش (isBestSeller = true)");
    const bestSellers = await productsCollection.find({ isBestSeller: true }).toArray();
    console.log(`   تعداد: ${bestSellers.length}`);
    bestSellers.forEach((p) => console.log(`   - ${p.title}`));

    console.log("\n✅ تمام tests انجام شد!");
  } catch (err) {
    console.error("❌ خطا:", err.message);
  } finally {
    await client.close();
  }
}

testAPI();
