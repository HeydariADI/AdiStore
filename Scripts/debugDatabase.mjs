// Scripts/debugDatabase.mjs
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

console.log("🔍 MongoDB URI:", mongoUri);

async function debugDatabase() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log("✅ اتصال به MongoDB موفق\n");

    // Get the database name from URI
    const uri = new URL(mongoUri);
    const dbName = uri.pathname.split("/")[1]?.split("?")[0];
    console.log("📊 نام database:", dbName);

    const db = client.db(dbName);
    
    // List all databases
    const admin = client.db().admin();
    const databases = await admin.listDatabases();
    console.log("\n📚 تمام databases:");
    databases.databases.forEach((d) => console.log(`  - ${d.name}`));

    // List collections in current database
    const collections = await db.listCollections().toArray();
    console.log(`\n📦 Collections در database '${dbName}':`);
    if (collections.length === 0) {
      console.log("  ⚠️ هیچ collection وجود ندارد!");
    } else {
      collections.forEach((col) => console.log(`  - ${col.name}`));
    }

    // Check for products collection
    const productsCollection = db.collection("products");
    const count = await productsCollection.countDocuments();
    console.log(`\n✅ تعداد محصولات: ${count}`);

    if (count > 0) {
      const sample = await productsCollection.findOne();
      console.log("📄 نمونه محصول:");
      console.log(JSON.stringify(sample, null, 2));
      
      // Count by category
      const categories = await productsCollection.distinct("category");
      console.log("\n📊 تقسیم‌بندی بر اساس دسته:");
      for (const cat of categories) {
        const catCount = await productsCollection.countDocuments({ category: cat });
        console.log(`  - ${cat}: ${catCount} محصول`);
      }
    }
  } catch (err) {
    console.error("❌ خطا:", err.message);
  } finally {
    await client.close();
  }
}

debugDatabase();
