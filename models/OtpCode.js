import { NextResponse } from "next/server";
import Kavenegar from "kavenegar";
import connectToDatabase from "@/lib/mongodb";

const api = Kavenegar.KavenegarApi({
  apikey: process.env.KAVENEGAR_API_KEY,
});

export async function POST(req) {
  if (!process.env.KAVENEGAR_API_KEY) {
    return NextResponse.json(
      { error: "KAVENEGAR_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    await connectToDatabase();
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "شماره موبایل الزامی است" },
        { status: 400 }
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // حذف کدهای قبلی این شماره
    await OtpCode.deleteMany({ phone });

    // ذخیره کد جدید
    await OtpCode.create({ phone, code });

    // ارسال پیامک
    await new Promise((resolve, reject) => {
      api.Send(
        {
          message: `کد تایید شما در AdiStore: ${code}`,
          sender: "10008663",
          receptor: phone,
        },
        (response, status) => {
          if (
            status === 200 &&
            response.entries &&
            response.entries.length > 0
          ) {
            resolve(response);
          } else {
            reject(new Error(response?.message || "خطا در ارسال پیامک"));
          }
        }
      );
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: "خطا در ارسال کد تایید" },
      { status: 500 }
    );
  }
}
export default OtpCode;
