// Scripts/seedReadables.js
import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// بارگذاری .env از ریشه پروژه
dotenv.config({ path: path.join(__dirname, "../.env") });

const articles = [
  // ... آرایه مقالات مثل قبل
];

async function seed() {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI); // تست خواندن متغیر محیطی
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ متغیر محیطی MONGODB_URI تعریف نشده است!");
    }

    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Adistore" });
    console.log("🔗 اتصال به MongoDB برقرار شد");

    await Blog.deleteMany({});
    console.log("🗑️ مقالات قبلی پاک شدند");

    await Blog.insertMany(articles);
    console.log("✅ مقالات خواندنی با موفقیت وارد شدند!");

    await mongoose.disconnect();
    console.log("🔌 اتصال MongoDB قطع شد");
  } catch (error) {
    console.error("❌ خطا در ورود مقالات:", error);
  }
}

seed();
