import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    code: { type: String, required: true },
    createdAt: { type: Date, expires: "2m", default: Date.now }, // کد ۲ دقیقه بعد منقضی می‌شود
  },
  { timestamps: true }
);

export default mongoose.models.OtpCode || mongoose.model("OtpCode", OtpSchema);
