import connectToDatabase from "@lib/mongodb";
// Use Node.js runtime for mongoose usage
export const runtime = "nodejs";
import User from "@models/User";
import Order from "@models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    await connectToDatabase();
    console.log("✅ MongoDB connected");

    const session = await getServerSession(authOptions);
    console.log("🟢 Session:", session);

    if (!session) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await User.findOne({ email: session.user.email });
    console.log("👤 User:", user);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const orders = await Order.find({ user: user._id }).populate("products");
    console.log("📦 Orders:", orders);

    return new Response(JSON.stringify({ user, orders }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ API Dashboard Error:", error);
    return new Response(
      JSON.stringify({ error: "Server error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
