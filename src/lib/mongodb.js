// src/lib/mongodb.js
// تابعی برای اتصال به MongoDB با استفاده از mongoose
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined");
}

/**
 * Cached connection across hot reloads in development to avoid
 * creating multiple connections to MongoDB.
 */
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // useNewUrlParser and useUnifiedTopology are defaults in mongoose 6+
      bufferCommands: false,
      // other options can go here
    };
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log(
          "✅ Connected to MongoDB:",
          mongooseInstance.connection.name,
        );
        return mongooseInstance;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Also export a MongoClient promise for libraries that expect a native
// MongoDB client (e.g., @auth/mongodb-adapter used by NextAuth).
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined");
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable so that the value is preserved across module reloads
  // in development (when using Next.js dev server).
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
}

export { clientPromise };
export default connectToDatabase;
